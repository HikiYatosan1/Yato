import { motion } from "motion/react";
import { ArrowRight, Check, Tv } from "lucide-react";
import { Link } from "react-router-dom";
import { siteTariffs, siteTvBenefits, siteTvPackages, siteTvPlatforms } from "@/data/site-content";
import { CTASection } from "@/components/cta-section";
import { FeatureCard } from "@/components/feature-card";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { TariffCard } from "@/components/tariff-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteMode } from "@/lib/site-mode";
import { cn } from "@/lib/utils";

const comboTariffs = siteTariffs.filter((item) => item.category === "bundle").slice(0, 4);

export function SiteTvPage() {
  const { to } = useSiteMode();

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-20 pt-10">
        <section className="cut-corner relative overflow-hidden rounded-[38px] bg-avanta-gradient px-6 py-10 text-white shadow-float sm:px-10">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rotate-45 bg-white/10" />
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Телевидение</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl">
              Цифровое ТВ, Смотрёшка и пакеты интернет + ТВ
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/80">
              Подключайте телевидение на Smart TV, смартфонах и ноутбуках, выбирайте пакет каналов и подключайте
              интернет + ТВ одной заявкой.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-avanta-navy hover:bg-white/92 hover:text-avanta-navy">
                <Link to={to("/?action=tv#application")}>
                  Подключить ТВ
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/16 hover:text-white"
              >
                <Link to={to("/internet?tab=bundle#tariffs")}>Пакеты интернет + ТВ</Link>
              </Button>
            </div>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Преимущества"
              title="Удобное телевидение без лишней настройки"
              description="Архив передач, пауза эфира, Смотрёшка и просмотр на разных устройствах собраны в одном понятном разделе."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {siteTvBenefits.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <FeatureCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="ТВ-пакеты"
              title="Пакеты каналов и дополнительного контента"
              description="Сравните стоимость, состав и формат просмотра, чтобы сразу выбрать подходящий пакет телевидения."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {siteTvPackages.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <Card
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden border-avanta-green/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(247,252,249,0.98)_48%,rgba(225,245,234,0.98)_100%)] p-5",
                    item.popular && "border-avanta-green/30 shadow-float",
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(22,127,74,0.08),transparent_34%)]" />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10 text-avanta-emerald">
                      <Tv className="h-6 w-6" />
                    </div>
                    {item.badge ? <Badge>{item.badge}</Badge> : null}
                  </div>

                  <h3 className="relative z-10 mt-5 text-2xl font-bold leading-tight text-avanta-navy">{item.title}</h3>

                  <div className="relative z-10 mt-4">
                    <p className="text-[1.1rem] font-bold text-avanta-emerald">{item.price}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-avanta-graphite">
                      <span>{item.speed}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-avanta-green/55" />
                      <span>{item.channels}</span>
                    </div>
                  </div>

                  <p className="relative z-10 mt-4 min-h-[72px] text-sm leading-6 text-avanta-graphite">{item.description}</p>

                  <div className="relative z-10 mt-auto pt-6">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-avanta-navy/12 bg-[linear-gradient(180deg,rgba(241,246,244,0.96),rgba(233,241,237,0.94))] shadow-[0_14px_28px_-24px_rgba(24,58,99,0.22)] hover:border-avanta-green/30 hover:bg-[linear-gradient(135deg,rgba(58,170,53,0.22),rgba(255,255,255,0.98))] hover:text-avanta-emerald hover:shadow-[0_18px_34px_-24px_rgba(58,170,53,0.34)] active:border-avanta-green/40 active:bg-[linear-gradient(135deg,rgba(58,170,53,0.28),rgba(255,255,255,0.98))] active:text-avanta-emerald"
                    >
                      <Link to={to(`/?action=tv&tariff=${encodeURIComponent(item.title)}#application`)}>
                        Подключить
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Комбо-пакеты"
              title="Популярные предложения интернет + ТВ"
              description="Пакеты с телевидением вынесены рядом, чтобы сразу сравнить домашний интернет и готовые комплекты со Смотрёшкой."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {comboTariffs.map((tariff, index) => (
              <Reveal key={tariff.id} delay={index * 0.06}>
                <TariffCard tariff={tariff} />
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Где смотреть"
              title="Смотрите телевидение там, где вам удобно"
              description="Телевидение доступно на большом экране, в браузере и в мобильном приложении."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {siteTvPlatforms.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <Card className="h-full p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10">
                      <Icon className="h-7 w-7 text-avanta-emerald" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-avanta-navy">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-avanta-graphite">{item.description}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="rounded-[36px] border border-avanta-navy/10 bg-white/85 p-6 shadow-panel sm:p-8">
          <Reveal>
            <SectionHeader
              eyebrow="Что важно"
              title="На что смотрят перед подключением телевидения"
              description="Собрали основные пункты, которые помогают быстрее понять формат ТВ-сервиса и его возможности."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Архив передач и пауза эфира",
              "Просмотр на нескольких устройствах",
              "Пакеты с интернетом в одном договоре",
              "Подключение через заявку на главной странице",
            ].map((feature, index) => (
              <Reveal key={feature} delay={index * 0.05}>
                <div className="rounded-[26px] border border-avanta-navy/10 bg-avanta-mist p-5 text-sm font-semibold text-avanta-navy">
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-avanta-green" />
                    <span>{feature}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <CTASection
          eyebrow="Подключение ТВ"
          title="Оставьте заявку на телевидение или пакет интернет + ТВ"
          description="Если уже выбрали пакет, можно сразу перейти к форме. Если сначала хотите сравнить все варианты, используйте раздел с тарифами выше."
          primaryHref="/?action=tv#application"
          primaryLabel="Подключить ТВ"
          secondaryHref="/internet?tab=bundle#tariffs"
          secondaryLabel="Посмотреть пакеты"
        />
      </div>
    </motion.div>
  );
}

