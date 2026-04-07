import { motion } from "motion/react";
import { ArrowRight, MapPinned, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
  siteInternetEquipmentItems,
  siteScenarioCards,
  siteTariffCategories,
  siteTariffLabels,
  siteTariffs,
} from "@/data/site-content";
import { CTASection } from "@/components/cta-section";
import { MediaCarousel } from "@/components/media-carousel";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { TariffTabs } from "@/components/tariff-tabs";
import { VideoCard } from "@/components/video-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteMode } from "@/lib/site-mode";

const internetDirections = siteScenarioCards.filter((item) => item.href.includes("/internet"));
export function SiteInternetPage() {
  const { to } = useSiteMode();

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-20 pt-10">
        <section className="cut-corner relative overflow-hidden rounded-[38px] bg-avanta-gradient px-6 py-10 text-white shadow-float sm:px-10 sm:py-12">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rotate-45 bg-white/10" />
          <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-16 translate-y-16 rounded-full bg-white/8 blur-2xl" />
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/72">
              Интернет
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl">
              Домашний интернет для квартиры, FTTH-адресов и частного дома
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/82 sm:text-lg">
              Выберите подходящий тариф, проверьте возможность подключения по адресу и
              сразу перейдите к заявке на интернет в одном разделе.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white text-avanta-navy hover:bg-white/92"
              >
                <Link to={to("/?action=connect#application")}>
                  Подключить
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border-white/26 bg-white/10 text-white hover:bg-white/16"
              >
                <Link to={to("/?action=check-address#application")}>
                  <MapPinned className="h-4 w-4" />
                  Проверить адрес
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border-white/26 bg-white/10 text-white hover:bg-white/16"
              >
                <Link to={to("/tariff-calculator")}>
                  <Sparkles className="h-4 w-4" />
                  Подбор тарифа
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white/82">
              <span className="rounded-full border border-white/18 bg-white/8 px-4 py-2">
                До 500 Мбит/с
              </span>
              <span className="rounded-full border border-white/18 bg-white/8 px-4 py-2">
                XPON и FTTH
              </span>
              <span className="rounded-full border border-white/18 bg-white/8 px-4 py-2">
                Частный дом
              </span>
            </div>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Подобрать интернет"
              title="Тарифы для квартиры, FTTH и частного дома"
              description="Выберите подходящий вариант подключения и сразу перейдите к нужной линейке тарифов."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {internetDirections.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <Link to={item.href}>
                    <Card className="group h-full overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-float">
                      <div className="flex min-h-[176px] items-center justify-center bg-gradient-to-br from-avanta-mist via-white to-avanta-green/10 p-5">
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="h-full max-h-[146px] w-full rounded-[24px] object-contain object-center"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-avanta-emerald">
                              {item.tag}
                            </p>
                            <h3 className="mt-3 text-2xl font-bold text-avanta-navy">{item.title}</h3>
                          </div>
                          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-avanta-navy/10 bg-white text-avanta-emerald">
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-avanta-graphite">{item.description}</p>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="tariffs">
          <Reveal>
            <SectionHeader
              eyebrow="Тарифы"
              title="Тарифные линейки Аванта Телеком"
              description="Линейки разделены по типу подключения: XPON, FTTH, частный дом и пакеты с ТВ. Так проще сравнить скорость, стоимость и выбрать подходящий тариф."
            />
          </Reveal>
          <div className="mt-8">
            <TariffTabs
              tariffs={siteTariffs}
              categories={siteTariffCategories}
              labels={siteTariffLabels}
            />
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Оборудование"
              title="Роутеры и mesh-системы для стабильного домашнего Wi-Fi"
              description="Роутеры и mesh-комплекты для квартиры и дома: можно сразу посмотреть модели, стоимость и подобрать оборудование под площадь и сценарий подключения."
            />
          </Reveal>
          <div className="mt-8">
            <MediaCarousel itemClassName="md:min-w-[48%] xl:min-w-[30%]">
              {siteInternetEquipmentItems.map((item) => (
                <VideoCard key={item.title} item={item} />
              ))}
            </MediaCarousel>
          </div>
        </section>

        <CTASection
          eyebrow="Подключение"
          title="Проверить адрес или сразу оставить заявку"
          description="Если уже выбрали тариф, переходите к заявке. Если сначала нужно понять доступность по дому, начните с проверки адреса."
          primaryHref="/?action=connect#application"
          primaryLabel="Подключить"
          secondaryHref="/?action=check-address#application"
          secondaryLabel="Проверить адрес"
        />
      </div>
    </motion.div>
  );
}

