import { Hero } from "@/components/home/Hero";
import MasterplanSection from "@/components/home/MasterplanSection";
import VillasSection from "@/components/home/VillasSection";
import Amenities from "@/components/home/Amenities";
import InvestmentROISection from "@/components/home/InvestmentROISection";
import GallerySection from "@/components/home/GallerySection";
import { LeadGenerationForm } from "@/components/home/LeadGenerationForm";

export default function Home() {
  return (
    <>
      <Hero />
      <MasterplanSection />
      <VillasSection />
      <Amenities />
      <InvestmentROISection />
      <GallerySection />
      <LeadGenerationForm />
    </>
  );
}
