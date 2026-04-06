import { Children, useEffect, useMemo, useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MediaCarouselProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
};

export function MediaCarousel({ children, className, itemClassName }: MediaCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const baseItems = useMemo(() => Children.toArray(children), [children]);
  const loopedItems = baseItems.length > 1 ? [...baseItems, ...baseItems, ...baseItems] : baseItems;

  useEffect(() => {
    const node = trackRef.current;

    if (!node || baseItems.length <= 1) {
      return;
    }

    const setInitialPosition = () => {
      const segmentWidth = node.scrollWidth / 3;
      node.scrollTo({ left: segmentWidth, behavior: "auto" });
    };

    const normalizeLoopPosition = () => {
      const segmentWidth = node.scrollWidth / 3;
      if (!segmentWidth) {
        return;
      }

      if (node.scrollLeft <= segmentWidth * 0.45) {
        node.scrollTo({ left: node.scrollLeft + segmentWidth, behavior: "auto" });
      } else if (node.scrollLeft >= segmentWidth * 1.55) {
        node.scrollTo({ left: node.scrollLeft - segmentWidth, behavior: "auto" });
      }
    };

    setInitialPosition();

    const onScroll = () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }

      resetTimeoutRef.current = window.setTimeout(normalizeLoopPosition, 140);
    };

    const onResize = () => {
      setInitialPosition();
    };

    node.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      node.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [baseItems.length]);

  const scrollByCard = (direction: "left" | "right") => {
    const node = trackRef.current;

    if (!node) {
      return;
    }

    const firstCard = node.querySelector<HTMLElement>("[data-carousel-item='true']");
    const gapValue = window.getComputedStyle(node).gap || window.getComputedStyle(node).columnGap || "24";
    const gap = Number.parseFloat(gapValue) || 24;
    const amount = firstCard ? firstCard.offsetWidth + gap : Math.max(node.clientWidth * 0.82, 320);

    if (baseItems.length > 1) {
      const segmentWidth = node.scrollWidth / 3;

      if (segmentWidth) {
        const offsetWithinSegment = ((node.scrollLeft % segmentWidth) + segmentWidth) % segmentWidth;
        node.scrollTo({ left: segmentWidth + offsetWithinSegment, behavior: "auto" });
      }
    }

    window.requestAnimationFrame(() => {
      node.scrollBy({
        left: direction === "right" ? amount : -amount,
        behavior: "smooth",
      });
    });
  };

  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-[-1.35rem] top-1/2 z-10 hidden -translate-y-1/2 md:block">
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="rounded-full shadow-panel"
          onClick={() => scrollByCard("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute right-[-1.35rem] top-1/2 z-10 hidden -translate-y-1/2 md:block">
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="rounded-full shadow-panel"
          onClick={() => scrollByCard("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loopedItems.map((child, index) => (
          <div
            key={index}
            data-carousel-item="true"
            className={cn("min-w-[84%] snap-start md:min-w-[47%] xl:min-w-[31%]", itemClassName)}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
