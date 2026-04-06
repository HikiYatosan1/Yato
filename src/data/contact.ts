import { Headset, Mail, MapPin, PhoneCall } from "lucide-react";
import type { ContactMethod } from "@/types/content";

export const contactMethods: ContactMethod[] = [
  {
    title: "Телефон",
    value: "+7 (800) 555-24-24",
    description: "Подключение, тарифы, консультации по покрытию.",
    href: "tel:+78005552424",
    icon: PhoneCall,
  },
  {
    title: "Почта",
    value: "connect@avanta-demo.ru",
    description: "Для заявок, партнёрских обращений и бизнес-вопросов.",
    href: "mailto:connect@avanta-demo.ru",
    icon: Mail,
  },
  {
    title: "Офис продаж",
    value: "г. Москва, ул. Новая связь, 18",
    description: "Демо-адрес для презентации офлайн-точки и самовывоза оборудования.",
    href: "#map",
    icon: MapPin,
  },
  {
    title: "Поддержка",
    value: "24/7 онлайн",
    description: "В демо показываем круглосуточную поддержку как важное обещание сервиса.",
    href: "/contacts#application",
    icon: Headset,
  },
];

