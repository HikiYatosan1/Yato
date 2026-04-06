import { useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BadgePercent,
  Cable,
  CreditCard,
  House,
  MapPinned,
  Menu,
  MessageSquareText,
  ShieldCheck,
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
  ТВ: Tv,
  Видеонаблюдение: ShieldCheck,
  Акции: BadgePercent,
  Смарт: Smartphone,
  Блог: MessageSquareText,
  Оплата: CreditCard,
  Контакты: MapPinned,
  Тарифы: Cable,
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const location = useLocation();
  const { mode, navigation, switchHref, switchLabel, to } = useSiteMode();
  const homeHref = to("/");

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
              {navigation.map((item) => {
                const Icon = navIcons[item.label] ?? Menu;

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href === homeHref}
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
              <Button asChild variant="secondary" size="lg" className="h-11">
                <Link to={to("/?action=check-address#application")}>Проверить адрес</Link>
              </Button>
              <Button asChild size="lg" className="h-11 bg-[linear-gradient(135deg,#3aaa35,#178b66)]">
                <Link to={to("/?action=connect#application")}>Подключить</Link>
              </Button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
