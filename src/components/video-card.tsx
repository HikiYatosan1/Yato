import { motion } from "motion/react";
import { ArrowRight, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import type { EquipmentItem, VideoPackage } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteMode } from "@/lib/site-mode";

type VideoCardProps = {
  item: VideoPackage | EquipmentItem;
};

const equipmentKindLabels: Record<EquipmentItem["kind"], string> = {
  camera: "Камера",
  switch: "PoE",
  router: "Роутер",
  mesh: "Mesh",
};

export function VideoCard({ item }: VideoCardProps) {
  const isPackage = "features" in item && "price" in item;
  const Icon = "icon" in item ? item.icon : null;
  const { mode, to } = useSiteMode();
  const equipmentSpecs = !isPackage && "specs" in item ? item.specs : undefined;
  const imageUrl = !isPackage && "imageUrl" in item ? item.imageUrl : undefined;

  if (isPackage) {
    const packageMeta = item.features.slice(0, 2).join(" · ");

    return (
      <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="h-full">
        <Card className="relative flex h-full flex-col overflow-hidden border-avanta-green/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,250,247,0.92))] p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(22,127,74,0.08),transparent_32%)]" />

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10 text-avanta-emerald">
              <Camera className="h-6 w-6" />
            </div>
            {item.badge ? <Badge>{item.badge}</Badge> : null}
          </div>

          <h3 className="relative z-10 mt-5 text-[2rem] font-bold leading-[1.05] text-avanta-navy">{item.title}</h3>
          <p className="relative z-10 mt-4 text-base font-bold text-avanta-emerald">{item.price}</p>
          <p className="relative z-10 mt-1 text-sm text-avanta-graphite">{packageMeta || "Архив и просмотр"}</p>
          <p className="relative z-10 mt-4 text-sm leading-6 text-avanta-graphite">{item.description}</p>

          <div className="relative z-10 mt-auto pt-8">
            <Button
              asChild
              variant="outline"
              className="w-full border-avanta-navy/12 bg-[linear-gradient(180deg,rgba(241,246,244,0.96),rgba(233,241,237,0.94))] shadow-[0_14px_28px_-24px_rgba(24,58,99,0.22)] hover:border-avanta-green/30 hover:bg-[linear-gradient(135deg,rgba(58,170,53,0.22),rgba(255,255,255,0.98))] hover:text-avanta-emerald hover:shadow-[0_18px_34px_-24px_rgba(58,170,53,0.34)] active:border-avanta-green/40 active:bg-[linear-gradient(135deg,rgba(58,170,53,0.28),rgba(255,255,255,0.98))] active:text-avanta-emerald"
            >
              <Link to={to(`/?action=surveillance&tariff=${encodeURIComponent(item.title)}#application`)}>
                Подключить
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="h-full">
      <Card className="flex h-full flex-col overflow-hidden p-0">
        {imageUrl ? (
          <div className="flex h-52 items-center justify-center border-b border-avanta-navy/10 bg-gradient-to-br from-avanta-mist via-white to-avanta-green/10 p-6">
            <img src={imageUrl} alt="" className="h-full w-full object-contain" />
          </div>
        ) : null}

        <div className="flex h-full flex-col p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="space-y-3">
              <Badge>{equipmentKindLabels[item.kind]}</Badge>

              {Icon && !imageUrl ? (
                <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10">
                  <Icon className="h-7 w-7 text-avanta-emerald" />
                </div>
              ) : null}
            </div>

            {item.price ? (
              <div className="shrink-0 text-right">
                <div className="ml-auto h-1.5 w-18 rounded-full bg-gradient-to-r from-avanta-green via-avanta-teal to-avanta-navy/55" />
                <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-avanta-graphite/80">
                  {mode === "site" ? "Стоимость" : "demo price"}
                </p>
                <p className="mt-1 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-avanta-pine">
                  {item.price}
                </p>
              </div>
            ) : null}
          </div>

          <h3 className="text-2xl font-bold text-avanta-navy">{item.title}</h3>
          <p className="mt-4 text-sm leading-6 text-avanta-graphite">{item.description}</p>

          {equipmentSpecs?.length ? (
            <ul className="mt-5 space-y-2 text-sm text-avanta-navy">
              {equipmentSpecs.map((feature) => (
                <li key={feature} className="flex items-start gap-2 leading-6">
                  <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-avanta-green" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}

