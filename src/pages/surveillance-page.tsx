import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Camera, ShieldCheck } from "lucide-react";
import { equipmentItems, surveillanceBenefits, surveillancePackages } from "@/data/surveillance";
import { CTASection } from "@/components/cta-section";
import { FeatureCard } from "@/components/feature-card";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { VideoCard } from "@/components/video-card";
import { Button } from "@/components/ui/button";
import { useSiteMode } from "@/lib/site-mode";

export function SurveillancePage() {
  const { to } = useSiteMode();

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container pt-10 space-y-20">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <div className="cut-corner rounded-[38px] border border-white/70 bg-white/90 px-6 py-8 shadow-panel sm:px-8 sm:py-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-avanta-emerald">
                Видеонаблюдение
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-avanta-navy sm:text-5xl">
                Безопасность в фирменной подаче Avanta: без сухого каталога, с ясными пакетами.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-avanta-graphite">
                Отдельная страница услуги показывает, как Avanta Telecom может продавать не только
                интернет, но и решения наблюдения для дома, офиса и коммерческих объектов.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to={to("/contacts?action=surveillance#application")}>
                    Консультация
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to={to("/tariffs?tab=business")}>Решения для бизнеса</Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="cut-corner relative overflow-hidden rounded-[38px] bg-avanta-gradient p-8 text-white shadow-float">
              <div className="absolute right-6 top-6 flex h-16 w-16 items-center justify-center rounded-[22px] bg-white/10">
                <Camera className="h-8 w-8" />
              </div>
              <div className="max-w-md">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  Demo-смысл страницы
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold">
                  Показать, как фирменный язык масштабируется на новую услугу.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/80">
                  Здесь бренд работает через диагонали, плотные акценты и ясную сегментацию
                  пакетов. Получается технологично, но не холодно.
                </p>
                <div className="mt-8 grid gap-3">
                  <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                    <ShieldCheck className="mb-3 h-5 w-5" />
                    Контроль, уведомления и архив в одном UX-сценарии.
                  </div>
                  <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                    Удобный мост между B2C и B2B внутри одного бренда.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Преимущества"
              title="Почему раздел видеонаблюдения смотрится убедительно"
              description="Подача строится не вокруг характеристик, а вокруг пользовательских сценариев и ощущения контроля."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {surveillanceBenefits.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <FeatureCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Пакеты"
              title="Понятные решения вместо перегруженного прайса"
              description="На презентации эта секция помогает быстро обсудить, как можно собирать услугу в витрину и вести клиента к консультации."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {surveillancePackages.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <VideoCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Оборудование"
              title="Блок оборудования и инфраструктуры"
              description="Нужен не только для полноты, но и для ощущения, что сайт уже близок к реальному продуктовому уровню."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {equipmentItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <VideoCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>

        <CTASection
          title="Нужна консультация по камерам, архиву и подключению?"
          description="Финальный CTA доводит пользователя до формы заявки и показывает целостный demo-маршрут от интереса к услуге до обращения."
          primaryLabel="Запросить консультацию"
        />
      </div>
    </motion.div>
  );
}

