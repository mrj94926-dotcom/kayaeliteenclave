import { LeadGenerationForm } from "@/components/home/LeadGenerationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Visit | Kaya Elite Enclave",
  description: "Schedule a private presentation or download the exclusive project brochure for Kaya Elite Enclave.",
};

export default function ContactPage() {
  return (
    <main className="pt-16 pb-24 bg-background">
      <div className="container mx-auto px-6 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-6">Book Your <span className="italic text-gradient">Private Presentation</span></h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Complete your registration to unlock the full investor portfolio and schedule a one-on-one session with our development team.</p>
      </div>
      <LeadGenerationForm />
    </main>
  );
}
