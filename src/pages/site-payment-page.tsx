import { useMemo, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSiteMode } from "@/lib/site-mode";

const MIN_PAYMENT = 300;
const PAYMENT_REDIRECT_BASE = "https://my.avanta-telecom.ru?target=pay";
const CABINET_URL = "https://lc.avanta-telecom.ru/cabinet/login";

const paymentContacts = [
  { label: "Контактный центр", value: "+7 (861) 290-09-99", href: "tel:+78612900999" },
  { label: "Дополнительный номер", value: "+7 (928) 210-09-99", href: "tel:+79282100999" },
  { label: "E-mail", value: "info@avanta-telecom.ru", href: "mailto:info@avanta-telecom.ru" },
  { label: "Поддержка", value: "support@avanta-telecom.ru", href: "mailto:support@avanta-telecom.ru" },
];

function normalizeContract(contract: string) {
  return contract.replace(/[^A-Za-z0-9]/g, "");
}

function normalizeAmount(amount: string) {
  return amount.replace(/\D/g, "");
}

export function SitePaymentPage() {
  const [contractNumber, setContractNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { to } = useSiteMode();

  const normalizedContract = useMemo(() => normalizeContract(contractNumber), [contractNumber]);
  const normalizedAmount = useMemo(() => normalizeAmount(amount), [amount]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!normalizedContract) {
      setError("Введите номер договора.");
      return;
    }

    const paymentValue = Number(normalizedAmount);
    if (!paymentValue) {
      setError("Введите сумму платежа.");
      return;
    }

    if (paymentValue < MIN_PAYMENT) {
      setError(`Минимальная сумма платежа — ${MIN_PAYMENT} ₽.`);
      return;
    }

    setError(null);

    const paymentUrl = `${PAYMENT_REDIRECT_BASE}&bill=${encodeURIComponent(normalizedContract)}&price=${paymentValue}`;
    window.open(paymentUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-14 pt-10">
        <section>
          <Reveal>
            <Card className="rounded-[34px] border border-avanta-green/14 bg-[linear-gradient(140deg,#f8fcfb_0%,#eef6f2_52%,#e6f0eb_100%)] p-6 shadow-float sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-avanta-emerald">Оплата услуг</p>
                  <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-avanta-navy sm:text-5xl">
                    Оплата интернета и услуг Аванта Телеком
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-avanta-graphite">
                    Оплачивайте услуги онлайн по номеру договора. Форма ниже повторяет логику официальной
                    страницы оплаты и открывает защищенный платежный сценарий в новой вкладке.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <Input
                          type="text"
                          value={contractNumber}
                          onChange={(event) => setContractNumber(event.target.value)}
                          placeholder="Номер договора"
                          inputMode="text"
                        />
                        <span className="mt-2 block text-xs text-avanta-graphite">
                          Номер договора без разделительных символов
                        </span>
                      </label>

                      <label className="block">
                        <Input
                          type="text"
                          value={amount}
                          onChange={(event) => setAmount(event.target.value)}
                          placeholder="Сумма"
                          inputMode="numeric"
                        />
                        <span className="mt-2 block text-xs text-avanta-graphite">
                          Минимальный платеж {MIN_PAYMENT} рублей
                        </span>
                      </label>
                    </div>

                    {error ? <p className="text-sm font-semibold text-[#b03a3a]">{error}</p> : null}

                    <div className="flex flex-wrap gap-3">
                      <Button type="submit" size="lg" className="px-7">
                        Пополнить
                      </Button>
                    </div>
                  </form>
                </div>

                <Card className="rounded-[28px] border border-avanta-navy/10 bg-white/85 p-5 sm:p-6">
                  <h2 className="text-2xl font-bold text-avanta-navy">Быстрые ссылки</h2>
                  <div className="mt-5 grid gap-3">
                    <a
                      href={CABINET_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-avanta-navy/10 bg-avanta-mist/60 px-4 py-3 transition hover:border-avanta-green/32 hover:bg-white"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-avanta-graphite/70">
                        Личный кабинет
                      </p>
                      <p className="mt-1 text-base font-semibold text-avanta-navy">Вход для абонентов</p>
                    </a>

                    <Link
                      to={to("/contacts")}
                      className="rounded-2xl border border-avanta-navy/10 bg-avanta-mist/60 px-4 py-3 transition hover:border-avanta-green/32 hover:bg-white"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-avanta-graphite/70">
                        Поддержка
                      </p>
                      <p className="mt-1 text-base font-semibold text-avanta-navy">Контакты и график работы</p>
                    </Link>
                  </div>
                </Card>
              </div>
            </Card>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <Card className="rounded-[30px] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-avanta-green/16 to-avanta-navy/10 text-avanta-navy">
                  <Phone className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-bold text-avanta-navy">Контактный центр</h2>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {paymentContacts.map((item) => (
                  <a
                    key={item.value}
                    href={item.href}
                    className="rounded-2xl border border-avanta-navy/10 bg-avanta-mist/55 px-4 py-3.5 transition hover:border-avanta-green/30 hover:bg-white"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-avanta-graphite/70">
                      {item.label}
                    </p>
                    <p className="mt-1 text-base font-semibold text-avanta-navy">{item.value}</p>
                  </a>
                ))}
              </div>
            </Card>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div className="rounded-[30px] bg-[#eceff3] px-6 py-8 sm:px-8 sm:py-10">
              <div className="grid items-center gap-8 xl:grid-cols-[1fr_1fr]">
                <div>
                  <h2 className="max-w-2xl text-[2.65rem] font-bold leading-[1.02] tracking-[-0.02em] text-black">
                    Оплата услуг любым доступным способом
                  </h2>

                  <div className="mt-7 space-y-4 text-[1.12rem] leading-9 text-[#0f2940]">
                    <p>
                      Интернет от Аванта Телеком - это стабильность, качество и современные технологии для каждого
                      абонента. Выбирайте тариф на свой вкус и наслаждайтесь стабильным интернетом.
                    </p>
                    <p>
                      Наша компания предоставляет возможность подключения к широкополосному доступу в сети интернет
                      на высоких скоростях и с безлимитными тарифными планами. Мы занимаемся подключением к сети в
                      частных и многоквартирных домах в городе Краснодар и в Краснодарском крае.
                    </p>
                    <p className="font-bold text-[#0b2236]">С нами Вы - всегда на связи!</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[8px] bg-white">
                  <img
                    src="https://avanta-telecom.ru/upload/iblock/6d0/5anofjvgagfcu8n5lfx0yd9m3ky23mb4.jpg"
                    alt="Оплата услуг любым доступным способом"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </motion.div>
  );
}
