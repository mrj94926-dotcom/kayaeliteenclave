import { Hero } from "@/components/home/Hero";
import Link from "next/link";
import { ArrowRight, Map, Home as HomeIcon, Star, TrendingUp } from "lucide-react";

export default function Home() {
  const previews = [
    {
      title: "The Masterplan",
      desc: "Visionary location intelligence and strategic zoning.",
      href: "/masterplan",
      icon: Map,
      image: "/images/masterplan-aerial.jpg"
    },
    {
      title: "The Villas",
      desc: "Modern minimalist architecture and interactive floorplans.",
      href: "/villas",
      icon: HomeIcon,
      image: "/images/villa-exterior.jpg"
    },
    {
      title: "Amenities",
      desc: "Community life, infinity pools, and gated security.",
      href: "/amenities",
      icon: Star,
      image: "/images/community-pool.jpg"
    }
  ];

  return (
    <>
      <Hero />
      
      {/* Quick Overview & Feature Previews */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-16">
            <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">A Legacy in the <span className="italic text-gradient">Making</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Kaya Elite Enclave is more than a residential project; it is a strategic investment in Madurai's future. Discover the components of our vision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {previews.map((item, i) => (
              <Link key={i} href={item.href} className="group block space-y-6">
                <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-xl">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-primary">
                    <item.icon size={18} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{item.title}</span>
                  </div>
                  <p className="text-slate-600 font-light">{item.desc}</p>
                  <div className="pt-2 flex items-center gap-2 text-slate-900 text-[10px] uppercase tracking-[0.2em] font-bold">
                    Explore Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Teaser */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <TrendingUp className="text-primary" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400">Investor Advantage</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-serif text-slate-900 mb-6">High-Yield Hospitality Model</h3>
            <p className="text-slate-500 font-light mb-8">
              Capitalize on Madurai's airport economic corridor with our managed service apartment model.
            </p>
            <Link href="/investment-roi" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-slate-900 hover:text-primary transition-colors">
              Analyze the Numbers <ArrowRight size={16} />
            </Link>
          </div>
          <div className="w-full md:w-1/3 p-10 bg-white border border-slate-100 rounded-sm shadow-2xl">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-2 font-bold">Ready to Start?</p>
            <h4 className="text-2xl font-serif text-slate-900 mb-6">Book Your Private Presentation</h4>
            <Link href="/contact" className="w-full py-4 bg-primary text-white text-[10px] uppercase tracking-[0.4em] font-bold flex items-center justify-center rounded-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Schedule Visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
