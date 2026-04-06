import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { SiteLayout } from "@/components/layout/site-layout";
import { RouteEffects } from "@/components/route-effects";

const HomePage = lazy(() => import("@/pages/home-page").then((module) => ({ default: module.HomePage })));
const TariffsPage = lazy(() =>
  import("@/pages/tariffs-page").then((module) => ({ default: module.TariffsPage })),
);
const SurveillancePage = lazy(() =>
  import("@/pages/surveillance-page").then((module) => ({ default: module.SurveillancePage })),
);
const PromotionsPage = lazy(() =>
  import("@/pages/promotions-page").then((module) => ({ default: module.PromotionsPage })),
);
const ContactsPage = lazy(() =>
  import("@/pages/contacts-page").then((module) => ({ default: module.ContactsPage })),
);
const SiteHomePage = lazy(() =>
  import("@/pages/site-home-page").then((module) => ({ default: module.SiteHomePage })),
);
const SiteInternetPage = lazy(() =>
  import("@/pages/site-internet-page").then((module) => ({ default: module.SiteInternetPage })),
);
const SiteTvPage = lazy(() =>
  import("@/pages/site-tv-page").then((module) => ({ default: module.SiteTvPage })),
);
const SiteSurveillancePage = lazy(() =>
  import("@/pages/site-surveillance-page").then((module) => ({ default: module.SiteSurveillancePage })),
);
const SitePromotionsPage = lazy(() =>
  import("@/pages/site-promotions-page").then((module) => ({ default: module.SitePromotionsPage })),
);
const SiteBlogPage = lazy(() =>
  import("@/pages/site-blog-page").then((module) => ({ default: module.SiteBlogPage })),
);
const SiteBlogArticlePage = lazy(() =>
  import("@/pages/site-blog-article-page").then((module) => ({ default: module.SiteBlogArticlePage })),
);
const SiteSmartPage = lazy(() =>
  import("@/pages/site-smart-page").then((module) => ({ default: module.SiteSmartPage })),
);
const SitePaymentPage = lazy(() =>
  import("@/pages/site-payment-page").then((module) => ({ default: module.SitePaymentPage })),
);
const SiteContactsPage = lazy(() =>
  import("@/pages/site-contacts-page").then((module) => ({ default: module.SiteContactsPage })),
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <RouteEffects />
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center text-sm font-semibold text-avanta-graphite">
              Загружаем сайт...
            </div>
          }
        >
          <Routes location={location} key={location.pathname + location.search + location.hash}>
            <Route element={<SiteLayout mode="site" />}>
              <Route index element={<SiteHomePage />} />
              <Route path="/internet" element={<SiteInternetPage />} />
              <Route path="/tariffs" element={<Navigate to="/internet#tariffs" replace />} />
              <Route path="/tv" element={<SiteTvPage />} />
              <Route path="/surveillance" element={<SiteSurveillancePage />} />
              <Route path="/promotions" element={<SitePromotionsPage />} />
              <Route path="/blog" element={<SiteBlogPage />} />
              <Route path="/blog/:slug" element={<SiteBlogArticlePage />} />
              <Route path="/smart" element={<SiteSmartPage />} />
              <Route path="/payment" element={<SitePaymentPage />} />
              <Route path="/pay" element={<Navigate to="/payment" replace />} />
              <Route path="/contacts" element={<SiteContactsPage />} />
            </Route>

            <Route path="/concept" element={<SiteLayout mode="concept" />}>
              <Route index element={<HomePage />} />
              <Route path="tariffs" element={<TariffsPage />} />
              <Route path="surveillance" element={<SurveillancePage />} />
              <Route path="promotions" element={<PromotionsPage />} />
              <Route path="contacts" element={<ContactsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return <AnimatedRoutes />;
}

