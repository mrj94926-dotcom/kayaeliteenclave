import { Hero } from "@/components/home/Hero";
import Storytelling from "@/components/home/Storytelling";
import { InvestmentOpportunity } from "@/components/home/InvestmentOpportunity";
import { LeadGenerationForm } from "@/components/home/LeadGenerationForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Storytelling />
      <InvestmentOpportunity />
      <LeadGenerationForm />
    </>
  );
}
