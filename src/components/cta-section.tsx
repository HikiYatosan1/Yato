import { ArrowRight, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { useSiteMode } from "@/lib/site-mode";

type CTASectionProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  eyebrow?: string;
};

export function CTASection({
  title,
  description,
  primaryLabel = "Подключить",
  primaryHref,
  secondaryLabel = "Проверить адрес",
  secondaryHref,
  eyebrow,
}: CTASectionProps) {
  const { mode, to } = useSiteMode();

  return (
    <Reveal>
      <section className="cut-corner relative overflow-hidden rounded-[36px] bg-avanta-gradient px-6 py-10 text-white shadow-float sm:px-10 sm:py-14">
        <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-8 rotate-45 bg-white/10" />
        <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-8 translate-y-8 rotate-45 bg-white/10" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              {eyebrow ?? (mode === "site" ? "Подключение" : "Финальный call to action")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/80">{description}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="secondary" size="lg">
              <Link to={to(primaryHref ?? "/?action=connect#application")}>
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="border border-white/20 text-white hover:bg-white/10"
            >
              <Link to={to(secondaryHref ?? "/?action=check-address#application")}>
                <MapPinned className="h-4 w-4" />
                {secondaryLabel}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

