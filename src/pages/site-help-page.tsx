import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  CircleHelp,
  CreditCard,
  Gauge,
  LifeBuoy,
  LogIn,
  MonitorPlay,
  PlugZap,
  WalletCards,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CTASection } from "@/components/cta-section";
import { FAQAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteHelpSections } from "@/data/site-help-content";
import { useSiteMode } from "@/lib/site-mode";

const sectionDescriptions: Record<string, string> = {
  obshchie: "Базовые вопросы по договору, офисам и условиям обслуживания.",
  podklyuchenie: "Подключение, монтаж, оборудование и требования к роутеру.",
  kabinet: "Вход в личный кабинет, восстановление доступа и доступные функции.",
  balans: "Оплата, блокировки, списания и работа с балансом.",
  tv: "Подключение телевидения и настройка сервиса Смотрёшка.",
  speed: "Проверка скорости интернет-соединения.",
  tech: "Техническая диагностика и пошаговые инструкции по настройке.",
};

const sectionIcons: Record<string, LucideIcon> = {
  obshchie: CircleHelp,
  podklyuchenie: PlugZap,
  kabinet: LogIn,
  balans: WalletCards,
  tv: MonitorPlay,
  speed: Wifi,
  tech: Gauge,
};

export function SiteHelpPage() {
  const { to } = useSiteMode();
  const [activeSlug, setActiveSlug] = useState(siteHelpSections[0]?.slug ?? "");
  const activeSection = siteHelpSections.find((section) => section.slug === activeSlug) ?? siteHelpSections[0];
  const ActiveIcon = activeSection ? sectionIcons[activeSection.slug] ?? CircleHelp : CircleHelp;
  const activeSectionRef = useRef<HTMLElement | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    activeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeSlug]);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-14 pt-10">
        <section className="cut-corner relative overflow-hidden rounded-[38px] bg-avanta-gradient px-6 py-10 text-white shadow-float sm:px-10 sm:py-12">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rotate-45 bg-white/10" />
          <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-16 translate-y-16 rounded-full bg-white/8 blur-2xl" />
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/72">Помощь абоненту</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl">
              Центр помощи абоненту Аванта Телеком
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/82">
              Здесь собраны ответы на самые частые вопросы: подключение, личный кабинет, оплата и баланс, телевидение,
              проверка скорости и техническая поддержка. Выберите раздел слева и быстро найдите нужную информацию.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="bg-white text-avanta-navy hover:bg-white/92">
                <a href="https://lc.avanta-telecom.ru/cabinet/login" target="_blank" rel="noreferrer">
                  <LogIn className="h-4 w-4" />
                  Личный кабинет
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border-transparent bg-white/10 text-white hover:border-transparent hover:bg-white/16 hover:text-white"
              >
                <Link to={to("/payment")}>
                  <CreditCard className="h-4 w-4" />
                  Оплата и баланс
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border-transparent bg-white/10 text-white hover:border-transparent hover:bg-white/16 hover:text-white"
              >
                <Link to={to("/contacts")}>
                  <LifeBuoy className="h-4 w-4" />
                  Техподдержка
                </Link>
              </Button>
            </div>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Разделы помощи"
              title="FAQ по категориям"
            />
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <Card className="p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-avanta-graphite/70">
                  Меню разделов
                </p>
                <nav className="mt-4 space-y-2">
                  {siteHelpSections.map((section) => {
                    const Icon = sectionIcons[section.slug] ?? CircleHelp;
                    const isActive = activeSlug === section.slug;

                    return (
                      <button
                        type="button"
                        key={section.slug}
                        onClick={() => setActiveSlug(section.slug)}
                        className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition ${
                          isActive
                            ? "border border-avanta-green/40 bg-avanta-green/[0.12]"
                            : "border border-avanta-navy/10 bg-avanta-navy/[0.02] hover:border-avanta-green/35 hover:bg-avanta-green/[0.06]"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-avanta-emerald transition ${
                            isActive ? "bg-avanta-green/22" : "bg-avanta-green/12 group-hover:bg-avanta-green/18"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-avanta-navy">{section.title}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            isActive ? "bg-avanta-green/22 text-avanta-emerald" : "bg-avanta-navy/8 text-avanta-navy/70"
                          }`}
                        >
                          {section.items.length}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </Card>
            </aside>

            <div className="space-y-5">
              {activeSection ? (
                <section id={`help-${activeSection.slug}`} ref={activeSectionRef} className="scroll-mt-32">
                  <Reveal key={activeSection.slug}>
                    <Card className="p-6 sm:p-7">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-avanta-green/18 to-avanta-navy/10 text-avanta-emerald">
                          <ActiveIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-avanta-graphite/65">
                            {activeSection.items.length} вопросов
                          </p>
                          <h2 className="mt-1 text-2xl font-bold text-avanta-navy">{activeSection.title}</h2>
                          <p className="mt-2 max-w-2xl text-sm leading-7 text-avanta-graphite">
                            {sectionDescriptions[activeSection.slug] ?? "Полный список вопросов и ответов по разделу."}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <FAQAccordion items={activeSection.items} preserveLineBreaks />
                      </div>
                    </Card>
                  </Reveal>
                </section>
              ) : null}
            </div>
          </div>
        </section>

        <CTASection
          eyebrow="Нужна консультация"
          title="Не нашли ответ в базе знаний?"
          description="Оставьте заявку, и специалисты Аванта Телеком помогут по подключению, оплате, личному кабинету и техническим вопросам."
          primaryLabel="Связаться с поддержкой"
          primaryHref="/contacts"
          secondaryLabel="Проверить адрес"
          secondaryHref="/?action=check-address#application"
        />
      </div>
    </motion.div>
  );
}
