"use client";

import { motion } from "framer-motion";
import { Maximize2, Download, Ruler, Home } from "lucide-react";

const FloorPlanCard = ({ 
  title, 
  image, 
  stats 
}: { 
  title: string; 
  image: string; 
  stats: { label: string; value: string; icon: any }[] 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white border border-slate-100 rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-slate-50">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors" />
        
        <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white">
          <Maximize2 className="w-4 h-4 text-slate-900" />
        </button>
      </div>

      <div className="p-10 space-y-8">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary/60">Layout Design</p>
            <h3 className="text-3xl font-serif text-slate-900">{title}</h3>
          </div>
          <div className="text-right">
            <span className="text-primary font-bold text-lg tracking-tighter">Premium Collection</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-sm">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-400">{stat.label}</p>
                <p className="text-sm font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-5 bg-slate-900 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary transition-all flex items-center justify-center gap-3">
          Download PDF Layout
          <Download className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default function FloorPlanShowcase() {
  const plans = [
    {
      title: "Signature Villa A",
      image: "/images/floorplan-1.jpg",
      stats: [
        { label: "Plot Area", value: "1425.00 SQ.FT", icon: Ruler },
        { label: "Total Built-up", value: "2038.00 SQ.FT", icon: Home },
        { label: "Ground Floor", value: "903.00 SQ.FT", icon: Building },
        { label: "First Floor", value: "1135.00 SQ.FT", icon: Building }
      ]
    },
    {
      title: "Signature Villa B",
      image: "/images/floorplan-2.jpg",
      stats: [
        { label: "Plot Area", value: "1425.00 SQ.FT", icon: Ruler },
        { label: "Total Built-up", value: "2038.00 SQ.FT", icon: Home },
        { label: "Ground Floor", value: "903.00 SQ.FT", icon: Building },
        { label: "First Floor", value: "1135.00 SQ.FT", icon: Building }
      ]
    }
  ];

  return (
    <section className="py-24 md:py-40 bg-[#FCFBFA]" id="floorplans">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-primary/40" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary/60">Architectural Plans</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight mb-8">
            Explore the <span className="italic text-gradient">Villa Layouts</span>
          </h2>
          <p className="text-slate-600 text-lg font-light leading-relaxed max-w-2xl">
            Thoughtfully engineered spaces that balance private sanctuaries with expansive social areas. Each square foot is crafted for modern luxury living.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {plans.map((plan, i) => (
            <FloorPlanCard key={i} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Simple Building icon fallback if Lucide building is missing
const Building = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
