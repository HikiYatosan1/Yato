import { motion } from "motion/react";
import { Building2, BriefcaseBusiness, House, Tv } from "lucide-react";
import { tariffs } from "@/data/tariffs";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { TariffTabs } from "@/components/tariff-tabs";

const highlights = [
  {
    icon: Building2,
    title: "Городские тарифы",
    description: "Для квартир и плотной семейной нагрузки.",
  },
  {
    icon: House,
    title: "Частный дом",
    description: "С акцентом на покрытие и сложные планировки.",
  },
  {
    icon: Tv,
    title: "Интернет + ТВ",
    description: "Когда важен эмоциональный пакет для семьи.",
  },
  {
    icon: BriefcaseBusiness,
    title: "B2B-решения",
    description: "SLA, статический IP, резервирование и рост бизнеса.",
  },
];

export function TariffsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="container pt-10">
        <Reveal>
          <section className="cut-corner relative overflow-hidden rounded-[38px] border border-white/70 bg-white/90 px-6 py-10 shadow-panel sm:px-10">
            <div className="absolute right-0 top-0 h-40 w-40 translate-x-8 -translate-y-10 rotate-45 bg-gradient-to-br from-avanta-green/20 to-avanta-navy/20" />
            <SectionHeader
              eyebrow="Страница тарифов"
              title="Фильтрация, популярные тарифы и ясная визуальная иерархия"
              description="Эта страница должна ощущаться как реальный рабочий каталог провайдера: быстро выбрать сегмент, сравнить пакеты и перейти к заявке без перегрузки."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 0.06}>
                    <div className="cut-corner rounded-[26px] border border-avanta-navy/10 bg-avanta-mist p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-avanta-emerald shadow-panel">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-avanta-navy">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-avanta-graphite">{item.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        </Reveal>

        <section className="mt-14">
          <Reveal>
            <TariffTabs tariffs={tariffs} />
          </Reveal>
        </section>

        <div className="mt-20">
          <CTASection
            title="Подключить нужный сценарий без лишних шагов"
            description="Переходите к форме заявки, чтобы показать demo-состояния и финальный маршрут пользователя от выбора тарифа до отправки обращения."
          />
        </div>
      </div>
    </motion.div>
  );
}

