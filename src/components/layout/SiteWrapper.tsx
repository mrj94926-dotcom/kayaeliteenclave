"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { StickyCTAs } from "@/components/layout/StickyCTAs";
import { WhatsAppCTA } from "@/components/layout/WhatsAppCTA";

export function SiteWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/studio");

  return (
    <div key={isAdmin ? "admin-layout" : "public-layout"} className="contents">
      {isAdmin ? (
        <main className="min-h-screen">{children}</main>
      ) : (
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="flex-grow pt-24 md:pt-0">
            {children}
          </main>
          <Footer />
          <WhatsAppCTA />
          <StickyCTAs />
        </SmoothScroll>
      )}
    </div>
  );
}
