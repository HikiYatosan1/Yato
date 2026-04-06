import { motion } from "motion/react";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import type { PromoItem } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSiteMode } from "@/lib/site-mode";

type PromoCardProps = {
  item: PromoItem;
};

export function PromoCard({ item }: PromoCardProps) {
  const { mode, to } = useSiteMode();

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="group h-full">
      <Card
        className={cn(
          "flex h-full flex-col overflow-hidden p-0 shadow-panel",
          item.featured && "bg-gradient-to-br from-white via-white to-avanta-navy/5",
        )}
      >
        {item.imageUrl ? (
          <div className="px-6 pt-6">
            <div className="overflow-hidden rounded-[26px] border border-avanta-navy/10 bg-[linear-gradient(135deg,rgba(238,243,244,0.92),rgba(255,255,255,1),rgba(58,170,53,0.08))]">
              <div className="relative h-44 sm:h-48">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_62%)]" />
                <img
                  src={item.imageUrl}
                  alt=""
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]",
                    item.imagePosition ?? "object-center",
                  )}
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-1 flex-col p-6">
          <div>
            <Badge>{item.badge}</Badge>
            <h3 className="mt-4 min-h-[4.5rem] text-[2rem] font-bold leading-tight text-avanta-navy">
              {item.title}
            </h3>
            <p className="mt-3 min-h-[3.5rem] text-base font-semibold leading-7 text-avanta-emerald">
              {item.description}
            </p>
            <p className="mt-4 min-h-[6rem] text-[15px] leading-8 text-avanta-graphite">{item.details}</p>
          </div>

          <div className="mt-auto">
            <div className="mt-5 flex items-center gap-2 text-sm text-avanta-graphite">
              <CalendarDays className="h-4 w-4 text-avanta-green" />
              <span>{item.deadline}</span>
            </div>

            <Button asChild className="mt-6 w-full">
              <Link to={to("/?action=connect#application")}>
                {mode === "site" ? "Оставить заявку" : "Подключить по акции"}
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

