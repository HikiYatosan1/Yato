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
      <Card className="h-full p-6">
        <div
          className={`mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br ${item.accent}`}
        >
          <Icon className="h-7 w-7 text-avanta-navy" />
        </div>
        <h3 className="text-xl font-bold text-avanta-navy">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-avanta-graphite">{item.description}</p>
      </Card>
    </motion.div>
  );
}
