import { Link } from "react-router-dom";
import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";
import { useSiteMode } from "@/lib/site-mode";

export function Footer() {
  const { mode, navigation, switchHref, switchLabel, to } = useSiteMode();

  return (
    <footer className="mt-20">
      <div className="container">
        <div className="cut-corner relative overflow-hidden rounded-[40px] border border-white/8 bg-[linear-gradient(135deg,#081720_0%,#0b2330_38%,#102838_100%)] px-6 py-10 text-white shadow-[0_34px_90px_-54px_rgba(4,10,18,0.88)] sm:px-8 lg:px-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-avanta-green/65 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(58,170,53,0.1),transparent_24%,transparent_72%,rgba(24,58,99,0.12))]" />
          <div className="pointer-events-none absolute left-[-10%] top-[-18%] h-56 w-56 rounded-full bg-avanta-green/12 blur-3xl" />
          <div className="pointer-events-none absolute right-[-6%] bottom-[-24%] h-72 w-72 rounded-full bg-avanta-teal/12 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(135deg,transparent_0,transparent_48%,rgba(255,255,255,0.18)_48.2%,transparent_48.5%,transparent_100%)]" />

          <div className="relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr_0.88fr_0.98fr] lg:gap-12">
            <div>
              <div className="inline-flex rounded-[24px] border border-white/20 bg-white px-6 py-4 shadow-[0_20px_42px_-26px_rgba(0,0,0,0.6)]">
                <LogoMark className="h-12 sm:h-14" />
              </div>

              <p className="mt-6 max-w-sm text-[15px] leading-8 text-white/74">
                {mode === "site"
                  ? "Аванта Телеком — домашний интернет, телевидение, видеонаблюдение и сервисы для квартиры и частного дома."
                  : "Концептуальная версия сайта с акцентом на структуру, сценарии навигации и подачу сервисов."}
              </p>

              {mode === "site" ? (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="shadow-[0_18px_40px_-24px_rgba(58,170,53,0.55)]">
                    <Link to={to("/?action=check-address#application")}>Проверить адрес</Link>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="border border-white/14 bg-white/8 text-white hover:bg-white/14 hover:text-white"
                  >
                    <Link to={to("/?action=connect#application")}>Оставить заявку</Link>
                  </Button>
                </div>
              ) : (
                <Link
                  to={switchHref}
                  className="mt-6 inline-flex text-sm font-semibold text-avanta-green transition hover:text-white"
                >
                  {switchLabel}
                </Link>
              )}

              {mode === "site" ? (
                <div className="mt-6 rounded-[18px] border border-white/16 bg-white/8 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.09em] text-white/60">Оплата услуг</p>
                  <p className="mt-2 text-sm text-white/86">Номер договора указывается без разделительных символов.</p>
                  <p className="mt-1 text-sm text-white/72">Минимальный платеж — 300 ₽.</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    <a
                      href="https://avanta-telecom.ru/pay/"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-avanta-green transition hover:text-white"
                    >
                      Оплатить онлайн
                    </a>
                    <a
                      href="https://lc.avanta-telecom.ru/cabinet/login"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-white/82 transition hover:text-avanta-green"
                    >
                      Личный кабинет
                    </a>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="max-w-[220px]">
              <p className="text-sm font-semibold tracking-[0.08em] text-white/48">Разделы</p>
              <div className="mt-5 grid gap-3">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="inline-flex w-fit justify-self-start text-[15px] font-medium text-white/88 transition hover:text-avanta-green"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="max-w-[240px]">
              <p className="text-sm font-semibold tracking-[0.08em] text-white/48">Популярное</p>
              <div className="mt-5 grid gap-3 text-[15px] text-white/68">
                {mode === "site" ? (
                  <>
                    <Link
                      to={to("/internet?tab=xpon#tariffs")}
                      className="inline-flex w-fit justify-self-start font-medium transition hover:text-avanta-green"
                    >
                      Интернет для квартиры
                    </Link>
                    <Link
                      to={to("/internet?tab=house#tariffs")}
                      className="inline-flex w-fit justify-self-start font-medium transition hover:text-avanta-green"
                    >
                      Интернет для частного дома
                    </Link>
                    <Link
                      to={to("/tv")}
                      className="inline-flex w-fit justify-self-start font-medium transition hover:text-avanta-green"
                    >
                      Телевидение и Смотрёшка
                    </Link>
                    <Link
                      to={to("/surveillance")}
                      className="inline-flex w-fit justify-self-start font-medium transition hover:text-avanta-green"
                    >
                      Видеонаблюдение
                    </Link>
                  </>
                ) : (
                  <>
                    <p>Главный экран</p>
                    <p>Тарифные блоки</p>
                    <p>Форма заявки</p>
                    <p>Сервисные разделы</p>
                  </>
                )}
              </div>
            </div>

            <div className="max-w-[260px]">
              <p className="text-sm font-semibold tracking-[0.08em] text-white/48">Контакты</p>
              <div className="mt-5 space-y-3 text-[15px] text-white/72">
                {mode === "site" ? (
                  <>
                    <p className="font-semibold text-white">+7 (861) 290-09-99</p>
                    <p className="font-semibold text-white">+7 (928) 210-09-99</p>
                    <p>info@avanta-telecom.ru</p>
                    <p>support@avanta-telecom.ru</p>
                    <p>Пн-Пт: 08:00-20:00</p>
                    <p>Краснодар, ул. Пригородная, 177, офис 406</p>
                  </>
                ) : (
                  <>
                    <p>+7 (800) 555-24-24</p>
                    <p>connect@avanta-demo.ru</p>
                    <p>Пн-Сб: 09:00-21:00</p>
                    <p>Сценарии заявки и консультации</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
