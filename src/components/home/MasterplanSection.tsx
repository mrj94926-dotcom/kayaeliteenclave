"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Layout, Shield } from "lucide-react";

export default function MasterplanSection() {
  const features = [
    { label: "9M Wide Main Road", icon: Navigation },
    { label: "7.2M Wide Internal Road", icon: Navigation },
    { label: "Waterfront Positioning", icon: MapPin },
    { label: "Gated Private Entry", icon: Shield },
  ];

  return (
    <section className="py-24 md:py-40 bg-white scroll-mt-20" id="masterplan">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="w-full lg:w-5/12 space-y-10"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary/60">The Masterplan</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-slate-900 leading-[1.1]">
                Visionary <span className="italic text-gradient">Location</span> Intelligence
              </h2>
              <p className="text-slate-600 text-lg font-light leading-relaxed">
                A meticulously zoned enclave designed for absolute privacy and strategic road access. Positioned directly opposite Madurai's 7-star hospitality landmark, the masterplan integrates waterfront scenic views with modern urban planning.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-slate-900 text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-primary transition-all rounded-sm shadow-xl shadow-slate-900/10"
              >
                Inquire About Plots
              </button>
            </div>
          </motion.div>

          {/* Masterplan Image with Hotspots */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="w-full lg:w-7/12 relative group"
          >
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
              <img 
                src="/images/masterplan-aerial.jpg" 
                alt="Kaya Elite Masterplan" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/5 mix-blend-multiply" />
              
              {/* Hotspot Overlays (Simulated) */}
              <div className="absolute top-1/4 left-1/3 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white cursor-pointer hover:scale-110 transition-transform">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
              </div>
              <div className="absolute bottom-1/3 right-1/4 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white cursor-pointer hover:scale-110 transition-transform">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
            </div>

            {/* Float Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-8 shadow-2xl border border-slate-100 hidden md:block">
              <p className="text-4xl font-serif text-slate-900 mb-1">Scenic</p>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Waterfront Access</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
