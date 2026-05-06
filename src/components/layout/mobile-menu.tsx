import { useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BadgePercent,
  Building2,
  Cable,
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
  X,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo-mark";
import { cn } from "@/lib/utils";
import { useSiteMode } from "@/lib/site-mode";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const navIcons: Record<string, LucideIcon> = {
  Главная: House,
  Интернет: Wifi,
  "Для бизнеса": Building2,
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
  "Интернет в квартиру": Wifi,
  "Интернет в частный дом": House,
  "Интернет + ТВ": Tv,
};

const b2bSectionItems = [
  { label: "Обзор", href: "/business" },
  { label: "Интернет", href: "/business/internet" },
  { label: "Видеонаблюдение", href: "/business/surveillance" },
  { label: "Умные сервисы", href: "/business/smart" },
  { label: "Оборудование", href: "/business/equipment" },
  { label: "Сервисные услуги", href: "/business/services" },
  { label: "Инфраструктура", href: "/business/infrastructure" },
] as const;

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const location = useLocation();
  const { mode, navigation, switchHref, switchLabel, to } = useSiteMode();
  const homeHref = to("/");
  const businessHref = to("/business");
  const isBusinessRoute =
    mode === "site" &&
    (location.pathname === businessHref || location.pathname.startsWith(`${businessHref}/`));
  const connectHref = isBusinessRoute
    ? `${businessHref}?action=connect#application`
    : to("/?action=connect#application");
  const checkAddressHref = isBusinessRoute
    ? `${businessHref}?action=check-address#application`
    : to("/?action=check-address#application");
  const businessItem = mode === "site" ? navigation.find((item) => item.label === "Для бизнеса") ?? null : null;
  const menuNavigation =
    mode === "site" ? navigation.filter((item) => item.label !== "Для бизнеса") : navigation;
  const businessSectionNavigation = b2bSectionItems.map((item) => ({ ...item, href: to(item.href) }));

  const openBusinessRequestModal = () => {
    window.dispatchEvent(
      new CustomEvent("open-business-request", {
        detail: { action: "connect" },
      }),
    );
    onClose();
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    onClose();
  }, [location.pathname, location.search, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-avanta-pine/55 backdrop-blur-sm xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-[88vw] max-w-sm flex-col border-l border-white/20 bg-[linear-gradient(165deg,#f8fcfb_0%,#eef5f2_52%,#e5efea_100%)] p-5 shadow-2xl xl:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
          >
            <div className="flex items-center justify-between">
              <LogoMark className="h-10" />
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-avanta-navy/12 bg-white/85 text-avanta-navy shadow-panel transition hover:border-avanta-green/30 hover:text-avanta-emerald"
                onClick={onClose}
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-avanta-navy/56">
              {mode === "site" ? "Меню сайта" : "Меню концепта"}
            </p>

            <nav className="mt-5 flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
              {mode === "site" && isBusinessRoute ? (
                <div className="rounded-[18px] border border-avanta-navy/10 bg-white/70 p-3">
                  <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-avanta-navy/58">
                    Навигация B2B
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {businessSectionNavigation.map((item) => (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        end={item.href.endsWith("/business")}
                        className={({ isActive }) =>
                          cn(
                            "inline-flex h-8 items-center rounded-full border px-3 text-xs font-semibold transition",
                            isActive
                              ? "border-[#2f7dad] bg-[linear-gradient(140deg,#2f7dad,#215e86)] text-white"
                              : "border-[#b8cad7] bg-white text-avanta-navy",
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : null}

              {businessItem ? (
                <NavLink
                  to={businessItem.href}
                  className={({ isActive }) =>
                    cn(
                      "cut-corner-sm inline-flex items-center gap-3 rounded-[20px] border px-4 py-3.5 text-sm font-bold transition",
                      isActive
                        ? "border-[#2f7dad] bg-[linear-gradient(140deg,#2f7dad,#215e86)] text-white shadow-[0_16px_28px_-18px_rgba(23,73,108,0.6)]"
                        : "border-[#8cb0c9] bg-[linear-gradient(140deg,rgba(236,245,251,0.98),rgba(225,237,247,0.96))] text-[#1d4d73]",
                    )
                  }
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#1f618d] shadow-[0_8px_18px_-14px_rgba(24,58,99,0.45)]">
                    <Building2 className="h-4 w-4" />
                  </span>
                  Для бизнеса
                </NavLink>
              ) : null}

              {menuNavigation.map((item) => {
                const Icon = navIcons[item.label] ?? Menu;

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={!item.href.includes("/blog")}
                    className={({ isActive }) =>
                      cn(
                        "cut-corner-sm inline-flex items-center gap-3 rounded-[20px] border border-avanta-navy/10 bg-white/80 px-4 py-3.5 text-sm font-semibold text-avanta-navy transition",
                        "hover:border-avanta-green/24 hover:bg-white",
                        isActive &&
                          "border-avanta-green/25 bg-[linear-gradient(135deg,rgba(58,170,53,0.15),rgba(255,255,255,0.96))] shadow-[0_14px_28px_-20px_rgba(58,170,53,0.48)]",
                      )
                    }
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-avanta-emerald shadow-[0_8px_18px_-14px_rgba(24,58,99,0.45)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-5 grid gap-2">
              {mode === "concept" ? (
                <Button asChild variant="ghost" size="lg" className="h-11">
                  <Link to={switchHref}>{switchLabel}</Link>
                </Button>
              ) : null}
              {!isBusinessRoute ? (
                <Button asChild variant="secondary" size="lg" className="h-11">
                  <Link to={checkAddressHref}>Проверить адрес</Link>
                </Button>
              ) : null}
              {isBusinessRoute ? (
                <Button size="lg" className="h-11 bg-[linear-gradient(135deg,#3aaa35,#178b66)]" onClick={openBusinessRequestModal}>
                  Подключить
                </Button>
              ) : (
                <Button asChild size="lg" className="h-11 bg-[linear-gradient(135deg,#3aaa35,#178b66)]">
                  <Link to={connectHref}>Подключить</Link>
                </Button>
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
