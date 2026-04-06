import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCTA } from "@/components/layout/mobile-sticky-cta";
import { SiteModeProvider, type SiteMode } from "@/lib/site-mode";

export function SiteLayout({ mode }: { mode: SiteMode }) {
  return (
    <SiteModeProvider mode={mode}>
      <div className="relative isolate min-h-screen overflow-x-clip pb-24 md:pb-0">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8fcfb_0%,#f3f8f6_42%,#eef5f2_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(58,170,53,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(24,58,99,0.07),transparent_26%),radial-gradient(circle_at_bottom_center,rgba(8,58,71,0.05),transparent_32%)]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "url('/brand/pattern.jpg')",
              backgroundPosition: "center top",
              backgroundSize: "960px auto",
            }}
          />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(135deg,transparent_0,transparent_48.5%,rgba(255,255,255,0.38)_48.7%,transparent_49%,transparent_100%)]" />
          <div className="absolute left-[-12rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-avanta-green/8 blur-3xl" />
          <div className="absolute right-[-8rem] top-16 h-[24rem] w-[24rem] rounded-full bg-avanta-navy/8 blur-3xl" />
          <div className="absolute bottom-[-12rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-avanta-teal/8 blur-3xl" />
        </div>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <MobileStickyCTA />
      </div>
    </SiteModeProvider>
  );
}
