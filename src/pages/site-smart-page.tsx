import { motion } from "motion/react";
import { ArrowUpRight, Smartphone } from "lucide-react";
import { siteSmartLandings } from "@/data/site-content";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SiteSmartPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-20 pt-10">
        <section className="cut-corner relative overflow-hidden rounded-[38px] bg-avanta-gradient px-6 py-10 text-white shadow-float sm:px-10">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rotate-45 bg-white/10" />
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Аванта Смарт</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl">
              Смарт-сервисы для дома и жилых комплексов
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/80">
              Умный домофон и шлагбаум для домов, жилых комплексов и закрытых территорий. Выберите
              нужный сервис и перейдите на профильную страницу.
            </p>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Лендинги"
              title="Два отдельных входа в Аванта Смарт"
              description="Если нужен контроль доступа, выбирайте нужный сервис и переходите на отдельный лендинг."
            />
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {siteSmartLandings.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <Card className="h-full p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10">
                      <Smartphone className="h-7 w-7 text-avanta-emerald" />
                    </div>
                    <Badge>{item.badge}</Badge>
                  </div>

                  <h2 className="mt-5 font-display text-3xl font-bold text-avanta-navy">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-avanta-graphite">{item.description}</p>

                  <ul className="mt-6 space-y-3 text-sm text-avanta-navy">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-avanta-green" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="mt-8 w-full justify-between">
                    <a href={item.href} target="_blank" rel="noreferrer">
                      Перейти на лендинг
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <CTASection
          eyebrow="Подключение"
          title="Нужна консультация по смарт-сервисам?"
          description="Если хотите обсудить домофон, шлагбаум или подключение комплекса, оставьте заявку на главной странице."
          primaryHref="/?action=connect#application"
          primaryLabel="Оставить заявку"
          secondaryHref="/contacts"
          secondaryLabel="Контакты"
        />
      </div>
    </motion.div>
  );
}

