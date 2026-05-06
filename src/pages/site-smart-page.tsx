import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { siteSmartLandings } from "@/data/site-content";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteMode } from "@/lib/site-mode";

export function SiteSmartPage() {
  const { to } = useSiteMode();

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-20 pt-10">
        <section className="relative overflow-hidden rounded-[38px] border border-avanta-green/12 bg-[linear-gradient(135deg,#f8fcfa_0%,#eef6f2_52%,#e7f0ec_100%)] px-6 py-8 shadow-float sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(58,170,53,0.11),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(24,58,99,0.1),transparent_42%)]" />
          <Reveal>
            <div className="relative z-10 max-w-5xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-avanta-emerald">Аванта Смарт</p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight text-avanta-navy sm:text-5xl">
                Смарт-сервисы для дома и жилых комплексов
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-avanta-graphite sm:text-lg">
                Умный домофон и шлагбаум для домов, жилых комплексов и закрытых территорий. Выберите
                нужный сервис и перейдите на профильную страницу.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="group bg-white text-avanta-navy hover:bg-white/92 hover:text-avanta-navy">
                  <Link to={to("/?action=connect#application")}>
                    Оставить заявку
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Лендинги"
              title="Два отдельных входа в Аванта Смарт"
              description="Если нужен контроль доступа, выберите нужный сервис и переходите на отдельный лендинг."
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
