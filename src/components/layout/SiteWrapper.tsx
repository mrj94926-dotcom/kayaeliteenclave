"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { StickyCTAs } from "@/components/layout/StickyCTAs";
import { WhatsAppCTA } from "@/components/layout/WhatsAppCTA";

export function SiteWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/studio");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <main className={`flex-grow ${!isAdmin ? 'pt-24 md:pt-0' : 'min-h-screen'}`}>
        {children}
      </main>
      {!isAdmin && (
        <>
          <Footer />
          <WhatsAppCTA />
          <StickyCTAs />
        </>
      )}
    </div>
  );
}
