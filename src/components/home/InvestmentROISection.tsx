"use client";

import { motion } from "framer-motion";
import { TrendingUp, Plane, Hotel, Building2, BarChart3, Users } from "lucide-react";

export default function InvestmentROISection() {
  const stats = [
    { 
      label: "Upcoming 7-Star Hotel", 
      value: "Direct Proximity", 
      description: "Located opposite Madurai's next high-tier hospitality landmark.",
      icon: Hotel 
    },
    { 
      label: "Airport Economic Corridor", 
      value: "Strategic Hub", 
      description: "Capitalize on rapid infrastructure and commercial growth.",
      icon: Plane 
    },
    { 
      label: "Recurring Rental Income", 
      value: "Hospitality Model", 
      description: "Passive revenue through our managed service apartment model.",
      icon: TrendingUp 
    },
    { 
      label: "Tourism Growth", 
      value: "Year-Round", 
      description: "Meeting the rising demand for premium short-term accommodation.",
      icon: Users 
    },
  ];

  return (
    <section className="py-24 md:py-40 bg-slate-950 text-white scroll-mt-20 overflow-hidden" id="investment">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-primary/40" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary/60">Investment Intelligence</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
            The Financial <span className="italic text-gradient">Edge</span>
          </h2>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl">
            Our business model is engineered for generational wealth. By integrating high-end hospitality management with premium real estate, we deliver an asset that works for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className="group p-10 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-right">
                  <p className="text-primary font-bold text-lg tracking-tighter">{stat.value}</p>
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-4">{stat.label}</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Cinematic Backdrop Mixed Renders */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30">
          <div className="aspect-video rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img src="/images/masterplan-aerial.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-video rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img src="/images/community-pool.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-video rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img src="/images/villa-exterior.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
