import { motion } from "motion/react";
import { Clock3, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { siteContactMethods } from "@/data/site-content";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteMode } from "@/lib/site-mode";

export function SiteContactsPage() {
  const { to } = useSiteMode();

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-14 pt-10">
        <section className="relative overflow-hidden rounded-[38px] border border-avanta-green/12 bg-[linear-gradient(135deg,#f8fcfa_0%,#eef6f2_52%,#e7f0ec_100%)] px-6 py-8 shadow-float sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(58,170,53,0.11),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(24,58,99,0.1),transparent_42%)]" />
          <Reveal>
            <div className="relative z-10 max-w-5xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-avanta-emerald">Контакты</p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight text-avanta-navy sm:text-5xl">
                Свяжитесь с Аванта Телеком удобным способом
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-avanta-graphite sm:text-lg">
                На этой странице собраны телефоны, почта, офис и режим работы. Заявка на подключение и проверка адреса находятся на главной странице.
              </p>
            </div>
          </Reveal>
        </section>

        <section>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {siteContactMethods.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <a href={item.href} className="block h-full">
                    <Card className="flex h-full flex-col p-5 sm:p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-avanta-gradient text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="mt-5 flex min-h-[138px] flex-1 flex-col">
                        <h3 className="text-lg font-bold text-avanta-navy">{item.title}</h3>
                        <p className="mt-2 text-[1.05rem] font-semibold leading-8 text-avanta-emerald break-words">
                          {item.value}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-avanta-graphite">{item.description}</p>
                      </div>
                    </Card>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Clock3 className="h-6 w-6 text-avanta-green" />
                <h3 className="text-xl font-bold text-avanta-navy">Режим работы</h3>
              </div>
              <div className="mt-5 space-y-3 text-sm leading-6 text-avanta-graphite" id="hours">
                <p>Пн-Пт: 08:00-20:00</p>
                <p>Сб-Вс: приём заявок через сайт</p>
                <p>Консультации по телефону и обработка обращений — в рабочее время</p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link to={to("/?action=connect#application")}>Оставить заявку</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link to={to("/?action=check-address#application")}>Проверить адрес</Link>
                </Button>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="p-0" id="map">
              <div className="triangle-grid cut-corner flex min-h-[320px] flex-col justify-between p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-panel">
                    <Map className="h-6 w-6 text-avanta-emerald" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-avanta-navy">Офис и зона обслуживания</h3>
                    <p className="text-sm text-avanta-graphite">
                      г. Краснодар, ул. Пригородная, 177, офис 406
                    </p>
                  </div>
                </div>

                <div className="rounded-[28px] border border-dashed border-avanta-navy/15 bg-white/80 p-5 text-sm leading-7 text-avanta-graphite">
                  Здесь можно разместить карту офиса или карту зоны подключения по городу.
                </div>
              </div>
            </Card>
          </Reveal>
        </section>
      </div>
    </motion.div>
  );
}
