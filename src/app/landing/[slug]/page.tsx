import { notFound } from "next/navigation";
import { LeadGenerationForm } from "@/components/home/LeadGenerationForm";
import { MapPin, Shield, TrendingUp } from "lucide-react";
import type { Metadata } from 'next'

const seoPages = {
  "luxury-villas-in-madurai": {
    title: "Luxury Villas in Madurai | Kaya Elite Enclave",
    h1: "Luxury Villas in Madurai",
    desc: "Discover premium lake-facing luxury villas in Madurai. An exclusive gated community offering world-class amenities and a sophisticated lifestyle.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
  },
  "villas-near-madurai-airport": {
    title: "Villas Near Madurai Airport | Kaya Elite Enclave",
    h1: "Villas Near Madurai Airport",
    desc: "Invest in high-appreciation villas located directly opposite the upcoming 7-star hotel near Madurai International Airport.",
    image: "https://images.unsplash.com/photo-1613490900233-141c5560d75d?q=80&w=1967&auto=format&fit=crop"
  },
  "lake-facing-villas-madurai": {
    title: "Lake Facing Villas in Madurai | Kaya Elite Enclave",
    h1: "Lake Facing Villas in Madurai",
    desc: "Experience tranquility with our exclusive lake-facing villas in Madurai. Wake up to scenic views and a gentle breeze every morning.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
  },
  "investment-properties-in-madurai": {
    title: "Investment Properties in Madurai | Kaya Elite Enclave",
    h1: "Investment Properties in Madurai",
    desc: "Secure high ROI with premium investment properties in Madurai's fastest-growing corridor. Explore our service apartment model.",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop"
  },
  "premium-villa-community-madurai": {
    title: "Premium Villa Community in Madurai | Kaya Elite Enclave",
    h1: "Premium Villa Community in Madurai",
    desc: "Join Madurai's most exclusive premium villa community. Gated security, clubhouse, and managed hospitality services.",
    image: "https://images.unsplash.com/photo-1626244498305-b07a5be55306?q=80&w=2070&auto=format&fit=crop"
  }
};

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params
  const content = seoPages[slug as keyof typeof seoPages]
  
  if (!content) {
    return { title: 'Not Found' }
  }

  return {
    title: content.title,
    description: content.desc,
  }
}

export default async function SEOLandingPage({ params }: Props) {
  const { slug } = await params;
  const content = seoPages[slug as keyof typeof seoPages];

  if (!content) {
    notFound();
  }

  return (
    <div className="pt-24 bg-background min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img src={content.image} alt={content.h1} className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 text-center px-6">
          <span className="text-primary font-semibold tracking-widest uppercase mb-4 block text-sm">Kaya Elite Enclave</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 max-w-4xl">{content.h1}</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">{content.desc}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="bg-card p-8 rounded-3xl border border-border text-center hover:border-primary/50 transition-colors">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Prime Location</h3>
            <p className="text-muted-foreground text-sm">Strategically located near the airport and upcoming luxury developments.</p>
          </div>
          <div className="bg-card p-8 rounded-3xl border border-border text-center hover:border-primary/50 transition-colors">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">High Appreciation</h3>
            <p className="text-muted-foreground text-sm">Positioned in Madurai's fastest growing commercial and residential corridor.</p>
          </div>
          <div className="bg-card p-8 rounded-3xl border border-border text-center hover:border-primary/50 transition-colors">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Asset</h3>
            <p className="text-muted-foreground text-sm">A fully managed, gated community offering both security and passive income.</p>
          </div>
        </div>
      </div>

      {/* Lead Gen */}
      <LeadGenerationForm />
    </div>
  );
}
