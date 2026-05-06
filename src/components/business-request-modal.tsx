import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, LoaderCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormStatus = "idle" | "loading" | "success" | "error";

export type BusinessLeadPreset = {
  service?: string;
  plan?: string;
};

type BusinessLeadFormState = {
  company: string;
  contact: string;
  phone: string;
  address: string;
  service: string;
  plan: string;
  comment: string;
};

type BusinessRequestModalProps = {
  open: boolean;
  onOpenChange: (nextOpen: boolean) => void;
  preset?: BusinessLeadPreset;
};

const serviceOptions = [
  "Интернет для бизнеса",
  "Видеонаблюдение",
  "Умные сервисы",
  "Оборудование",
  "Сервисные услуги",
  "Инфраструктура",
] as const;

const initialState: BusinessLeadFormState = {
  company: "",
  contact: "",
  phone: "",
  address: "",
  service: "",
  plan: "",
  comment: "",
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

export function BusinessRequestModal({ open, onOpenChange, preset }: BusinessRequestModalProps) {
  const [form, setForm] = useState<BusinessLeadFormState>(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    if (!open) {
      return;
    }

    setStatus("idle");
    setForm((prev) => ({
      ...initialState,
      company: prev.company,
      contact: prev.contact,
      phone: prev.phone,
      address: prev.address,
      comment: prev.comment,
      service: preset?.service ?? "",
      plan: preset?.plan ?? "",
    }));
  }, [open, preset?.plan, preset?.service]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    window.setTimeout(() => {
      const hasError = form.phone.replace(/\D/g, "").length < 11;
      if (hasError) {
        setStatus("error");
        return;
      }

      setStatus("success");
    }, 700);
  };

  const closeModal = () => onOpenChange(false);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-avanta-pine/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />

          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-[760px] rounded-[30px] border border-white/40 bg-white p-5 shadow-[0_42px_100px_-55px_rgba(11,31,54,0.74)] sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-avanta-navy/10 text-avanta-navy transition hover:bg-avanta-mist"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>

              {status === "success" ? (
                <div className="px-2 py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-avanta-green/12 text-avanta-emerald">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-avanta-emerald">
                    Заявка для бизнеса отправлена
                  </p>
                  <h3 className="mt-3 text-3xl font-bold text-avanta-navy">Спасибо! Мы свяжемся с вами</h3>
                  <p className="mx-auto mt-4 max-w-[520px] text-sm leading-7 text-avanta-graphite">
                    Проверим условия подключения по вашему объекту и подготовим предложение по услугам.
                  </p>
                  <div className="mt-7 flex justify-center">
                    <Button onClick={closeModal}>Закрыть</Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-avanta-emerald">Для бизнеса</p>
                  <h3 className="mt-2 text-3xl font-bold text-avanta-navy">Оставить заявку</h3>
                  <p className="mt-3 max-w-[620px] text-sm leading-7 text-avanta-graphite">
                    Заполните форму, и менеджер свяжется с вами для расчета подключения и запуска услуг на объекте.
                  </p>

                  <form className="mt-6 grid gap-3.5" onSubmit={handleSubmit}>
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <Input
                        placeholder="Название компании"
                        value={form.company}
                        maxLength={90}
                        onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                        required
                      />
                      <Input
                        placeholder="Контактное лицо"
                        value={form.contact}
                        maxLength={70}
                        onChange={(event) => setForm((prev) => ({ ...prev, contact: event.target.value }))}
                        required
                      />
                    </div>

                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <Input
                        placeholder="+7 (___) ___-__-__"
                        value={form.phone}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            phone: formatPhone(event.target.value),
                          }))
                        }
                        required
                      />
                      <Select
                        value={form.service}
                        onChange={(event) => setForm((prev) => ({ ...prev, service: event.target.value }))}
                        required
                      >
                        <option value="" disabled>
                          Выберите услугу
                        </option>
                        {serviceOptions.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <Input
                      placeholder="Адрес объекта"
                      value={form.address}
                      maxLength={140}
                      onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                      required
                    />

                    <Input
                      placeholder="Тариф / позиция (если выбрано)"
                      value={form.plan}
                      maxLength={120}
                      onChange={(event) => setForm((prev) => ({ ...prev, plan: event.target.value }))}
                    />

                    <Textarea
                      placeholder="Комментарий: сроки запуска, количество точек, особенности объекта"
                      value={form.comment}
                      maxLength={280}
                      className="min-h-[110px]"
                      onChange={(event) => setForm((prev) => ({ ...prev, comment: event.target.value }))}
                    />

                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <Button type="submit" disabled={status === "loading"}>
                        {status === "loading" ? (
                          <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Отправляем
                          </>
                        ) : (
                          "Отправить заявку"
                        )}
                      </Button>
                      <Button type="button" variant="secondary" onClick={closeModal}>
                        Отмена
                      </Button>
                      {status === "error" ? (
                        <span className="text-sm text-red-500">Проверьте номер телефона. Должно быть 11 цифр.</span>
                      ) : null}
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
