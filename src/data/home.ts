import {
  Building2,
  Cable,
  Camera,
  House,
  Rocket,
  ShieldCheck,
  Tv,
  Wifi,
  Zap,
} from "lucide-react";
import type { FeatureItem, ScenarioCard, ServiceItem } from "@/types/content";

export const heroStats = [
  { value: "до 1 Гбит/с", label: "скорость на популярных тарифах" },
  { value: "24/7", label: "техподдержка и мониторинг линии" },
  { value: "1 день", label: "средний срок demo-подключения" },
];

export const scenarioCards: ScenarioCard[] = [
  {
    title: "Квартира",
    description: "Быстрый интернет для стриминга, игр и всей домашней экосистемы.",
    href: "/tariffs?tab=apartment",
    icon: Building2,
    tag: "Стабильный Wi-Fi",
  },
  {
    title: "Частный дом",
    description: "Подключение с усилением покрытия и вниманием к дальним комнатам.",
    href: "/tariffs?tab=house",
    icon: House,
    tag: "Mesh и усиление сигнала",
  },
  {
    title: "Интернет + ТВ",
    description: "Пакеты для семейных сценариев с онлайн-кинотеатрами и ТВ.",
    href: "/tariffs?tab=bundle",
    icon: Tv,
    tag: "Семейный пакет",
  },
  {
    title: "Видеонаблюдение",
    description: "Готовые комплекты камер с приложением и демо-мониторингом.",
    href: "/surveillance",
    icon: Camera,
    tag: "Безопасность 24/7",
  },
  {
    title: "Для бизнеса",
    description: "Выделенные решения, SLA и гибкая настройка каналов связи.",
    href: "/tariffs?tab=business",
    icon: Cable,
    tag: "Под офис и точки продаж",
  },
];

export const featureItems: FeatureItem[] = [
  {
    title: "Понятные тарифы без визуального шума",
    description:
      "Сильная подача тарифов, где скорость, выгода и сценарий подключения считываются за пару секунд.",
    icon: Rocket,
    accent: "from-avanta-green/15 to-avanta-emerald/5",
  },
  {
    title: "Техподдержка и монтаж как часть продукта",
    description:
      "Мы показываем заботу через сервис: быстрый выезд, понятные статусы заявки и аккуратный монтаж.",
    icon: ShieldCheck,
    accent: "from-avanta-navy/15 to-avanta-teal/5",
  },
  {
    title: "Диджитальный язык бренда",
    description:
      "Диагонали, острые формы и зелёно-синий градиент создают ощущение технологичности и уверенности.",
    icon: Zap,
    accent: "from-avanta-green/10 to-avanta-navy/10",
  },
  {
    title: "Гибкая экосистема услуг",
    description:
      "Интернет, телевидение, видеонаблюдение и бизнес-решения соединяются в одну цельную витрину.",
    icon: Wifi,
    accent: "from-avanta-teal/15 to-avanta-graphite/5",
  },
];

export const extraServices: ServiceItem[] = [
  {
    title: "Wi-Fi 6 и mesh-покрытие",
    description: "Подбираем роутер, усиливаем сигнал, проектируем покрытие под планировку.",
    href: "/contacts#application",
    icon: Wifi,
    meta: "Для квартиры и дома",
  },
  {
    title: "Интерактивное ТВ и онлайн-кинотеатры",
    description: "Добавляем ТВ-пакеты и витрину развлечений к домашнему интернету.",
    href: "/tariffs?tab=bundle",
    icon: Tv,
    meta: "Семейные сценарии",
  },
  {
    title: "Видеонаблюдение под ключ",
    description: "Камеры, хранение архива, мобильный доступ и консультация по размещению.",
    href: "/surveillance",
    icon: Camera,
    meta: "Для дома и бизнеса",
  },
];

