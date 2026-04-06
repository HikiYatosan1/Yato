import { motion } from "motion/react";
import { sitePromotions } from "@/data/site-promo-content";
import { CTASection } from "@/components/cta-section";
import { PromoCard } from "@/components/promo-card";
import { Reveal } from "@/components/reveal";

export function SitePromotionsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-20 pt-10">
        <section className="cut-corner relative overflow-hidden rounded-[38px] bg-[linear-gradient(135deg,#3AAA35_0%,#167F4A_34%,#183A63_100%)] px-6 py-10 text-white shadow-float sm:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_42%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.06))]" />
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rotate-45 bg-white/10" />

          <Reveal>
            <p className="relative text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Акции</p>
            <h1 className="relative mt-4 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Актуальные предложения и полезные сервисы для абонентов
            </h1>
            <p className="relative mt-5 max-w-3xl text-base leading-7 text-white/80">
              Здесь собраны действующие акции и сервисные предложения, которые помогают быстрее оформить
              подключение и удобнее пользоваться услугами.
            </p>
          </Reveal>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {sitePromotions.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <PromoCard item={item} />
            </Reveal>
          ))}
        </section>

        <CTASection
          eyebrow="Подключение"
          title="Оставьте заявку и уточните, какие акции доступны сейчас"
          description="Если вы планируете подключение интернета, пакета интернет + ТВ или дополнительных услуг, начните с формы заявки и проверки адреса."
        />
      </div>
    </motion.div>
  );
}

