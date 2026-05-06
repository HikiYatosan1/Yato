import { createContext, useContext, useMemo, type PropsWithChildren } from "react";
import type { NavItem } from "@/types/content";

export type SiteMode = "site" | "concept";

type SiteModeContextValue = {
  mode: SiteMode;
  basePath: string;
  altBasePath: string;
  to: (path: string) => string;
  navigation: NavItem[];
  switchHref: string;
  switchLabel: string;
};

const SiteModeContext = createContext<SiteModeContextValue | null>(null);

function normalizeBasePath(mode: SiteMode) {
  return mode === "concept" ? "/concept" : "/";
}

function prefixPath(basePath: string, path: string) {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const url = new URL(path, "https://local.avanta");

  if (basePath === "/") {
    return `${url.pathname}${url.search}${url.hash}`;
  }

  const pathname = url.pathname === "/" ? basePath : `${basePath}${url.pathname}`;
  return `${pathname}${url.search}${url.hash}`;
}

function buildNavigation(mode: SiteMode, basePath: string): NavItem[] {
  if (mode === "site") {
    return [
      { label: "Главная", href: prefixPath(basePath, "/") },
      { label: "Интернет в квартиру", href: prefixPath(basePath, "/internet-apartment") },
      { label: "Интернет в частный дом", href: prefixPath(basePath, "/internet-house") },
      { label: "Интернет + ТВ", href: prefixPath(basePath, "/internet-tv") },
      { label: "Для бизнеса", href: prefixPath(basePath, "/business") },
      { label: "Подбор тарифа", href: prefixPath(basePath, "/tariff-calculator") },
      { label: "ТВ", href: prefixPath(basePath, "/tv") },
      { label: "Видеонаблюдение", href: prefixPath(basePath, "/surveillance") },
      { label: "Акции", href: prefixPath(basePath, "/promotions") },
      { label: "Смарт", href: prefixPath(basePath, "/smart") },
      { label: "Блог", href: prefixPath(basePath, "/blog") },
      { label: "Помощь", href: prefixPath(basePath, "/help") },
      { label: "Оплата", href: prefixPath(basePath, "/payment") },
      { label: "Контакты", href: prefixPath(basePath, "/contacts") },
    ];
  }

  return [
    { label: "Главная", href: prefixPath(basePath, "/") },
    { label: "Тарифы", href: prefixPath(basePath, "/tariffs") },
    { label: "Видеонаблюдение", href: prefixPath(basePath, "/surveillance") },
    { label: "Акции", href: prefixPath(basePath, "/promotions") },
    { label: "Контакты", href: prefixPath(basePath, "/contacts") },
  ];
}

export function SiteModeProvider({
  children,
  mode,
}: PropsWithChildren<{ mode: SiteMode }>) {
  const value = useMemo<SiteModeContextValue>(() => {
    const basePath = normalizeBasePath(mode);
    const altBasePath = normalizeBasePath(mode === "site" ? "concept" : "site");

    return {
      mode,
      basePath,
      altBasePath,
      to: (path: string) => prefixPath(basePath, path),
      navigation: buildNavigation(mode, basePath),
      switchHref: prefixPath(altBasePath, "/"),
      switchLabel: mode === "site" ? "Концепт" : "Версия сайта",
    };
  }, [mode]);

  return <SiteModeContext.Provider value={value}>{children}</SiteModeContext.Provider>;
}

export function useSiteMode() {
  const context = useContext(SiteModeContext);

  if (!context) {
    throw new Error("useSiteMode must be used within SiteModeProvider");
  }

  return context;
}

