import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, ChevronLeft, ChevronRight, Gamepad2, House, Laptop, Sparkles, Tv } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteTariffs } from "@/data/site-content";
import type { Tariff } from "@/types/content";
import { useSiteMode } from "@/lib/site-mode";
import { cn } from "@/lib/utils";

type DwellingType = "apartment" | "house";
type DeviceTier = "few" | "medium" | "many";
type UsageType = "gaming" | "work" | "tv";
type TariffCategory = Tariff["category"];

type RankedTariff = Tariff & {
  numericSpeed: number;
  score: number;
};

const dwellingOptions: Array<{ value: DwellingType; title: string; description: string }> = [
  {
    value: "apartment",
    title: "Квартира",
    description: "Подбор среди квартирных и пакетных линеек.",
  },
  {
    value: "house",
    title: "Частный дом",
    description: "Подбор под частный сектор с запасом по скорости.",
  },
];

const deviceOptions: Array<{ value: DeviceTier; title: string; speedHint: number; description: string }> = [
  {
    value: "few",
    title: "1-2 устройства",
    speedHint: 80,
    description: "Телефон, ноутбук, обычный домашний сценарий.",
  },
  {
    value: "medium",
    title: "3-5 устройств",
    speedHint: 130,
    description: "Семья, ТВ + смартфоны + рабочие сессии.",
  },
  {
    value: "many",
    title: "6 и более",
    speedHint: 220,
    description: "Несколько экранов, высокая одновременная нагрузка.",
  },
];

const usageOptions: Array<{ value: UsageType; label: string; description: string; icon: typeof Gamepad2 }> = [
  {
    value: "gaming",
    label: "Игры",
    description: "Низкий пинг и запас скорости под обновления.",
    icon: Gamepad2,
  },
  {
    value: "work",
    label: "Работа",
    description: "Видеосвязь, облака, рабочие сервисы.",
    icon: Laptop,
  },
  {
    value: "tv",
    label: "ТВ и кино",
    description: "Стабильный стриминг и пакеты каналов.",
    icon: Tv,
  },
];

const stepLabels = ["Тип жилья", "Устройства", "Сценарий"];

const speedByDevices: Record<DeviceTier, number> = {
  few: 80,
  medium: 130,
  many: 220,
};

const usageSpeedWeight: Record<UsageType, number> = {
  gaming: 170,
  work: 70,
  tv: 50,
};

const formatUsageLabel: Record<UsageType, string> = {
  gaming: "игры",
  work: "работа",
  tv: "ТВ и кино",
};

const parseSpeed = (speed: string) => {
  const numeric = Number(speed.match(/\d+/)?.[0] ?? 0);
  return Number.isFinite(numeric) ? numeric : 0;
};

const parsePrice = (price: string) => {
  const numeric = Number(price.replace(/[^\d]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
};

const pickCategories = (dwelling: DwellingType, usages: UsageType[]): TariffCategory[] => {
  if (dwelling === "house") {
    return ["house"];
  }

  if (usages.includes("tv") && !usages.includes("gaming")) {
    return ["bundle", "xpon", "ftth"];
  }

  return ["xpon", "ftth", "bundle"];
};

const preferredCategory = (dwelling: DwellingType, usages: UsageType[]) => {
  if (dwelling === "house") {
    return "house";
  }

  if (usages.includes("tv") && !usages.includes("gaming")) {
    return "bundle";
  }

  if (usages.includes("gaming")) {
    return "xpon";
  }

  return "ftth";
};

const calculateTargetSpeed = (devices: DeviceTier, usages: UsageType[]) => {
  const base = speedByDevices[devices];
  const extra = usages.reduce((sum, item) => sum + usageSpeedWeight[item], 0);
  return Math.min(500, base + extra);
};

const buildRecommendationReasons = ({
  dwelling,
  devices,
  usages,
  targetSpeed,
  selected,
}: {
  dwelling: DwellingType;
  devices: DeviceTier;
  usages: UsageType[];
  targetSpeed: number;
  selected: Tariff;
}) => {
  const dwellingLabel = dwelling === "house" ? "частного дома" : "квартиры";
  const deviceLabel = deviceOptions.find((option) => option.value === devices)?.title ?? "выбранных устройств";
  const usageLabel =
    usages.length > 0
      ? usages.map((usage) => formatUsageLabel[usage]).join(", ")
      : "базового домашнего сценария";

  return [
    `Подбор сделан для ${dwellingLabel} и нагрузки ${deviceLabel.toLowerCase()}.`,
    `Учли сценарий: ${usageLabel}.`,
    `Расчётная целевая скорость: около ${targetSpeed} Мбит/с.`,
    `Тариф ${selected.name} лучше всего совпадает по скорости и типу подключения.`,
  ];
};

export function SiteTariffCalculatorPage() {
  const { to } = useSiteMode();
  const [step, setStep] = useState(0);
  const [dwelling, setDwelling] = useState<DwellingType | null>(null);
  const [devices, setDevices] = useState<DeviceTier | null>(null);
  const [usages, setUsages] = useState<UsageType[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const canGoNext =
    (step === 0 && dwelling !== null) ||
    (step === 1 && devices !== null) ||
    (step === 2 && usages.length > 0);

  const isComplete = dwelling !== null && devices !== null && usages.length > 0;

  useEffect(() => {
    setHasCalculated(false);
  }, [dwelling, devices, usages]);

  const recommendation = useMemo(() => {
    if (!isComplete) {
      return null;
    }

    const selectedDwelling = dwelling as DwellingType;
    const selectedDevices = devices as DeviceTier;
    const targetSpeed = calculateTargetSpeed(selectedDevices, usages);
    const categories = pickCategories(selectedDwelling, usages);
    const preferred = preferredCategory(selectedDwelling, usages);

    const ranked: RankedTariff[] = siteTariffs
      .filter((tariff) => categories.includes(tariff.category))
      .map((tariff) => {
        const numericSpeed = parseSpeed(tariff.speed);
        const speedDelta = numericSpeed - targetSpeed;
        const underPenalty = speedDelta < 0 ? Math.abs(speedDelta) * 2.4 : speedDelta * 0.65;
        const categoryPenalty = tariff.category === preferred ? -12 : 0;
        const popularBoost = tariff.popular ? -4 : 0;
        const pricePenalty = parsePrice(tariff.price) / 190;
        const score = underPenalty + categoryPenalty + popularBoost + pricePenalty;

        return {
          ...tariff,
          numericSpeed,
          score,
        };
      })
      .sort((left, right) => left.score - right.score);

    const selected = ranked[0];
    const alternatives = ranked.slice(1, 4);
    const reasons = buildRecommendationReasons({
      dwelling: selectedDwelling,
      devices: selectedDevices,
      usages,
      targetSpeed,
      selected,
    });

    return {
      targetSpeed,
      selected,
      alternatives,
      reasons,
    };
  }, [devices, dwelling, isComplete, usages]);

  const showRecommendation = hasCalculated && recommendation !== null;

  const handlePrimaryAction = () => {
    if (step < 2) {
      setStep((prev) => Math.min(2, prev + 1));
      return;
    }

    if (!canGoNext) {
      return;
    }

    setHasCalculated(true);
    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-10 pt-10">
        <section className="relative overflow-hidden rounded-[38px] border border-avanta-green/12 bg-[linear-gradient(135deg,#f8fcfa_0%,#eef6f2_52%,#e7f0ec_100%)] px-6 py-8 shadow-float sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(58,170,53,0.11),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(24,58,99,0.1),transparent_42%)]" />
          <Reveal>
            <Badge className="border-avanta-green/30 bg-avanta-green/12">Подбор тарифа</Badge>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight text-avanta-navy sm:text-5xl">
              Мини-мастер: подберём лучший тариф за 3 шага
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-avanta-graphite sm:text-lg">
              Выберите тип жилья, количество устройств и сценарий использования. Сайт сам порекомендует
              оптимальный тариф и сразу даст ссылку на подключение.
            </p>
          </Reveal>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <Reveal>
            <Card className="rounded-[32px] border border-avanta-navy/10 bg-white/94 p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <SectionHeader
                  eyebrow="Шаги"
                  title={stepLabels[step]}
                  description="Выберите вариант и переходите к следующему шагу."
                />
                <p className="text-sm font-semibold text-avanta-navy/58">Шаг {step + 1} из 3</p>
              </div>

              <div className="mt-5 h-2 rounded-full bg-avanta-mist">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#3aaa35,#178b66)] transition-all duration-500"
                  style={{ width: `${((step + 1) / 3) * 100}%` }}
                />
              </div>

              {step === 0 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {dwellingOptions.map((option) => {
                    const active = dwelling === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setDwelling(option.value)}
                        className={cn(
                          "rounded-[22px] border p-4 text-left transition",
                          active
                            ? "border-avanta-green/28 bg-[linear-gradient(145deg,rgba(58,170,53,0.16),rgba(255,255,255,0.96))] shadow-[0_18px_34px_-22px_rgba(58,170,53,0.42)]"
                            : "border-avanta-navy/12 bg-white/90 hover:border-avanta-green/22 hover:bg-white",
                        )}
                      >
                        <p className="text-lg font-bold text-avanta-navy">{option.title}</p>
                        <p className="mt-2 text-sm leading-6 text-avanta-graphite">{option.description}</p>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {step === 1 ? (
                <div className="mt-6 grid gap-3">
                  {deviceOptions.map((option) => {
                    const active = devices === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setDevices(option.value)}
                        className={cn(
                          "rounded-[20px] border px-4 py-3.5 text-left transition",
                          active
                            ? "border-avanta-green/28 bg-[linear-gradient(145deg,rgba(58,170,53,0.16),rgba(255,255,255,0.96))] shadow-[0_18px_34px_-22px_rgba(58,170,53,0.42)]"
                            : "border-avanta-navy/12 bg-white/90 hover:border-avanta-green/22 hover:bg-white",
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-base font-bold text-avanta-navy">{option.title}</p>
                            <p className="mt-1 text-sm leading-6 text-avanta-graphite">{option.description}</p>
                          </div>
                          <span className="rounded-full border border-avanta-navy/12 bg-avanta-mist px-3 py-1 text-xs font-semibold text-avanta-navy/64">
                            ~{option.speedHint} Мбит/с
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {step === 2 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {usageOptions.map((option) => {
                    const active = usages.includes(option.value);
                    const Icon = option.icon;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setUsages((prev) =>
                            prev.includes(option.value)
                              ? prev.filter((item) => item !== option.value)
                              : [...prev, option.value],
                          )
                        }
                        className={cn(
                          "rounded-[20px] border p-4 text-left transition",
                          active
                            ? "border-avanta-green/30 bg-[linear-gradient(145deg,rgba(58,170,53,0.18),rgba(255,255,255,0.96))] shadow-[0_18px_34px_-24px_rgba(58,170,53,0.42)]"
                            : "border-avanta-navy/12 bg-white/90 hover:border-avanta-green/22 hover:bg-white",
                        )}
                      >
                        <Icon className="h-5 w-5 text-avanta-emerald" />
                        <p className="mt-3 text-base font-bold text-avanta-navy">{option.label}</p>
                        <p className="mt-1 text-sm leading-6 text-avanta-graphite">{option.description}</p>
                        {active ? (
                          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-avanta-emerald">
                            <Check className="h-3.5 w-3.5" />
                            Учтено в подборе
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 border-avanta-navy/16 bg-white/92"
                  disabled={step === 0}
                  onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Назад
                </Button>
                <Button
                  type="button"
                  className="h-11 bg-[linear-gradient(135deg,#3aaa35,#178b66)]"
                  disabled={!canGoNext}
                  onClick={handlePrimaryAction}
                >
                  {step < 2 ? (
                    <>
                      Далее
                      <ChevronRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Рассчитать тариф
                      <Sparkles className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.06}>
            <div ref={resultRef}>
              <Card className="rounded-[32px] border border-avanta-green/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(237,247,242,0.94))] p-6 sm:p-7">
              <h2 className="text-2xl font-bold text-avanta-navy">Рекомендация</h2>
              {!isComplete ? (
                <p className="mt-3 text-sm leading-7 text-avanta-graphite">
                  Пройдите все 3 шага мастера слева, и здесь появится точная рекомендация по тарифу.
                </p>
              ) : !showRecommendation ? (
                <p className="mt-3 text-sm leading-7 text-avanta-graphite">
                  Данные заполнены. Нажмите «Рассчитать тариф», чтобы получить итоговую рекомендацию.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  <div className="rounded-[22px] border border-avanta-green/20 bg-white/88 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-avanta-navy/48">
                      Целевая скорость
                    </p>
                    <p className="mt-1 text-2xl font-bold text-avanta-navy">
                      около {recommendation.targetSpeed} Мбит/с
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-avanta-green/25 bg-[linear-gradient(135deg,rgba(58,170,53,0.16),rgba(255,255,255,0.97))] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-avanta-navy/48">
                      Лучший тариф
                    </p>
                    <p className="mt-2 text-2xl font-bold text-avanta-navy">{recommendation.selected.name}</p>
                    <div className="mt-2 flex items-center gap-3 text-sm font-semibold">
                      <span className="rounded-full bg-white px-3 py-1 text-avanta-navy">
                        {recommendation.selected.speed}
                      </span>
                      <span className="text-avanta-emerald">{recommendation.selected.price}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {recommendation.reasons.map((reason) => (
                      <div
                        key={reason}
                        className="rounded-[14px] border border-avanta-navy/10 bg-white/88 px-3 py-2.5 text-sm leading-6 text-avanta-graphite"
                      >
                        {reason}
                      </div>
                    ))}
                  </div>

                  {recommendation.alternatives.length ? (
                    <div className="rounded-[20px] border border-avanta-navy/10 bg-white/86 p-3.5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-avanta-navy/48">
                        Альтернативы
                      </p>
                      <div className="mt-2.5 grid gap-2">
                        {recommendation.alternatives.map((tariff) => (
                          <div
                            key={tariff.id}
                            className="flex items-center justify-between rounded-[14px] border border-white/70 bg-white px-3 py-2"
                          >
                            <span className="text-sm font-semibold text-avanta-navy">{tariff.name}</span>
                            <span className="text-sm font-bold text-avanta-emerald">{tariff.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-3">
                    <Button asChild className="h-11 bg-[linear-gradient(135deg,#3aaa35,#178b66)] px-6 text-[0.98rem]">
                      <Link
                        to={to(
                          `/?action=connect&tariff=${encodeURIComponent(recommendation.selected.name)}#application`,
                        )}
                      >
                        Подключить этот тариф
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-11 border-avanta-navy/14 bg-white/90 px-5">
                      <Link to={to("/internet#tariffs")}>
                        <House className="h-4 w-4" />
                        Сравнить все тарифы
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
              </Card>
            </div>
          </Reveal>
        </section>
      </div>
    </motion.div>
  );
}
