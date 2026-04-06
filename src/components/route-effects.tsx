import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function RouteEffects() {
  const location = useLocation();
  const previousPathnameRef = useRef(location.pathname);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      let attempts = 0;

      const scrollToHash = () => {
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }

        attempts += 1;

        if (attempts < 20) {
          window.setTimeout(scrollToHash, 120);
        }
      };

      scrollToHash();
      previousPathnameRef.current = location.pathname;
      return;
    }

    if (previousPathnameRef.current !== location.pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    previousPathnameRef.current = location.pathname;
  }, [location.hash, location.pathname, location.search]);

  return null;
}
