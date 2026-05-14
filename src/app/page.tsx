import { Hero } from "@/components/home/Hero";
import Storytelling from "@/components/home/Storytelling";
import FloorPlanShowcase from "@/components/home/FloorPlanShowcase";
import Amenities from "@/components/home/Amenities";
import { InvestmentOpportunity } from "@/components/home/InvestmentOpportunity";
import { LeadGenerationForm } from "@/components/home/LeadGenerationForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Storytelling />
      <FloorPlanShowcase />
      <Amenities />
      <InvestmentOpportunity />
      <LeadGenerationForm />
    </>
  );
}
