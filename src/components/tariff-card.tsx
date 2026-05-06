import { motion } from "motion/react";
import { ArrowRight, Cable, House, Tv, Wifi, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import type { Tariff } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSiteMode } from "@/lib/site-mode";

type TariffCardProps = {
  tariff: Tariff;
  iconOverride?: LucideIcon;
  onConnect?: () => void;
  connectLabel?: string;
  variant?: "default" | "business";
};

const tariffIcons = {
  xpon: Wifi,
  ftth: Cable,
  house: House,
  bundle: Tv,
  apartment: Wifi,
  business: Cable,
} as const;

export function TariffCard({ tariff, iconOverride, onConnect, connectLabel, variant = "default" }: TariffCardProps) {
  const { mode, to } = useSiteMode();
  const Icon = iconOverride ?? tariffIcons[tariff.category];
  const isBusinessVariant = variant === "business";

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.26 }} className="h-full">
      <Card
        className={cn(
          "relative flex h-full flex-col overflow-hidden border-avanta-green/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,250,247,0.92))] p-6",
          tariff.popular && "border-avanta-green/30 shadow-float",
          isBusinessVariant &&
            "min-h-[410px] rounded-[24px] border-avanta-navy/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(241,248,245,0.9))] p-5 sm:min-h-[430px]",
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,170,53,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(22,127,74,0.08),transparent_32%)]" />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-avanta-green/15 to-avanta-navy/10 text-avanta-emerald",
              isBusinessVariant && "h-11 w-11 rounded-[14px]",
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          {tariff.badge ? (
            <Badge className={cn(isBusinessVariant && "border-avanta-green/30 bg-avanta-green/10 text-avanta-emerald")}>
              {tariff.badge}
            </Badge>
          ) : null}
        </div>

        {isBusinessVariant ? (
          <>
            <p className="relative z-10 mt-4 inline-flex w-fit rounded-full border border-avanta-navy/10 bg-white/75 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.11em] text-avanta-navy">
              {tariff.name}
            </p>
            <p className="relative z-10 mt-4 flex min-h-[4.8rem] items-start text-3xl font-bold leading-tight text-avanta-navy">
              {tariff.speed}
            </p>
            <p className="relative z-10 mt-2 text-2xl font-bold text-avanta-emerald">{tariff.price}</p>
            <p className="relative z-10 mt-3 min-h-[4.4rem] text-base font-medium leading-7 text-avanta-graphite">
              {tariff.description}
            </p>
          </>
        ) : (
          <>
            <h3 className="relative z-10 mt-5 text-2xl font-bold text-avanta-navy">{tariff.name}</h3>
            <p className="relative z-10 mt-4 text-base font-bold text-avanta-emerald">{tariff.price}</p>
            <p className="relative z-10 mt-1 text-sm text-avanta-graphite">{tariff.speed}</p>
            <p className="relative z-10 mt-4 text-sm leading-6 text-avanta-graphite">{tariff.description}</p>
          </>
        )}

        <div className={cn("relative z-10 mt-auto pt-8", isBusinessVariant && "pt-6")}>
          {onConnect ? (
            <Button
              type="button"
              onClick={onConnect}
              variant="outline"
              className={cn(
                "w-full border-avanta-navy/12 bg-[linear-gradient(180deg,rgba(241,246,244,0.96),rgba(233,241,237,0.94))] shadow-[0_14px_28px_-24px_rgba(24,58,99,0.22)] hover:border-avanta-green/30 hover:bg-[linear-gradient(135deg,rgba(58,170,53,0.22),rgba(255,255,255,0.98))] hover:text-avanta-emerald hover:shadow-[0_18px_34px_-24px_rgba(58,170,53,0.34)] active:border-avanta-green/40 active:bg-[linear-gradient(135deg,rgba(58,170,53,0.28),rgba(255,255,255,0.98))] active:text-avanta-emerald",
                isBusinessVariant && "h-12 rounded-[16px] text-base font-semibold",
              )}
            >
              {connectLabel ?? "Подключить"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className={cn(
                "w-full border-avanta-navy/12 bg-[linear-gradient(180deg,rgba(241,246,244,0.96),rgba(233,241,237,0.94))] shadow-[0_14px_28px_-24px_rgba(24,58,99,0.22)] hover:border-avanta-green/30 hover:bg-[linear-gradient(135deg,rgba(58,170,53,0.22),rgba(255,255,255,0.98))] hover:text-avanta-emerald hover:shadow-[0_18px_34px_-24px_rgba(58,170,53,0.34)] active:border-avanta-green/40 active:bg-[linear-gradient(135deg,rgba(58,170,53,0.28),rgba(255,255,255,0.98))] active:text-avanta-emerald",
                isBusinessVariant && "h-12 rounded-[16px] text-base font-semibold",
              )}
            >
              <Link to={to(`/?action=connect&tariff=${encodeURIComponent(tariff.name)}#application`)}>
                {connectLabel ?? (mode === "site" ? "Подключить" : "Подключить demo")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

