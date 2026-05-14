import VillasSection from "@/components/home/VillasSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Villas | Kaya Elite Enclave",
  description: "Discover modern minimalist architecture and interactive floorplans for the luxury villas at Kaya Elite Enclave.",
};

export default function VillasPage() {
  return (
    <main className="pt-20">
      <VillasSection />
    </main>
  );
}
