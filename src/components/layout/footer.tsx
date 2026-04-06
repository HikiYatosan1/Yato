import { Link } from "react-router-dom";
import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";
import { useSiteMode } from "@/lib/site-mode";

export function Footer() {
  const { mode, navigation, switchHref, switchLabel, to } = useSiteMode();

  const popularLinks =
    mode === "site"
      ? [
          { label: "Интернет для квартиры", href: to("/internet?tab=xpon#tariffs") },
          { label: "Интернет для частного дома", href: to("/internet?tab=house#tariffs") },
          { label: "Телевидение и Смотрёшка", href: to("/tv") },
          { label: "Видеонаблюдение", href: to("/surveillance") },
        ]
      : [
          { label: "Главный экран", href: to("/") },
          { label: "Тарифные блоки", href: to("/tariffs") },
          { label: "Форма заявки", href: to("/promotions") },
          { label: "Сервисные разделы", href: to("/contacts") },
        ];

  return (
    <footer className="mt-20">
      <div className="container">
        <div className="cut-corner relative overflow-hidden rounded-[40px] border border-white/8 bg-[linear-gradient(135deg,#081720_0%,#0b2330_38%,#102838_100%)] px-6 py-10 text-white shadow-[0_34px_90px_-54px_rgba(4,10,18,0.88)] sm:px-8 lg:px-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-avanta-green/65 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(58,170,53,0.08),transparent_24%,transparent_72%,rgba(24,58,99,0.1))]" />
          <div className="pointer-events-none absolute left-[-10%] top-[-18%] h-56 w-56 rounded-full bg-avanta-green/10 blur-3xl" />
          <div className="pointer-events-none absolute right-[-6%] bottom-[-24%] h-72 w-72 rounded-full bg-avanta-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(135deg,transparent_0,transparent_48%,rgba(255,255,255,0.16)_48.2%,transparent_48.5%,transparent_100%)]" />

          <div className="relative grid gap-10 lg:grid-cols-[1.14fr_0.86fr_0.9fr_0.95fr] lg:gap-12">
            <div>
              <LogoMark className="h-12 sm:h-14" />

              <p className="mt-5 max-w-sm text-[15px] leading-8 text-white/76">
                {mode === "site"
                  ? "Аванта Телеком — домашний интернет, телевидение, видеонаблюдение и сервисы для квартиры и частного дома."
                  : "Концептуальная версия сайта с акцентом на структуру, сценарии навигации и подачу сервисов."}
              </p>

              {mode === "site" ? (
                <>
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

                  <div className="mt-5 space-y-1.5 text-sm text-white/76">
                    <p>Оплата: номер договора без разделительных символов, минимальный платеж 300 ₽.</p>
                    <div className="flex flex-wrap gap-4 text-sm">
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
                        className="font-semibold text-white/86 transition hover:text-avanta-green"
                      >
                        Личный кабинет
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to={switchHref}
                  className="mt-6 inline-flex text-sm font-semibold text-avanta-green transition hover:text-white"
                >
                  {switchLabel}
                </Link>
              )}
            </div>

            <div>
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

            <div>
              <p className="text-sm font-semibold tracking-[0.08em] text-white/48">Популярное</p>
              <div className="mt-5 grid gap-3">
                {popularLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="inline-flex w-fit justify-self-start text-[15px] font-medium text-white/88 transition hover:text-avanta-green"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-[0.08em] text-white/48">Контакты</p>
              <div className="mt-5 space-y-2.5 text-[15px] text-white/74">
                {mode === "site" ? (
                  <>
                    <a href="tel:+78612900999" className="block font-semibold text-white transition hover:text-avanta-green">
                      +7 (861) 290-09-99
                    </a>
                    <a href="tel:+79282100999" className="block font-semibold text-white transition hover:text-avanta-green">
                      +7 (928) 210-09-99
                    </a>
                    <a href="mailto:info@avanta-telecom.ru" className="block transition hover:text-avanta-green">
                      info@avanta-telecom.ru
                    </a>
                    <a href="mailto:support@avanta-telecom.ru" className="block transition hover:text-avanta-green">
                      support@avanta-telecom.ru
                    </a>
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

          <div className="relative mt-9 border-t border-white/12 pt-4">
            <div className="flex flex-col gap-3 text-xs text-white/56 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Аванта Телеком. Все права защищены.</p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to={to("/contacts")} className="transition hover:text-avanta-green">
                  Контакты
                </Link>
                {mode === "site" ? (
                  <Link to={to("/payment")} className="transition hover:text-avanta-green">
                    Оплата
                  </Link>
                ) : null}
                <a
                  href="https://avanta-telecom.ru/upload/iblock/a0d/a0d2b83bb0e606edec5ce13830647280.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-avanta-green"
                >
                  Политика данных
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
