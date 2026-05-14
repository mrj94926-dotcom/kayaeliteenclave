import InvestmentROISection from "@/components/home/InvestmentROISection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment ROI | Kaya Elite Enclave",
  description: "Analyze the financial edge and recurring income potential of investing in Kaya Elite Enclave's airport corridor assets.",
};

export default function InvestmentROIPage() {
  return (
    <main>
      <InvestmentROISection />
    </main>
  );
}
