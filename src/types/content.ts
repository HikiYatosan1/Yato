import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type ScenarioCard = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tag: string;
  imageUrl?: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  imageUrl?: string;
  imageClassName?: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  meta: string;
  imageUrl?: string;
};

export type TariffCategory =
  | "all"
  | "apartment"
  | "house"
  | "bundle"
  | "business"
  | "xpon"
  | "ftth";

export type Tariff = {
  id: string;
  name: string;
  category: Exclude<TariffCategory, "all">;
  speed: string;
  price: string;
  oldPrice?: string;
  description: string;
  features: string[];
  badge?: string;
  popular?: boolean;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type PromoItem = {
  title: string;
  description: string;
  details: string;
  deadline: string;
  badge: string;
  featured?: boolean;
  imageUrl?: string;
  imagePosition?: string;
};

export type VideoPackage = {
  title: string;
  price: string;
  description: string;
  features: string[];
  icon?: LucideIcon;
  badge?: string;
  popular?: boolean;
};

export type EquipmentItem = {
  kind: "camera" | "switch" | "router" | "mesh";
  title: string;
  description: string;
  icon: LucideIcon;
  price?: string;
  specs?: string[];
  imageUrl?: string;
};

export type CameraMapPoint = {
  title: string;
  description: string;
  tag: string;
  x: string;
  y: string;
};

export type ContactMethod = {
  title: string;
  value: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type TVPackage = {
  title: string;
  speed: string;
  channels: string;
  price: string;
  description: string;
  badge?: string;
  popular?: boolean;
};

export type TVPlatform = {
  title: string;
  description: string;
  icon: LucideIcon;
  imageUrl?: string;
  imageClassName?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  href: string;
  sourceUrl: string;
  popular?: boolean;
  featured?: boolean;
  imageUrl?: string;
  imagePosition?: string;
};

export type BlogArticleSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  sourceUrl: string;
  heroNote: string;
  imageUrl?: string;
  imagePosition?: string;
  contentUrl?: string;
  sections?: BlogArticleSection[];
};

export type SmartLanding = {
  title: string;
  description: string;
  href: string;
  badge: string;
  features: string[];
};
