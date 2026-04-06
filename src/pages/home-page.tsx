import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { extraServices, featureItems } from "@/data/home";
import { faqItems } from "@/data/faq";
import { tariffs } from "@/data/tariffs";
import { CTASection } from "@/components/cta-section";
import { FAQAccordion } from "@/components/faq-accordion";
import { FeatureCard } from "@/components/feature-card";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { TariffTabs } from "@/components/tariff-tabs";
import { Button } from "@/components/ui/button";
import { useSiteMode } from "@/lib/site-mode";

export function HomePage() {
  const { to } = useSiteMode();

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <Hero />

      <div className="container mt-20 space-y-20">
        <section id="tariffs">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                eyebrow="Тарифы"
                title="Тарифная витрина, которую можно показывать руководству без скидок на demo"
                description="На главной мы даём быстрый срез по категориям, а на отдельной странице раскрываем полную сетку тарифов и фильтрацию по сценарию подключения."
              />
              <Button asChild variant="secondary" size="lg">
                <Link to={to("/tariffs")}>
                  Все тарифы
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
          <div className="mt-8">
            <TariffTabs tariffs={tariffs} maxItems={3} showMoreLink />
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Преимущества"
              title="Аргументы, которые делают бренд провайдера современным и уверенным"
              description="Вместо перегруженной витрины мы показываем ясные опоры: скорость, сервис, эстетику и целостную экосистему услуг."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <FeatureCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <SectionHeader
              eyebrow="Доп. услуги"
              title="Сервисы рядом с интернетом, которые усиливают ценность сайта"
              description="В demo-прототипе они встроены в маршрут пользователя и помогают показать потенциал будущего каталога услуг."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {extraServices.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <ServiceCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="faq">
          <Reveal>
            <SectionHeader
              eyebrow="FAQ"
              title="Частые вопросы с демонстрацией живого аккордеона"
              description="Блок помогает проверить поведение интерактивных элементов и увидеть, как контент раскладывается в реальном интерфейсе."
            />
          </Reveal>
          <div className="mt-8">
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        <CTASection
          title="Показать, как новый сайт будет продавать подключение и вести пользователя до заявки"
          description="Откройте форму подключения, проверьте demo-состояния и посмотрите, как бренд Avanta Telecom раскрывается в полноценном кликабельном интерфейсе."
        />
      </div>
    </motion.div>
  );
}

