import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Cable,
  House,
  ShieldCheck,
  Smartphone,
  Tv,
  Wifi,
} from "lucide-react";
import { Link } from "react-router-dom";
import { siteBrandBanners, siteFaqItems, siteTariffs } from "@/data/site-content";
import { siteBlogPosts } from "@/data/site-blog-content";
import { sitePromotions } from "@/data/site-promo-content";
import { ContactForm } from "@/components/contact-form";
import { FAQAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteMode } from "@/lib/site-mode";

const blogPreview = siteBlogPosts.slice(0, 3);
const promoPreview = sitePromotions.slice(0, 2);
const homeSectionShellClass =
  "rounded-[36px] border border-avanta-green/12 bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.08),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.98),rgba(244,249,247,0.96)_54%,rgba(233,242,237,0.92))] p-5 shadow-[0_26px_70px_-48px_rgba(24,58,99,0.24)] sm:p-6";
const sectionActionClass =
  "group rounded-full border-0 bg-[linear-gradient(135deg,#3aaa35,#178b66)] px-5 text-white shadow-[0_18px_42px_-24px_rgba(23,139,102,0.42)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-26px_rgba(23,139,102,0.5)]";

const formatFromPrice = (price: string) => {
  const normalized = price.replace(/\s+/g, " ").trim();
  return normalized.toLowerCase().startsWith("от ") ? normalized : `от ${normalized}`;
};

const homeTariffCards = [
  {
    title: "Квартира XPON",
    badge: "Для квартиры",
    price: formatFromPrice(siteTariffs.find((item) => item.category === "xpon")?.price ?? "720 ₽/мес"),
    speed: "100-500 Мбит/с",
    description: "Стабильный интернет для многоквартирного дома и повседневных задач.",
    href: "/internet?tab=xpon#tariffs",
    icon: Wifi,
  },
  {
    title: "Квартира FTTH",
    badge: "FTTH",
    price: formatFromPrice(siteTariffs.find((item) => item.category === "ftth")?.price ?? "550 ₽/мес"),
    speed: "50-100 Мбит/с",
    description: "Линейка для адресов, где доступна технология FTTH.",
    href: "/internet?tab=ftth#tariffs",
    icon: Cable,
  },
  {
    title: "Частный дом",
    badge: "Дом",
    price: formatFromPrice(siteTariffs.find((item) => item.category === "house")?.price ?? "980 ₽/мес"),
    speed: "100-500 Мбит/с",
    description: "Подключение по адресу с подбором скорости и удобного сценария.",
    href: "/internet?tab=house#tariffs",
    icon: House,
  },
  {
    title: "Интернет + ТВ",
    badge: "Пакеты",
    price: formatFromPrice(siteTariffs.find((item) => item.category === "bundle")?.price ?? "715 ₽/мес"),
    speed: "50-500 Мбит/с",
    description: "Пакеты со Смотрёшкой, архивом и одним подключением.",
    href: "/internet?tab=bundle#tariffs",
    icon: Tv,
  },
];

export function SiteHomePage() {
  const { to } = useSiteMode();

  const heroSlides = [
    {
      id: "internet",
      label: "Интернет",
      eyebrow: "Для дома и квартиры",
      title: "Домашний интернет для квартиры и частного дома",
      description: "XPON, FTTH и подключение по адресу в одном разделе.",
      price: formatFromPrice(siteTariffs.find((item) => item.category === "ftth")?.price ?? "550 ₽/мес"),
      hint: "До 500 Мбит/с",
      primaryLabel: "Смотреть тарифы",
      primaryHref: "/internet#tariffs",
      imageUrl: "/site/blog/internet-home.png",
      icon: Wifi,
      themeClass: "from-avanta-teal via-avanta-green to-avanta-navy",
      imageClassName: "object-cover object-[center_50%]",
    },
    {
      id: "tv",
      label: "Телевидение",
      eyebrow: "Смотрёшка и ТВ",
      title: "Смотрёшка и цифровое ТВ на удобных устройствах",
      description: "Архив эфира, пауза, онлайн-кинотеатры и просмотр дома или в дороге.",
      price: "от 249 ₽/мес",
      hint: "Пакеты каналов",
      primaryLabel: "Перейти в ТВ",
      primaryHref: "/tv",
      imageUrl: "/site/blog/digital-tv.png",
      icon: Tv,
      themeClass: "from-avanta-green via-avanta-emerald to-avanta-navy",
      imageClassName: "object-cover object-center",
    },
    {
      id: "surveillance",
      label: "Видеонаблюдение",
      eyebrow: "Камеры и архив",
      title: "Камеры, архив и удалённый доступ для дома и двора",
      description: "Облачное хранение, оборудование и быстрый подбор решения под объект.",
      price: "от 100 ₽/мес",
      hint: "Камеры и архив",
      primaryLabel: "Смотреть камеры",
      primaryHref: "/surveillance",
      imageUrl: "/site/blog/cloud-cctv.png",
      icon: ShieldCheck,
      themeClass: "from-avanta-green via-avanta-teal to-avanta-navy",
      imageClassName: "object-cover object-center",
    },
    {
      id: "smart",
      label: "Аванта Смарт",
      eyebrow: "Домофон и доступ",
      title: "Умный домофон и сервисы доступа для современного дома",
      description: "Домофон, мобильный доступ и отдельные смарт-лендинги Аванта Телеком.",
      price: "Смарт-сервисы",
      hint: "Домофон и доступ",
      primaryLabel: "Открыть смарт",
      primaryHref: "/smart",
      imageUrl: "/site/blog/umnyy-domofon.png",
      icon: Smartphone,
      themeClass: "from-avanta-navy via-avanta-teal to-avanta-green",
      imageClassName: "object-cover object-center",
    },
  ];

  const heroSlideDisplay = {
    internet: {
      title: "Интернет для дома и квартиры",
      description: "XPON, FTTH и подключение по адресу.",
      price: formatFromPrice(siteTariffs.find((item) => item.category === "ftth")?.price ?? "550 ₽/мес"),
      hint: "До 500 Мбит/с",
      points: ["XPON", "FTTH", "Подключение по адресу"],
      imageUrl: "/site/blog/internet-home.png",
      stageClassName: "from-[#23a246] via-[#178b66] to-[#123e63]",
      imageClassName: "object-cover object-[center_50%]",
      ctaLabel: "Смотреть тарифы",
    },
    tv: {
      title: "Смотрёшка и ТВ",
      description: "Каналы, архив и просмотр на любых устройствах.",
      price: "от 249 ₽/мес",
      hint: "Пакеты каналов",
      points: ["Архив эфира", "Пауза", "Смотрёшка"],
      imageUrl: "/site/blog/digital-tv.png",
      stageClassName: "from-[#1d8b4e] via-[#177a61] to-[#1b4964]",
      imageClassName: "object-cover object-[center_52%]",
      ctaLabel: "Перейти в ТВ",
    },
    surveillance: {
      title: "Камеры и архив",
      description: "Удалённый доступ и архив для дома, двора и объекта.",
      price: "от 100 ₽/мес",
      hint: "Камеры и архив",
      points: ["Онлайн-доступ", "Архив", "Подбор под объект"],
      imageUrl: "/site/blog/cloud-cctv.png",
      stageClassName: "from-[#17884f] via-[#14776f] to-[#183a63]",
      imageClassName: "object-cover object-[center_42%]",
      ctaLabel: "Смотреть камеры",
    },
    smart: {
      title: "Домофон и доступ",
      description: "Аванта Смарт для дома, подъезда и гостей.",
      price: "Смарт-сервисы",
      hint: "Домофон и доступ",
      points: ["Мобильный ключ", "QR для гостей", "Домофон в приложении"],
      imageUrl: "/site/blog/umnyy-domofon.png",
      stageClassName: "from-[#155768] via-[#176873] to-[#239347]",
      imageClassName: "object-cover object-[center_47%]",
      ctaLabel: "Открыть Смарт",
    },
  } as const;

  const [activeSlide, setActiveSlide] = useState(0);
  const [progressCycle, setProgressCycle] = useState(0);
  const currentSlide = heroSlides[activeSlide];
  const currentHeroDisplay = heroSlideDisplay[currentSlide.id as keyof typeof heroSlideDisplay];
  const compactHeroTitle = currentHeroDisplay.title;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
      setProgressCycle((prev) => prev + 1);
    }, 6500);

    return () => window.clearTimeout(timer);
  }, [activeSlide, heroSlides.length, progressCycle]);

  const handleSlideSelect = (index: number) => {
    setActiveSlide(index);
    setProgressCycle((prev) => prev + 1);
  };

  const SlideIcon = currentSlide.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-14 pt-4">
        <section className="relative left-1/2 w-[calc(100vw-116px)] max-w-[1560px] -translate-x-1/2 sm:w-[calc(100vw-122px)] xl:w-[calc(100vw-152px)]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[42px] border border-avanta-navy/6 bg-[linear-gradient(135deg,#f7fbf9_0%,#eff5f1_36%,#e9f0ec_100%)] shadow-float">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(22,127,74,0.04),transparent_24%,transparent_74%,rgba(24,58,99,0.055))]" />
              <div className="pointer-events-none absolute left-[-8%] top-[-18%] h-[58%] w-[34%] rounded-full bg-white/72 blur-3xl" />
              <div className="pointer-events-none absolute bottom-[-24%] right-[10%] h-[46%] w-[26%] rounded-full bg-avanta-green/10 blur-3xl" />
              <div className="pointer-events-none absolute inset-y-0 left-[5%] w-[28%] bg-[radial-gradient(circle_at_center,rgba(22,127,74,0.1),transparent_68%)] blur-2xl" />
              <div
                className={`pointer-events-none absolute right-[14%] top-[8%] h-[72%] w-[30%] rounded-[44px] bg-gradient-to-br ${currentHeroDisplay.stageClassName} opacity-[0.15] blur-3xl`}
              />
              <div className="pointer-events-none absolute right-[9%] top-[6%] h-[78%] w-[34%] rotate-[8deg] rounded-[52px] border border-white/18 bg-white/10 opacity-70" />
              <div className="pointer-events-none absolute inset-x-[18%] bottom-[23%] h-px bg-gradient-to-r from-transparent via-avanta-navy/10 to-transparent" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(135deg,transparent_0,transparent_47%,rgba(24,58,99,0.08)_47.2%,transparent_48%,transparent_100%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(135deg,transparent_0,transparent_49.2%,rgba(255,255,255,0.6)_49.4%,transparent_49.8%,transparent_100%)]" />
              <div className="pointer-events-none absolute right-6 top-5 hidden items-center gap-2 rounded-full border border-white/55 bg-white/70 px-3 py-1.5 shadow-[0_14px_30px_-26px_rgba(24,58,99,0.4)] backdrop-blur-sm lg:flex">
                <span className="text-[0.78rem] font-bold tracking-[0.24em] text-avanta-navy/42">0{activeSlide + 1}</span>
                <span className="h-px w-6 bg-avanta-navy/12" />
                <span className="text-[0.78rem] font-semibold tracking-[0.18em] text-avanta-navy/66">04</span>
              </div>

              <div className="relative grid gap-4 px-3 pb-6 pt-6 sm:px-5 sm:pb-6 sm:pt-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-6 lg:pb-6 lg:pt-6">
                <motion.div
                  key={`${currentSlide.id}-content`}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative flex max-w-[52rem] flex-col justify-center py-4 pl-4 pr-4 sm:pl-5 sm:pr-5 lg:pl-6 before:absolute before:left-0 before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-avanta-green/40 before:via-avanta-teal/14 before:to-transparent after:absolute after:-left-10 after:top-1/2 after:h-36 after:w-36 after:-translate-y-1/2 after:rounded-full after:bg-avanta-green/6 after:blur-3xl [&>p:first-child]:font-display [&>p:first-child]:text-[1rem] [&>p:first-child]:font-bold [&>p:first-child]:leading-none [&>p:first-child]:tracking-[-0.02em] [&>p:first-child]:text-avanta-navy"
                >
                  <p className="text-[1.02rem] text-avanta-navy/42">Аванта Телеком</p>
                  <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-avanta-navy/8 bg-white/82 px-3.5 py-1.5 text-[0.98rem] font-semibold text-avanta-navy shadow-panel">
                    <SlideIcon className="h-3.5 w-3.5 text-avanta-emerald" />
                    <span>{currentSlide.label}</span>
                  </div>

                  <h1 className="mt-2.5 max-w-[28rem] font-display text-[1.64rem] font-bold leading-[0.97] tracking-[-0.03em] text-avanta-navy sm:max-w-[32rem] sm:text-[1.94rem] lg:max-w-[35rem] lg:text-[2.12rem] xl:max-w-[38rem]">
                    {compactHeroTitle}
                  </h1>

                  <p className="mt-2 max-w-[25rem] text-[0.95rem] leading-[1.52rem] text-avanta-graphite sm:max-w-[30rem] lg:max-w-[33rem] xl:max-w-[35rem]">
                    {currentHeroDisplay.description}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <div className="rounded-full bg-white px-3.5 py-1.5 text-[1rem] font-bold text-avanta-navy shadow-panel">
                      {currentHeroDisplay.price}
                    </div>
                    <div className="rounded-full border border-avanta-navy/10 px-3.5 py-1.5 text-[0.98rem] font-semibold text-avanta-navy/60">
                      {currentHeroDisplay.hint}
                    </div>
                  </div>

                  <div className="mt-2">
                    <Button asChild>
                      <Link to={to(currentSlide.primaryHref)}>
                        {currentHeroDisplay.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-3 flex max-w-[35rem] flex-wrap items-center gap-x-4 gap-y-2">
                    {currentHeroDisplay.points.map((point) => (
                      <div
                        key={point}
                        className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-avanta-navy/72"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-avanta-green/85 shadow-[0_0_0_4px_rgba(22,127,74,0.08)]" />
                        {point}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  key={`${currentSlide.id}-image`}
                  initial={{ opacity: 0, x: 18, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative flex items-center lg:justify-end"
                >
                  <div className="relative ml-auto w-full max-w-[860px] overflow-hidden rounded-[28px] border border-white/35 bg-[#dfe6e3] shadow-[0_24px_56px_-38px_rgba(9,21,43,0.24)] aspect-[1.44/1] sm:aspect-[1.54/1] lg:aspect-[1.82/1] xl:aspect-[1.9/1]">
                    <img
                      src={currentHeroDisplay.imageUrl}
                      alt={currentHeroDisplay.title}
                      className={`h-full w-full ${currentHeroDisplay.imageClassName}`}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,24,36,0.04),transparent_38%,rgba(255,255,255,0.05))]" />
                  </div>
                </motion.div>
              </div>

              <div className="px-3 pb-5 sm:px-4 sm:pb-5.5">
                <div className="overflow-hidden rounded-[24px] bg-white/96 p-1 shadow-panel">
                  <div className="grid gap-1.5 lg:grid-cols-4">
                    {heroSlides.map((slide, index) => {
                      const isActive = index === activeSlide;
                      const slideDisplay = heroSlideDisplay[slide.id as keyof typeof heroSlideDisplay];

                      return (
                        <div
                          key={slide.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSlideSelect(index)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            handleSlideSelect(index);
                          }
                        }}
                        onTouchStart={() => handleSlideSelect(index)}
                          className={`relative cursor-default overflow-hidden rounded-[18px] border px-4 py-3.5 text-left outline-none transition ${
                            isActive
                              ? "border-avanta-green/18 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(240,248,243,0.96))] shadow-[0_18px_34px_-26px_rgba(24,58,99,0.24)]"
                              : "border-avanta-navy/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(246,248,248,0.92))] hover:border-avanta-navy/10 hover:bg-white/92"
                          }`}
                        >
                          <div
                            className={`absolute inset-x-3.5 top-0 h-[2px] rounded-full transition ${
                              isActive
                                ? "bg-gradient-to-r from-avanta-green/80 via-avanta-emerald/70 to-avanta-teal/65"
                                : "bg-gradient-to-r from-avanta-navy/10 via-avanta-navy/4 to-transparent"
                            }`}
                          />
                          <div
                            className={`pointer-events-none absolute -right-10 top-0 h-24 w-24 rounded-full blur-2xl transition ${
                              isActive ? "bg-avanta-green/10" : "bg-avanta-navy/5"
                            }`}
                          />
                          <Link
                            to={to(slide.primaryHref)}
                            className={`text-[1.12rem] font-bold transition ${
                              isActive ? "text-avanta-navy" : "text-avanta-navy hover:text-avanta-emerald"
                            }`}
                          >
                            {slide.label}
                          </Link>
                          <p className="mt-1 text-[1rem] text-avanta-graphite">{slideDisplay.hint}</p>
                          <p className="mt-1 text-[1.02rem] font-semibold text-avanta-graphite/80">{slideDisplay.price}</p>
                          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-avanta-mist">
                            {isActive ? (
                              <motion.div
                                key={`${slide.id}-${progressCycle}`}
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 6.4, ease: "linear" }}
                                className="h-full rounded-full bg-avanta-green"
                              />
                            ) : (
                              <div className="h-full w-[22%] rounded-full bg-avanta-navy/12" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="application">
          <Reveal>
            <div className="rounded-[40px] border border-avanta-green/12 bg-gradient-to-br from-white to-avanta-mist/75 p-4 shadow-float sm:p-5">
              <ContactForm />
            </div>
          </Reveal>
        </section>

        <section>
          <div className={homeSectionShellClass}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <Reveal>
                <SectionHeader
                  eyebrow="Тарифы"
                  title="Тарифы для дома и квартиры"
                  description="Выберите нужную линейку и перейдите в полный раздел со скоростями, ценами и заявкой на подключение."
                />
              </Reveal>
              <Reveal delay={0.05}>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className={sectionActionClass}>
                    <Link to={to("/internet#tariffs")}>
                      Все тарифы
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-avanta-navy/12 bg-white/85 px-5 text-avanta-navy hover:border-avanta-green/25 hover:text-avanta-emerald"
                  >
                    <Link to={to("/tariff-calculator")}>Подбор тарифа</Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {homeTariffCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <Card className="flex h-full flex-col border-avanta-green/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,250,247,0.92))] p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10 text-avanta-emerald">
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge>{item.badge}</Badge>
                      </div>

                      <h3 className="mt-5 text-2xl font-bold text-avanta-navy">{item.title}</h3>
                      <p className="mt-4 text-base font-bold text-avanta-emerald">{item.price}</p>
                      <p className="mt-1 text-sm text-avanta-graphite">{item.speed}</p>
                      <p className="mt-4 text-sm leading-6 text-avanta-graphite">{item.description}</p>

                      <div className="mt-auto pt-8">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-avanta-navy/12 bg-[linear-gradient(180deg,rgba(241,246,244,0.96),rgba(233,241,237,0.94))] shadow-[0_14px_28px_-24px_rgba(24,58,99,0.22)] hover:border-avanta-green/30 hover:bg-[linear-gradient(135deg,rgba(58,170,53,0.22),rgba(255,255,255,0.98))] hover:text-avanta-emerald hover:shadow-[0_18px_34px_-24px_rgba(58,170,53,0.34)] active:border-avanta-green/40 active:bg-[linear-gradient(135deg,rgba(58,170,53,0.28),rgba(255,255,255,0.98))] active:text-avanta-emerald"
                        >
                          <Link to={to(item.href)}>Смотреть тарифы</Link>
                        </Button>
                      </div>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <div className={homeSectionShellClass}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <Reveal>
                <SectionHeader
                  eyebrow="Акции"
                  title="Актуальные предложения"
                  description="Действующие акции и спецпредложения с быстрым переходом ко всем предложениям."
                />
              </Reveal>
              <Reveal delay={0.05}>
                <Button asChild size="lg" className={sectionActionClass}>
                  <Link to={to("/promotions")}>
                    Все акции
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              </Reveal>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {promoPreview.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <Link to={to("/promotions")} className="block h-full">
                    <Card className="flex h-full flex-col overflow-hidden border-avanta-green/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,250,247,0.92))] p-0 transition hover:-translate-y-1 hover:shadow-float">
                      {item.imageUrl ? (
                        <div className="aspect-[16/8] overflow-hidden">
                          <img src={item.imageUrl} alt="" className="h-full w-full object-cover object-center" />
                        </div>
                      ) : null}

                      <div className="flex h-full flex-col p-6">
                        <Badge>{item.badge}</Badge>
                        <h3 className="mt-4 text-2xl font-bold text-avanta-navy">{item.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-avanta-graphite">{item.description}</p>
                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-avanta-emerald">
                          Подробнее об акции
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className={homeSectionShellClass}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <Reveal>
                <SectionHeader
                  eyebrow="Блог"
                  title="Полезные статьи и новости"
                  description="Подборка полезных материалов из блога Аванта Телеком с переходом ко всем публикациям."
                />
              </Reveal>
              <Reveal delay={0.05}>
                <Button asChild size="lg" className={sectionActionClass}>
                  <Link to={to("/blog")}>
                    Все статьи
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              </Reveal>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-3">
              {blogPreview.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.05}>
                  <Link to={to(post.href)} className="block h-full">
                    <Card className="flex h-full flex-col overflow-hidden border-avanta-green/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,250,247,0.92))] p-0 transition hover:-translate-y-1 hover:shadow-float">
                      {post.imageUrl ? (
                        <div className="aspect-[16/10] overflow-hidden bg-avanta-mist">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="h-full w-full object-cover object-center transition duration-500 hover:scale-[1.03]"
                          />
                        </div>
                      ) : null}

                      <div className="flex flex-1 flex-col p-6">
                        <Badge>{post.category}</Badge>
                        <h3 className="mt-5 text-2xl font-bold leading-tight text-avanta-navy">{post.title}</h3>
                        <div className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-avanta-emerald">
                          Читать статью
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faq">
          <div className={homeSectionShellClass}>
            <Reveal>
                <SectionHeader
                  eyebrow="Вопросы и ответы"
                  title="Что обычно уточняют перед подключением"
                  description="Ответы на частые вопросы о проверке адреса, сроках подключения, телевидении и дополнительных сервисах."
                />
            </Reveal>
            <div className="mt-8">
              <FAQAccordion items={siteFaqItems} />
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

