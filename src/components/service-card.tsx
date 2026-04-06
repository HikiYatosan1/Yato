import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ScenarioCard, ServiceItem } from "@/types/content";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSiteMode } from "@/lib/site-mode";

type ServiceCardProps = {
  item: ScenarioCard | ServiceItem;
};

export function ServiceCard({ item }: ServiceCardProps) {
  const Icon = item.icon;
  const badgeText = "tag" in item ? item.tag : item.meta;
  const { to } = useSiteMode();
  const imageUrl = "imageUrl" in item ? item.imageUrl : undefined;

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
      <Link to={to(item.href)}>
        <Card className="h-full overflow-hidden bg-white/90 p-0">
          <div className="relative min-h-[168px] border-b border-avanta-navy/10 bg-gradient-to-br from-avanta-mist via-white to-avanta-green/10 p-5">
            <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-avanta-gradient text-white shadow-panel">
              <Icon className="h-6 w-6" />
            </div>
            <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-avanta-emerald" />

            {imageUrl ? (
              <div className="flex h-full min-h-[128px] items-center justify-center pt-8">
                <div className="h-[128px] w-full overflow-hidden rounded-[26px] border border-white/70 bg-white/80 shadow-panel">
                  <img
                    src={imageUrl}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[128px] items-center justify-center pt-8">
                <div className="flex h-24 w-24 items-center justify-center rounded-[30px] bg-white/90 text-avanta-emerald shadow-panel">
                  <Icon className="h-10 w-10" />
                </div>
              </div>
            )}
          </div>

          <div className="p-6">
            <Badge>{badgeText}</Badge>
            <h3 className="mt-4 text-xl font-bold text-avanta-navy">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-avanta-graphite">{item.description}</p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
