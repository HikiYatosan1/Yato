import {
  Cable,
  Camera,
  Clock3,
  Headset,
  House,
  Eye,
  Mail,
  MapPin,
  MapPinned,
  MonitorPlay,
  Newspaper,
  PhoneCall,
  Router,
  Radio,
  ShieldCheck,
  Smartphone,
  Tv,
  Wifi,
  Zap,
} from "lucide-react";
import type {
  BlogArticle,
  BlogPost,
  CameraMapPoint,
  ContactMethod,
  EquipmentItem,
  FAQItem,
  FeatureItem,
  PromoItem,
  ScenarioCard,
  ServiceItem,
  SmartLanding,
  Tariff,
  TariffCategory,
  TVPackage,
  TVPlatform,
  VideoPackage,
} from "@/types/content";

export const siteHeroStats = [
  { value: "до 500 Мбит/с", label: "скорость домашнего интернета" },
  { value: "с 2015 года", label: "работаем в Краснодаре и крае" },
  { value: "от 1 дня", label: "средний срок подключения" },
];

export const siteBrandBanners = [
  "/brand/banners/internet-banner-1.jpg",
  "/brand/banners/internet-banner-2.jpg",
  "/brand/banners/internet-banner-3.jpg",
  "/brand/banners/internet-banner-4.jpg",
];

export const siteScenarioCards: ScenarioCard[] = [
  {
    title: "Интернет в квартиру",
    description: "Домашний интернет для квартиры с высокой скоростью и стабильным Wi‑Fi.",
    href: "/internet-apartment#tariffs",
    icon: Wifi,
    tag: "Для квартиры",
    imageUrl: "/site/internet/cards/xpon-card.svg",
  },
  {
    title: "Интернет для квартиры",
    description: "Подберите тариф под адрес, количество устройств и привычные домашние задачи.",
    href: "/internet-apartment#tariffs",
    icon: Cable,
    tag: "Квартира",
    imageUrl: "/site/internet/cards/ftth-card.svg",
  },
  {
    title: "Частный дом",
    description: "Интернет и пакетные предложения для дома с подбором по адресу.",
    href: "/internet-house#tariffs",
    icon: House,
    tag: "Дом",
    imageUrl: "/site/internet/cards/house-card.svg",
  },
  {
    title: "Интернет + ТВ",
    description: "Пакеты с телевидением, архивом передач и онлайн-кинотеатрами.",
    href: "/internet-tv#tariffs",
    icon: Tv,
    tag: "Пакеты",
    imageUrl: "/site/internet/cards/bundle-card.svg",
  },
  {
    title: "Видеонаблюдение",
    description: "Камеры, архив и удалённый просмотр для квартиры, дома и двора.",
    href: "/surveillance",
    icon: Camera,
    tag: "Сервис",
    imageUrl: "/site/blog/cloud-cctv.png",
  },
];

export const siteFeatures: FeatureItem[] = [
  {
    title: "Интернет для дома и квартиры",
    description: "На главной сразу видно тарифы для квартиры, частного дома и пакетные предложения.",
    icon: Cable,
    accent: "from-avanta-green/15 to-avanta-emerald/5",
    imageUrl: "/site/blog/internet-home.png",
    imageClassName: "object-[center_52%]",
  },
  {
    title: "Подключение без лишних шагов",
    description: "Проверка адреса и заявка на подключение собраны в одном понятном сценарии прямо на главной странице.",
    icon: MapPinned,
    accent: "from-avanta-navy/15 to-avanta-teal/5",
    imageUrl: "/site/internet/about-service.png",
    imageClassName: "object-[center_44%]",
  },
  {
    title: "ТВ на удобных устройствах",
    description: "Смотрёшка, архив передач, пауза эфира и доступ на Smart TV, смартфонах и ноутбуках.",
    icon: Tv,
    accent: "from-avanta-teal/15 to-avanta-navy/5",
    imageUrl: "/site/blog/digital-tv.png",
    imageClassName: "object-[center_48%]",
  },
  {
    title: "Сервисы для дома",
    description: "Видеонаблюдение, Аванта Смарт и полезные материалы в блоге рядом с основными услугами.",
    icon: ShieldCheck,
    accent: "from-avanta-green/10 to-avanta-navy/10",
    imageUrl: "/site/blog/cloud-cctv.png",
    imageClassName: "object-[center_45%]",
  },
];

export const siteServices: ServiceItem[] = [
  {
    title: "Телевидение",
    description: "Пакеты каналов, онлайн-кинотеатры и просмотр на разных устройствах.",
    href: "/tv",
    icon: Tv,
    meta: "Смотрёшка",
    imageUrl: "/site/blog/digital-tv.png",
  },
  {
    title: "Видеонаблюдение",
    description: "Тарифы для облачного хранения архива и камеры для дома, квартиры или двора.",
    href: "/surveillance",
    icon: Camera,
    meta: "Для дома",
    imageUrl: "/site/blog/cloud-cctv.png",
  },
  {
    title: "Блог",
    description: "Новости компании, статьи про телевидение, соцтарифы и смарт-сервисы.",
    href: "/blog",
    icon: Newspaper,
    meta: "Новое и популярное",
    imageUrl: "/site/blog/internet-home.png",
  },
  {
    title: "Аванта Смарт",
    description: "Умный домофон и умный шлагбаум на отдельных лендингах компании.",
    href: "/smart",
    icon: Smartphone,
    meta: "Смарт",
    imageUrl: "/site/blog/umnyy-domofon.png",
  },
];

export const siteTariffLabels: Partial<Record<TariffCategory, string>> = {
  house: "Частный дом",
  xpon: "Квартира",
  ftth: "Квартира",
  bundle: "Интернет + ТВ",
};

export const siteTariffCategories: TariffCategory[] = ["house", "xpon", "ftth", "bundle"];

export const siteTariffs: Tariff[] = [
  {
    id: "house-radost",
    name: "Хочу радость",
    category: "house",
    speed: "100 Мбит/с",
    price: "980 ₽/мес",
    description: "Базовый тариф для частного дома с комфортной скоростью на каждый день.",
    features: ["Безлимитный интернет", "Для дома", "Подбор подключения по адресу"],
  },
  {
    id: "house-vostorg",
    name: "Хочу восторг",
    category: "house",
    speed: "150 Мбит/с",
    price: "1 090 ₽/мес",
    description: "Скорость с запасом для семьи, Smart TV и нескольких устройств.",
    features: ["Частный дом", "Стабильная работа Wi‑Fi", "Для семьи"],
  },
  {
    id: "house-lyubov",
    name: "Хочу любовь",
    category: "house",
    speed: "250 Мбит/с",
    price: "1 300 ₽/мес",
    description: "Подходит для активной домашней сети, видео и онлайн-развлечений.",
    features: ["До 250 Мбит/с", "Для стриминга", "Запас по скорости"],
  },
  {
    id: "house-schastye",
    name: "Хочу счастье",
    category: "house",
    speed: "500 Мбит/с",
    price: "1 640 ₽/мес",
    description: "Максимальная скорость для частного дома и тяжёлых сценариев.",
    features: ["До 500 Мбит/с", "Для большого дома", "Популярный выбор"],
    badge: "Популярный",
    popular: true,
  },
  {
    id: "xpon-radost",
    name: "Хочу радость",
    category: "xpon",
    speed: "100 Мбит/с",
    price: "720 ₽/мес",
    description: "Базовый тариф для квартиры и повседневных задач.",
    features: ["Домашнее подключение", "Безлимитный интернет", "Для квартиры"],
  },
  {
    id: "xpon-vostorg",
    name: "Хочу восторг",
    category: "xpon",
    speed: "150 Мбит/с",
    price: "830 ₽/мес",
    description: "Оптимальный вариант для семьи, онлайн-кинотеатров и нескольких устройств.",
    features: ["Стабильная работа Wi‑Fi", "Для Smart TV", "Для нескольких устройств"],
  },
  {
    id: "xpon-lyubov",
    name: "Хочу любовь",
    category: "xpon",
    speed: "250 Мбит/с",
    price: "940 ₽/мес",
    description: "Тариф с запасом под стриминг, игры и активное использование интернета.",
    features: ["До 250 Мбит/с", "Для видео и игр", "Комфорт для семьи"],
  },
  {
    id: "xpon-schastye",
    name: "Хочу счастье",
    category: "xpon",
    speed: "500 Мбит/с",
    price: "1 100 ₽/мес",
    description: "Максимально быстрый тариф для квартиры.",
    features: ["До 500 Мбит/с", "Для тяжёлых сценариев", "Высокая скорость по всей квартире"],
    badge: "Популярный",
    popular: true,
  },
  {
    id: "ftth-min",
    name: "Минимальный",
    category: "ftth",
    speed: "50 Мбит/с",
    price: "550 ₽/мес",
    oldPrice: "850 ₽/мес",
    description: "Базовый тариф для домашнего подключения и привычных онлайн-задач.",
    features: ["Домашнее подключение", "Безлимитный интернет", "Для умеренной нагрузки"],
    badge: "Популярный",
    popular: true,
  },
  {
    id: "ftth-opt",
    name: "Оптимальный",
    category: "ftth",
    speed: "100 Мбит/с",
    price: "690 ₽/мес",
    oldPrice: "990 ₽/мес",
    description: "Оптимальная скорость для квартиры, видео, работы и нескольких устройств.",
    features: ["Для квартиры", "Стабильная скорость", "Подходит для видео и работы"],
  },
  {
    id: "bundle-min",
    name: "Минимальный + 181 ТВ канал",
    category: "bundle",
    speed: "50 Мбит/с",
    price: "715 ₽/мес",
    oldPrice: "980 ₽/мес",
    description: "Пакет интернета и ТВ для базового домашнего сценария.",
    features: ["181 ТВ-канал", "Пауза и архив эфира", "Интернет + ТВ в одном пакете"],
  },
  {
    id: "bundle-opt",
    name: "Оптимальный + 235 ТВ каналов",
    category: "bundle",
    speed: "100 Мбит/с",
    price: "980 ₽/мес",
    oldPrice: "1 350 ₽/мес",
    description: "Пакет для семьи с более широким составом каналов и комфортной скоростью.",
    features: ["235 ТВ-каналов", "Smart TV и смартфон", "Интернет + ТВ"],
  },
  {
    id: "bundle-radost",
    name: "Особенная радость",
    category: "bundle",
    speed: "100 Мбит/с",
    price: "800 ₽/мес",
    description: "Пакет интернета и телевидения для квартиры с одним подключением.",
    features: ["181 ТВ-канал", "Архив передач", "Для квартиры"],
  },
  {
    id: "bundle-vostorg",
    name: "Особенный восторг",
    category: "bundle",
    speed: "150 Мбит/с",
    price: "970 ₽/мес",
    description: "Пакет с комфортной скоростью и расширенным ТВ-сценарием.",
    features: ["235 ТВ-каналов", "Просмотр на нескольких устройствах", "Для семьи"],
  },
  {
    id: "bundle-lyubov",
    name: "Особенная любовь",
    category: "bundle",
    speed: "250 Мбит/с",
    price: "1 090 ₽/мес",
    description: "Скорость с запасом и пакет телевидения для активного использования дома.",
    features: ["236 ТВ-каналов", "Кинокаталог", "Для стриминга и ТВ"],
  },
  {
    id: "bundle-schastye",
    name: "Особенное счастье",
    category: "bundle",
    speed: "500 Мбит/с",
    price: "1 240 ₽/мес",
    description: "Максимальный пакет интернет + ТВ для квартиры.",
    features: ["236 ТВ-каналов", "Онлайн-кинотеатр", "Высокая скорость и ТВ"],
    badge: "Популярный",
    popular: true,
  },
];

export const siteFaqItems: FAQItem[] = [
  {
    question: "Как проверить возможность подключения по адресу?",
    answer:
      "Нажмите «Проверить адрес» на главной странице, укажите улицу, дом и телефон. Мы уточним, какие технологии и тарифы доступны именно по вашему адресу.",
  },
  {
    question: "За какое время подключают интернет?",
    answer:
      "Средний срок подключения — от одного дня. После заявки менеджер уточняет адрес, доступность и согласовывает удобное время выезда.",
  },
  {
    question: "Можно ли подключить интернет и ТВ одной заявкой?",
    answer:
      "Да, для этого есть отдельные пакетные тарифы и отдельный режим формы на главной странице.",
  },
  {
    question: "На каких устройствах работает телевидение?",
    answer:
      "Телевидение доступно на Smart TV, смартфонах, планшетах, ноутбуках и через браузер.",
  },
  {
    question: "Есть ли видеонаблюдение для дома?",
    answer:
      "Да, на отдельной странице собраны тарифы облачного видеонаблюдения, форматы камер и базовые сценарии использования.",
  },
];

export const sitePromotions: PromoItem[] = [
  {
    title: "Приведи друга",
    description: "Программа рекомендаций для абонентов Аванта Телеком.",
    details: "Если новый абонент подключается по вашей рекомендации, можно получить бонус в рамках акции.",
    deadline: "Актуально",
    badge: "Акция",
    featured: true,
    imageUrl: "/brand/banners/internet-banner-1.jpg",
  },
  {
    title: "Новые социальные тарифы",
    description: "Льготные предложения для отдельных категорий абонентов.",
    details: "На действующем сайте есть отдельная новость по новым социальным тарифам и условиям подключения.",
    deadline: "Актуально",
    badge: "Соцтарифы",
    imageUrl: "/brand/palette-board.jpg",
  },
  {
    title: "Купи сейчас — плати потом",
    description: "Удобный сценарий подключения оборудования без полной оплаты на старте.",
    details: "Подходит, если нужно подключить оборудование и распределить расходы более комфортно.",
    deadline: "Актуально",
    badge: "Оборудование",
    imageUrl: "/brand/banners/internet-banner-3.jpg",
  },
  {
    title: "Обещанный платёж",
    description: "Полезный сервис для действующих абонентов.",
    details: "Если нужно сохранить доступ к интернету, сервис обещанного платежа помогает не терять связь.",
    deadline: "Сервис",
    badge: "Поддержка",
    imageUrl: "/brand/pattern.jpg",
  },
];

export const siteSurveillanceBenefits: FeatureItem[] = [
  {
    title: "Онлайн-просмотр и архив",
    description: "Видео с камер доступно через приложение, а записи можно хранить в облаке по выбранному тарифу.",
    icon: MonitorPlay,
    accent: "from-avanta-green/15 to-avanta-teal/5",
    imageUrl: "/site/surveillance/benefits/online-archive.jpg",
    imageClassName: "!object-contain object-center bg-[#f5f7f7] p-2",
  },
  {
    title: "Для квартиры, дома и двора",
    description: "Сценарии подойдут для входной зоны, частного дома, парковки или прилегающей территории.",
    icon: House,
    accent: "from-avanta-navy/15 to-avanta-teal/5",
    imageUrl: "/site/surveillance/benefits/apartment-house-yard.jpg",
    imageClassName: "!object-contain object-center bg-[#f5f7f7] p-2",
  },
  {
    title: "Подключение через заявку",
    description: "Можно сразу обсудить интернет, ТВ и видеонаблюдение в одном обращении.",
    icon: Zap,
    accent: "from-avanta-emerald/15 to-avanta-navy/5",
    imageUrl: "/site/surveillance/benefits/request-connection.jpg",
    imageClassName: "!object-contain object-center bg-[#f5f7f7] p-2",
  },
];

export const siteSurveillancePackages: VideoPackage[] = [
  {
    title: "Только смотри!",
    price: "100 ₽/мес",
    description: "Базовый тариф для онлайн-просмотра без записи архива.",
    features: ["Просмотр online без записи", "24/7 доступность", "Базовый старт для одной камеры"],
    icon: Eye,
  },
  {
    title: "Одним глазком",
    price: "300 ₽/мес",
    description: "Тариф с архивом на 3 дня и доступом через веб-интерфейс и приложение.",
    features: ["1 камера", "Запись архива 3 дня", "24 кадра в секунду", "Веб-интерфейс и мобильные приложения"],
    icon: Clock3,
    badge: "Популярный",
    popular: true,
  },
  {
    title: "Смотри в оба",
    price: "490 ₽/мес",
    description: "Расширенный вариант с недельным архивом и трансляцией в социальные сети.",
    features: ["1 камера", "Запись архива 7 дней", "24 кадра в секунду", "Трансляция в социальные сети"],
    icon: Radio,
  },
  {
    title: "Большой брат",
    price: "690 ₽/мес",
    description: "Максимальный тариф для длинного архива и постоянного контроля территории.",
    features: ["1 камера", "Запись архива 10 дней", "24 кадра в секунду", "Веб-интерфейс и мобильные приложения"],
    icon: ShieldCheck,
  },
];

export const siteCameraMapPoints: CameraMapPoint[] = [
  {
    title: "Въезд и ворота",
    description: "Контроль въезда, шлагбаума и гостевого транспорта.",
    tag: "Периметр",
    x: "16%",
    y: "68%",
  },
  {
    title: "Подъезд и входная группа",
    description: "Обзор входа, домофонной зоны и движения по лестничной площадке.",
    tag: "Вход",
    x: "48%",
    y: "38%",
  },
  {
    title: "Двор и парковка",
    description: "Наблюдение за двором, машинами и общей территорией.",
    tag: "Двор",
    x: "73%",
    y: "55%",
  },
  {
    title: "Детская площадка",
    description: "Спокойный обзор зоны отдыха и проходов рядом с домом.",
    tag: "Территория",
    x: "31%",
    y: "24%",
  },
];

export const siteEquipmentItems: EquipmentItem[] = [
  {
    kind: "camera",
    title: "RVi-1NCMW2028",
    description: "Компактная Wi-Fi камера для квартиры, входной зоны или внутреннего помещения.",
    icon: Camera,
    price: "4 600 ₽",
    specs: ["Разрешение: 1080P", "Угол обзора: 103°", "Ночная съёмка: да", "Wi-Fi: да", "Матрица: 2 Мп@20 к/с"],
    imageUrl: "/site/cctv/rvi-1ncmw2028.png",
  },
  {
    kind: "camera",
    title: "PVC-IP2X-NF2.8P",
    description: "Базовая камера для входной группы, коридора или небольшого двора.",
    icon: ShieldCheck,
    price: "6 400 ₽",
    specs: ["Разрешение: 1080P/960P", "Угол обзора: 75°", "Ночная съёмка: да", "Матрица: 2 Мп@25 к/с"],
    imageUrl: "/site/cctv/pvc-ip2x-nf2.8p.png",
  },
  {
    kind: "camera",
    title: "PVC-IP5Z-WNF2.8PF",
    description: "5 Мп камера для более детальной картинки во дворе и на прилегающей территории.",
    icon: Camera,
    price: "6 900 ₽",
    specs: ["Разрешение: 2560", "Угол обзора: 92°", "Ночная съёмка: да", "Матрица: 5 Мп@25 к/с"],
    imageUrl: "/site/cctv/pvc-ip5z-wnf2.8pf.png",
  },
  {
    kind: "camera",
    title: "PVC-IP2Z-WDF2.8PF",
    description: "Универсальная купольная камера для входа, подъезда и общих зон.",
    icon: ShieldCheck,
    price: "6 200 ₽",
    specs: ["Разрешение: 1080P", "Угол обзора: 92°", "Ночная съёмка: да", "Матрица: 2 Мп@25 к/с"],
    imageUrl: "/site/cctv/pvc-ip2z-wdf2.8pf.png",
  },
  {
    kind: "camera",
    title: "PVC-IP2Y-NF2.8P",
    description: "Компактная камера для квартиры, подъезда и наблюдения за входной дверью.",
    icon: Camera,
    price: "6 300 ₽",
    specs: ["Разрешение: 1080P/960P", "Угол обзора: 90°", "Ночная съёмка: да", "Матрица: 2 Мп@25 к/с"],
    imageUrl: "/site/cctv/pvc-ip2y-nf2.8p.jpg",
  },
  {
    kind: "camera",
    title: "PVC-IP5X-NF2.8P",
    description: "5 Мп модель для двора, парковки и более детальной картинки на улице.",
    icon: ShieldCheck,
    price: "11 500 ₽",
    specs: ["Разрешение: 2560P", "Угол обзора: 92°", "Ночная съёмка: да", "Матрица: 5 Мп@15 к/с"],
    imageUrl: "/site/cctv/pvc-ip5x-nf2.8p.jpg",
  },
  {
    kind: "camera",
    title: "PVC-IP5X-NZ5MPF",
    description: "Продвинутая камера с микрофоном для сценариев, где нужен звук и детальная запись.",
    icon: MonitorPlay,
    price: "17 500 ₽",
    specs: ["Разрешение: 1080P/960P", "Ночная съёмка: да", "Встроенный микрофон: да", "Матрица: 5 Мп@25 к/с"],
    imageUrl: "/site/cctv/pvc-ip5x-nz5mpf.jpg",
  },
  {
    kind: "switch",
    title: "PND-04P-2M",
    description: "PoE-коммутатор на 4 порта для компактных комплектов видеонаблюдения.",
    icon: Cable,
    price: "3 900 ₽",
    specs: ["PoE-портов: 4", "Общий бюджет PoE: 60 Вт", "До 30 Вт на порт", "Передача данных: до 250 м"],
    imageUrl: "/site/cctv/pnd-04p-2m.png",
  },
  {
    kind: "switch",
    title: "PND-08P-2M",
    description: "PoE-коммутатор на 8 портов для расширенных систем дома, двора и парковки.",
    icon: Cable,
    price: "7 200 ₽",
    specs: ["PoE-портов: 8", "Общий бюджет PoE: 96 Вт", "До 30 Вт на порт", "Передача данных: до 250 м"],
    imageUrl: "/site/cctv/pnd-08p-2m.png",
  },
  {
    kind: "camera",
    title: "Подбор комплекта под объект",
    description: "Если нужен готовый сценарий под двор, входную группу или частный дом, менеджер подберёт комплект по задаче.",
    icon: MonitorPlay,
    specs: ["Подбор камер по зоне обзора", "Согласование архива и доступа", "Уточнение актуальной цены при заказе"],
  },
];

export const siteContactMethods: ContactMethod[] = [
  {
    title: "Телефон",
    value: "+7 (861) 290-09-99",
    description: "Подключение, проверка адреса и подбор тарифов.",
    href: "tel:+78612900999",
    icon: PhoneCall,
  },
  {
    title: "Доп. номер",
    value: "+7 (928) 210-09-99",
    description: "Дополнительный номер для консультаций и связи.",
    href: "tel:+79282100999",
    icon: Headset,
  },
  {
    title: "Почта",
    value: "info@avanta-telecom.ru",
    description: "Общие вопросы по услугам и подключению.",
    href: "mailto:info@avanta-telecom.ru",
    icon: Mail,
  },
  {
    title: "Офис",
    value: "г. Краснодар, ул. Пригородная, 177, офис 406",
    description: "Офис Аванта Телеком в Краснодаре.",
    href: "#map",
    icon: MapPin,
  },
  {
    title: "Режим работы",
    value: "Пн-Пт: 08:00-20:00",
    description: "Приём заявок через сайт доступен в любое время.",
    href: "#hours",
    icon: Clock3,
  },
];

export const siteInternetEquipmentItems: EquipmentItem[] = [
  {
    kind: "mesh",
    title: "Tenda Nova MW 6-3",
    description: "Mesh-комплект для большого дома или квартиры с расширенным покрытием Wi-Fi.",
    icon: Wifi,
    price: "11 990 ₽",
    imageUrl: "/site/internet/tenda-nova-mw6-3.jpg",
    specs: [
      "Площадь покрытия: до 300 м²",
      "Частоты: 2.4 / 5 ГГц",
      "Стандарт Wi-Fi: 802.11 a/b/g/n/ac",
      "2 LAN-порта, скорость до 1000 Мбит/с",
    ],
  },
  {
    kind: "mesh",
    title: "Tenda Nova MW 6-2",
    description: "Mesh-комплект для квартиры и дома, где важно стабильное покрытие без мёртвых зон.",
    icon: Wifi,
    price: "8 990 ₽",
    imageUrl: "/site/internet/tenda-nova-mw6-2.png",
    specs: [
      "Площадь покрытия: до 100 м²",
      "Частоты: 2.4 / 5 ГГц",
      "Стандарт Wi-Fi: 802.11 a/b/g/n/ac",
      "2 LAN-порта, скорость до 1000 Мбит/с",
    ],
  },
  {
    kind: "mesh",
    title: "Tenda Nova MW 3-2",
    description: "Компактный mesh для квартиры и небольшого дома с двухдиапазонным Wi-Fi.",
    icon: Wifi,
    price: "5 990 ₽",
    imageUrl: "/site/internet/tenda-nova-mw3-2.jpg",
    specs: [
      "Площадь покрытия: до 60 м²",
      "Частоты: 2.4 / 5 ГГц",
      "Стандарт Wi-Fi: 802.11 a/b/g/n/ac",
      "2 LAN-порта, скорость до 100 Мбит/с",
    ],
  },
  {
    kind: "router",
    title: "D-Link DIR-X1510",
    description: "Современный Wi-Fi 6 роутер для квартиры и домашней сети с несколькими устройствами.",
    icon: Router,
    price: "4 500 ₽",
    imageUrl: "/site/internet/dlink-dir-x1510.jpg",
    specs: [
      "Площадь покрытия: до 80 м²",
      "Частоты: 2.4 / 5 ГГц",
      "Стандарт Wi-Fi: a/b/g/n/ac/ax",
      "4 LAN-порта, скорость до 1000 Мбит/с",
    ],
  },
  {
    kind: "router",
    title: "DIR-830M",
    description: "Роутер для квартиры или компактного дома с хорошим базовым покрытием.",
    icon: Router,
    price: "4 500 ₽",
    imageUrl: "/site/internet/dir-830m.jpg",
    specs: [
      "Площадь покрытия: до 60 м²",
      "Частоты: 2.4 / 5 ГГц",
      "Стандарт Wi-Fi: 802.11a/b/g/n/ac",
      "3 LAN-порта, суммарно до 1176 Мбит/с",
    ],
  },
];

export const siteTvBenefits: FeatureItem[] = [
  {
    title: "Пауза, архив и перемотка",
    description: "Эфир можно поставить на паузу, включить архив передач и смотреть в удобное время.",
    icon: Tv,
    accent: "from-avanta-green/15 to-avanta-navy/10",
    imageUrl: "/site/tv/benefits/pause-archive-rewind.jpg",
    imageClassName: "!object-contain object-center bg-[#f5f7f7] p-2",
  },
  {
    title: "Смотрёшка на разных устройствах",
    description: "Телевидение доступно на смартфонах, планшетах, ноутбуках и Smart TV.",
    icon: Smartphone,
    accent: "from-avanta-teal/15 to-avanta-navy/10",
    imageUrl: "/site/tv/benefits/smotreshka-devices.jpg",
    imageClassName: "!object-contain object-center bg-[#f5f7f7] p-2",
  },
  {
    title: "Пакеты с кинотеатрами",
    description: "Некоторые ТВ-пакеты включают доступ к онлайн-кинотеатрам и дополнительному контенту.",
    icon: MonitorPlay,
    accent: "from-avanta-green/10 to-avanta-emerald/10",
    imageUrl: "/site/tv/benefits/cinema-packages.jpg",
    imageClassName: "!object-contain object-center bg-[#f5f7f7] p-2",
  },
];

export const siteTvPackages: TVPackage[] = [
  {
    title: "Стандарт",
    speed: "ТВ-пакет",
    channels: "216 каналов",
    price: "249 ₽/мес",
    description: "Базовый пакет цифрового ТВ для ежедневного просмотра дома.",
    badge: "Старт",
  },
  {
    title: "Оптима",
    speed: "ТВ-пакет",
    channels: "261 канал",
    price: "499 ₽/мес",
    description: "Расширенный набор каналов для более насыщенного телевизионного сценария.",
  },
  {
    title: "Эксклюзив",
    speed: "ТВ-пакет",
    channels: "284 канала",
    price: "999 ₽/мес",
    description: "Пакет для тех, кто хочет максимальный набор каналов и контента.",
    badge: "Популярный",
    popular: true,
  },
  {
    title: "Эксклюзив+Кино",
    speed: "ТВ-пакет",
    channels: "284 канала",
    price: "1 199 ₽/мес",
    description: "Максимальный пакет с расширенным телевизионным и кино-сценарием.",
  },
];

export const siteTvPlatforms: TVPlatform[] = [
  {
    title: "Smart TV",
    description: "Просмотр на большом экране без отдельной приставки.",
    icon: Tv,
    imageUrl: "/site/blog/digital-tv.png",
    imageClassName: "object-[center_50%]",
  },
  {
    title: "Смартфон и планшет",
    description: "Смотрите эфир и архив дома, в дороге или на даче.",
    icon: Smartphone,
    imageUrl: "/site/blog/umnyy-domofon.png",
    imageClassName: "object-[center_42%]",
  },
  {
    title: "Ноутбук и браузер",
    description: "ТВ доступно через веб-интерфейс для домашних и рабочих устройств.",
    icon: MonitorPlay,
    imageUrl: "/site/blog/internet-home.png",
    imageClassName: "object-[center_52%]",
  },
  {
    title: "Пакеты интернет + ТВ",
    description: "Можно сразу подключить интернет и телевидение одной заявкой.",
    icon: Router,
    imageUrl: "/site/internet/cards/bundle-card.png",
    imageClassName: "object-contain object-center bg-[#eef4f1]",
  },
];

export const siteBlogPosts: BlogPost[] = [
  {
    slug: "umnyy-domofon-avanta-smart",
    title: "Умный домофон и Аванта Смарт",
    excerpt: "Как работает мобильный доступ, история вызовов и управление гостями через приложение.",
    date: "12 февраля 2026",
    category: "Смарт",
    readTime: "4 мин",
    href: "/blog/umnyy-domofon-avanta-smart",
    sourceUrl: "https://avanta-telecom.ru/domofon/",
    popular: true,
    featured: true,
    imageUrl: "/brand/icons/domofon.png",
  },
  {
    slug: "tsifrovoe-tv-smotreshka",
    title: "Цифровое ТВ и Смотрёшка: что получает абонент",
    excerpt: "Разобрали архив передач, паузу эфира, устройства и пакетные варианты с интернетом.",
    date: "29 января 2026",
    category: "Телевидение",
    readTime: "5 мин",
    href: "/blog/tsifrovoe-tv-smotreshka",
    sourceUrl: "https://avanta-telecom.ru/tv/",
    popular: true,
    imageUrl: "/brand/icons/tv.png",
  },
  {
    slug: "novye-socialnye-tarify",
    title: "Новые социальные тарифы Аванта Телеком",
    excerpt: "Кому подходят льготные предложения и на что обратить внимание перед подключением.",
    date: "14 января 2026",
    category: "Интернет",
    readTime: "3 мин",
    href: "/blog/novye-socialnye-tarify",
    sourceUrl: "https://avanta-telecom.ru/news/novye-sotsialnye-tarify/",
    imageUrl: "/brand/palette-board.jpg",
  },
  {
    slug: "maksimalnoe-uskorenie-interneta",
    title: "Максимальное ускорение домашнего интернета",
    excerpt: "Что меняется, когда скорость увеличивают, и как понять, нужен ли вам тариф с запасом.",
    date: "24 декабря 2025",
    category: "Интернет",
    readTime: "4 мин",
    href: "/blog/maksimalnoe-uskorenie-interneta",
    sourceUrl: "https://avanta-telecom.ru/news/maksimalnoe-uskorenie-domashnego-interneta/",
    popular: true,
    imageUrl: "/brand/icons/internet.png",
  },
];

export const siteBlogArticles: BlogArticle[] = [
  {
    slug: "umnyy-domofon-avanta-smart",
    title: "Умный домофон и Аванта Смарт",
    excerpt: "Как работает мобильный доступ, история вызовов и управление гостями через приложение.",
    category: "Смарт",
    date: "12 февраля 2026",
    readTime: "4 мин",
    sourceUrl: "https://avanta-telecom.ru/domofon/",
    heroNote: "Материал подготовлен по мотивам действующего раздела умного домофона на сайте Аванта Телеком.",
    sections: [
      {
        title: "Что меняется для жильца",
        paragraphs: [
          "Умный домофон переносит привычный сценарий открытия двери в приложение. Вместо обычного ответа с трубки пользователь получает мобильный доступ, историю событий и более удобное управление входом.",
          "Такой сервис особенно хорошо работает в домах и жилых комплексах, где важны скорость доступа и понятный контроль над гостями и доставкой.",
        ],
        bullets: [
          "Открытие двери со смартфона",
          "История вызовов и событий",
          "Удобный доступ для семьи и гостей",
        ],
      },
      {
        title: "Почему это удобно",
        paragraphs: [
          "Смарт-домофон закрывает сразу несколько бытовых задач: не нужно постоянно находиться у трубки, можно видеть историю обращений и быстрее реагировать на входящие вызовы.",
          "Для сайта это хороший сервисный раздел, потому что он понятен без сложных технических объяснений и легко связывается с идеей современного дома.",
        ],
      },
      {
        title: "Когда умный домофон особенно полезен",
        paragraphs: [
          "Сервис особенно удобен для семей с детьми, частых доставок и домов, где важно быстро управлять доступом без лишних звонков и ожидания у двери.",
          "Если жильцы часто бывают вне дома, мобильное открытие двери и история событий становятся не просто удобной опцией, а реальным повседневным инструментом.",
        ],
      },
    ],
  },
  {
    slug: "tsifrovoe-tv-smotreshka",
    title: "Цифровое ТВ и Смотрёшка: что получает абонент",
    excerpt: "Разобрали архив передач, паузу эфира, устройства и пакетные варианты с интернетом.",
    category: "Телевидение",
    date: "29 января 2026",
    readTime: "5 мин",
    sourceUrl: "https://avanta-telecom.ru/tv/",
    heroNote: "Материал основан на текущем разделе телевидения Аванта Телеком.",
    sections: [
      {
        title: "Главная ценность телевидения сегодня",
        paragraphs: [
          "Для пользователя важно не только количество каналов, но и удобство просмотра. Поэтому современное ТВ на сайте лучше подавать через сценарии: архив, пауза эфира, просмотр на разных устройствах.",
          "Именно это превращает ТВ из формального раздела в понятный продукт для семьи и домашнего досуга.",
        ],
        bullets: [
          "Пауза и архив передач",
          "Просмотр на Smart TV, смартфоне и ноутбуке",
          "Пакеты с дополнительным кино-контентом",
        ],
      },
      {
        title: "Когда особенно полезен пакет интернет + ТВ",
        paragraphs: [
          "Пакетное подключение снимает лишние вопросы на старте: интернет и телевидение оформляются одной заявкой и собираются в один понятный счёт.",
          "Для сайта это один из самых понятных способов подать ТВ — не отдельно, а как часть домашнего сценария.",
        ],
      },
      {
        title: "Как выбрать подходящий ТВ-сценарий",
        paragraphs: [
          "Если дома чаще смотрят эфир и базовые каналы, обычно хватает стартового пакета. Если важны фильмы, семейный просмотр и расширенный выбор каналов, лучше сразу смотреть на более насыщенные пакеты.",
          "Пакет интернет + ТВ удобен тем, что закрывает сразу два бытовых сценария: связь дома и развлечения на одном подключении.",
        ],
      },
    ],
  },
  {
    slug: "novye-socialnye-tarify",
    title: "Новые социальные тарифы Аванта Телеком",
    excerpt: "Кому подходят льготные предложения и на что обратить внимание перед подключением.",
    category: "Интернет",
    date: "14 января 2026",
    readTime: "3 мин",
    sourceUrl: "https://avanta-telecom.ru/news/novye-sotsialnye-tarify/",
    heroNote: "Материал опирается на новость о социальных тарифах на официальном сайте компании.",
    sections: [
      {
        title: "Зачем нужен отдельный рассказ о соцтарифах",
        paragraphs: [
          "Социальные тарифы нельзя прятать глубоко в общем каталоге. Для пользователя такой раздел должен быть видимым, простым и с понятным объяснением условий.",
          "Даже если человек не подключает соцтариф лично, наличие понятной информации усиливает доверие к сайту и компании.",
        ],
      },
      {
        title: "На что обратить внимание перед подключением",
        paragraphs: [
          "Перед выбором такого тарифа важно заранее уточнить, какие документы и условия нужны для подключения, а также подходит ли предложение именно под ваш адрес.",
        ],
        bullets: [
          "Кто может подключить тариф",
          "Какая скорость доступна",
          "Как подать заявку без лишних шагов",
        ],
      },
      {
        title: "Почему такие тарифы важны",
        paragraphs: [
          "Социальные тарифы помогают сделать подключение доступнее для тех абонентов, для кого цена и понятные условия особенно критичны.",
          "Когда информация о таких предложениях подана коротко и ясно, пользователю проще принять решение и не потеряться в общем каталоге услуг.",
        ],
      },
    ],
  },
  {
    slug: "maksimalnoe-uskorenie-interneta",
    title: "Максимальное ускорение домашнего интернета",
    excerpt: "Что меняется, когда скорость увеличивают, и как понять, нужен ли вам тариф с запасом.",
    category: "Интернет",
    date: "24 декабря 2025",
    readTime: "4 мин",
    sourceUrl: "https://avanta-telecom.ru/news/maksimalnoe-uskorenie-domashnego-interneta/",
    heroNote: "Материал подготовлен по мотивам новости об ускорении домашнего интернета.",
    sections: [
      {
        title: "Когда пользователю действительно нужна большая скорость",
        paragraphs: [
          "Скорость становится заметно важнее, когда дома одновременно работают телевизор, ноутбук, смартфоны и игровые устройства. В этот момент базовый тариф перестаёт быть комфортным.",
          "Поэтому на сайте важно не просто указывать мегабиты, а объяснять, какой сценарий они закрывают.",
        ],
      },
      {
        title: "Почему апгрейд тарифа должен быть понятным",
        paragraphs: [
          "Если пользователь видит разницу между 100, 150, 250 и 500 Мбит/с через реальные сценарии, решение принимается быстрее.",
        ],
        bullets: [
          "100 Мбит/с — повседневные задачи",
          "150–250 Мбит/с — семья и стриминг",
          "500 Мбит/с — тяжёлые сценарии и большой запас",
        ],
      },
      {
        title: "Как понять, что пора ускоряться",
        paragraphs: [
          "Если дома одновременно идут созвоны, работает телевизор, загружаются файлы и кто-то смотрит видео в высоком качестве, базовой скорости уже может не хватать.",
          "В таком случае переход на более быстрый тариф обычно даёт не абстрактные мегабиты, а заметно более комфортную работу всей домашней сети.",
        ],
      },
    ],
  },
];

export const siteSmartLandings: SmartLanding[] = [
  {
    title: "Умный домофон",
    description: "Мобильный доступ, история вызовов и удобная работа с гостями и доставкой.",
    href: "https://avanta-telecom.ru/domofon/",
    badge: "Аванта Смарт",
    features: ["Открытие двери со смартфона", "История вызовов", "Для дома и ЖК"],
  },
  {
    title: "Умный шлагбаум",
    description: "Управление въездом через приложение и удобный доступ для жителей.",
    href: "https://avanta-telecom.ru/shlagbaum/",
    badge: "Смарт-сервис",
    features: ["Управление со смартфона", "Для дворов и территорий", "Удобный доступ для транспорта"],
  },
];

