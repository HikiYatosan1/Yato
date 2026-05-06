import { motion } from "motion/react";
import type { FeatureItem } from "@/types/content";
import { Card } from "@/components/ui/card";

type FeatureCardProps = {
  item: FeatureItem;
};

export function FeatureCard({ item }: FeatureCardProps) {
  const Icon = item.icon;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Card className="h-full overflow-hidden p-0">
        {item.imageUrl ? (
          <div className="relative aspect-[16/9] overflow-hidden border-b border-avanta-navy/8 bg-avanta-mist">
            <img
              src={item.imageUrl}
              alt=""
              className={`h-full w-full object-cover ${item.imageClassName ?? "object-center"}`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(6,24,35,0.08),transparent_42%,rgba(20,53,82,0.14))]" />
          </div>
        ) : (
          <div className="px-6 pt-6">
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br ${item.accent}`}
            >
              <Icon className="h-7 w-7 text-avanta-navy" />
            </div>
          </div>
        )}

        <div className="flex h-full flex-col p-6">
          <h3 className={`text-xl font-bold text-avanta-navy ${item.imageUrl ? "min-h-[64px]" : ""}`}>{item.title}</h3>
          <p
            className={`mt-3 text-sm leading-6 text-avanta-graphite ${
              item.imageUrl ? "min-h-[108px]" : ""
            }`}
          >
            {item.description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
