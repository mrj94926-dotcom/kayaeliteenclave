import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteWrapper } from "@/components/layout/SiteWrapper";
import { Providers } from "@/components/layout/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Kaya Elite Enclave | Luxury Lakefront Villas in Madurai",
  description: "A premium gated community of luxury lake-facing villas and investment properties near Madurai Airport. Discover the next phase of commercial investment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <Providers>
          <SiteWrapper>
            {children}
          </SiteWrapper>
        </Providers>
      </body>
    </html>
  );
}
