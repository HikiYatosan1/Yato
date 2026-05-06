import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  siteInternetEquipmentItems,
  siteScenarioCards,
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
import type { TariffCategory } from "@/types/content";

type InternetSection = "apartment" | "house" | "bundle";

type InternetPageConfig = {
  eyebrow: string;
  title: string;
  description: string;
  chips: string[];
  categories: TariffCategory[];
  defaultCategory: TariffCategory;
  directionTitles: string[];
  tariffsTitle: string;
  tariffsDescription: string;
  equipmentTitle: string;
  equipmentDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  imageAlt: string;
};

const internetPageConfigs: Record<InternetSection, InternetPageConfig> = {
  apartment: {
    eyebrow: "Интернет в квартиру",
    title: "Интернет в квартиру",
    description:
      "Подберите домашний интернет для квартиры, проверьте адрес и оставьте заявку на удобное подключение.",
    chips: ["Для квартиры", "До 500 Мбит/с", "Проверка адреса"],
    categories: ["xpon"],
    defaultCategory: "xpon",
    directionTitles: ["Интернет в квартиру", "Частный дом", "Интернет + ТВ"],
    tariffsTitle: "Тарифы для квартиры",
    tariffsDescription:
      "Сравните скорость, стоимость и сценарии использования, чтобы выбрать подходящий тариф для квартиры.",
    equipmentTitle: "Роутеры и mesh-системы для квартиры",
    equipmentDescription:
      "Подберите роутер или mesh-комплект под площадь квартиры, количество устройств и нужное покрытие Wi-Fi.",
    ctaTitle: "Проверить квартиру или сразу оставить заявку",
    ctaDescription:
      "Укажите адрес, и мы подскажем, какая технология и какие тарифы доступны именно в вашем доме.",
    imageAlt: "Интернет в квартиру",
  },
  house: {
    eyebrow: "Интернет в частный дом",
    title: "Интернет в частный дом с подбором по адресу",
    description:
      "Отдельная линейка тарифов для частного сектора: от базового подключения до максимальной скорости для большого дома.",
    chips: ["Частный сектор", "До 500 Мбит/с", "Подбор по адресу"],
    categories: ["house"],
    defaultCategory: "house",
    directionTitles: ["Частный дом", "Интернет + ТВ", "Интернет в квартиру"],
    tariffsTitle: "Тарифы для частного дома",
    tariffsDescription:
      "Сравните тарифы для частного дома по скорости, стоимости и запасу под домашнюю сеть.",
    equipmentTitle: "Оборудование для Wi-Fi в доме",
    equipmentDescription:
      "Для частного дома особенно важны покрытие, стабильность и запас по Wi-Fi. Подберите роутер или mesh-систему под планировку.",
    ctaTitle: "Проверить возможность подключения дома",
    ctaDescription:
      "Оставьте адрес частного дома, чтобы мы проверили доступность подключения и предложили подходящий тариф.",
    imageAlt: "Интернет в частный дом",
  },
  bundle: {
    eyebrow: "Интернет + ТВ",
    title: "Интернет + ТВ в одном пакете",
    description:
      "Пакеты с домашним интернетом, Смотрёшкой, архивом эфира и онлайн-кинотеатрами для семейного просмотра.",
    chips: ["Интернет + ТВ", "Смотрёшка", "До 500 Мбит/с"],
    categories: ["bundle"],
    defaultCategory: "bundle",
    directionTitles: ["Интернет + ТВ", "Интернет в квартиру", "Частный дом"],
    tariffsTitle: "Пакеты интернет + ТВ",
    tariffsDescription:
      "Готовые комплекты для тех, кому нужен интернет и телевидение в одном подключении и одном понятном счёте.",
    equipmentTitle: "Оборудование для интернета и ТВ",
    equipmentDescription:
      "Роутеры и mesh-комплекты помогут сохранить стабильный Wi-Fi для Smart TV, смартфонов, ноутбуков и приставок.",
    ctaTitle: "Оставить заявку на интернет + ТВ",
    ctaDescription:
      "Выберите пакет или оставьте заявку на консультацию, чтобы подобрать комплект под адрес и привычки просмотра.",
    imageAlt: "Пакет интернет и телевидение",
  },
};

const heroGhostButtonClass =
  "group relative overflow-hidden border-white/24 bg-white/10 px-7 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_38px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm before:absolute before:inset-y-0 before:left-[-45%] before:w-[38%] before:skew-x-[-18deg] before:bg-white/18 before:opacity-0 before:transition-all before:duration-500 hover:-translate-y-0.5 hover:border-white/42 hover:bg-white/16 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_22px_42px_-28px_rgba(0,0,0,0.5)] hover:before:left-[118%] hover:before:opacity-100 active:translate-y-0";

export function SiteInternetPage({ section }: { section: InternetSection }) {
  const { to } = useSiteMode();
  const config = internetPageConfigs[section];
  const internetDirections = config.directionTitles
    .map((title) => siteScenarioCards.find((item) => item.title === title))
    .filter((item): item is (typeof siteScenarioCards)[number] => Boolean(item));

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-20 pt-10">
        <section className="cut-corner relative overflow-hidden rounded-[38px] bg-avanta-gradient px-6 py-10 text-white shadow-float sm:px-10 sm:py-12">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rotate-45 bg-white/10" />
          <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-16 translate-y-16 rounded-full bg-white/8 blur-2xl" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/72">
                  {config.eyebrow}
                </p>
                <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl">
                  {config.title}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-7 text-white/82 sm:text-lg">
                  {config.description}
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
                    className={heroGhostButtonClass}
                  >
                    <Link to={to("/?action=check-address#application")}>Проверить адрес</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className={heroGhostButtonClass}
                  >
                    <Link to={to("/tariff-calculator")}>Подбор тарифа</Link>
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white/82">
                  {config.chips.map((chip) => (
                    <span key={chip} className="rounded-full border border-white/18 bg-white/8 px-4 py-2">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="rounded-[28px] border border-white/20 bg-white/8 p-3 backdrop-blur-sm">
                <div className="overflow-hidden rounded-[20px] border border-white/16 bg-[#0d3552]/20 p-3">
                  <img
                    src="/site/internet/about-service.png"
                    alt={config.imageAlt}
                    className="h-[280px] w-full rounded-[14px] border border-white/20 bg-white object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Выберите раздел"
              title="Быстрый переход к нужному подключению"
              description="Рядом оставили смежные разделы, чтобы можно было быстро сравнить квартирный интернет, частный дом и пакеты с ТВ."
            />
          </Reveal>
          <div className="mx-auto mt-8 grid max-w-[1120px] justify-center gap-6 md:grid-cols-2 xl:grid-cols-3">
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
              title={config.tariffsTitle}
              description={config.tariffsDescription}
            />
          </Reveal>
          <div className="mt-8">
            <TariffTabs
              tariffs={siteTariffs}
              categories={config.categories}
              labels={siteTariffLabels}
              defaultCategory={config.defaultCategory}
            />
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Оборудование"
              title={config.equipmentTitle}
              description={config.equipmentDescription}
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
          title={config.ctaTitle}
          description={config.ctaDescription}
          primaryHref="/?action=connect#application"
          primaryLabel="Подключить"
          secondaryHref="/?action=check-address#application"
          secondaryLabel="Проверить адрес"
        />
      </div>
    </motion.div>
  );
}

