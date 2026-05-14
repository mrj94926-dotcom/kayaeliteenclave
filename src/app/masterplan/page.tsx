import MasterplanSection from "@/components/home/MasterplanSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masterplan | Kaya Elite Enclave",
  description: "Explore the meticulously zoned masterplan of Kaya Elite Enclave, featuring waterfront villas and strategic location intelligence.",
};

export default function MasterplanPage() {
  return (
    <main className="pt-20">
      <MasterplanSection />
    </main>
  );
}
