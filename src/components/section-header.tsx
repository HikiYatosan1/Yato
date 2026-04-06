import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  centered?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
      {eyebrow ? <Badge className="mb-4">{eyebrow}</Badge> : null}
      <h2 className="text-balance font-display text-3xl font-bold text-avanta-navy sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-avanta-graphite sm:text-lg">{description}</p>
    </div>
  );
}
