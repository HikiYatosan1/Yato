import { Camera, HardDrive, MonitorPlay, Shield } from "lucide-react";
import type { EquipmentItem, FeatureItem, VideoPackage } from "@/types/content";

export const surveillanceBenefits: FeatureItem[] = [
  {
    title: "Один поставщик связи и безопасности",
    description: "Интернет и камеры под одной витриной упрощают подключение и восприятие услуги.",
    icon: Shield,
    accent: "from-avanta-green/15 to-avanta-teal/5",
  },
  {
    title: "Доступ к камерам с телефона и ноутбука",
    description: "Пользователь сразу понимает, как будет устроен просмотр, архив и оповещения.",
    icon: MonitorPlay,
    accent: "from-avanta-navy/15 to-avanta-teal/5",
  },
  {
    title: "Готовые пакеты без сложного выбора",
    description: "Демо-сайт показывает понятные конфигурации, а не перегруженный технический каталог.",
    icon: Camera,
    accent: "from-avanta-emerald/15 to-avanta-navy/5",
  },
];

export const surveillancePackages: VideoPackage[] = [
  {
    title: "Start 2",
    price: "1 490 ₽/мес",
    description: "Две камеры и базовый архив для квартиры, подъезда или небольшой территории.",
    features: ["2 HD-камеры", "Архив до 7 дней", "Мобильное приложение"],
  },
  {
    title: "Home 4",
    price: "2 690 ₽/мес",
    description: "Полноценный комплект для дома: двор, входная группа, парковка и обзор периметра.",
    features: ["4 Full HD-камеры", "Ночное видение", "Архив до 30 дней"],
  },
  {
    title: "Business 8",
    price: "от 5 900 ₽/мес",
    description: "Набор для офиса, магазина или склада с приоритетом качества и удалённого контроля.",
    features: ["До 8 камер", "Доступ для нескольких ролей", "Рекомендации по размещению"],
  },
];

export const equipmentItems: EquipmentItem[] = [
  {
    kind: "camera",
    title: "IP-камеры с ночным режимом",
    description: "Подбираем набор камер под интерьер, улицу или входные группы.",
    icon: Camera,
  },
  {
    kind: "switch",
    title: "Локальный или облачный архив",
    description: "Можно показать разницу между домашним сценарием и более серьёзным бизнес-контролем.",
    icon: HardDrive,
  },
  {
    kind: "camera",
    title: "Панель просмотра для оператора",
    description: "Сильный B2B-сценарий: мониторинг нескольких зон в одном интерфейсе.",
    icon: MonitorPlay,
  },
];

