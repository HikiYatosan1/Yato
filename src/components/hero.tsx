import { ArrowRight, MapPinned, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { heroStats, scenarioCards } from "@/data/home";
import { LogoMark } from "@/components/logo-mark";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { useSiteMode } from "@/lib/site-mode";

export function Hero() {
  const { to } = useSiteMode();

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-12">
      <div className="absolute inset-x-0 top-8 -z-10 h-[520px] rounded-[40px] bg-hero-grid bg-[length:22px_22px] opacity-60" />
      <div className="absolute right-10 top-16 -z-10 hidden h-56 w-56 rotate-45 rounded-[36px] bg-gradient-to-br from-avanta-green/20 to-avanta-navy/20 lg:block" />
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <div className="cut-corner relative overflow-hidden rounded-[36px] border border-white/70 bg-white/80 px-6 py-8 shadow-panel backdrop-blur sm:px-8 sm:py-10">
              <div className="absolute right-0 top-0 h-36 w-36 translate-x-8 -translate-y-10 rotate-45 bg-gradient-to-br from-avanta-green/20 to-avanta-navy/20" />
              <LogoMark />
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-avanta-emerald">
                Концепция нового сайта провайдера
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-avanta-navy sm:text-5xl xl:text-6xl">
                Avanta Telecom как сильный digital-бренд: быстро, чисто, убедительно.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-avanta-graphite sm:text-lg">
                Живой demo-сайт для команды и руководства: здесь можно открыть основные сценарии,
                посмотреть подачу тарифов, перейти по маршрутам и пройти форму заявки до финального
                состояния.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to={to("/contacts?action=connect#application")}>
                    Подключить
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to={to("/contacts?action=check-address#application")}>
                    <MapPinned className="h-4 w-4" />
                    Проверить адрес
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link to={to("/tariffs")}>
                    <PlayCircle className="h-4 w-4" />
                    Смотреть тарифы
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {heroStats.map((item, index) => (
                <div
                  key={item.label}
                  className="cut-corner rounded-[28px] border border-avanta-navy/10 bg-white/90 p-5 shadow-panel"
                >
                  <div className="mb-4 h-1.5 w-16 rounded-full bg-avanta-gradient animate-pulse-line" />
                  <p className="font-display text-3xl font-bold text-avanta-pine">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-avanta-graphite">{item.label}</p>
                  <div className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-avanta-gray">
                    Сценарий {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-avanta-graphite">
                Быстрый выбор сценария
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-avanta-navy sm:text-3xl">
                Нужный путь до услуги в один клик
              </h2>
            </div>
            <div className="hidden rounded-full border border-avanta-navy/10 bg-white px-4 py-2 text-sm font-semibold text-avanta-graphite md:block">
              React Router + mock data + demo UX
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {scenarioCards.map((item) => (
              <ServiceCard key={item.title} item={item} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

