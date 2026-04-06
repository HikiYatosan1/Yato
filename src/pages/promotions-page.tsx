import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, BadgePercent } from "lucide-react";
import { promotions } from "@/data/promotions";
import { CTASection } from "@/components/cta-section";
import { PromoCard } from "@/components/promo-card";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { useSiteMode } from "@/lib/site-mode";

export function PromotionsPage() {
  const { to } = useSiteMode();

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container pt-10 space-y-16">
        <section className="cut-corner relative overflow-hidden rounded-[38px] border border-white/70 bg-white/90 px-6 py-10 shadow-panel sm:px-10">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rotate-45 bg-gradient-to-br from-avanta-green/20 to-avanta-navy/20" />
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                eyebrow="Акции"
                title="Карточки акций со статусом и понятным CTA"
                description="Эта страница показывает, как специальные предложения могут поддерживать продажи и при этом не ломать общий премиальный характер бренда."
              />
              <Button asChild size="lg">
                <Link to={to("/contacts?action=connect#application")}>
                  Выбрать акцию
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {promotions.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <PromoCard item={item} />
            </Reveal>
          ))}
        </section>

        <Reveal>
          <section className="cut-corner rounded-[34px] border border-avanta-navy/10 bg-avanta-mist px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-avanta-emerald shadow-panel">
                  <BadgePercent className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold text-avanta-navy">
                  Актуальные акции не выглядят как баннерный шум
                </h2>
                <p className="mt-4 text-sm leading-7 text-avanta-graphite">
                  Здесь видно, как можно сохранить деловой и современный стиль даже в промо-разделе:
                  статус, выгода и следующее действие считываются быстро и без визуального шума.
                </p>
              </div>
              <Button asChild variant="secondary" size="lg">
                <Link to={to("/tariffs")}>Сравнить с тарифами</Link>
              </Button>
            </div>
          </section>
        </Reveal>

        <CTASection
          title="Показать акции в действии и довести пользователя до заявки"
          description="Страница демонстрирует не только визуальную подачу, но и то, как промо логично встраивается в маршрут подключения."
          primaryLabel="Подключить по акции"
        />
      </div>
    </motion.div>
  );
}

