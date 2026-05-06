import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  MapPinned,
  Router,
  ShieldCheck,
  Tv,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import {
  siteEquipmentItems,
  siteSurveillancePackages,
  siteTariffs,
  siteTvPackages,
} from "@/data/site-content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSiteMode } from "@/lib/site-mode";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";
type ContactAction = "connect" | "check-address" | "surveillance" | "tv";

type FormState = {
  name: string;
  phone: string;
  address: string;
  plan: string;
  note: string;
};

type FormOption = {
  value: string;
  label: string;
};

type FormOptionGroup = {
  label: string;
  options: FormOption[];
};

const initialState: FormState = {
  name: "",
  phone: "",
  address: "",
  plan: "",
  note: "",
};

const actionConfig: Record<
  ContactAction,
  {
    title: string;
    description: string;
    submitLabel: string;
    panelTitle: string;
    selectLabel: string;
    selectPlaceholder: string;
    notePlaceholder: string;
    icon: LucideIcon;
    tips: string[];
  }
> = {
  connect: {
    title: "Заявка на подключение интернета",
    description:
      "Оставьте контакты и адрес. Мы уточним возможность подключения и подберём подходящий тариф.",
    submitLabel: "Отправить заявку",
    panelTitle: "Подключение",
    selectLabel: "Тариф",
    selectPlaceholder: "Выберите тариф",
    notePlaceholder: "Комментарий: квартира или дом, удобное время звонка, пожелания по подключению.",
    icon: Router,
    tips: ["Имя и телефон", "Точный адрес подключения", "Выбранный тариф или пожелания по скорости"],
  },
  "check-address": {
    title: "Проверка адреса",
    description:
      "Уточним, какие услуги и технологии доступны по вашему адресу, и подскажем подходящий вариант подключения.",
    submitLabel: "Проверить адрес",
    panelTitle: "Проверка адреса",
    selectLabel: "Что нужно проверить",
    selectPlaceholder: "Выберите услугу",
    notePlaceholder: "Например: квартира, частный дом, этаж, ориентир или удобное время для обратного звонка.",
    icon: MapPinned,
    tips: ["Улица, дом и квартира", "Контактный телефон", "Какая услуга вас интересует"],
  },
  surveillance: {
    title: "Заявка на видеонаблюдение",
    description:
      "Выберите тариф или оборудование. Мы поможем подобрать камеры и подходящий формат подключения.",
    submitLabel: "Получить консультацию",
    panelTitle: "Видеонаблюдение",
    selectLabel: "Тариф или оборудование",
    selectPlaceholder: "Выберите вариант",
    notePlaceholder: "Например: двор, входная группа, парковка, сколько камер нужно и где удобнее связаться.",
    icon: ShieldCheck,
    tips: ["Адрес объекта", "Какой сценарий нужен", "Сколько камер планируете установить"],
  },
  tv: {
    title: "Подключение ТВ",
    description:
      "Подберите пакет телевидения или интернет + ТВ и отправьте заявку на подключение в одном месте.",
    submitLabel: "Оставить заявку",
    panelTitle: "Интернет + ТВ",
    selectLabel: "Пакет или тариф",
    selectPlaceholder: "Выберите пакет",
    notePlaceholder: "Можно указать устройство для просмотра, удобное время звонка или пожелания по пакету каналов.",
    icon: Tv,
    tips: ["Адрес подключения", "Телефон для связи", "Выбранный ТВ-пакет или комплект"],
  },
};

const heroCopy: Record<
  ContactAction,
  {
    title: string;
    description: string;
    notePlaceholder: string;
  }
> = {
  connect: {
    title: "Оставьте заявку",
    description: "Имя, телефон и адрес. Подключение и тариф уточним по звонку.",
    notePlaceholder: "Комментарий по заявке",
  },
  "check-address": {
    title: "Проверить адрес",
    description: "Проверим доступность услуг по адресу и подскажем подходящий вариант.",
    notePlaceholder: "Комментарий по адресу",
  },
  surveillance: {
    title: "Заявка на камеры",
    description: "Подберём камеры, архив и оборудование для дома, двора или объекта.",
    notePlaceholder: "Комментарий по объекту",
  },
  tv: {
    title: "Подключение ТВ",
    description: "Подберём пакет ТВ или комплект интернет + ТВ и свяжемся с вами.",
    notePlaceholder: "Комментарий по пакету",
  },
};

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (!digits) {
    return "";
  }

  const normalized =
    digits[0] === "8" ? `7${digits.slice(1)}` : digits[0] === "7" ? digits : `7${digits}`;
  const country = normalized.slice(0, 1);
  const code = normalized.slice(1, 4);
  const first = normalized.slice(4, 7);
  const second = normalized.slice(7, 9);
  const third = normalized.slice(9, 11);

  let result = `+${country}`;

  if (code) {
    result += ` (${code}`;
  }

  if (code.length === 3) {
    result += ")";
  }

  if (first) {
    result += ` ${first}`;
  }

  if (second) {
    result += `-${second}`;
  }

  if (third) {
    result += `-${third}`;
  }

  return result;
}

function dedupeOptions(options: FormOption[]) {
  return options.filter(
    (option, index, source) => source.findIndex((item) => item.value === option.value) === index,
  );
}

function flattenGroups(groups: FormOptionGroup[]) {
  return groups.flatMap((group) => group.options.map((option) => option.value));
}

function buildOptionGroups(action: ContactAction): FormOptionGroup[] {
  if (action === "connect") {
    return [
      {
        label: "Частный дом",
        options: dedupeOptions(
          siteTariffs
            .filter((item) => item.category === "house")
            .map((item) => ({ value: item.name, label: `${item.name} - ${item.speed}` })),
        ),
      },
      {
        label: "Квартира",
        options: dedupeOptions(
          siteTariffs
            .filter((item) => item.category === "xpon" || item.category === "ftth")
            .map((item) => ({ value: item.name, label: `${item.name} - ${item.speed}` })),
        ),
      },
      {
        label: "Интернет + ТВ",
        options: dedupeOptions(
          siteTariffs
            .filter((item) => item.category === "bundle")
            .map((item) => ({ value: item.name, label: `${item.name} - ${item.speed}` })),
        ),
      },
    ];
  }

  if (action === "tv") {
    return [
      {
        label: "ТВ-пакеты",
        options: dedupeOptions(
          siteTvPackages.map((item) => ({
            value: item.title,
            label: `${item.title} - ${item.channels}`,
          })),
        ),
      },
      {
        label: "Интернет + ТВ",
        options: dedupeOptions(
          siteTariffs
            .filter((item) => item.category === "bundle")
            .map((item) => ({ value: item.name, label: `${item.name} - ${item.speed}` })),
        ),
      },
    ];
  }

  if (action === "surveillance") {
    return [
      {
        label: "Тарифы видеонаблюдения",
        options: dedupeOptions(
          siteSurveillancePackages.map((item) => ({
            value: item.title,
            label: `${item.title} - ${item.price}`,
          })),
        ),
      },
      {
        label: "Оборудование",
        options: dedupeOptions(
          siteEquipmentItems.map((item) => ({
            value: item.title,
            label: item.price ? `${item.title} - ${item.price}` : item.title,
          })),
        ),
      },
    ];
  }

  return [
    {
      label: "Услуги",
      options: [
        { value: "Интернет для квартиры", label: "Интернет для квартиры" },
        { value: "Интернет для частного дома", label: "Интернет для частного дома" },
        { value: "Интернет + ТВ", label: "Интернет + ТВ" },
        { value: "ТВ", label: "ТВ" },
        { value: "Видеонаблюдение", label: "Видеонаблюдение" },
      ],
    },
  ];
}

function getStatusTitle(status: FormStatus) {
  if (status === "loading") {
    return "Отправляем заявку";
  }

  if (status === "success") {
    return "Заявка отправлена";
  }

  if (status === "error") {
    return "Проверьте данные";
  }

  return "После отправки";
}

type ContactFormProps = {
  variant?: "default" | "hero";
};

export function ContactForm({ variant = "default" }: ContactFormProps) {
  const [searchParams] = useSearchParams();
  const { mode, to } = useSiteMode();
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [successOpen, setSuccessOpen] = useState(false);
  const formAnchorRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const actionParam = searchParams.get("action");
  const action: ContactAction =
    actionParam === "check-address" ||
    actionParam === "surveillance" ||
    actionParam === "tv"
      ? actionParam
      : "connect";
  const tariffFromQuery = searchParams.get("tariff");
  const content = actionConfig[action];
  const ActionIcon = content.icon;
  const isHero = variant === "hero";
  const heroContent = heroCopy[action];
  const optionGroups = useMemo(() => buildOptionGroups(action), [action]);
  const availableOptions = useMemo(() => flattenGroups(optionGroups), [optionGroups]);

  useEffect(() => {
    const nextPlan = tariffFromQuery && availableOptions.includes(tariffFromQuery) ? tariffFromQuery : "";

    setStatus("idle");
    setSuccessOpen(false);
    setForm((prev) => ({
      ...prev,
      plan: nextPlan,
      note: "",
    }));
  }, [action, availableOptions, tariffFromQuery]);

  useEffect(() => {
    if (!actionParam) {
      return;
    }

    const timer = window.setTimeout(() => {
      formAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      nameInputRef.current?.focus({ preventScroll: true });
    }, 140);

    return () => window.clearTimeout(timer);
  }, [action, actionParam]);

  const helperText = useMemo(() => {
    if (status === "error") {
      return mode === "site"
        ? "Не удалось отправить заявку. Проверьте номер телефона и попробуйте ещё раз."
        : "Тестовая ошибка: попробуйте номер без 0000 и адрес без слова ошибка.";
    }

    if (status === "loading") {
      return "Отправляем данные и готовим заявку для менеджера.";
    }

    return mode === "site"
      ? "Мы уточним доступность подключения, согласуем удобное время и подскажем следующий шаг."
      : "Форма показывает поведение пользовательских сценариев без реальной интеграции.";
  }, [mode, status]);

  const displayTitle = isHero ? heroContent.title : content.title;
  const displayDescription = isHero ? heroContent.description : content.description;
  const displayNotePlaceholder = isHero ? heroContent.notePlaceholder : content.notePlaceholder;
  const displayHelperText =
    isHero && status === "idle"
      ? "Проверим подключение по адресу, уточним тариф и согласуем следующий шаг."
      : helperText;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    window.setTimeout(() => {
      const hasDemoError =
        form.phone.replace(/\D/g, "").includes("0000") ||
        form.address.toLowerCase().includes("ошибка");

      if (hasDemoError) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setSuccessOpen(true);
    }, 900);
  };

  const quickActions = [
    { actionKey: "connect" as const, label: "Интернет", href: to("/?action=connect#application"), icon: Router },
    {
      actionKey: "check-address" as const,
      label: "Проверить адрес",
      href: to("/?action=check-address#application"),
      icon: MapPinned,
    },
    { actionKey: "tv" as const, label: "Интернет + ТВ", href: to("/?action=tv#application"), icon: Tv },
    {
      actionKey: "surveillance" as const,
      label: "Видеонаблюдение",
      href: to("/?action=surveillance#application"),
      icon: ShieldCheck,
    },
  ];

  const resetForm = () => {
    setForm({
      ...initialState,
      plan: tariffFromQuery && availableOptions.includes(tariffFromQuery) ? tariffFromQuery : "",
    });
    setStatus("idle");
    setSuccessOpen(false);
  };

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden p-0",
          isHero
            ? "h-full rounded-[34px] border-white/35 bg-white/90 shadow-[0_28px_90px_-48px_rgba(24,58,99,0.6)] backdrop-blur-xl"
            : "rounded-[34px] border border-avanta-green/12 bg-white/96 shadow-[0_26px_70px_-46px_rgba(24,58,99,0.34)]",
        )}
        id="application"
      >
        <div ref={formAnchorRef} tabIndex={-1} />
        <div
          className={cn(
            "border-b border-avanta-green/15 bg-gradient-to-r from-avanta-green/12 via-white to-avanta-navy/8",
            isHero
              ? "border-white/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.92))] px-4 py-3 sm:px-5"
              : "px-5 py-4 sm:px-6",
          )}
        >
          <div className="flex flex-wrap gap-2">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border text-sm font-semibold transition",
                    isHero ? "px-3 py-1.5 text-[13px]" : "px-4 py-2 text-[0.95rem]",
                    action === item.actionKey
                      ? "border-avanta-green/25 bg-avanta-green text-white shadow-panel"
                      : "border-avanta-navy/10 bg-white text-avanta-navy hover:border-avanta-green/20 hover:text-avanta-emerald",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div
          className={cn(
            "bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.06),transparent_35%)]",
            isHero
              ? "grid gap-5 bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.07),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(244,249,247,0.92))] p-4 sm:p-5"
              : "grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.08fr_0.82fr]",
          )}
        >
          <div>
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "shrink-0 rounded-[20px] bg-avanta-gradient text-white shadow-panel",
                  isHero ? "flex h-11 w-11 items-center justify-center rounded-[16px]" : "flex h-12 w-12 items-center justify-center rounded-[18px]",
                )}
              >
                <ActionIcon className={cn(isHero ? "h-6 w-6" : "h-6 w-6")} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-avanta-emerald">
                  {content.panelTitle}
                </p>
                <h3
                  className={cn(
                    "mt-2 font-display font-bold leading-tight text-avanta-navy",
                    isHero ? "text-[1.7rem] sm:text-[1.9rem]" : "text-[2rem] sm:text-[2.2rem]",
                  )}
                >
                  {displayTitle}
                </h3>
                <p
                  className={cn(
                    "mt-3 max-w-xl text-sm text-avanta-graphite",
                    isHero ? "max-w-md leading-6" : "max-w-[40rem] leading-6 sm:text-[1rem]",
                  )}
                >
                  {displayDescription}
                </p>
              </div>
            </div>

            <form className={cn("grid gap-3.5", isHero ? "mt-5" : "mt-6")} onSubmit={handleSubmit}>
              <div className={cn("grid gap-3.5", isHero ? "" : "sm:grid-cols-2")}>
                <Input
                  ref={nameInputRef}
                  placeholder="Ваше имя"
                  value={form.name}
                  autoComplete="name"
                  maxLength={60}
                  className={cn(isHero ? "h-11" : "h-13")}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  required
                />
                <Input
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  autoComplete="tel"
                  className={cn(isHero ? "h-11" : "h-13")}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      phone: formatPhone(event.target.value),
                    }))
                  }
                  required
                />
              </div>

              <Input
                placeholder="Адрес подключения"
                value={form.address}
                autoComplete="street-address"
                maxLength={140}
                className={cn(isHero ? "h-11" : "h-13")}
                onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                required
              />

              <div className="grid gap-2">
                <span className="text-sm font-semibold text-avanta-navy">{content.selectLabel}</span>
                <Select
                  value={form.plan}
                  className={cn(isHero ? "h-11" : "h-13")}
                  onChange={(event) => setForm((prev) => ({ ...prev, plan: event.target.value }))}
                  required
                >
                  <option value="" disabled>
                    {content.selectPlaceholder}
                  </option>
                  {optionGroups.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </Select>
              </div>

              <Textarea
                placeholder={displayNotePlaceholder}
                value={form.note}
                maxLength={220}
                className={cn(isHero ? "min-h-20" : "min-h-32")}
                onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
              />

              <div className={cn("flex flex-wrap gap-3 pt-2", isHero ? "items-center" : "")}>
                <Button size="default" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Отправляем
                    </>
                  ) : (
                    content.submitLabel
                  )}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="default"
                  onClick={resetForm}
                >
                  Очистить
                </Button>
              </div>
            </form>
          </div>

          <div
            className={cn(
              isHero ? "grid gap-3 sm:grid-cols-2" : "space-y-4 lg:max-w-[28rem] lg:justify-self-end",
            )}
          >
            <div
              className={cn(
                "border border-avanta-green/15 bg-gradient-to-br from-avanta-mist to-white shadow-panel",
                isHero ? "rounded-[22px] px-4 py-4" : "rounded-[24px] px-5 py-5 sm:px-6",
              )}
            >
              <p
                className={cn(
                  "font-semibold text-avanta-navy",
                  isHero ? "pl-[1.375rem] text-[13px]" : "pl-[1.5rem] text-[1rem]",
                )}
              >
                Что понадобится
              </p>
              <ul
                className={cn(
                  "mt-4 text-avanta-graphite",
                  isHero ? "space-y-2.5 text-[13px] leading-5" : "space-y-3 text-[1rem] leading-6",
                )}
              >
                {content.tips.map((tip) => (
                  <li key={tip} className="grid grid-cols-[10px_1fr] items-start gap-3">
                    <span className="mt-[0.55rem] h-2.5 w-2.5 rounded-full bg-avanta-green" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                "border shadow-panel",
                isHero ? "rounded-[22px] px-4 py-4" : "rounded-[24px] px-5 py-5 sm:px-6",
                status === "error"
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-avanta-green/15 bg-gradient-to-br from-white to-avanta-green/5 text-avanta-navy",
              )}
            >
              <div>
                <div
                  className={cn(
                    "font-semibold text-avanta-navy",
                    isHero ? "pl-[1.375rem] text-[13px]" : "pl-[1.5rem] text-[1rem]",
                  )}
                >
                  {getStatusTitle(status)}
                </div>
                <div className="mt-2.5 grid grid-cols-[18px_1fr] items-start gap-3">
                  {status === "loading" ? (
                    <LoaderCircle className="mt-0.5 h-5 w-5 animate-spin text-avanta-green" />
                  ) : status === "error" ? (
                    <AlertCircle className="mt-0.5 h-5 w-5 text-red-500" />
                  ) : (
                    <span className="mt-[0.45rem] h-3 w-3 rounded-full bg-avanta-green" />
                  )}
                  <p
                    className={cn(
                      "text-avanta-graphite",
                      isHero ? "text-[13px] leading-5" : "text-[1rem] leading-6",
                    )}
                  >
                    {displayHelperText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <AnimatePresence>
        {successOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-avanta-pine/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSuccessOpen(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
            >
              <div className="relative w-full max-w-2xl rounded-[36px] bg-white p-8 shadow-2xl sm:p-10">
                <button
                  type="button"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-avanta-navy/10 text-avanta-navy transition hover:bg-avanta-mist"
                  onClick={() => setSuccessOpen(false)}
                  aria-label="Закрыть окно"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="mx-auto max-w-xl text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-avanta-green/10 text-avanta-green">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-avanta-emerald">
                    Заявка отправлена
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-bold text-avanta-navy sm:text-4xl">
                    Ваша заявка успешно принята
                  </h3>
                  <p className="mt-5 text-base leading-8 text-avanta-graphite">
                    Мы свяжемся с вами по номеру{" "}
                    <span className="font-semibold text-avanta-navy">
                      {form.phone || "+7 (___) ___-__-__"}
                    </span>
                    , чтобы уточнить адрес, подходящий тариф и удобную дату подключения.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-avanta-graphite">
                    Если нужно изменить данные, закройте окно и отправьте заявку ещё раз.
                  </p>

                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button size="lg" onClick={() => setSuccessOpen(false)}>
                      Спасибо, жду!
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      onClick={() => {
                        setSuccessOpen(false);
                        setStatus("idle");
                      }}
                    >
                      Изменить заявку
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

