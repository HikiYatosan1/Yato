import { motion } from "motion/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Cable,
  Camera,
  CheckCircle2,
  Network,
  Server,
  Smartphone,
  Warehouse,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { BusinessRequestModal, type BusinessLeadPreset } from "@/components/business-request-modal";
import { MediaCarousel } from "@/components/media-carousel";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { TariffCard } from "@/components/tariff-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteMode } from "@/lib/site-mode";
import type { Tariff } from "@/types/content";

type BusinessSectionKey =
  | "internet"
  | "surveillance"
  | "smart"
  | "equipment"
  | "services"
  | "infrastructure";

const sectionLabels: Record<BusinessSectionKey, string> = {
  internet: "Интернет",
  surveillance: "Видеонаблюдение",
  smart: "Умные сервисы",
  equipment: "Оборудование",
  services: "Сервисные услуги",
  infrastructure: "Инфраструктура",
};

const symmetricTariffs = [
  { name: "ЮР5", speed: "до 5 Мбит/с", price: "1 250 ₽/мес." },
  { name: "ЮР10", speed: "до 10 Мбит/с", price: "1 800 ₽/мес." },
  { name: "ЮР20", speed: "до 20 Мбит/с", price: "2 400 ₽/мес." },
  { name: "ЮР30", speed: "до 30 Мбит/с", price: "3 600 ₽/мес." },
  { name: "ЮР50", speed: "до 50 Мбит/с", price: "6 000 ₽/мес." },
  { name: "ЮР100", speed: "до 100 Мбит/с", price: "8 000 ₽/мес." },
  { name: "ЮР200", speed: "до 200 Мбит/с", price: "12 000 ₽/мес." },
] as const;

const additionalServices = [
  { name: "Статический IP", price: "2 000 ₽" },
  { name: "Публичный IP", price: "350 ₽" },
  { name: "Резервирование канала", price: "5 000 ₽" },
] as const;

const businessTariffIcons = [Wifi, Network, Cable, Building2, BriefcaseBusiness, Server, Warehouse] as const;

const equipmentItems = [
  {
    name: "Маршрутизатор D-LINK DIR1510 WI-FI 6",
    price: "4 500 руб.",
    type: "Wi-Fi 6",
    description: "Для офиса или точки обслуживания с базовой нагрузкой",
    icon: Wifi,
  },
  {
    name: "Маршрутизатор SNR AX10 WI-FI 6",
    price: "6 190 руб.",
    type: "Wi-Fi 6",
    description: "Для стабильной рабочей сети и нескольких групп устройств",
    icon: Network,
  },
  {
    name: "Маршрутизатор Tenda Nova MW 3-2",
    price: "5 990 руб.",
    type: "Mesh",
    description: "Для расширения покрытия в офисе, магазине или небольшом объекте",
    icon: Server,
  },
  {
    name: "Маршрутизатор Tenda Nova MW 6-2",
    price: "8 990 руб.",
    type: "Mesh",
    description: "Для объекта с несколькими зонами и повышенной нагрузкой",
    icon: Building2,
  },
  {
    name: "Маршрутизатор Tenda Nova MW 6-3",
    price: "11 990 руб.",
    type: "Mesh",
    description: "Для большого помещения, склада или распределенной сети",
    icon: Warehouse,
  },
  {
    name: "Медиаприставка IP TV BOX SB-317",
    price: "4 200 руб.",
    type: "IP TV",
    description: "Для подключения телевидения в офисе, зоне ожидания или клиентской зоне",
    icon: Cable,
  },
] as const;

const videoEquipmentItems = [
  {
    name: "IP-Camera HOME",
    price: "4 600 руб.",
    type: "IP-камера",
    description: "Домашняя камера для базового наблюдения на объекте",
    icon: Camera,
  },
  {
    name: "Polyvision PVC-IP2X-NF2.8P",
    price: "6 400 руб.",
    type: "Уличная IP-камера 2 Мп",
    description: "Для входных групп, фасадов и периметра объекта",
    icon: Camera,
  },
  {
    name: "Polyvision PVC-IP2Y-NF2.8P",
    price: "6 300 руб.",
    type: "Уличная IP-камера 2 Мп",
    description: "Для наружного наблюдения с фиксированной зоной контроля",
    icon: Camera,
  },
  {
    name: "Polyvision PVC-IP5X-WDF2.8PF",
    price: "6 900 руб.",
    type: "Уличная IP-камера 5 Мп",
    description: "Для детального изображения на улице и в зонах прохода",
    icon: Camera,
  },
  {
    name: "Polyvision PVC-IP5X-NF2.8MPF",
    price: "11 500 руб.",
    type: "Уличная IP-камера 5 Мп",
    description: "Для объектов, где важна высокая детализация видеопотока",
    icon: Camera,
  },
  {
    name: "Polyvision PVC-IP2Z-WDF2.8PF",
    price: "6 200 руб.",
    type: "Купольная IP-камера 2 Мп",
    description: "Для помещений, входных зон и контролируемых проходов",
    icon: Camera,
  },
  {
    name: "PND-04P-2M",
    price: "3 900 руб.",
    type: "6-портовый коммутатор",
    description: "Для подключения камер и сетевых устройств видеонаблюдения",
    icon: Network,
  },
  {
    name: "PND-08P-2M",
    price: "7 200 руб.",
    type: "10-портовый коммутатор",
    description: "Для объекта с несколькими камерами и запасом портов",
    icon: Server,
  },
  {
    name: "Комплект кросс-муфты для видеонаблюдения",
    price: "6 000 руб.",
    type: "1 порт",
    description: "Для аккуратной коммутации линии видеонаблюдения",
    icon: Cable,
  },
  {
    name: "Комплект кросс-муфты для видеонаблюдения",
    price: "6 000 руб.",
    type: "4 порта",
    description: "Для коммутации нескольких линий видеонаблюдения",
    icon: Cable,
  },
  {
    name: "Коммутационный шкаф ШРН для видеонаблюдения в сборе",
    price: "5 000 руб.",
    type: "Шкаф в сборе",
    description: "Для размещения и защиты коммуникационного оборудования",
    icon: Server,
  },
] as const;

const extraEquipmentGroups = [
  {
    label: "Терминальное оборудование",
    title: "Терминальное оборудование",
    description: "Дополнительные устройства для ТВ-зон, рабочих сетей и резервного питания на объекте.",
    icon: Server,
    advantages: {
      label: "Преимущества терминального оборудования",
      title: "Закрываем небольшие, но важные задачи эксплуатации",
      items: [
        {
          icon: Cable,
          title: "Комплектность ТВ-зоны",
          description: "Пульт помогает восстановить управление IP TV приставкой без замены всего комплекта.",
        },
        {
          icon: Network,
          title: "Расширение сети",
          description: "Коммутатор добавляет порты для рабочих мест, касс, камер и другого сетевого оборудования.",
        },
        {
          icon: Server,
          title: "Резерв питания",
          description: "Мини-ИБП поддерживает работу сетевого оборудования при кратковременных перебоях электропитания.",
        },
      ],
    },
    items: [
      {
        name: "Пульт для IP TV приставки",
        price: "800 руб.",
        type: "IP TV",
        description: "Для замены или доукомплектации IP TV приставки на объекте",
        icon: Cable,
      },
      {
        name: "Коммутатор MERCUSYS MS108G",
        price: "1 600 руб.",
        type: "Неуправляемый",
        description: "Для расширения проводной сети на объекте",
        icon: Network,
      },
      {
        name: "Мини-ИБП для оборудования",
        price: "4 299 руб.",
        type: "Питание",
        description: "Для резервного питания сетевого оборудования",
        icon: Server,
      },
    ],
  },
  {
    label: "Расходные материалы",
    title: "Расходные материалы и коммутационное",
    description: "Патч-корды RJ45 для подключения оборудования, рабочих мест и коммутации линий.",
    icon: Cable,
    advantages: {
      label: "Преимущества расходных материалов",
      title: "Подбираем длину под реальную схему подключения",
      items: [
        {
          icon: Cable,
          title: "Без лишней длины",
          description: "Короткие патч-корды подходят для стойки, шкафа и подключения оборудования рядом с точкой сети.",
        },
        {
          icon: Network,
          title: "Для разных зон",
          description: "Средние длины помогают соединить оборудование в офисе, торговой зоне или техническом помещении.",
        },
        {
          icon: Building2,
          title: "Для протяженных линий",
          description: "Длинные варианты удобны, когда нужно дотянуть подключение между удаленными зонами объекта.",
        },
      ],
    },
    items: [
      {
        name: "Патч-корд RJ45 - RJ45, 4 пары, UTP",
        price: "150 руб.",
        type: "от 2-х до 5-ти метров",
        description: "Для короткого подключения оборудования в стойке или рабочей зоне",
        icon: Cable,
      },
      {
        name: "Патч-корд RJ45 - RJ45, 4 пары, UTP",
        price: "350 руб.",
        type: "от 5-ти до 15-ти метров",
        description: "Для подключения оборудования на средней дистанции",
        icon: Cable,
      },
      {
        name: "Патч-корд RJ45 - RJ45, 4 пары, UTP",
        price: "450 руб.",
        type: "от 15-ти до 20-ти метров",
        description: "Для протяженных линий внутри помещения",
        icon: Cable,
      },
      {
        name: "Патч-корд RJ45 - RJ45, 4 пары, UTP",
        price: "1 200 руб.",
        type: "от 30-ти до 50-ти метров",
        description: "Для длинных подключений между зонами объекта",
        icon: Cable,
      },
    ],
  },
  {
    label: "Домофония МКД",
    title: "Сменное оборудование для домофонии МКД",
    description: "Панели и электронные ключи для обслуживания домофонной инфраструктуры МКД.",
    icon: Building2,
    advantages: {
      label: "Преимущества оборудования для домофонии",
      title: "Помогаем поддерживать доступ в подъездах и МКД",
      items: [
        {
          icon: Smartphone,
          title: "Замена панелей",
          description: "IP вызывные панели подходят для восстановления или обновления домофонной системы на объекте.",
        },
        {
          icon: Building2,
          title: "Цена для нескольких подъездов",
          description: "Для закупки от двух панелей предусмотрена отдельная цена для комплектования объекта.",
        },
        {
          icon: CheckCircle2,
          title: "Ключи доступа",
          description: "Электронные ключи позволяют быстро выдать доступ жителям и пользователям домофонной системы.",
        },
      ],
    },
    items: [
      {
        name: "Многоабонентская IP вызывная панель",
        price: "25 000 руб.",
        type: "до 1 шт",
        description: "Для замены или установки панели на объекте МКД",
        icon: Smartphone,
      },
      {
        name: "Многоабонентская IP вызывная панель",
        price: "18 900 руб.",
        type: "от 2 шт",
        description: "Цена для комплектования нескольких подъездов или объектов",
        icon: Smartphone,
      },
      {
        name: "Электронный ключ",
        price: "100 руб.",
        type: "Ключ доступа",
        description: "Для доступа жителей и пользователей домофонной системы",
        icon: CheckCircle2,
      },
    ],
  },
  {
    label: "Умный шлагбаум",
    title: "Сменное оборудование для услуги «Умный шлагбаум»",
    description: "Комплект оборудования для организации управляемого въезда на территорию объекта.",
    icon: Warehouse,
    advantages: {
      label: "Преимущества оборудования для шлагбаума",
      title: "Помогаем организовать контролируемый въезд на территорию",
      items: [
        {
          icon: Warehouse,
          title: "Для дворов и территорий",
          description: "Комплект подходит для ограничения въезда во двор, на парковку или коммерческую площадку.",
        },
        {
          icon: Network,
          title: "Интеграция с услугой",
          description: "Оборудование можно использовать в сценариях услуги «Умный шлагбаум» с управлением доступом.",
        },
        {
          icon: CheckCircle2,
          title: "Готовый комплект",
          description: "NICE WIDES4KIT закрывает базовую задачу установки шлагбаума без подбора отдельных узлов.",
        },
      ],
    },
    items: [
      {
        name: "Шлагбаум фирмы NICE WIDES4KIT",
        price: "154 990 рублей",
        type: "Комплект шлагбаума",
        description: "Для запуска управляемого въезда на территорию объекта",
        icon: Warehouse,
      },
    ],
  },
] as const;

const serviceWorkGroups = [
  {
    label: "Абонентское оборудование",
    title: "Работы с абонентской линией и оборудованием",
    description: "Разовые работы для линии связи, клиентского оборудования и точки доступа на объекте.",
    icon: Cable,
    advantages: {
      label: "Преимущества работ с абонентским оборудованием",
      title: "Приводим подключение и оборудование в рабочее состояние",
      items: [
        {
          icon: Cable,
          title: "Линия и точка доступа",
          description: "Восстановим абонентскую линию, перенесем точку доступа или заменим терминал.",
        },
        {
          icon: Wifi,
          title: "Настройка устройств",
          description: "Настраиваем роутер, ТВ-приставку или Smart TV для корректной работы с услугой.",
        },
        {
          icon: CheckCircle2,
          title: "Коммутация на месте",
          description: "Монтируем RJ-45 розетки и переобжимаем коннекторы для аккуратного подключения.",
        },
      ],
    },
    items: [
      {
        name: "Сервисный ремонт абонентской линии",
        price: "500 руб.",
        type: "Линия",
        description: "Для восстановления работоспособности абонентского подключения",
        icon: Cable,
      },
      {
        name: "Настройка одной единицы клиентского оборудования",
        price: "500 руб.",
        type: "Wi-Fi роутер, TV приставка, Smart телевизор",
        description: "Для подготовки клиентского устройства к работе в сети",
        icon: Wifi,
      },
      {
        name: "Перенос точки доступа",
        price: "1 500 руб.",
        type: "Без перетяжки абонентской линии",
        description: "Для изменения расположения точки доступа без прокладки новой линии",
        icon: Network,
      },
      {
        name: "Перенос точки доступа",
        price: "4 000 руб.",
        type: "С перетяжкой абонентской линии",
        description: "Для переноса точки доступа с перетяжкой абонентской линии",
        icon: Network,
      },
      {
        name: "Негарантийная замена абонентского оптического терминала",
        price: "1 500 руб.",
        type: "Оптический терминал",
        description: "Для замены терминала вне гарантийных случаев",
        icon: Server,
      },
      {
        name: "Монтаж настенной розетки RJ-45",
        price: "350 руб.",
        type: "RJ-45",
        description: "Для аккуратного подключения оборудования через настенную розетку",
        icon: Cable,
      },
      {
        name: "Переобжим коннектора RJ-45",
        price: "350 руб.",
        type: "RJ-45",
        description: "Для восстановления или замены сетевого коннектора",
        icon: Cable,
      },
    ],
  },
  {
    label: "Видеонаблюдение",
    title: "Монтаж и обслуживание видеонаблюдения",
    description: "Работы по установке, настройке и обслуживанию камер, линий и монтажных комплектов.",
    icon: Camera,
    advantages: {
      label: "Преимущества монтажных работ для видеонаблюдения",
      title: "Настраиваем камеры и узлы связи под объект",
      items: [
        {
          icon: Camera,
          title: "Установка камер",
          description: "После монтажа камера сразу передает изображение с нужной зоны контроля.",
        },
        {
          icon: Server,
          title: "Комплектные работы",
          description: "Можно заказать монтаж комплекта с кросс-муфтой и шкафом ШРН для аккуратного узла связи.",
        },
        {
          icon: CheckCircle2,
          title: "Под разные сценарии",
          description: "Стоимость зависит от типа камеры, сложности монтажа и задач наблюдения.",
        },
      ],
    },
    items: [
      {
        name: "Монтаж и настройка камеры видеонаблюдения",
        price: "2 500 руб.",
        type: "Базовый монтаж",
        description: "Для стандартной установки и настройки камеры на объекте",
        icon: Camera,
      },
      {
        name: "Монтаж и настройка камеры видеонаблюдения",
        price: "3 000 руб.",
        type: "Расширенный монтаж",
        description: "Для установки с дополнительными требованиями к размещению",
        icon: Camera,
      },
      {
        name: "Монтаж и настройка камеры видеонаблюдения",
        price: "5 000 руб.",
        type: "Сложный монтаж",
        description: "Для работ с повышенной сложностью монтажа и настройки",
        icon: Camera,
      },
      {
        name: "Монтаж и настройка камеры видеонаблюдения «VIDEO HOME»",
        price: "500 руб.",
        type: "VIDEO HOME",
        description: "Для быстрой установки и настройки камеры VIDEO HOME",
        icon: Camera,
      },
      {
        name: "Монтаж комплекта для видеонаблюдения",
        price: "5 000 руб.",
        type: "Кросс-муфта, шкаф ШРН",
        description: "Для монтажа комплектующих узла видеонаблюдения",
        icon: Server,
      },
    ],
  },
  {
    label: "Умный шлагбаум",
    title: "Монтажные работы для умного шлагбаума",
    description: "Инсталляция услуги и монтажные работы для запуска управляемого въезда на объект.",
    icon: Warehouse,
    advantages: {
      label: "Преимущества монтажных работ для шлагбаума",
      title: "Готовим территорию к управляемому въезду",
      items: [
        {
          icon: Warehouse,
          title: "Запуск услуги",
          description: "Инсталляционный платеж включает стартовые работы для подключения услуги «Умный шлагбаум».",
        },
        {
          icon: Network,
          title: "Монтаж на объекте",
          description: "Работы по установке шлагбаума подготавливают площадку к контролю въезда.",
        },
        {
          icon: BriefcaseBusiness,
          title: "Под расчет",
          description: "Финальную схему и стоимость уточняем по адресу, условиям монтажа и задачам доступа.",
        },
      ],
    },
    items: [
      {
        name: "Инсталляционный платеж услуги «Умный шлагбаум»",
        price: "от 99 000 руб.",
        type: "Запуск услуги",
        description: "Для первичного подключения услуги управляемого въезда",
        icon: Warehouse,
      },
      {
        name: "Монтажные работы по установке шлагбаума",
        price: "от 30 000 руб.",
        type: "Установка",
        description: "Для монтажа шлагбаума на территории объекта",
        icon: Warehouse,
      },
    ],
  },
] as const;

const infrastructureAdvantageGroup = {
  label: "Преимущества инфраструктуры",
  title: "Помогаем с каналами, видеопотоками и техническими условиями",
  items: [
    {
      icon: Network,
      title: "Каналы связи",
      description: "Подберем формат аренды L2-канала для передачи данных между площадками.",
    },
    {
      icon: Camera,
      title: "Видеопотоки",
      description: "Организуем передачу видеопотоков с камер для интеграции с внешними системами.",
    },
    {
      icon: CheckCircle2,
      title: "Документация",
      description: "Поможем с выдачей технических условий для проектов, где нужно согласовать подключение.",
    },
  ],
} satisfies AdvantageGroup;

const infrastructureGroups = [
  {
    label: "Аренда инфраструктуры",
    title: "Аренда инфраструктуры",
    description: "Аренда каналов связи для передачи данных между объектами и площадками.",
    icon: Network,
    items: [
      {
        name: "Аренда L2 каналов связи",
        type: "L2 канал",
        description: "Для организации связности между офисами, объектами или техническими площадками",
        icon: Network,
      },
      {
        name: "Аренда L2 каналов связи",
        type: "L2 канал",
        description: "Для проектов с отдельными требованиями к каналу связи и передаче данных",
        icon: Cable,
      },
    ],
  },
  {
    label: "Видеонаблюдение",
    title: "Видеонаблюдение",
    description: "Передача видеопотоков для городских, объектовых и ведомственных систем.",
    icon: Camera,
    items: [
      {
        name: "Реализация видеопотоков с камер видеонаблюдения АПК Безопасный город",
        type: "Видеопоток",
        description: "Для передачи видеопотоков в систему АПК «Безопасный город»",
        icon: Camera,
      },
    ],
  },
  {
    label: "Разрешительная документация",
    title: "Разрешительная документация",
    description: "Документы для согласования и дальнейшей реализации инфраструктурных проектов.",
    icon: CheckCircle2,
    items: [
      {
        name: "Выдача технических условий",
        type: "Технические условия",
        description: "Для подготовки и согласования подключения объекта",
        icon: CheckCircle2,
      },
    ],
  },
] as const;

type BusinessObjectType = "office" | "retail" | "warehouse" | "residential";
type BusinessTaskType = "internet" | "surveillance" | "access" | "equipment";
type BusinessReliabilityType = "standard" | "high";

const overviewDirections = [
  {
    title: "Интернет для бизнеса",
    description: "Канал связи для рабочих мест, касс, телефонии, CRM и облачных сервисов.",
    href: "/business/internet",
    icon: Network,
  },
  {
    title: "Видеонаблюдение",
    description: "Камеры, онлайн-доступ и архив для контроля помещений, входов и периметра.",
    href: "/business/surveillance",
    icon: Camera,
  },
  {
    title: "Умные сервисы",
    description: "Домофон, шлагбаум и гостевой Wi-Fi для МКД, дворов и коммерческих объектов.",
    href: "/business/smart",
    icon: Smartphone,
  },
  {
    title: "Оборудование",
    description: "Роутеры, камеры, коммутаторы, материалы и комплекты для доступа.",
    href: "/business/equipment",
    icon: Server,
  },
  {
    title: "Сервисные услуги",
    description: "Настройка, перенос точек, монтаж камер и работы на объекте.",
    href: "/business/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "Инфраструктура",
    description: "L2-каналы, видеопотоки и технические условия для B2B-проектов.",
    href: "/business/infrastructure",
    icon: Building2,
  },
] as const;

const businessObjectOptions: Array<{
  value: BusinessObjectType;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    value: "office",
    title: "Офис или филиал",
    description: "Рабочие места, CRM, телефония, видеосвязь и гостевой Wi-Fi.",
    icon: BriefcaseBusiness,
  },
  {
    value: "retail",
    title: "Магазин или точка",
    description: "Кассы, терминалы, камеры, клиентская зона и резерв связи.",
    icon: Building2,
  },
  {
    value: "warehouse",
    title: "Склад или производство",
    description: "Периметр, камеры, связь между зонами и стабильный канал.",
    icon: Warehouse,
  },
  {
    value: "residential",
    title: "МКД или двор",
    description: "Домофон, шлагбаум, видеонаблюдение и доступ жителей.",
    icon: Smartphone,
  },
];

const businessTaskOptions: Array<{
  value: BusinessTaskType;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    value: "internet",
    title: "Интернет и сеть",
    description: "Канал связи, Wi-Fi, рабочие места, кассы и облачные сервисы.",
    icon: Network,
  },
  {
    value: "surveillance",
    title: "Контроль объекта",
    description: "Камеры, архив, онлайн-доступ и передача видеопотоков.",
    icon: Camera,
  },
  {
    value: "access",
    title: "Доступ и территория",
    description: "Домофон, шлагбаум, гостевой Wi-Fi и управление доступом.",
    icon: CheckCircle2,
  },
  {
    value: "equipment",
    title: "Оборудование и работы",
    description: "Поставка, монтаж, настройка и обслуживание оборудования.",
    icon: Server,
  },
];

const businessReliabilityOptions: Array<{
  value: BusinessReliabilityType;
  title: string;
  description: string;
}> = [
  {
    value: "standard",
    title: "Базовая стабильность",
    description: "Подобрать услугу и оборудование под текущую задачу объекта.",
  },
  {
    value: "high",
    title: "Повышенная надежность",
    description: "Учесть резерв, инфраструктуру и запас для развития объекта.",
  },
];

const businessPickerStepLabels = ["Объект", "Задача", "Надежность", "Результат"] as const;

const buildBusinessRecommendation = (
  objectType: BusinessObjectType,
  taskTypes: BusinessTaskType[],
  reliability: BusinessReliabilityType,
) => {
  const sectionMap: Record<BusinessTaskType, BusinessSectionKey[]> = {
    internet: ["internet", "equipment", "services"],
    surveillance: ["surveillance", "equipment", "services"],
    access: ["smart", "equipment", "services"],
    equipment: ["equipment", "services", "infrastructure"],
  };

  const activeTasks: BusinessTaskType[] = taskTypes.length > 0 ? taskTypes : ["internet"];
  const sections = activeTasks.flatMap((taskType) => sectionMap[taskType]);

  if (objectType === "residential" && !sections.includes("smart")) {
    sections.unshift("smart");
  }

  if (objectType === "warehouse" && !sections.includes("surveillance")) {
    sections.splice(1, 0, "surveillance");
  }

  if (reliability === "high" && !sections.includes("infrastructure")) {
    sections.push("infrastructure");
  }

  const uniqueSections = sections.filter((item, index) => sections.indexOf(item) === index).slice(0, 4);
  const objectLabel = businessObjectOptions.find((item) => item.value === objectType)?.title ?? "Объект";
  const taskLabels = activeTasks
    .map((taskType) => businessTaskOptions.find((item) => item.value === taskType)?.title)
    .filter(Boolean);
  const taskLabel = taskLabels.length === 1 ? taskLabels[0] : "Комплексное решение";
  const reliabilityLabel =
    businessReliabilityOptions.find((item) => item.value === reliability)?.title ?? "Базовая стабильность";

  return {
    title: `${taskLabel} для ${objectLabel.toLowerCase()}`,
    description:
      reliability === "high"
        ? "Для критичного объекта рекомендуем заложить основную услугу, оборудование, сервисные работы и инфраструктурный запас."
        : "Начните с основной услуги, затем подберите оборудование и монтажные работы под объект.",
    sections: uniqueSections,
    plan: `B2B-подбор: ${objectLabel}, ${taskLabels.join(", ")}, ${reliabilityLabel}`,
  };
};

type AdvantageGroup = {
  label: string;
  title: string;
  items: readonly {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
};

const internetAdvantageGroup = {
  label: "Преимущества интернета",
  title: "Стабильный канал для рабочих процессов",
  items: [
    {
      icon: Network,
      title: "Равная скорость туда и обратно",
      description: "Прием и отправка данных работают на одинаковой скорости для видеосвязи, CRM и облачных сервисов.",
    },
    {
      icon: Server,
      title: "Под нагрузку объекта",
      description: "Подбираем канал под офис, магазин, склад или филиал без лишнего запаса и переплаты.",
    },
    {
      icon: Cable,
      title: "Корпоративные опции",
      description: "Можно добавить статический IP, публичный IP или резервирование канала под рабочие задачи.",
    },
  ],
} satisfies AdvantageGroup;

const surveillanceAdvantageGroup = {
  label: "Преимущества видеонаблюдения",
  title: "Контроль объекта и архив без лишней нагрузки",
  items: [
    {
      icon: Camera,
      title: "Онлайн-доступ",
      description: "Подходит для входных групп, торговых точек, складов и зон, где важно быстро проверить ситуацию.",
    },
    {
      icon: Server,
      title: "Глубина архива",
      description: "Можно выбрать хранение от 3 до 30 дней в зависимости от требований объекта и нагрузки.",
    },
    {
      icon: CheckCircle2,
      title: "Запись по движению",
      description: "Дополнительная опция помогает хранить важные события и не перегружать архив лишними записями.",
    },
  ],
} satisfies AdvantageGroup;

const equipmentAdvantageGroup = {
  label: "Преимущества оборудования",
  title: "Подбираем оборудование под площадь, нагрузку и услугу",
  items: [
    {
      icon: Wifi,
      title: "Покрытие Wi-Fi",
      description: "Подберем маршрутизатор или mesh-комплект под площадь, стены и количество рабочих устройств.",
    },
    {
      icon: Server,
      title: "Совместимость с услугами",
      description: "Оборудование подбирается под интернет, телевидение и сценарии работы конкретного объекта.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Для B2B-задач",
      description: "Поможем выбрать решение для офиса, магазина, склада, клиентской зоны или точки обслуживания.",
    },
  ],
} satisfies AdvantageGroup;

const videoEquipmentAdvantageGroup = {
  label: "Преимущества оборудования для видеонаблюдения",
  title: "Собираем комплект под камеры, сеть и коммутацию",
  items: [
    {
      icon: Camera,
      title: "Камеры под зону контроля",
      description: "Можно подобрать уличные, купольные и базовые IP-камеры под вход, периметр или помещение.",
    },
    {
      icon: Network,
      title: "Сеть для видеопотока",
      description: "Коммутаторы помогают подключить несколько камер и оставить запас портов для развития системы.",
    },
    {
      icon: Cable,
      title: "Аккуратная коммутация",
      description: "Кросс-муфты и шкаф ШРН помогают собрать линии видеонаблюдения в понятный и обслуживаемый узел.",
    },
  ],
} satisfies AdvantageGroup;

const smartIntercomRates = [
  { name: "УД: Тариф 1", price: "95 руб", apartments: "до 12 квартир", note: "в подъезде" },
  { name: "УД: Тариф 2", price: "75 руб", apartments: "от 12 до 40 квартир", note: "в подъезде" },
  { name: "УД: Тариф 3", price: "55 руб", apartments: "от 40 квартир", note: "в подъезде" },
] as const;
const smartIntercomTariffCards: Tariff[] = smartIntercomRates.map((item, index) => ({
  id: `smart-intercom-${index + 1}`,
  name: item.name,
  category: "business",
  speed: item.apartments,
  price: item.price,
  description:
    index === 0
      ? "Небольшой подъезд или камерный объект"
      : index === 1
        ? "Средний подъезд с регулярной нагрузкой"
        : "Крупный подъезд или большой жилой объект",
  features: [item.note],
  popular: index === 1,
  badge: index === 1 ? "Оптимальный" : undefined,
}));
const smartIntercomIcons = [Building2, Network, Server] as const;
const smartBarrierTariffs = [
  {
    name: "Автоматическое управление",
    price: "4 490 руб.",
    scope: "с аналитикой",
    description: "Для объекта на сети Аванта",
    badge: "Базовый",
  },
  {
    name: "Автоматическое управление",
    price: "5 000 руб.",
    scope: "с аналитикой",
    description: "На сети другого оператора",
    badge: "Внешняя сеть",
  },
  {
    name: "Авто + ручное управление",
    price: "7 000 руб.",
    scope: "до 500 пользователей",
    description: "Для небольшого двора или парковки",
    badge: "До 500",
  },
  {
    name: "Авто + ручное управление",
    price: "9 000 руб.",
    scope: "501-1500 пользователей",
    description: "Для ЖК, филиала или коммерческого объекта",
    badge: "Средний объект",
  },
  {
    name: "Авто + ручное управление",
    price: "12 000 руб.",
    scope: "более 1500 пользователей",
    description: "Для крупной территории с высокой нагрузкой",
    badge: "Крупный объект",
  },
] as const;
const smartBarrierIcons = [Network, Server, Building2, BriefcaseBusiness, Warehouse] as const;
const smartWifiTariffs = [
  {
    name: "Hot spot (S)",
    price: "900 руб",
    scope: "S",
    description: "Для небольшой клиентской зоны",
  },
  {
    name: "Hot spot (M)",
    price: "1500 руб",
    scope: "M",
    description: "Для офиса, зала ожидания или точки обслуживания",
  },
  {
    name: "Hot spot (L)",
    price: "4500 руб",
    scope: "L",
    description: "Для объекта с высокой посещаемостью",
  },
] as const;
const smartAdvantageGroups = {
  intercom: {
    label: "Преимущества домофона",
    title: "Что получает объект с умным домофоном",
    items: [
      {
        icon: Building2,
        title: "Контроль доступа",
        description: "Жители и управляющая сторона получают понятный сценарий входа без лишней ручной координации.",
      },
      {
        icon: Smartphone,
        title: "Удобство для жителей",
        description: "Сервис подходит для подъездов и ЖК, где важно быстро подключать пользователей и поддерживать доступ.",
      },
      {
        icon: BriefcaseBusiness,
        title: "Масштабирование",
        description: "Можно начинать с одного подъезда и расширять решение по мере подключения новых объектов.",
      },
    ],
  },
  barrier: {
    label: "Преимущества шлагбаума",
    title: "Управляемый въезд для двора, парковки или территории",
    items: [
      {
        icon: Network,
        title: "Управляемый въезд",
        description: "Доступ можно настроить под двор, парковку, филиал или коммерческую территорию.",
      },
      {
        icon: Server,
        title: "Гибкие сценарии",
        description: "Доступны автоматическое открытие, ручное управление и варианты для разных размеров базы пользователей.",
      },
      {
        icon: Warehouse,
        title: "Для крупных объектов",
        description: "Решение подходит для территорий с высокой нагрузкой и несколькими группами пользователей.",
      },
    ],
  },
  wifi: {
    label: "Преимущества Wi-Fi",
    title: "Гостевой доступ без смешивания с рабочей сетью",
    items: [
      {
        icon: Wifi,
        title: "Отдельный Hot spot",
        description: "Посетители получают гостевой доступ, а рабочая сеть объекта остается отделенной.",
      },
      {
        icon: BriefcaseBusiness,
        title: "Для клиентских зон",
        description: "Подходит для офисов, залов ожидания, торговых точек и общественных пространств.",
      },
      {
        icon: Network,
        title: "Пакеты под поток",
        description: "Можно выбрать S, M или L в зависимости от посещаемости и нагрузки на площадке.",
      },
    ],
  },
} as const;
const smartHeroTabs = [
  {
    key: "intercom",
    label: "Умный домофон",
    value: "3 тарифа",
    hint: "Для МКД и подъездов",
    title: "Умный домофон для подъездов и ЖК",
    description:
      "Подключаем домофонную систему с удобным доступом для жителей и управлением для объекта. Подходит для одного подъезда, МКД или жилого комплекса.",
  },
  {
    key: "barrier",
    label: "Умный шлагбаум",
    value: "5 сценариев",
    hint: "Автоматическое и ручное управление",
    title: "Умный шлагбаум для дворов и объектов",
    description:
      "Настраиваем контроль въезда с автоматическим или ручным управлением. Решение масштабируется под небольшую парковку, ЖК или коммерческую территорию.",
  },
  {
    key: "wifi",
    label: "Публичный Wi-Fi",
    value: "S / M / L",
    hint: "Hot spot для объектов",
    title: "Публичный Wi-Fi для гостей и клиентов",
    description:
      "Организуем Hot spot для общественных зон, офисов и коммерческих объектов. Подберем пакет под поток пользователей и формат площадки.",
  },
] as const;

const symmetricTariffCards: Tariff[] = symmetricTariffs.map((item) => {
  const speedTier = Number(item.name.replace("ЮР", ""));
  const description =
    speedTier <= 10
      ? "Касса, терминал, небольшой офис"
      : speedTier <= 50
        ? "Офис, телефония, CRM"
        : "Склад, филиал, видеонаблюдение";

  const isRecommended = item.name === "ЮР50";

  return {
    id: `b2b-${item.name.toLowerCase()}`,
    name: item.name,
    category: "business",
    speed: item.speed,
    price: item.price,
    description,
    features: ["Симметричный канал для юридических лиц"],
    popular: isRecommended,
    badge: isRecommended ? "Оптимальный" : undefined,
  };
});

function isBusinessSection(value: string | undefined): value is BusinessSectionKey {
  if (!value) {
    return false;
  }

  return value in sectionLabels;
}

export function SiteBusinessPage() {
  const { to } = useSiteMode();
  const { section } = useParams<{ section?: string }>();

  const currentSection = isBusinessSection(section) ? section : undefined;
  const isOverview = !currentSection;
  const isInternetPage = currentSection === "internet";
  const isSurveillancePage = currentSection === "surveillance";
  const isSmartPage = currentSection === "smart";
  const isEquipmentPage = currentSection === "equipment";
  const isServicesPage = currentSection === "services";
  const isInfrastructurePage = currentSection === "infrastructure";

  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestPreset, setRequestPreset] = useState<BusinessLeadPreset | undefined>(undefined);
  const [smartActiveIndex, setSmartActiveIndex] = useState(0);
  const [smartProgressCycle, setSmartProgressCycle] = useState(0);
  const [businessObjectType, setBusinessObjectType] = useState<BusinessObjectType>("office");
  const [businessTaskTypes, setBusinessTaskTypes] = useState<BusinessTaskType[]>(["internet"]);
  const [businessReliability, setBusinessReliability] = useState<BusinessReliabilityType>("standard");
  const [businessPickerStep, setBusinessPickerStep] = useState(0);
  const smartActive = smartHeroTabs[smartActiveIndex];

  const currentSectionLabel = useMemo(() => {
    if (!currentSection) {
      return "Обзор";
    }

    return sectionLabels[currentSection];
  }, [currentSection]);

  const openRequestModal = (preset?: BusinessLeadPreset) => {
    setRequestPreset(preset);
    setRequestModalOpen(true);
  };

  const toggleBusinessTask = (taskType: BusinessTaskType) => {
    setBusinessTaskTypes((current) => {
      if (current.includes(taskType)) {
        return current.length === 1 ? current : current.filter((item) => item !== taskType);
      }

      return [...current, taskType];
    });
  };

  const businessRecommendation = useMemo(
    () => buildBusinessRecommendation(businessObjectType, businessTaskTypes, businessReliability),
    [businessObjectType, businessReliability, businessTaskTypes],
  );
  const selectedBusinessObject = businessObjectOptions.find((item) => item.value === businessObjectType);
  const selectedBusinessTasks = businessTaskOptions.filter((item) => businessTaskTypes.includes(item.value));
  const selectedBusinessReliability = businessReliabilityOptions.find((item) => item.value === businessReliability);

  const renderBusinessAdvantages = (group: AdvantageGroup) => (
    <section className="relative overflow-hidden rounded-[28px] border border-avanta-green/18 bg-[linear-gradient(90deg,rgba(232,244,239,0.86),rgba(252,255,255,0.78)_48%,rgba(245,250,247,0.76))] p-4 shadow-[0_18px_46px_-40px_rgba(24,58,99,0.42)] sm:p-5">
      <div className="pointer-events-none absolute inset-y-4 left-0 w-1 rounded-r-full bg-[linear-gradient(180deg,#3aaa35,#13815f)]" />
      <div className="pointer-events-none absolute -left-12 -top-16 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.18),rgba(22,127,74,0.06)_48%,transparent_72%)] blur-xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-[linear-gradient(115deg,transparent,rgba(24,58,99,0.045))]" />
      <div className="relative z-10">
        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex w-fit rounded-full border border-avanta-green/24 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
            {group.label}
          </p>
          <h3 className="max-w-3xl text-lg font-bold leading-tight text-avanta-navy sm:text-xl lg:text-2xl">
            {group.title}
          </h3>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {group.items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative min-h-[174px] rounded-[20px] border border-white/76 bg-white/62 p-4 pl-5 shadow-[0_14px_28px_-28px_rgba(24,58,99,0.32)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-avanta-green/20 hover:bg-white/82"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-avanta-emerald text-xs font-bold text-white shadow-[0_10px_22px_-14px_rgba(22,127,74,0.9)]">
                      {index + 1}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-avanta-green/10 text-avanta-emerald transition group-hover:bg-avanta-green/15">
                      <Icon className="h-[18px] w-[18px]" />
                    </div>
                  </div>
                  <span className="h-px flex-1 bg-gradient-to-r from-avanta-green/24 to-transparent" />
                </div>
                <p className="text-base font-bold text-avanta-navy">{item.title}</p>
                <p className="mt-2 text-sm font-medium leading-6 text-avanta-graphite">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderBusinessCta = ({
    title,
    description,
    service,
    plan,
  }: {
    title: string;
    description: string;
    service: string;
    plan: string;
  }) => (
    <section className="cut-corner relative overflow-hidden rounded-[36px] bg-[linear-gradient(128deg,#31aa35,#148052_48%,#183a63)] px-6 py-8 shadow-[0_28px_70px_-42px_rgba(24,58,99,0.65)] sm:px-9 sm:py-10 lg:px-12">
      <div className="pointer-events-none absolute -left-16 bottom-0 h-36 w-36 rotate-45 rounded-[18px] bg-white/10" />
      <div className="pointer-events-none absolute -right-10 -top-14 h-56 w-56 rotate-45 rounded-[28px] bg-white/10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_54%)]" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">Консультация</p>
          <h2 className="mt-5 text-3xl font-bold leading-[1.12] text-white sm:text-[2.55rem] lg:text-[2.85rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/80 sm:text-lg">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Button
            type="button"
            size="lg"
            className="h-14 rounded-full bg-white px-7 text-base font-bold text-avanta-navy shadow-[0_18px_38px_-26px_rgba(255,255,255,0.6)] hover:-translate-y-0.5 hover:bg-white hover:brightness-105"
            onClick={() => openRequestModal({ service, plan })}
          >
            Оставить заявку
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );

  const handleSmartTabSelect = (index: number) => {
    setSmartActiveIndex(index);
    setSmartProgressCycle((prev) => prev + 1);
  };

  useEffect(() => {
    const handleOpenRequest = () => {
      const service = isInternetPage
        ? "Интернет для бизнеса"
        : isSurveillancePage
          ? "Видеонаблюдение"
        : isSmartPage
          ? "Умные сервисы"
          : isEquipmentPage
            ? "Оборудование"
            : isServicesPage
              ? "Сервисные услуги"
              : isInfrastructurePage
                ? "Инфраструктура"
                : "";
      openRequestModal(service ? { service } : undefined);
    };

    window.addEventListener("open-business-request", handleOpenRequest);
    return () => window.removeEventListener("open-business-request", handleOpenRequest);
  }, [isEquipmentPage, isInfrastructurePage, isInternetPage, isServicesPage, isSurveillancePage, isSmartPage]);

  useEffect(() => {
    if (!isSmartPage) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setSmartActiveIndex((prev) => (prev + 1) % smartHeroTabs.length);
      setSmartProgressCycle((prev) => prev + 1);
    }, 6500);

    return () => window.clearTimeout(timer);
  }, [isSmartPage, smartActiveIndex, smartProgressCycle]);

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
        <div className="container space-y-8 pb-16 pt-10">
          {isInternetPage ? (
            <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(128deg,rgba(252,255,255,0.96),rgba(241,248,251,0.94)_52%,rgba(232,244,239,0.92))] px-6 py-8 shadow-panel sm:px-9 sm:py-9">
              <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_42%,transparent_68%)] blur-xl" />
              <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.16),rgba(8,58,71,0.08)_46%,transparent_70%)] blur-xl" />
              <div className="pointer-events-none absolute right-8 top-6 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/16 to-avanta-navy/14" />
              <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-7 xl:grid-cols-[0.98fr_1.02fr]">
                <Reveal>
                  <div className="max-w-2xl">
                    <p className="inline-flex rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-avanta-emerald">
                      Для бизнеса
                    </p>
                    <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.05] text-avanta-navy sm:text-[2.8rem] lg:text-[3.05rem]">
                      Интернет для бизнеса
                      <br />
                      с равной скоростью
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-avanta-graphite sm:text-[1.04rem]">
                      Подключаем стабильный симметричный канал для офиса, магазина, склада или филиала. Подберем
                      скорость под рабочие сервисы, кассы, видеосвязь и облака.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        От 5 до 200 Мбит/с
                      </span>
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Для офисов, магазинов и складов
                      </span>
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Симметричный канал
                      </span>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className="h-14 rounded-[18px] bg-[linear-gradient(135deg,#259651,#13815f)] px-8 text-base font-bold text-white shadow-[0_16px_34px_-18px_rgba(22,127,74,0.75)] transition hover:-translate-y-0.5 hover:brightness-105"
                        onClick={() => openRequestModal({ service: "Интернет для бизнеса" })}
                      >
                        Оставить заявку
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <div className="rounded-[28px] border border-white/80 bg-white/55 p-2 shadow-[0_24px_46px_-32px_rgba(24,58,99,0.52)] backdrop-blur-xl sm:p-2.5 lg:justify-self-stretch">
                    <div className="overflow-hidden rounded-[22px] border border-avanta-navy/10 bg-white p-2.5 sm:p-3">
                      <img
                        src="/site/business/internet.jpg"
                        alt="Интернет для бизнеса"
                        className="h-[205px] w-full rounded-[16px] bg-white object-cover object-center sm:h-[245px] lg:h-[280px] xl:h-[300px]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>
          ) : isSurveillancePage ? (
            <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(128deg,rgba(252,255,255,0.96),rgba(241,248,251,0.94)_52%,rgba(232,244,239,0.92))] px-6 py-8 shadow-panel sm:px-9 sm:py-9">
              <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_42%,transparent_68%)] blur-xl" />
              <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.16),rgba(8,58,71,0.08)_46%,transparent_70%)] blur-xl" />
              <div className="pointer-events-none absolute right-8 top-6 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/16 to-avanta-navy/14" />
              <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-7 xl:grid-cols-[0.98fr_1.02fr]">
                <Reveal>
                  <div className="max-w-2xl">
                    <p className="inline-flex rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-avanta-emerald">
                      Для бизнеса
                    </p>
                    <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.05] text-avanta-navy sm:text-[2.8rem] lg:text-[3.05rem]">
                      Видеонаблюдение
                      <br />
                      для бизнес-объектов
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-avanta-graphite sm:text-[1.04rem]">
                      Подключаем облачное видеонаблюдение для офиса, магазина, склада или входной группы. Настроим
                      доступ, архив и оборудование под зоны контроля на объекте.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Онлайн-доступ 24/7
                      </span>
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Облачный архив
                      </span>
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Для офисов, магазинов и складов
                      </span>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className="h-14 rounded-[18px] bg-[linear-gradient(135deg,#259651,#13815f)] px-8 text-base font-bold text-white shadow-[0_16px_34px_-18px_rgba(22,127,74,0.75)] transition hover:-translate-y-0.5 hover:brightness-105"
                        onClick={() => openRequestModal({ service: "Видеонаблюдение" })}
                      >
                        Оставить заявку
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <div className="rounded-[28px] border border-white/80 bg-white/55 p-2 shadow-[0_24px_46px_-32px_rgba(24,58,99,0.52)] backdrop-blur-xl sm:p-2.5 lg:justify-self-stretch">
                    <div className="overflow-hidden rounded-[22px] border border-avanta-navy/10 bg-white p-2.5 sm:p-3">
                      <img
                        src="/site/business/video.jpg"
                        alt="Видеонаблюдение для бизнеса"
                        className="h-[205px] w-full rounded-[16px] bg-white object-cover object-center sm:h-[245px] lg:h-[280px] xl:h-[300px]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>
          ) : isEquipmentPage ? (
            <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(128deg,rgba(252,255,255,0.96),rgba(241,248,251,0.94)_52%,rgba(232,244,239,0.92))] px-6 py-8 shadow-panel sm:px-9 sm:py-9">
              <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_42%,transparent_68%)] blur-xl" />
              <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.16),rgba(8,58,71,0.08)_46%,transparent_70%)] blur-xl" />
              <div className="pointer-events-none absolute right-8 top-6 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/16 to-avanta-navy/14" />
              <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-7 xl:grid-cols-[0.98fr_1.02fr]">
                <Reveal>
                  <div className="max-w-2xl">
                    <p className="inline-flex rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-avanta-emerald">
                      Для бизнеса
                    </p>
                    <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.05] text-avanta-navy sm:text-[2.8rem] lg:text-[3.05rem]">
                      Оборудование
                      <br />
                      для бизнес-объектов
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-avanta-graphite sm:text-[1.04rem]">
                      Подберем и поставим оборудование под задачу объекта: маршрутизаторы, камеры, коммутаторы,
                      материалы, домофонию и шлагбаумы.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Wi-Fi и сеть
                      </span>
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Камеры и коммутация
                      </span>
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Домофония и шлагбаум
                      </span>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className="h-14 rounded-[18px] bg-[linear-gradient(135deg,#259651,#13815f)] px-8 text-base font-bold text-white shadow-[0_16px_34px_-18px_rgba(22,127,74,0.75)] transition hover:-translate-y-0.5 hover:brightness-105"
                        onClick={() => openRequestModal({ service: "Оборудование" })}
                      >
                        Оставить заявку
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <div className="rounded-[28px] border border-white/80 bg-white/55 p-2 shadow-[0_24px_46px_-32px_rgba(24,58,99,0.52)] backdrop-blur-xl sm:p-2.5 lg:justify-self-stretch">
                    <div className="overflow-hidden rounded-[22px] border border-avanta-navy/10 bg-white p-2.5 sm:p-3">
                      <img
                        src="/site/business/for-business.jpg"
                        alt="Оборудование для бизнеса"
                        className="h-[205px] w-full rounded-[16px] bg-white object-cover object-center sm:h-[245px] lg:h-[280px] xl:h-[300px]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>
          ) : isServicesPage ? (
            <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(128deg,rgba(252,255,255,0.96),rgba(241,248,251,0.94)_52%,rgba(232,244,239,0.92))] px-6 py-8 shadow-panel sm:px-9 sm:py-9">
              <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_42%,transparent_68%)] blur-xl" />
              <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.16),rgba(8,58,71,0.08)_46%,transparent_70%)] blur-xl" />
              <div className="pointer-events-none absolute right-8 top-6 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/16 to-avanta-navy/14" />
              <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-7 xl:grid-cols-[0.98fr_1.02fr]">
                <Reveal>
                  <div className="max-w-2xl">
                    <p className="inline-flex rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-avanta-emerald">
                      Для бизнеса
                    </p>
                    <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.05] text-avanta-navy sm:text-[2.8rem] lg:text-[3.05rem]">
                      Сервисные услуги
                      <br />
                      для бизнес-объектов
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-avanta-graphite sm:text-[1.04rem]">
                      Выполняем работы на объекте: настраиваем оборудование, переносим точки доступа, монтируем камеры
                      и помогаем запускать умный шлагбаум.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Настройка и перенос
                      </span>
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Монтаж камер
                      </span>
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Работы по шлагбауму
                      </span>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className="h-14 rounded-[18px] bg-[linear-gradient(135deg,#259651,#13815f)] px-8 text-base font-bold text-white shadow-[0_16px_34px_-18px_rgba(22,127,74,0.75)] transition hover:-translate-y-0.5 hover:brightness-105"
                        onClick={() => openRequestModal({ service: "Сервисные услуги" })}
                      >
                        Оставить заявку
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <div className="rounded-[28px] border border-white/80 bg-white/55 p-2 shadow-[0_24px_46px_-32px_rgba(24,58,99,0.52)] backdrop-blur-xl sm:p-2.5 lg:justify-self-stretch">
                    <div className="overflow-hidden rounded-[22px] border border-avanta-navy/10 bg-white p-2.5 sm:p-3">
                      <img
                        src="/site/business/smart.jpg"
                        alt="Сервисные услуги для бизнес-объектов"
                        className="h-[205px] w-full rounded-[16px] bg-white object-cover object-center sm:h-[245px] lg:h-[280px] xl:h-[300px]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>
          ) : isInfrastructurePage ? (
            <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(128deg,rgba(252,255,255,0.96),rgba(241,248,251,0.94)_52%,rgba(232,244,239,0.92))] px-6 py-8 shadow-panel sm:px-9 sm:py-9">
              <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_42%,transparent_68%)] blur-xl" />
              <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.16),rgba(8,58,71,0.08)_46%,transparent_70%)] blur-xl" />
              <div className="pointer-events-none absolute right-8 top-6 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/16 to-avanta-navy/14" />
              <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-7 xl:grid-cols-[0.98fr_1.02fr]">
                <Reveal>
                  <div className="max-w-2xl">
                    <p className="inline-flex rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-avanta-emerald">
                      Для бизнеса
                    </p>
                    <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.05] text-avanta-navy sm:text-[2.8rem] lg:text-[3.05rem]">
                      Инфраструктура
                      <br />
                      для объектов и проектов
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-avanta-graphite sm:text-[1.04rem]">
                      Помогаем с инфраструктурой для B2B-проектов: аренда L2-каналов, передача видеопотоков и
                      подготовка технических условий под задачу объекта.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        L2 каналы связи
                      </span>
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Видеопотоки
                      </span>
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Технические условия
                      </span>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className="h-14 rounded-[18px] bg-[linear-gradient(135deg,#259651,#13815f)] px-8 text-base font-bold text-white shadow-[0_16px_34px_-18px_rgba(22,127,74,0.75)] transition hover:-translate-y-0.5 hover:brightness-105"
                        onClick={() => openRequestModal({ service: "Инфраструктура" })}
                      >
                        Оставить заявку
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <div className="rounded-[28px] border border-white/80 bg-white/55 p-2 shadow-[0_24px_46px_-32px_rgba(24,58,99,0.52)] backdrop-blur-xl sm:p-2.5 lg:justify-self-stretch">
                    <div className="overflow-hidden rounded-[22px] border border-avanta-navy/10 bg-white p-2.5 sm:p-3">
                      <img
                        src="/site/business/hero-business.jpg"
                        alt="Инфраструктура для бизнеса"
                        className="h-[205px] w-full rounded-[16px] bg-white object-cover object-center sm:h-[245px] lg:h-[280px] xl:h-[300px]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>
          ) : isSmartPage ? (
            <section className="relative w-full">
              <div className="relative overflow-hidden rounded-[34px] border border-avanta-navy/8 bg-[linear-gradient(135deg,#f7fbf9_0%,#eff5f1_36%,#e9f0ec_100%)] shadow-float sm:rounded-[42px]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(22,127,74,0.05),transparent_24%,transparent_74%,rgba(24,58,99,0.06))]" />
              <div className="pointer-events-none absolute left-[-10%] top-[-22%] h-[64%] w-[40%] rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.22),rgba(22,127,74,0.1)_42%,transparent_72%)] blur-3xl" />
              <div className="pointer-events-none absolute left-[3%] top-[3%] h-36 w-36 rounded-full bg-avanta-green/18 blur-2xl" />
              <div className="pointer-events-none absolute bottom-[-24%] right-[10%] h-[46%] w-[26%] rounded-full bg-avanta-green/10 blur-3xl" />
              <div className="pointer-events-none absolute inset-y-0 left-[5%] w-[28%] bg-[radial-gradient(circle_at_center,rgba(22,127,74,0.1),transparent_68%)] blur-2xl" />
              <div className="pointer-events-none absolute right-[12%] top-[8%] h-[72%] w-[30%] rounded-[44px] bg-gradient-to-br from-avanta-green/20 to-avanta-navy/18 blur-3xl" />
              <div className="pointer-events-none absolute right-[8%] top-[8%] h-[76%] w-[32%] rotate-[7deg] rounded-[52px] border border-white/20 bg-white/10 opacity-70" />
              <div className="pointer-events-none absolute inset-x-[18%] bottom-[23%] h-px bg-gradient-to-r from-transparent via-avanta-navy/10 to-transparent" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(135deg,transparent_0,transparent_47%,rgba(24,58,99,0.08)_47.2%,transparent_48%,transparent_100%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(135deg,transparent_0,transparent_49.2%,rgba(255,255,255,0.6)_49.4%,transparent_49.8%,transparent_100%)]" />
              <div className="pointer-events-none absolute right-6 top-5 hidden items-center gap-2 rounded-full border border-white/55 bg-white/70 px-3 py-1.5 shadow-[0_14px_30px_-26px_rgba(24,58,99,0.4)] backdrop-blur-sm lg:flex">
                <span className="text-[0.78rem] font-bold tracking-[0.24em] text-avanta-navy/42">B2B</span>
                <span className="h-px w-6 bg-avanta-navy/12" />
                <span className="text-[0.78rem] font-semibold tracking-[0.18em] text-avanta-navy/66">SMART</span>
              </div>

              <div className="relative grid gap-4 px-3 pb-6 pt-6 sm:px-5 sm:pb-6 sm:pt-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-6 lg:pb-6 lg:pt-6">
                <Reveal>
                  <div className="relative flex max-w-[52rem] flex-col justify-center py-4 pl-4 pr-4 sm:pl-5 sm:pr-5 lg:pl-6 before:absolute before:left-0 before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-avanta-green/40 before:via-avanta-teal/14 before:to-transparent after:absolute after:-left-10 after:top-1/2 after:h-36 after:w-36 after:-translate-y-1/2 after:rounded-full after:bg-avanta-green/6 after:blur-3xl">
                    <p className="text-[1rem] font-bold leading-none text-avanta-navy/45">Аванта Телеком</p>
                    <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-avanta-navy/8 bg-white/82 px-3.5 py-1.5 text-[0.98rem] font-semibold text-avanta-navy shadow-panel">
                      <Smartphone className="h-3.5 w-3.5 text-avanta-emerald" />
                      <span>Умные сервисы</span>
                    </div>
                    <motion.div
                      key={smartActive.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                      <h1 className="mt-2.5 max-w-[28rem] font-display text-[1.64rem] font-bold leading-[1.02] text-avanta-navy sm:max-w-[32rem] sm:text-[1.94rem] lg:max-w-[35rem] lg:text-[2.18rem] xl:max-w-[38rem]">
                        {smartActive.title}
                      </h1>
                      <p className="mt-2 max-w-[25rem] text-[0.95rem] leading-[1.52rem] text-avanta-graphite sm:max-w-[30rem] lg:max-w-[33rem] xl:max-w-[35rem]">
                        {smartActive.description}
                      </p>
                    </motion.div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <motion.span
                        key={smartActive.value}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.22 }}
                        className="rounded-full bg-white px-3.5 py-1.5 text-[1rem] font-bold text-avanta-navy shadow-panel"
                      >
                        {smartActive.value}
                      </motion.span>
                      <span className="rounded-full border border-avanta-navy/12 bg-white/86 px-3.5 py-1.5 text-[0.98rem] font-bold text-avanta-navy shadow-[0_12px_26px_-22px_rgba(24,58,99,0.42)]">
                        Домофон, доступ, Wi-Fi
                      </span>
                    </div>
                    <Button
                      className="mt-2 w-fit rounded-full border border-white/50 bg-[linear-gradient(135deg,#2fad4b,#118466)] px-5 text-white shadow-[0_18px_36px_-16px_rgba(20,142,82,0.72)] transition hover:-translate-y-0.5 hover:brightness-105"
                      onClick={() => openRequestModal({ service: "Умные сервисы" })}
                    >
                      Оставить заявку
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <div className="relative flex items-center lg:justify-end">
                    <div className="relative ml-auto w-full max-w-[860px] overflow-hidden rounded-[28px] border border-white/35 bg-[#dfe6e3] shadow-[0_24px_56px_-38px_rgba(9,21,43,0.24)] aspect-[1.44/1] sm:aspect-[1.54/1] lg:aspect-[1.82/1] xl:aspect-[1.9/1]">
                      <img
                        src="/site/business/smart.jpg"
                        alt="Умные сервисы для бизнеса"
                        className="h-full w-full object-cover object-center"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,24,36,0.04),transparent_38%,rgba(255,255,255,0.05))]" />
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="px-3 pb-5 sm:px-4">
                <div className="overflow-hidden rounded-[24px] bg-white/96 p-1 shadow-panel">
                  <div className="grid gap-1.5 lg:grid-cols-3">
                    {smartHeroTabs.map((item, index) => {
                      const isActive = index === smartActiveIndex;

                      return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleSmartTabSelect(index)}
                        className={`group relative overflow-hidden rounded-[18px] border px-4 py-3.5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-avanta-green/24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanta-green/45 ${
                          isActive
                            ? "border-avanta-green/18 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(240,248,243,0.96))] shadow-[0_18px_34px_-26px_rgba(24,58,99,0.24)]"
                            : "border-avanta-navy/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(246,248,248,0.92))]"
                        }`}
                      >
                        <motion.div
                          animate={{ x: isActive ? 0 : -2, opacity: isActive ? 1 : 0.82 }}
                          transition={{ duration: 0.22 }}
                        >
                        <p className="text-[0.92rem] font-bold text-avanta-navy">{item.label}</p>
                        <p className="mt-1 text-[0.86rem] leading-5 text-avanta-graphite">{item.hint}</p>
                        <p className="mt-2 text-sm font-semibold text-avanta-emerald">{item.value}</p>
                        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-avanta-mist">
                          {isActive ? (
                            <motion.div
                              key={`smart-bottom-progress-${item.key}-${smartProgressCycle}`}
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 6.4, ease: "linear" }}
                              className="h-full rounded-full bg-avanta-green"
                            />
                          ) : (
                            <div className="h-full w-[22%] rounded-full bg-avanta-navy/12" />
                          )}
                        </div>
                        </motion.div>
                      </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              </div>
            </section>
          ) : isOverview ? (
            <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(128deg,rgba(252,255,255,0.96),rgba(241,248,251,0.94)_52%,rgba(232,244,239,0.92))] px-6 py-8 shadow-panel sm:px-9 sm:py-9">
              <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_42%,transparent_68%)] blur-xl" />
              <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.16),rgba(8,58,71,0.08)_46%,transparent_70%)] blur-xl" />
              <div className="pointer-events-none absolute right-8 top-6 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/16 to-avanta-navy/14" />
              <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-7 xl:grid-cols-[0.98fr_1.02fr]">
                <Reveal>
                  <div className="max-w-2xl">
                    <p className="inline-flex rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-avanta-emerald">
                      B2B
                    </p>
                    <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.05] text-avanta-navy sm:text-[2.8rem] lg:text-[3.05rem]">
                      Решения Аванта
                      <br />
                      для бизнеса
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-avanta-graphite sm:text-[1.04rem]">
                      Подбираем решения для офисов, магазинов, складов, жилых комплексов и дворов: от стабильного
                      интернета и видеонаблюдения до оборудования, монтажных работ и инфраструктуры.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Офисы и филиалы
                      </span>
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        Магазины и склады
                      </span>
                      <span className="rounded-full border border-avanta-navy/10 bg-white/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-avanta-navy">
                        МКД и дворы
                      </span>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className="h-14 rounded-[18px] bg-[linear-gradient(135deg,#259651,#13815f)] px-8 text-base font-bold text-white shadow-[0_16px_34px_-18px_rgba(22,127,74,0.75)] transition hover:-translate-y-0.5 hover:brightness-105"
                        onClick={() => openRequestModal({ service: "Для бизнеса", plan: "Консультация по B2B-решениям" })}
                      >
                        Оставить заявку
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <div className="rounded-[28px] border border-white/80 bg-white/55 p-2 shadow-[0_24px_46px_-32px_rgba(24,58,99,0.52)] backdrop-blur-xl sm:p-2.5 lg:justify-self-stretch">
                    <div className="overflow-hidden rounded-[22px] border border-avanta-navy/10 bg-white p-2.5 sm:p-3">
                      <img
                        src="/site/business/hero-business.jpg"
                        alt="Решения для бизнеса"
                        className="h-[205px] w-full rounded-[16px] bg-white object-cover object-center sm:h-[245px] lg:h-[280px] xl:h-[300px]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>
          ) : (
            <section className="rounded-[30px] border border-avanta-navy/10 bg-white p-6 shadow-soft sm:p-8 lg:p-10">
              <Reveal>
                <SectionHeader
                  eyebrow="B2B"
                  title={isOverview ? "Для бизнеса: обзор раздела" : `Для бизнеса: ${currentSectionLabel}`}
                  description="Этот раздел собран для юридических лиц и объектов. Здесь можно выбрать услугу, оборудование или работы под конкретную задачу."
                />
              </Reveal>
            </section>
          )}

          {isOverview ? (
            <>
              <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {overviewDirections.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink key={item.title} to={to(item.href)} className="group block h-full">
                      <Card className="relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-[28px] border-avanta-green/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,250,247,0.94))] p-6 transition duration-300 group-hover:-translate-y-1 group-hover:border-avanta-green/30 group-hover:shadow-float">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(24,58,99,0.08),transparent_34%)]" />
                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10 text-avanta-emerald shadow-[0_12px_26px_-22px_rgba(24,58,99,0.46)]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h2 className="relative z-10 mt-5 text-2xl font-bold leading-tight text-avanta-navy">
                          {item.title}
                        </h2>
                        <p className="relative z-10 mt-3 text-sm font-medium leading-6 text-avanta-graphite">
                          {item.description}
                        </p>
                        <span className="relative z-10 mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-avanta-emerald">
                          Открыть раздел
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </span>
                      </Card>
                    </NavLink>
                  );
                })}
              </section>

              <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(132deg,rgba(252,255,255,0.95),rgba(239,248,244,0.92)_55%,rgba(234,243,248,0.9))] p-6 shadow-panel sm:p-8">
                <div className="pointer-events-none absolute -left-12 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_45%,transparent_70%)] blur-xl" />
                <div className="pointer-events-none absolute -bottom-16 right-6 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.14),rgba(8,58,71,0.05)_46%,transparent_72%)] blur-xl" />
                <div className="relative z-10">
                  <div className="mb-6 rounded-[24px] border border-avanta-navy/10 bg-white/72 p-4 shadow-[0_18px_38px_-32px_rgba(24,58,99,0.34)] backdrop-blur sm:p-5">
                    <p className="inline-flex items-center gap-2 rounded-full border border-avanta-green/25 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                      <BriefcaseBusiness className="h-3.5 w-3.5" />
                      Подбор B2B-решения
                    </p>
                    <h2 className="mt-3 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                      Подберите B2B-решение под объект
                    </h2>
                    <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-avanta-graphite sm:text-base">
                      Ответьте на три коротких вопроса, и мы подскажем, какие разделы подойдут для вашей задачи:
                      интернет, видеонаблюдение, умные сервисы, оборудование, сервисные работы или инфраструктура.
                    </p>
                  </div>

                  <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                    <Card className="relative overflow-hidden rounded-[30px] border-avanta-navy/10 bg-white/82 p-4 shadow-[0_18px_44px_-36px_rgba(24,58,99,0.36)] backdrop-blur sm:p-5">
                      <div className="mb-5 flex flex-wrap gap-2">
                        {businessPickerStepLabels.map((label, index) => (
                          <span
                            key={label}
                            className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] transition ${
                              businessPickerStep === index
                                ? "border-avanta-green/35 bg-avanta-green/10 text-avanta-emerald"
                                : businessPickerStep > index
                                  ? "border-avanta-navy/10 bg-white text-avanta-navy"
                                  : "border-avanta-navy/8 bg-white/60 text-avanta-navy/46"
                            }`}
                          >
                            {index + 1}. {label}
                          </span>
                        ))}
                      </div>

                      {businessPickerStep === 0 ? (
                        <>
                          <h3 className="text-2xl font-bold text-avanta-navy">Что за объект?</h3>
                          <p className="mt-2 text-sm font-medium leading-6 text-avanta-graphite">
                            Выберите площадку, для которой нужно подобрать решение.
                          </p>
                          <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {businessObjectOptions.map((option) => {
                              const Icon = option.icon;
                              const isActive = businessObjectType === option.value;

                              return (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => setBusinessObjectType(option.value)}
                                  className={`relative min-h-[162px] rounded-[22px] border p-4 text-left transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanta-green/45 ${
                                    isActive
                                      ? "border-avanta-green/35 bg-[linear-gradient(135deg,rgba(58,170,53,0.14),rgba(255,255,255,0.9))] shadow-[0_18px_34px_-30px_rgba(22,127,74,0.6)]"
                                      : "border-avanta-navy/10 bg-white/76 hover:border-avanta-green/25 hover:bg-white"
                                  }`}
                                >
                                  {isActive ? (
                                    <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-avanta-emerald" />
                                  ) : null}
                                  <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-avanta-green/10 text-avanta-emerald">
                                    <Icon className="h-5 w-5" />
                                  </span>
                                  <span className="mt-3 block text-base font-bold text-avanta-navy">{option.title}</span>
                                  <span className="mt-2 block text-sm font-medium leading-5 text-avanta-graphite">
                                    {option.description}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </>
                      ) : null}

                      {businessPickerStep === 1 ? (
                        <>
                          <h3 className="text-2xl font-bold text-avanta-navy">Какая основная задача?</h3>
                          <p className="mt-2 text-sm font-medium leading-6 text-avanta-graphite">
                            Можно выбрать несколько задач: например, интернет, камеры и оборудование.
                          </p>
                          <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {businessTaskOptions.map((option) => {
                              const Icon = option.icon;
                              const isActive = businessTaskTypes.includes(option.value);

                              return (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => toggleBusinessTask(option.value)}
                                  className={`relative min-h-[162px] rounded-[22px] border p-4 text-left transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanta-green/45 ${
                                    isActive
                                      ? "border-avanta-green/35 bg-[linear-gradient(135deg,rgba(58,170,53,0.14),rgba(255,255,255,0.9))] shadow-[0_18px_34px_-30px_rgba(22,127,74,0.6)]"
                                      : "border-avanta-navy/10 bg-white/76 hover:border-avanta-green/25 hover:bg-white"
                                  }`}
                                >
                                  {isActive ? (
                                    <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-avanta-emerald" />
                                  ) : null}
                                  <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-avanta-green/10 text-avanta-emerald">
                                    <Icon className="h-5 w-5" />
                                  </span>
                                  <span className="mt-3 block text-base font-bold text-avanta-navy">{option.title}</span>
                                  <span className="mt-2 block text-sm font-medium leading-5 text-avanta-graphite">
                                    {option.description}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </>
                      ) : null}

                      {businessPickerStep === 2 ? (
                        <>
                          <h3 className="text-2xl font-bold text-avanta-navy">Нужен запас надежности?</h3>
                          <p className="mt-2 text-sm font-medium leading-6 text-avanta-graphite">
                            Это поможет понять, нужен ли резерв, инфраструктура и запас для роста.
                          </p>
                          <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {businessReliabilityOptions.map((option) => {
                              const isActive = businessReliability === option.value;

                              return (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => setBusinessReliability(option.value)}
                                  className={`relative min-h-[132px] rounded-[22px] border p-4 text-left transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanta-green/45 ${
                                    isActive
                                      ? "border-avanta-green/35 bg-[linear-gradient(135deg,rgba(58,170,53,0.14),rgba(255,255,255,0.9))] shadow-[0_18px_34px_-30px_rgba(22,127,74,0.6)]"
                                      : "border-avanta-navy/10 bg-white/76 hover:border-avanta-green/25 hover:bg-white"
                                  }`}
                                >
                                  {isActive ? (
                                    <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-avanta-emerald" />
                                  ) : null}
                                  <span className="block text-base font-bold text-avanta-navy">{option.title}</span>
                                  <span className="mt-2 block text-sm font-medium leading-5 text-avanta-graphite">
                                    {option.description}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </>
                      ) : null}

                      {businessPickerStep === 3 ? (
                        <>
                          <h3 className="text-2xl font-bold text-avanta-navy">Готово, вот подбор</h3>
                          <p className="mt-2 text-sm font-medium leading-6 text-avanta-graphite">
                            Мы собрали набор разделов, с которых стоит начать. Можно открыть нужный раздел или сразу
                            отправить заявку.
                          </p>
                          <div className="mt-5 rounded-[22px] border border-avanta-green/20 bg-avanta-green/10 p-4">
                            <p className="text-sm font-bold uppercase tracking-[0.14em] text-avanta-emerald">
                              Вы выбрали
                            </p>
                            <div className="mt-3 grid gap-3 sm:grid-cols-3">
                              {[
                                selectedBusinessObject?.title,
                                selectedBusinessTasks.map((item) => item.title).join(", "),
                                selectedBusinessReliability?.title,
                              ].map(
                                (item) => (
                                  <span
                                    key={item}
                                    className="rounded-[16px] border border-white/70 bg-white/78 px-3 py-2 text-sm font-bold text-avanta-navy"
                                  >
                                    {item}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        </>
                      ) : null}

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-avanta-navy/12"
                          disabled={businessPickerStep === 0}
                          onClick={() => setBusinessPickerStep((prev) => Math.max(0, prev - 1))}
                        >
                          Назад
                        </Button>
                        <Button
                          type="button"
                          className="bg-[linear-gradient(135deg,#259651,#13815f)] text-white"
                          onClick={() =>
                            businessPickerStep < businessPickerStepLabels.length - 1
                              ? setBusinessPickerStep((prev) => Math.min(businessPickerStepLabels.length - 1, prev + 1))
                              : openRequestModal({
                                  service: "Подбор B2B-решения",
                                  plan: businessRecommendation.plan,
                                })
                          }
                        >
                          {businessPickerStep < businessPickerStepLabels.length - 1 ? "Далее" : "Оставить заявку"}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>

                    <Card className="relative flex h-fit flex-col overflow-hidden rounded-[28px] border-avanta-green/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,248,244,0.94))] p-5 shadow-float sm:p-6 xl:sticky xl:top-28">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(24,58,99,0.09),transparent_36%)]" />
                      <div className="relative z-10">
                        <p className="inline-flex rounded-full border border-avanta-green/25 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                          {businessPickerStep === 3 ? "Рекомендация" : "Ваш выбор"}
                        </p>
                        <h3 className="mt-4 text-3xl font-bold leading-tight text-avanta-navy">
                          {businessRecommendation.title}
                        </h3>
                        <p className="mt-4 text-sm font-medium leading-6 text-avanta-graphite">
                          {businessPickerStep === 3
                            ? businessRecommendation.description
                            : "Проходите шаги слева, а здесь будет обновляться предварительная рекомендация по B2B-разделам."}
                        </p>
                        <div className="mt-5 space-y-3">
                          {businessPickerStep === 3 ? (
                            businessRecommendation.sections.map((sectionKey) => {
                              const direction = overviewDirections.find((item) => item.href === `/business/${sectionKey}`);
                              const Icon = direction?.icon ?? CheckCircle2;

                              return (
                                <NavLink
                                  key={sectionKey}
                                  to={to(`/business/${sectionKey}`)}
                                  className="group flex items-start gap-3 rounded-[18px] border border-avanta-navy/10 bg-white/72 p-4 transition hover:-translate-y-0.5 hover:border-avanta-green/30 hover:bg-white"
                                >
                                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-avanta-green/10 text-avanta-emerald">
                                    <Icon className="h-5 w-5" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-base font-bold text-avanta-navy">
                                      {sectionLabels[sectionKey]}
                                    </span>
                                    <span className="mt-1 block text-sm font-medium leading-5 text-avanta-graphite">
                                      {direction?.description}
                                    </span>
                                  </span>
                                  <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-avanta-emerald transition group-hover:translate-x-1" />
                                </NavLink>
                              );
                            })
                          ) : (
                            [
                              ["Объект", selectedBusinessObject?.title],
                              ["Задача", selectedBusinessTasks.map((item) => item.title).join(", ")],
                              ["Надежность", selectedBusinessReliability?.title],
                            ].map(([label, value]) => (
                              <div
                                key={label}
                                className="rounded-[18px] border border-avanta-navy/10 bg-white/72 p-4"
                              >
                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-avanta-emerald">
                                  {label}
                                </p>
                                <p className="mt-1 text-base font-bold text-avanta-navy">{value}</p>
                              </div>
                            ))
                          )}
                        </div>
                        {businessPickerStep === 3 ? (
                          <Button
                            className="mt-6 w-full rounded-[18px] bg-[linear-gradient(135deg,#259651,#13815f)] text-white shadow-[0_16px_34px_-18px_rgba(22,127,74,0.75)] hover:brightness-105"
                            onClick={() =>
                              openRequestModal({
                                service: "Подбор B2B-решения",
                                plan: businessRecommendation.plan,
                              })
                            }
                          >
                            Оставить заявку по подбору
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        ) : null}
                      </div>
                    </Card>
                  </div>
                </div>
              </section>
            </>
          ) : null}

          {isInternetPage ? (
            <>
              <section className="px-1 sm:px-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-avanta-green/30 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                  <Network className="h-3.5 w-3.5" />
                  Симметричный интернет
                </div>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                  Интернет для рабочих задач
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-avanta-graphite sm:text-base">
                  Симметричный канал для офиса, магазина или склада: стабильная отправка данных, видеосвязь и работа
                  облачных сервисов.
                </p>
              </section>

              {renderBusinessAdvantages(internetAdvantageGroup)}

              <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(132deg,rgba(252,255,255,0.95),rgba(239,248,244,0.92)_55%,rgba(234,243,248,0.9))] p-7 shadow-panel sm:p-9">
                <div className="pointer-events-none absolute -left-12 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_45%,transparent_70%)] blur-xl" />
                <div className="pointer-events-none absolute -bottom-16 right-6 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.14),rgba(8,58,71,0.05)_46%,transparent_72%)] blur-xl" />
                <div className="relative z-10">
                  <MediaCarousel itemClassName="min-w-[74%] sm:min-w-[56%] md:min-w-[39%] xl:min-w-[26%]">
                    {symmetricTariffCards.map((tariff, index) => (
                      <TariffCard
                        key={tariff.id}
                        tariff={tariff}
                        variant="business"
                        iconOverride={businessTariffIcons[index % businessTariffIcons.length]}
                        connectLabel="Оставить заявку"
                        onConnect={() =>
                          openRequestModal({
                            service: "Интернет для бизнеса",
                            plan: `${tariff.name} (${tariff.speed})`,
                          })
                        }
                      />
                    ))}
                  </MediaCarousel>
                </div>
              </section>

              <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <Card className="border-avanta-navy/10 p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-avanta-emerald" />
                    <h3 className="text-2xl font-bold text-avanta-navy">Опции для корпоративной сети</h3>
                  </div>
                  <div className="mt-5 space-y-3">
                    {additionalServices.map((service) => (
                      <div
                        key={service.name}
                        className="flex items-center justify-between gap-4 rounded-[18px] border border-avanta-navy/10 bg-white/72 px-4 py-3 shadow-[0_12px_24px_-24px_rgba(24,58,99,0.3)]"
                      >
                        <span className="text-sm font-semibold text-avanta-navy sm:text-base">{service.name}</span>
                        <span className="text-lg font-bold text-avanta-emerald">{service.price}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="border-avanta-navy/10 bg-[linear-gradient(145deg,#ffffff,#f2f9f4)] p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-avanta-emerald">Социальный тарифный план</p>
                  <h3 className="mt-3 text-3xl font-bold text-avanta-navy">СМАРТ100</h3>
                  <p className="mt-2 text-4xl font-bold leading-none text-avanta-emerald">10 ₽</p>
                  <p className="mt-3 text-sm leading-6 text-avanta-graphite">
                    Отдельная тарифная позиция для специальных задач подключения.
                  </p>
                  <Button
                    className="mt-6 w-full"
                    onClick={() => openRequestModal({ service: "Интернет для бизнеса", plan: "СМАРТ100" })}
                  >
                    Оставить заявку
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Card>
              </section>

              {renderBusinessCta({
                title: "Оставьте заявку на интернет для бизнеса",
                description:
                  "Расскажите про объект, задачи и нужную скорость. Подберем симметричный канал, тариф и корпоративные опции под вашу нагрузку.",
                service: "Интернет для бизнеса",
                plan: "Консультация по интернету для бизнеса",
              })}
            </>
          ) : null}

          {isSurveillancePage ? (
            <>
              <section className="px-1 sm:px-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-avanta-green/30 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                  <Camera className="h-3.5 w-3.5" />
                  Облачный архив
                </div>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                  Видеонаблюдение для объектов
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-avanta-graphite sm:text-base">
                  Онлайн-доступ и архив записей для офиса, магазина, склада или входной группы. Подберем глубину
                  хранения под требования объекта.
                </p>
              </section>

              {renderBusinessAdvantages(surveillanceAdvantageGroup)}

              <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(132deg,rgba(252,255,255,0.95),rgba(239,248,244,0.92)_55%,rgba(234,243,248,0.9))] p-6 shadow-panel sm:p-8">
                <div className="pointer-events-none absolute -left-12 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_45%,transparent_70%)] blur-xl" />
                <div className="pointer-events-none absolute -bottom-16 right-6 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.14),rgba(8,58,71,0.05)_46%,transparent_72%)] blur-xl" />
                <div className="relative z-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                  <Card className="border-avanta-navy/10 bg-white/78 p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-avanta-emerald">Тарифы</p>
                    <div className="mt-4 space-y-2.5">
                      {[
                        "Онлайн — 100 руб",
                        "Архив 3 дня — 300 руб",
                        "Архив 7 дней — 490 руб",
                        "Архив 10 дней — 690 руб",
                        "Архив 30 дней — 1300 руб",
                      ].map((line) => (
                        <div
                          key={line}
                          className="rounded-[16px] border border-avanta-navy/12 bg-white/86 px-5 py-3 text-sm font-semibold text-avanta-navy shadow-[0_12px_24px_-24px_rgba(24,58,99,0.32)] sm:text-base"
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="border-avanta-navy/10 bg-[linear-gradient(145deg,#ffffff,#f2f9f4)] p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-avanta-emerald">Дополнительно</p>
                    <div
                      className="mt-4 rounded-[18px] border border-avanta-navy/12 bg-white/86 px-5 py-4 text-base font-semibold text-avanta-navy shadow-[0_12px_24px_-24px_rgba(24,58,99,0.32)]"
                    >
                      Запись по движению — 150,00 руб.
                    </div>
                    <p className="mt-4 text-sm leading-6 text-avanta-graphite">
                      Поможем выбрать схему хранения под нагрузку, зоны контроля и требования к архиву.
                    </p>
                    <Button
                      className="mt-6 w-full"
                      onClick={() => openRequestModal({ service: "Видеонаблюдение", plan: "Архив и хранение" })}
                    >
                      Оставить заявку
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Card>
                </div>
              </section>

              {renderBusinessCta({
                title: "Оставьте заявку на видеонаблюдение",
                description:
                  "Расскажите, где нужны камеры и архив. Подберем тариф, оборудование и формат подключения под объект.",
                service: "Видеонаблюдение",
                plan: "Консультация по видеонаблюдению",
              })}
            </>
          ) : null}

          {isEquipmentPage ? (
            <>
              <section className="px-1 sm:px-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-avanta-green/30 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                  <Server className="h-3.5 w-3.5" />
                  Оборудование
                </div>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                  Маршрутизаторы и медиаприставка для объектов
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-avanta-graphite sm:text-base">
                  Подберите оборудование для рабочей сети, Wi-Fi-покрытия или ТВ-зоны. Поможем выбрать модель под
                  площадь, нагрузку и сценарий работы объекта.
                </p>
              </section>

              {renderBusinessAdvantages(equipmentAdvantageGroup)}

              <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(132deg,rgba(252,255,255,0.95),rgba(239,248,244,0.92)_55%,rgba(234,243,248,0.9))] p-6 shadow-panel sm:p-8">
                <div className="pointer-events-none absolute -left-12 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_45%,transparent_70%)] blur-xl" />
                <div className="pointer-events-none absolute -bottom-16 right-6 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.14),rgba(8,58,71,0.05)_46%,transparent_72%)] blur-xl" />
                <div className="pointer-events-none absolute right-10 top-8 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/12 to-avanta-navy/10" />
                <div className="relative z-10">
                  <div className="mb-6 rounded-[24px] border border-avanta-navy/10 bg-white/72 p-4 shadow-[0_18px_38px_-32px_rgba(24,58,99,0.34)] backdrop-blur sm:p-5">
                    <p className="inline-flex items-center gap-2 rounded-full border border-avanta-green/25 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                      <Wifi className="h-3.5 w-3.5" />
                      Маршрутизаторы
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                      Оборудование для сети и ТВ
                    </h3>
                    <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-avanta-graphite sm:text-base">
                      В наличии позиции для Wi-Fi 6, mesh-покрытия и IP TV. Цена указана за одно устройство.
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-[24px] border border-avanta-navy/10 bg-white/78 shadow-[0_16px_34px_-32px_rgba(24,58,99,0.36)] backdrop-blur">
                    <div className="hidden grid-cols-[1.35fr_0.5fr_1fr_0.56fr] gap-4 border-b border-avanta-navy/10 bg-[linear-gradient(90deg,rgba(238,243,244,0.86),rgba(255,255,255,0.82))] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-avanta-navy/62 lg:grid">
                      <span>Модель</span>
                      <span>Тип</span>
                      <span>Назначение</span>
                      <span className="text-right">Цена</span>
                    </div>
                    <div className="divide-y divide-avanta-navy/10">
                      {equipmentItems.map((item) => {
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.name}
                            type="button"
                            className="group grid w-full cursor-pointer gap-3 px-4 py-4 text-left transition duration-200 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-avanta-green/35 sm:px-5 lg:grid-cols-[1.35fr_0.5fr_1fr_0.56fr] lg:items-center lg:gap-4"
                            onClick={() =>
                              openRequestModal({
                                service: "Оборудование",
                                plan: item.name,
                              })
                            }
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-avanta-green/14 to-avanta-navy/8 text-avanta-emerald">
                                <Icon className="h-5 w-5" />
                              </span>
                              <div className="min-w-0">
                                <p className="text-base font-bold leading-tight text-avanta-navy">{item.name}</p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-avanta-emerald lg:hidden">
                                  {item.type}
                                </p>
                              </div>
                            </div>
                            <div className="hidden lg:block">
                              <span className="inline-flex rounded-full border border-avanta-navy/10 bg-white/80 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.13em] text-avanta-navy">
                                {item.type}
                              </span>
                            </div>
                            <p className="text-sm font-medium leading-5 text-avanta-graphite">{item.description}</p>
                            <div className="flex items-center justify-between gap-3 lg:justify-end">
                              <span className="whitespace-nowrap rounded-full bg-avanta-green/10 px-3 py-1.5 text-lg font-bold text-avanta-emerald">
                                {item.price}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>

              {renderBusinessAdvantages(videoEquipmentAdvantageGroup)}

              <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(132deg,rgba(252,255,255,0.95),rgba(239,248,244,0.92)_55%,rgba(234,243,248,0.9))] p-6 shadow-panel sm:p-8">
                <div className="pointer-events-none absolute -left-12 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_45%,transparent_70%)] blur-xl" />
                <div className="pointer-events-none absolute -bottom-16 right-6 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.14),rgba(8,58,71,0.05)_46%,transparent_72%)] blur-xl" />
                <div className="pointer-events-none absolute right-10 top-8 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/12 to-avanta-navy/10" />
                <div className="relative z-10">
                  <div className="mb-6 rounded-[24px] border border-avanta-navy/10 bg-white/72 p-4 shadow-[0_18px_38px_-32px_rgba(24,58,99,0.34)] backdrop-blur sm:p-5">
                    <p className="inline-flex items-center gap-2 rounded-full border border-avanta-green/25 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                      <Camera className="h-3.5 w-3.5" />
                      Видеонаблюдение
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                      Оборудование для видеонаблюдения
                    </h3>
                   <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-avanta-graphite sm:text-base">
                      Камеры, коммутаторы, кросс-муфты и шкаф ШРН для сборки обслуживаемой системы видеонаблюдения.
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-[24px] border border-avanta-navy/10 bg-white/78 shadow-[0_16px_34px_-32px_rgba(24,58,99,0.36)] backdrop-blur">
                    <div className="hidden grid-cols-[1.35fr_0.68fr_1fr_0.5fr] gap-4 border-b border-avanta-navy/10 bg-[linear-gradient(90deg,rgba(238,243,244,0.86),rgba(255,255,255,0.82))] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-avanta-navy/62 lg:grid">
                      <span>Модель</span>
                      <span>Тип</span>
                      <span>Назначение</span>
                      <span className="text-right">Цена</span>
                    </div>
                    <div className="divide-y divide-avanta-navy/10">
                      {videoEquipmentItems.map((item) => {
                        const Icon = item.icon;

                        return (
                          <button
                            key={`${item.name}-${item.type}`}
                            type="button"
                            className="group grid w-full cursor-pointer gap-3 px-4 py-4 text-left transition duration-200 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-avanta-green/35 sm:px-5 lg:grid-cols-[1.35fr_0.68fr_1fr_0.5fr] lg:items-center lg:gap-4"
                            onClick={() =>
                              openRequestModal({
                                service: "Оборудование для видеонаблюдения",
                                plan: `${item.name} ${item.type}`,
                              })
                            }
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-avanta-green/14 to-avanta-navy/8 text-avanta-emerald">
                                <Icon className="h-5 w-5" />
                              </span>
                              <div className="min-w-0">
                                <p className="text-base font-bold leading-tight text-avanta-navy">{item.name}</p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-avanta-emerald lg:hidden">
                                  {item.type}
                                </p>
                              </div>
                            </div>
                            <div className="hidden lg:block">
                              <span className="inline-flex rounded-full border border-avanta-navy/10 bg-white/80 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.13em] text-avanta-navy">
                                {item.type}
                              </span>
                            </div>
                            <p className="text-sm font-medium leading-5 text-avanta-graphite">{item.description}</p>
                            <div className="flex items-center justify-between gap-3 lg:justify-end">
                              <span className="whitespace-nowrap rounded-full bg-avanta-green/10 px-3 py-1.5 text-lg font-bold text-avanta-emerald">
                                {item.price}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>

              {extraEquipmentGroups.map((group) => {
                const GroupIcon = group.icon;

                return (
                  <Fragment key={group.title}>
                    {renderBusinessAdvantages(group.advantages)}

                    <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(132deg,rgba(252,255,255,0.95),rgba(239,248,244,0.92)_55%,rgba(234,243,248,0.9))] p-6 shadow-panel sm:p-8">
                      <div className="pointer-events-none absolute -left-12 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_45%,transparent_70%)] blur-xl" />
                      <div className="pointer-events-none absolute -bottom-16 right-6 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.14),rgba(8,58,71,0.05)_46%,transparent_72%)] blur-xl" />
                      <div className="pointer-events-none absolute right-10 top-8 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/12 to-avanta-navy/10" />
                      <div className="relative z-10">
                        <div className="mb-6 rounded-[24px] border border-avanta-navy/10 bg-white/72 p-4 shadow-[0_18px_38px_-32px_rgba(24,58,99,0.34)] backdrop-blur sm:p-5">
                          <p className="inline-flex items-center gap-2 rounded-full border border-avanta-green/25 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                            <GroupIcon className="h-3.5 w-3.5" />
                            {group.label}
                          </p>
                          <h3 className="mt-3 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                            {group.title}
                          </h3>
                          <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-avanta-graphite sm:text-base">
                            {group.description}
                          </p>
                        </div>

                        <div className="overflow-hidden rounded-[24px] border border-avanta-navy/10 bg-white/78 shadow-[0_16px_34px_-32px_rgba(24,58,99,0.36)] backdrop-blur">
                          <div className="hidden grid-cols-[1.35fr_0.68fr_1fr_0.5fr] gap-4 border-b border-avanta-navy/10 bg-[linear-gradient(90deg,rgba(238,243,244,0.86),rgba(255,255,255,0.82))] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-avanta-navy/62 lg:grid">
                            <span>Позиция</span>
                            <span>Тип</span>
                            <span>Назначение</span>
                            <span className="text-right">Цена</span>
                          </div>
                          <div className="divide-y divide-avanta-navy/10">
                            {group.items.map((item) => {
                              const Icon = item.icon;

                              return (
                                <button
                                  key={`${group.title}-${item.name}-${item.type}`}
                                  type="button"
                                  className="group grid w-full cursor-pointer gap-3 px-4 py-4 text-left transition duration-200 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-avanta-green/35 sm:px-5 lg:grid-cols-[1.35fr_0.68fr_1fr_0.5fr] lg:items-center lg:gap-4"
                                  onClick={() =>
                                    openRequestModal({
                                      service: group.title,
                                      plan: `${item.name} ${item.type}`,
                                    })
                                  }
                                >
                                  <div className="flex min-w-0 items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-avanta-green/14 to-avanta-navy/8 text-avanta-emerald">
                                      <Icon className="h-5 w-5" />
                                    </span>
                                    <div className="min-w-0">
                                      <p className="text-base font-bold leading-tight text-avanta-navy">{item.name}</p>
                                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-avanta-emerald lg:hidden">
                                        {item.type}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="hidden lg:block">
                                    <span className="inline-flex rounded-full border border-avanta-navy/10 bg-white/80 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.13em] text-avanta-navy">
                                      {item.type}
                                    </span>
                                  </div>
                                  <p className="text-sm font-medium leading-5 text-avanta-graphite">{item.description}</p>
                                  <div className="flex items-center justify-between gap-3 lg:justify-end">
                                    <span className="whitespace-nowrap rounded-full bg-avanta-green/10 px-3 py-1.5 text-lg font-bold text-avanta-emerald">
                                      {item.price}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                      </div>
                    </div>
                    </section>
                  </Fragment>
                );
              })}

              {renderBusinessCta({
                title: "Оставьте заявку на оборудование",
                description:
                  "Расскажите про объект, площадь и задачи. Подберем оборудование для сети, видеонаблюдения, домофонии или шлагбаума.",
                service: "Оборудование",
                plan: "Консультация по оборудованию",
              })}
            </>
          ) : null}

          {isServicesPage ? (
            <>
              <section className="px-1 sm:px-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-avanta-green/30 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  Сервисные услуги
                </div>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                  Стоимость работ для объектов
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-avanta-graphite sm:text-base">
                  Собрали основные работы по подключению, настройке и обслуживанию оборудования на объектах. Нажмите
                  на нужную услугу, чтобы оставить заявку с выбранной позицией.
                </p>
              </section>

              {serviceWorkGroups.map((group) => {
                const GroupIcon = group.icon;

                return (
                  <Fragment key={group.title}>
                    {renderBusinessAdvantages(group.advantages)}

                    <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(132deg,rgba(252,255,255,0.95),rgba(239,248,244,0.92)_55%,rgba(234,243,248,0.9))] p-6 shadow-panel sm:p-8">
                      <div className="pointer-events-none absolute -left-12 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_45%,transparent_70%)] blur-xl" />
                      <div className="pointer-events-none absolute -bottom-16 right-6 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.14),rgba(8,58,71,0.05)_46%,transparent_72%)] blur-xl" />
                      <div className="pointer-events-none absolute right-10 top-8 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/12 to-avanta-navy/10" />
                      <div className="relative z-10">
                        <div className="mb-6 rounded-[24px] border border-avanta-navy/10 bg-white/72 p-4 shadow-[0_18px_38px_-32px_rgba(24,58,99,0.34)] backdrop-blur sm:p-5">
                          <p className="inline-flex items-center gap-2 rounded-full border border-avanta-green/25 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                            <GroupIcon className="h-3.5 w-3.5" />
                            {group.label}
                          </p>
                          <h3 className="mt-3 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                            {group.title}
                          </h3>
                          <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-avanta-graphite sm:text-base">
                            {group.description}
                          </p>
                        </div>

                        <div className="overflow-hidden rounded-[24px] border border-avanta-navy/10 bg-white/78 shadow-[0_16px_34px_-32px_rgba(24,58,99,0.36)] backdrop-blur">
                          <div className="hidden grid-cols-[1.35fr_0.68fr_1fr_0.5fr] gap-4 border-b border-avanta-navy/10 bg-[linear-gradient(90deg,rgba(238,243,244,0.86),rgba(255,255,255,0.82))] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-avanta-navy/62 lg:grid">
                            <span>Работа</span>
                            <span>Тип</span>
                            <span>Назначение</span>
                            <span className="text-right">Цена</span>
                          </div>
                          <div className="divide-y divide-avanta-navy/10">
                            {group.items.map((item) => {
                              const Icon = item.icon;

                              return (
                                <button
                                  key={`${group.title}-${item.name}-${item.type}`}
                                  type="button"
                                  className="group grid w-full cursor-pointer gap-3 px-4 py-4 text-left transition duration-200 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-avanta-green/35 sm:px-5 lg:grid-cols-[1.35fr_0.68fr_1fr_0.5fr] lg:items-center lg:gap-4"
                                  onClick={() =>
                                    openRequestModal({
                                      service: "Сервисные услуги",
                                      plan: `${group.title}: ${item.name} (${item.type})`,
                                    })
                                  }
                                >
                                  <div className="flex min-w-0 items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-avanta-green/14 to-avanta-navy/8 text-avanta-emerald">
                                      <Icon className="h-5 w-5" />
                                    </span>
                                    <div className="min-w-0">
                                      <p className="text-base font-bold leading-tight text-avanta-navy">{item.name}</p>
                                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-avanta-emerald lg:hidden">
                                        {item.type}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="hidden lg:block">
                                    <span className="inline-flex rounded-full border border-avanta-navy/10 bg-white/80 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.13em] text-avanta-navy">
                                      {item.type}
                                    </span>
                                  </div>
                                  <p className="text-sm font-medium leading-5 text-avanta-graphite">{item.description}</p>
                                  <div className="flex items-center justify-between gap-3 lg:justify-end">
                                    <span className="whitespace-nowrap rounded-full bg-avanta-green/10 px-3 py-1.5 text-lg font-bold text-avanta-emerald">
                                      {item.price}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </section>
                  </Fragment>
                );
              })}

              {renderBusinessCta({
                title: "Оставьте заявку на сервисные услуги",
                description:
                  "Расскажите, какие работы нужны на объекте: настройка, перенос точки, монтаж камеры или шлагбаум. Уточним состав работ и согласуем выезд.",
                service: "Сервисные услуги",
                plan: "Консультация по сервисным услугам",
              })}
            </>
          ) : null}

          {isInfrastructurePage ? (
            <>
              <section className="px-1 sm:px-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-avanta-green/30 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                  <Network className="h-3.5 w-3.5" />
                  Инфраструктура
                </div>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                  Инфраструктурные услуги для B2B-проектов
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-avanta-graphite sm:text-base">
                  Подключаем каналы связи, передаем видеопотоки и помогаем с техническими условиями для объектов,
                  где важны согласование, связность и надежная инфраструктура.
                </p>
              </section>

              {renderBusinessAdvantages(infrastructureAdvantageGroup)}

              <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(132deg,rgba(252,255,255,0.95),rgba(239,248,244,0.92)_55%,rgba(234,243,248,0.9))] p-6 shadow-panel sm:p-8">
                <div className="pointer-events-none absolute -left-12 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_45%,transparent_70%)] blur-xl" />
                <div className="pointer-events-none absolute -bottom-16 right-6 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.14),rgba(8,58,71,0.05)_46%,transparent_72%)] blur-xl" />
                <div className="pointer-events-none absolute right-10 top-8 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/12 to-avanta-navy/10" />
                <div className="relative z-10">
                  <div className="mb-6 rounded-[24px] border border-avanta-navy/10 bg-white/72 p-4 shadow-[0_18px_38px_-32px_rgba(24,58,99,0.34)] backdrop-blur sm:p-5">
                    <p className="inline-flex items-center gap-2 rounded-full border border-avanta-green/25 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                      <Server className="h-3.5 w-3.5" />
                      Каталог инфраструктуры
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                      Выберите направление инфраструктурной услуги
                    </h3>
                    <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-avanta-graphite sm:text-base">
                      Каждое направление можно обсудить отдельно: укажите объект, задачу и требуемый формат услуги.
                    </p>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-3">
                    {infrastructureGroups.map((group) => {
                      const GroupIcon = group.icon;

                      return (
                        <Card
                          key={group.title}
                          className="relative flex h-full flex-col overflow-hidden rounded-[28px] border-avanta-green/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(245,250,247,0.92))] p-5"
                        >
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(24,58,99,0.08),transparent_34%)]" />
                          <div className="relative z-10 flex items-start gap-3">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10 text-avanta-emerald">
                              <GroupIcon className="h-6 w-6" />
                            </span>
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.14em] text-avanta-emerald">
                                {group.label}
                              </p>
                              <h3 className="mt-2 text-2xl font-bold leading-tight text-avanta-navy">{group.title}</h3>
                            </div>
                          </div>
                          <p className="relative z-10 mt-4 text-sm font-medium leading-6 text-avanta-graphite">
                            {group.description}
                          </p>
                          <div className="relative z-10 mt-5 space-y-3">
                            {group.items.map((item) => {
                              const Icon = item.icon;

                              return (
                                <button
                                  key={`${group.title}-${item.name}-${item.type}`}
                                  type="button"
                                  className="group w-full cursor-pointer rounded-[22px] border border-avanta-navy/10 bg-white/74 p-4 text-left shadow-[0_12px_24px_-24px_rgba(24,58,99,0.28)] transition duration-200 hover:-translate-y-0.5 hover:border-avanta-green/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanta-green/35"
                                  onClick={() =>
                                    openRequestModal({
                                      service: "Инфраструктура",
                                      plan: `${group.title}: ${item.name}`,
                                    })
                                  }
                                >
                                  <div className="flex items-start gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-avanta-green/10 text-avanta-emerald">
                                      <Icon className="h-5 w-5" />
                                    </span>
                                    <div className="min-w-0">
                                      <p className="text-base font-bold leading-tight text-avanta-navy">{item.name}</p>
                                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-avanta-emerald">
                                        {item.type}
                                      </p>
                                      <p className="mt-2 text-sm font-medium leading-5 text-avanta-graphite">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </section>

              {renderBusinessCta({
                title: "Оставьте заявку на инфраструктуру",
                description:
                  "Расскажите, нужна ли аренда канала, передача видеопотоков или технические условия. Уточним параметры проекта и подготовим следующий шаг.",
                service: "Инфраструктура",
                plan: "Консультация по инфраструктуре",
              })}
            </>
          ) : null}

          {isSmartPage ? (
            <>
              <section className="px-1 sm:px-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-avanta-green/30 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                  <Smartphone className="h-3.5 w-3.5" />
                  Умный домофон
                </div>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                  Умный домофон для подъездов и ЖК
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-avanta-graphite sm:text-base">
                  Контроль доступа для жилых объектов: удобный вход для пользователей и понятное управление для
                  управляющей или обслуживающей организации.
                </p>
              </section>

              {renderBusinessAdvantages(smartAdvantageGroups.intercom)}

              <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(132deg,rgba(252,255,255,0.95),rgba(239,248,244,0.92)_55%,rgba(234,243,248,0.9))] p-7 shadow-panel sm:p-9">
                <div className="pointer-events-none absolute -left-12 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_45%,transparent_70%)] blur-xl" />
                <div className="pointer-events-none absolute -bottom-16 right-6 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.14),rgba(8,58,71,0.05)_46%,transparent_72%)] blur-xl" />
                <div className="pointer-events-none absolute right-10 top-8 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/12 to-avanta-navy/10" />
                <div className="pointer-events-none absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-avanta-navy/10 to-transparent" />
                <div className="relative z-10">
                  <div className="mb-6 rounded-[24px] border border-avanta-navy/10 bg-white/72 p-4 shadow-[0_18px_38px_-32px_rgba(24,58,99,0.34)] backdrop-blur sm:p-5">
                    <div>
                      <p className="inline-flex items-center gap-2 rounded-full border border-avanta-green/25 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                        <Building2 className="h-3.5 w-3.5" />
                        Для МКД и подъездов
                      </p>
                      <h3 className="mt-3 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                        Выберите тариф по размеру подъезда
                      </h3>
                    </div>
                   <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-avanta-graphite sm:text-base">
                      В заявке укажите адрес и количество квартир. Мы проверим возможность подключения и подберем
                      тариф умного домофона под объект.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {smartIntercomTariffCards.map((tariff, index) => (
                      <TariffCard
                        key={tariff.id}
                        tariff={tariff}
                        variant="business"
                        iconOverride={smartIntercomIcons[index % smartIntercomIcons.length]}
                        connectLabel="Оставить заявку"
                        onConnect={() =>
                          openRequestModal({
                            service: "Умные сервисы",
                            plan: `Умный домофон: ${tariff.name} (${tariff.speed})`,
                          })
                        }
                      />
                    ))}

                    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.26 }} className="h-full">
                      <Card className="relative flex h-full flex-col overflow-hidden border-avanta-green/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,250,247,0.92))] p-6">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(22,127,74,0.08),transparent_32%)]" />
                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10 text-avanta-emerald">
                          <BriefcaseBusiness className="h-6 w-6" />
                        </div>
                        <p className="relative z-10 mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-avanta-emerald">
                          Для бизнеса
                        </p>
                        <h3 className="relative z-10 mt-3 text-2xl font-bold text-avanta-navy">
                          Нужен расчет под объект?
                        </h3>
                        <p className="relative z-10 mt-4 text-sm leading-6 text-avanta-graphite">
                          Укажите адрес, количество квартир и формат доступа. Подберем тариф и проверим возможность
                          подключения.
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="relative z-10 mt-auto w-full border-avanta-navy/12 bg-[linear-gradient(180deg,rgba(241,246,244,0.96),rgba(233,241,237,0.94))] shadow-[0_14px_28px_-24px_rgba(24,58,99,0.22)] hover:border-avanta-green/30 hover:bg-[linear-gradient(135deg,rgba(58,170,53,0.22),rgba(255,255,255,0.98))] hover:text-avanta-emerald"
                          onClick={() => openRequestModal({ service: "Умные сервисы", plan: "Умный домофон" })}
                        >
                          Обсудить подключение
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </section>

              <section className="px-1 sm:px-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-avanta-green/30 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                  <Network className="h-3.5 w-3.5" />
                  Умный шлагбаум
                </div>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                  Умный шлагбаум для дворов и объектов
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-avanta-graphite sm:text-base">
                  Организуем управляемый въезд для дворов, парковок и коммерческих территорий с понятными сценариями
                  доступа для пользователей.
                </p>
              </section>

              {renderBusinessAdvantages(smartAdvantageGroups.barrier)}

              <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(132deg,rgba(252,255,255,0.95),rgba(240,248,245,0.92)_52%,rgba(234,243,248,0.9))] p-7 shadow-panel sm:p-9">
                <div className="pointer-events-none absolute -left-14 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_45%,transparent_72%)] blur-xl" />
                <div className="pointer-events-none absolute -bottom-16 right-8 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.14),rgba(8,58,71,0.05)_46%,transparent_74%)] blur-xl" />
                <div className="pointer-events-none absolute right-12 top-8 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/12 to-avanta-navy/10" />
                <div className="relative z-10">
                  <div className="mb-6 rounded-[24px] border border-avanta-navy/10 bg-white/72 p-4 shadow-[0_18px_38px_-32px_rgba(24,58,99,0.34)] backdrop-blur sm:p-5">
                    <p className="inline-flex items-center gap-2 rounded-full border border-avanta-green/25 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                      <Server className="h-3.5 w-3.5" />
                      Доступ и автоматизация
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                      Подберите тариф под сеть и число пользователей
                    </h3>
                    <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-avanta-graphite sm:text-base">
                      Стоимость зависит от схемы управления, сети подключения и размера объекта. Для крупных территорий
                      удобнее комбинированный сценарий: автоматическое открытие и ручное управление.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {smartBarrierTariffs.map((tariff, index) => {
                      const Icon = smartBarrierIcons[index % smartBarrierIcons.length];
                      const isRecommended = index === 3;

                      return (
                        <motion.div
                          key={`${tariff.name}-${tariff.price}-${tariff.scope}`}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.24 }}
                          className="h-full"
                        >
                          <Card
                            className={`relative flex min-h-[300px] h-full flex-col overflow-hidden rounded-[28px] border bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(245,250,247,0.92))] p-6 ${
                              isRecommended ? "border-avanta-green/30 shadow-float" : "border-avanta-green/10"
                            }`}
                          >
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(24,58,99,0.08),transparent_34%)]" />
                            <div className="relative z-10 flex items-start justify-between gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10 text-avanta-emerald">
                                <Icon className="h-6 w-6" />
                              </div>
                              <span
                                className={`rounded-full border px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.13em] ${
                                  isRecommended
                                    ? "border-avanta-green/30 bg-avanta-green/10 text-avanta-emerald"
                                    : "border-avanta-navy/10 bg-white/76 text-avanta-navy"
                                }`}
                              >
                                {isRecommended ? "Оптимальный" : tariff.badge}
                              </span>
                            </div>

                            <p className="relative z-10 mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-avanta-emerald">
                              {tariff.scope}
                            </p>
                            <h3 className="relative z-10 mt-3 text-2xl font-bold leading-tight text-avanta-navy">
                              {tariff.name}
                            </h3>
                            <p className="relative z-10 mt-3 text-2xl font-bold text-avanta-emerald">
                              {tariff.price}
                            </p>
                            <p className="relative z-10 mt-4 text-sm leading-6 text-avanta-graphite">
                              {tariff.description}
                            </p>

                            <Button
                              type="button"
                              variant="outline"
                              className="relative z-10 mt-auto w-full border-avanta-navy/12 bg-[linear-gradient(180deg,rgba(241,246,244,0.96),rgba(233,241,237,0.94))] shadow-[0_14px_28px_-24px_rgba(24,58,99,0.22)] hover:border-avanta-green/30 hover:bg-[linear-gradient(135deg,rgba(58,170,53,0.22),rgba(255,255,255,0.98))] hover:text-avanta-emerald"
                              onClick={() =>
                                openRequestModal({
                                  service: "Умные сервисы",
                                  plan: `Умный шлагбаум: ${tariff.name} (${tariff.scope})`,
                                })
                              }
                            >
                              Оставить заявку
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Card>
                        </motion.div>
                      );
                    })}

                    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.24 }} className="h-full">
                      <Card className="relative flex min-h-[300px] h-full flex-col overflow-hidden rounded-[28px] border border-avanta-green/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(245,250,247,0.92))] p-6">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(24,58,99,0.08),transparent_34%)]" />
                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10 text-avanta-emerald">
                          <BriefcaseBusiness className="h-6 w-6" />
                        </div>
                        <p className="relative z-10 mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-avanta-emerald">
                          Нестандартный объект
                        </p>
                        <h3 className="relative z-10 mt-3 text-2xl font-bold leading-tight text-avanta-navy">
                          Нужно несколько въездов?
                        </h3>
                        <p className="relative z-10 mt-3 text-2xl font-bold text-avanta-emerald">
                          Рассчитаем
                        </p>
                        <p className="relative z-10 mt-4 text-sm leading-6 text-avanta-graphite">
                          Подберем схему управления, количество пользователей и формат доступа под вашу территорию.
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="relative z-10 mt-auto w-full border-avanta-navy/12 bg-[linear-gradient(180deg,rgba(241,246,244,0.96),rgba(233,241,237,0.94))] shadow-[0_14px_28px_-24px_rgba(24,58,99,0.22)] hover:border-avanta-green/30 hover:bg-[linear-gradient(135deg,rgba(58,170,53,0.22),rgba(255,255,255,0.98))] hover:text-avanta-emerald"
                          onClick={() => openRequestModal({ service: "Умные сервисы", plan: "Умный шлагбаум: расчет под объект" })}
                        >
                          Обсудить проект
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </section>

              <section className="px-1 sm:px-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-avanta-green/30 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                  <Wifi className="h-3.5 w-3.5" />
                  Публичный Wi-Fi
                </div>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                  Публичный Wi-Fi для гостей и клиентов
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-avanta-graphite sm:text-base">
                  Отдельный гостевой доступ для офисов, клиентских зон, торговых объектов и площадок с высокой
                  посещаемостью.
                </p>
              </section>

              {renderBusinessAdvantages(smartAdvantageGroups.wifi)}

              <section className="cut-corner relative overflow-hidden rounded-[36px] border border-avanta-navy/10 bg-[linear-gradient(132deg,rgba(252,255,255,0.95),rgba(239,248,244,0.92)_55%,rgba(234,243,248,0.9))] p-7 shadow-panel sm:p-9">
                <div className="pointer-events-none absolute -left-12 -top-14 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(58,170,53,0.2),rgba(22,127,74,0.08)_45%,transparent_70%)] blur-xl" />
                <div className="pointer-events-none absolute -bottom-16 right-6 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(24,58,99,0.14),rgba(8,58,71,0.05)_46%,transparent_72%)] blur-xl" />
                <div className="pointer-events-none absolute right-10 top-8 h-36 w-36 rotate-45 rounded-[24px] bg-gradient-to-br from-avanta-green/12 to-avanta-navy/10" />
                <div className="relative z-10">
                  <div className="mb-6 rounded-[24px] border border-avanta-navy/10 bg-white/72 p-4 shadow-[0_18px_38px_-32px_rgba(24,58,99,0.34)] backdrop-blur sm:p-5">
                    <p className="inline-flex items-center gap-2 rounded-full border border-avanta-green/25 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-avanta-emerald">
                      <Wifi className="h-3.5 w-3.5" />
                      Hot spot
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-tight text-avanta-navy sm:text-3xl">
                      Подберите пакет под поток посетителей
                    </h3>
                    <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-avanta-graphite sm:text-base">
                      Публичный Wi-Fi подходит для офисов, клиентских зон, торговых объектов и пространств, где нужен
                      отдельный гостевой доступ.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-3">
                    {smartWifiTariffs.map((tariff, index) => (
                      <motion.div
                        key={tariff.name}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.24 }}
                        className="h-full"
                      >
                        <Card
                          className={`relative flex min-h-[300px] h-full flex-col overflow-hidden rounded-[28px] border bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(245,250,247,0.92))] p-6 ${
                            index === 1 ? "border-avanta-green/30 shadow-float" : "border-avanta-green/10"
                          }`}
                        >
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(24,58,99,0.08),transparent_34%)]" />
                          <div className="relative z-10 flex items-start justify-between gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10 text-avanta-emerald">
                              <Wifi className="h-6 w-6" />
                            </div>
                            {index === 1 ? (
                              <span className="rounded-full border border-avanta-green/30 bg-avanta-green/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-avanta-emerald">
                                Оптимальный
                              </span>
                            ) : null}
                          </div>

                          <p className="relative z-10 mt-5 text-3xl font-bold leading-tight text-avanta-navy">
                            {tariff.name}
                          </p>
                          <p className="relative z-10 mt-3 text-2xl font-bold text-avanta-emerald">
                            {tariff.price}
                          </p>
                          <p className="relative z-10 mt-2 inline-flex w-fit rounded-full border border-avanta-navy/10 bg-white/75 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.11em] text-avanta-navy">
                            Пакет {tariff.scope}
                          </p>
                          <p className="relative z-10 mt-4 text-base font-medium leading-7 text-avanta-graphite">
                            {tariff.description}
                          </p>

                          <Button
                            type="button"
                            variant="outline"
                            className="relative z-10 mt-auto w-full border-avanta-navy/12 bg-[linear-gradient(180deg,rgba(241,246,244,0.96),rgba(233,241,237,0.94))] shadow-[0_14px_28px_-24px_rgba(24,58,99,0.22)] hover:border-avanta-green/30 hover:bg-[linear-gradient(135deg,rgba(58,170,53,0.22),rgba(255,255,255,0.98))] hover:text-avanta-emerald"
                            onClick={() =>
                              openRequestModal({
                                service: "Умные сервисы",
                                plan: `Публичный Wi-Fi: ${tariff.name}`,
                              })
                            }
                          >
                            Оставить заявку
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {renderBusinessCta({
                title: "Оставьте заявку на умные сервисы",
                description:
                  "Расскажите про объект: подъезд, двор, парковку или клиентскую зону. Подберем сценарий подключения, тариф и формат обслуживания.",
                service: "Умные сервисы",
                plan: "Консультация по умным сервисам",
              })}
            </>
          ) : null}

          {currentSection &&
          !isInternetPage &&
          !isSurveillancePage &&
          !isSmartPage &&
          !isEquipmentPage &&
          !isServicesPage &&
          !isInfrastructurePage ? (
            <section>
              <Card className="border-avanta-navy/10 bg-avanta-mist/70 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-avanta-emerald" />
                  <div>
                    <p className="text-lg font-bold text-avanta-navy">Раздел «{currentSectionLabel}»</p>
                    <p className="mt-2 text-sm leading-7 text-avanta-graphite sm:text-base">
                      Контент этого раздела заполним следующим шагом. Основа уже подготовлена под отдельную страницу
                      в B2B-структуре.
                    </p>
                    <Button className="mt-4" onClick={() => openRequestModal()}>
                      Оставить заявку
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </section>
          ) : null}
        </div>
      </motion.div>

      <BusinessRequestModal open={requestModalOpen} onOpenChange={setRequestModalOpen} preset={requestPreset} />
    </>
  );
}
