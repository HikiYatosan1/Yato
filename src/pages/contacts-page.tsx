import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Clock3, Map, MessageSquareText } from "lucide-react";
import { contactMethods } from "@/data/contact";
import { CTASection } from "@/components/cta-section";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteMode } from "@/lib/site-mode";

export function ContactsPage() {
  const { to } = useSiteMode();

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container pt-10 space-y-16">
        <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <div className="cut-corner rounded-[38px] border border-white/70 bg-white/90 px-6 py-10 shadow-panel sm:px-8">
              <SectionHeader
                eyebrow="Контакты и подключение"
                title="Форма заявки, способы связи и карта-заглушка в одном живом маршруте"
                description="Страница собрана как финальная точка большинства CTA: здесь можно увидеть реалистичное поведение формы и общую структуру страницы подключения."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to={to("/contacts?action=connect#application")}>
                    Оставить заявку
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to="#map">Смотреть карту</Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactMethods.map((item) => {
                const Icon = item.icon;
                const content = (
                  <Card className="h-full p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-avanta-gradient text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-avanta-navy">{item.title}</h3>
                    <p className="mt-2 text-base font-semibold text-avanta-emerald">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-avanta-graphite">{item.description}</p>
                  </Card>
                );

                return item.href.startsWith("/") ? (
                  <Link key={item.title} to={to(item.href)}>
                    {content}
                  </Link>
                ) : (
                  <a key={item.title} href={item.href}>
                    {content}
                  </a>
                );
              })}
            </div>
          </Reveal>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.05}>
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-6 w-6 text-avanta-green" />
                  <h3 className="text-xl font-bold text-avanta-navy">Режим работы</h3>
                </div>
                <div className="mt-5 space-y-3 text-sm leading-6 text-avanta-graphite">
                  <p>Пн-Пт: 09:00-21:00</p>
                  <p>Сб: 10:00-18:00</p>
                  <p>Поддержка: 24/7</p>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <MessageSquareText className="h-6 w-6 text-avanta-green" />
                  <h3 className="text-xl font-bold text-avanta-navy">Способы связи</h3>
                </div>
                <div className="mt-5 grid gap-3 text-sm leading-6 text-avanta-graphite">
                  <p>Телефон и обратный звонок</p>
                  <p>E-mail для заявок и B2B-запросов</p>
                  <p>Онлайн-чат и виджет поддержки в следующей итерации</p>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.15}>
              <Card className="p-0" id="map">
                <div className="triangle-grid cut-corner flex min-h-[300px] flex-col justify-between p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-panel">
                      <Map className="h-6 w-6 text-avanta-emerald" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-avanta-navy">Карта-заглушка</h3>
                      <p className="text-sm text-avanta-graphite">
                        Блок для будущей карты или адресного виджета.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-[28px] border border-dashed border-avanta-navy/15 bg-white/70 p-5 text-sm leading-7 text-avanta-graphite">
                    Здесь в боевой версии можно показать карту офиса, точки подключения или сервис
                    проверки адреса. В демо блок уже работает как часть визуальной структуры страницы.
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        <CTASection
          title="Финальный шаг к подключению уже выглядит правдоподобно"
          description="Форма, контакты и карта-заглушка собирают завершённый demo-сценарий, который можно показывать как основу будущего frontend-направления."
        />
      </div>
    </motion.div>
  );
}

