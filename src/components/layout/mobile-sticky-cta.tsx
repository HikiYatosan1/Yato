import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSiteMode } from "@/lib/site-mode";

export function MobileStickyCTA() {
  const { to } = useSiteMode();

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-avanta-navy/10 bg-white/95 p-3 shadow-[0_-12px_28px_rgba(8,58,71,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <Button asChild variant="secondary" className="flex-1">
          <Link to={to("/?action=check-address#application")}>Проверить адрес</Link>
        </Button>
        <Button asChild className="flex-1">
          <Link to={to("/?action=connect#application")}>Подключить</Link>
        </Button>
      </div>
    </div>
  );
}

