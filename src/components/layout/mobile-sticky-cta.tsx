import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSiteMode } from "@/lib/site-mode";

export function MobileStickyCTA() {
  const { mode, to } = useSiteMode();
  const location = useLocation();
  const businessHref = to("/business");
  const isBusinessRoute =
    mode === "site" &&
    (location.pathname === businessHref || location.pathname.startsWith(`${businessHref}/`));
  const connectHref = isBusinessRoute
    ? `${businessHref}?action=connect#application`
    : to("/?action=connect#application");
  const checkAddressHref = isBusinessRoute
    ? `${businessHref}?action=check-address#application`
    : to("/?action=check-address#application");
  const openBusinessRequestModal = () => {
    window.dispatchEvent(
      new CustomEvent("open-business-request", {
        detail: { action: "connect" },
      }),
    );
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-avanta-navy/10 bg-white/95 p-3 shadow-[0_-12px_28px_rgba(8,58,71,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        {!isBusinessRoute ? (
          <Button asChild variant="secondary" className="flex-1">
            <Link to={checkAddressHref}>Проверить адрес</Link>
          </Button>
        ) : null}
        {isBusinessRoute ? (
          <Button className="flex-1" onClick={openBusinessRequestModal}>
            Подключить
          </Button>
        ) : (
          <Button asChild className="flex-1">
            <Link to={connectHref}>Подключить</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
