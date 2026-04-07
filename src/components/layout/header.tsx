import { useCallback, useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BadgePercent,
  Cable,
  ChevronDown,
  CircleHelp,
  CreditCard,
  House,
  MapPinned,
  Menu,
  MessageSquareText,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Tv,
  Wifi,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LogoMark } from "@/components/logo-mark";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSiteMode } from "@/lib/site-mode";

const navIcons: Record<string, LucideIcon> = {
  Главная: House,
  Интернет: Wifi,
  "Подбор тарифа": SlidersHorizontal,
  ТВ: Tv,
  Видеонаблюдение: ShieldCheck,
  Акции: BadgePercent,
  Смарт: Smartphone,
  Блог: MessageSquareText,
  Помощь: CircleHelp,
  Оплата: CreditCard,
  Контакты: MapPinned,
  Тарифы: Cable,
};

const secondaryMeta: Record<string, string> = {
  Смарт: "Умный домофон и доступ",
  "Подбор тарифа": "Мини-мастер персонального подбора",
  Блог: "Полезные статьи и новости",
  Помощь: "Личный кабинет, баланс и FAQ",
  Оплата: "Онлайн-платежи и личный кабинет",
  Контакты: "Телефоны и офис",
  Тарифы: "Линейки и скорость",
};

const primarySiteLabels = new Set(["Главная", "Интернет", "ТВ", "Видеонаблюдение", "Акции"]);

export function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);

  const { mode, navigation, switchHref, switchLabel, to } = useSiteMode();
  const location = useLocation();
  const homeHref = to("/");

  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!moreOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [moreOpen]);

  const primaryNavigation = useMemo(() => {
    if (mode !== "site") {
      return navigation;
    }

    return navigation.filter((item) => primarySiteLabels.has(item.label));
  }, [mode, navigation]);

  const secondaryNavigation = useMemo(() => {
    if (mode !== "site") {
      return [];
    }

    return navigation.filter((item) => !primarySiteLabels.has(item.label));
  }, [mode, navigation]);

  const hasSecondaryActive = useMemo(
    () =>
      secondaryNavigation.some((item) => {
        const hrefPath = new URL(item.href, "https://local.avanta").pathname;
        return location.pathname === hrefPath || location.pathname.startsWith(`${hrefPath}/`);
      }),
    [location.pathname, secondaryNavigation],
  );

  return (
    <>
      <header className="sticky top-0 z-30 px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="container">
          <div className="relative rounded-[32px] border border-white/70 bg-[linear-gradient(128deg,rgba(252,255,255,0.94),rgba(243,250,248,0.9)_48%,rgba(235,246,242,0.88))] shadow-[0_28px_52px_-36px_rgba(15,41,63,0.55),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top_left,rgba(58,170,53,0.1),transparent_38%),radial-gradient(circle_at_top_right,rgba(24,58,99,0.09),transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.28),transparent_54%)]" />

            <div className="relative grid h-[88px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 xl:px-6">
              <Link to={homeHref} aria-label="Аванта Телеком" className="shrink-0">
                <LogoMark className="h-10 w-auto max-w-[188px] sm:h-11" />
              </Link>

              <nav className="hidden min-w-0 justify-start xl:flex 2xl:justify-center">
                <div className="relative flex max-w-full items-center gap-4 2xl:gap-5">
                  {primaryNavigation.map((item) => {
                    return (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        end={item.href === homeHref}
                        className={({ isActive }) =>
                          cn(
                            "group relative inline-flex items-center py-2.5 text-[1.08rem] font-semibold leading-none tracking-[-0.012em] transition-colors duration-250",
                            isActive ? "text-[#16344d]" : "text-[#3d5b71] hover:text-[#173c59]",
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span>{item.label}</span>
                            <span
                              className={cn(
                                "absolute inset-x-0 -bottom-[4px] h-[2.5px] rounded-full bg-[linear-gradient(90deg,#3aaa35,#1f8c66)] transition-opacity",
                                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-35",
                              )}
                            />
                          </>
                        )}
                      </NavLink>
                    );
                  })}

                  {secondaryNavigation.length > 0 ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setMoreOpen((prev) => !prev)}
                        className={cn(
                          "inline-flex items-center gap-1.5 py-2.5 text-[1.08rem] font-semibold leading-none tracking-[-0.012em] transition-colors duration-250",
                          moreOpen || hasSecondaryActive
                            ? "text-[#16344d]"
                            : "text-[#3d5b71] hover:text-[#173c59]",
                        )}
                        aria-expanded={moreOpen}
                        aria-haspopup="menu"
                      >
                        Ещё
                        <ChevronDown className={cn("h-4 w-4 transition", moreOpen && "rotate-180")} />
                      </button>

                      {moreOpen ? (
                        <div className="absolute right-0 top-[calc(100%+14px)] z-50 w-[330px] rounded-[20px] border border-white/80 bg-[linear-gradient(170deg,rgba(255,255,255,0.94),rgba(241,248,251,0.93)_52%,rgba(233,243,248,0.91))] p-2.5 shadow-[0_34px_60px_-34px_rgba(12,42,66,0.58),inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur-xl">
                          {secondaryNavigation.map((item) => {
                            const Icon = navIcons[item.label] ?? House;

                            return (
                              <NavLink
                                key={item.href}
                                to={item.href}
                                className={({ isActive }) =>
                                  cn(
                                    "grid grid-cols-[18px_1fr] items-start gap-2.5 rounded-[12px] px-3 py-2.5 transition",
                                    "hover:bg-white/88 hover:shadow-[0_18px_30px_-26px_rgba(12,42,66,0.45)]",
                                    isActive && "bg-white/90 shadow-[0_18px_30px_-26px_rgba(12,42,66,0.45)]",
                                  )
                                }
                              >
                                <Icon className="mt-[2px] h-4 w-4 text-[#2ea363]" />
                                <span>
                                  <span className="block text-[1rem] font-semibold text-[#102e47]">{item.label}</span>
                                  <span className="mt-0.5 block text-[0.8rem] leading-5 text-[#4c6173]">
                                    {secondaryMeta[item.label] ?? "Раздел сайта"}
                                  </span>
                                </span>
                              </NavLink>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </nav>

              <div className="hidden shrink-0 items-center gap-3 border-l border-[#c7d8e2]/85 pl-5 xl:flex">
                {mode === "concept" ? (
                  <Button asChild variant="ghost" size="sm" className="hidden h-12 px-5 text-[0.92rem] 2xl:inline-flex">
                    <Link to={switchHref}>{switchLabel}</Link>
                  </Button>
                ) : null}
                <Link
                  to={to("/?action=check-address#application")}
                  className="group inline-flex h-12 items-center gap-2.5 rounded-[16px] border border-[#8eb0ca] bg-[linear-gradient(148deg,rgba(255,255,255,0.92),rgba(230,242,251,0.88)_55%,rgba(216,233,246,0.9))] px-6 text-[1.03rem] font-semibold tracking-[-0.01em] text-[#1a4a6f] shadow-[0_20px_30px_-24px_rgba(16,55,88,0.62),inset_0_1px_0_rgba(255,255,255,0.92)] transition duration-300 hover:-translate-y-[1px] hover:border-[#79a2c2] hover:text-[#133d5f] hover:shadow-[0_24px_34px_-22px_rgba(16,55,88,0.62),inset_0_1px_0_rgba(255,255,255,0.96)]"
                >
                  <MapPinned className="h-[1.05rem] w-[1.05rem] text-[#2a7f8d] transition group-hover:text-[#1f6d87]" />
                  Проверить адрес
                </Link>
                <Link
                  to={to("/?action=connect#application")}
                  className="inline-flex h-12 items-center rounded-[16px] bg-[linear-gradient(135deg,#259651,#13815f)] px-7 text-[1.03rem] font-semibold tracking-[-0.01em] text-white shadow-[0_20px_34px_-24px_rgba(15,96,76,0.72),inset_0_1px_0_rgba(255,255,255,0.22)] transition duration-300 hover:-translate-y-[1px] hover:brightness-105 hover:shadow-[0_24px_38px_-24px_rgba(15,96,76,0.8)]"
                >
                  Подключить
                </Link>
              </div>

              <button
                type="button"
                className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#c8d8e4] bg-white text-[#35506a] shadow-[0_10px_20px_-16px_rgba(16,42,66,0.45)] transition hover:border-[#a6c2d6] hover:text-[#1f7f63] xl:hidden"
                onClick={() => setOpen(true)}
                aria-label="Открыть меню"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {moreOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-20 hidden bg-[#163a54]/18 backdrop-blur-[4px] xl:block"
          onClick={() => setMoreOpen(false)}
          aria-label="Закрыть меню разделов"
        />
      ) : null}

      <MobileMenu open={open} onClose={closeMenu} />
    </>
  );
}
