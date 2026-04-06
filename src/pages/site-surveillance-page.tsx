import { motion } from "motion/react";
import {
  siteCameraMapPoints,
  siteEquipmentItems,
  siteSurveillanceBenefits,
  siteSurveillancePackages,
} from "@/data/site-content";
import { CTASection } from "@/components/cta-section";
import { FeatureCard } from "@/components/feature-card";
import { MediaCarousel } from "@/components/media-carousel";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { VideoCard } from "@/components/video-card";
import { Card } from "@/components/ui/card";

export function SiteSurveillancePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container space-y-20 pt-10">
        <section className="cut-corner relative overflow-hidden rounded-[38px] bg-avanta-gradient px-6 py-10 text-white shadow-float sm:px-10">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rotate-45 bg-white/10" />
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
              Видеонаблюдение
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl">
              Облачное видеонаблюдение для квартиры, дома, двора и входной группы
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/80">
              Выберите тариф хранения архива, посмотрите оборудование и сразу оставьте заявку
              на подбор комплекта под ваш объект.
            </p>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Преимущества"
              title="Что получает пользователь вместе с сервисом"
              description="Онлайн-просмотр, архив в облаке и понятные тарифы собраны в одном аккуратном разделе."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {siteSurveillanceBenefits.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <FeatureCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Тарифы"
              title="Тарифы облачного видеонаблюдения"
              description="Подберите подходящий сценарий хранения архива и удалённого доступа для квартиры, дома или двора."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {siteSurveillancePackages.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <VideoCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Городские камеры"
              title="Карта зон, которые чаще всего закрывают камерами"
              description="Показываем карту и основные точки, где видеонаблюдение чаще всего помогает закрыть бытовые и дворовые сценарии."
            />
          </Reveal>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Reveal delay={0.05}>
              <Card className="relative min-h-[420px] overflow-hidden p-0">
                <img
                  src="/site/cctv/camera-map.png"
                  alt="Карта зон видеонаблюдения"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,32,46,0.08),rgba(10,32,46,0.18))]" />
                <div className="absolute inset-5 rounded-[28px] border border-white/70" />

                {siteCameraMapPoints.map((point, index) => (
                  <div key={point.title} className="absolute" style={{ left: point.x, top: point.y }}>
                    <div className="relative">
                      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-avanta-green/20 blur-xl" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-avanta-gradient text-sm font-bold text-white shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            </Reveal>

            <div className="space-y-4">
              {siteCameraMapPoints.map((point, index) => (
                <Reveal key={point.title} delay={0.08 + index * 0.05}>
                  <Card className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-avanta-gradient text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-avanta-emerald">
                          {point.tag}
                        </p>
                        <h3 className="mt-2 text-xl font-bold text-avanta-navy">{point.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-avanta-graphite">{point.description}</p>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Оборудование"
              title="Камеры и PoE-оборудование в удобной карусели"
              description="Показываем реальные модели с официального сайта: можно листать карточки, смотреть фото, характеристики и цены без перегрузки страницы."
            />
          </Reveal>
          <div className="mt-8">
            <MediaCarousel itemClassName="md:min-w-[48%] xl:min-w-[30%]">
              {siteEquipmentItems.map((item) => (
                <VideoCard key={item.title} item={item} />
              ))}
            </MediaCarousel>
          </div>
        </section>

        <CTASection
          eyebrow="Консультация"
          title="Оставьте заявку на видеонаблюдение"
          description="Расскажите, где нужны камеры, и мы поможем подобрать тариф, оборудование и формат подключения."
          primaryHref="/?action=surveillance#application"
          primaryLabel="Оставить заявку"
        />
      </div>
    </motion.div>
  );
}

