"use client";

import { motion } from "framer-motion";
import FloorPlanShowcase from "./FloorPlanShowcase";

export default function VillasSection() {
  return (
    <section className="bg-[#FCFBFA] scroll-mt-20" id="villas">
      {/* Architectural Showcase */}
      <div className="py-24 md:py-40 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="w-full lg:w-5/12 space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary/60">Architectural Design</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-slate-900 leading-[1.1]">
                Modern <span className="italic text-gradient">Minimalist</span> Facade
              </h2>
              <p className="text-slate-600 text-lg font-light leading-relaxed">
                Our villas are a sanctuary of minimal architecture, where every line is designed to elevate the subtle luxury of space and light. Premium facades meet modern lifestyle needs.
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex gap-12">
              <div>
                <p className="text-2xl font-serif text-slate-900">1425</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400">Sq.ft Plot</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-slate-900">2038</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400">Built-up</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="w-full lg:w-7/12"
          >
            <div className="aspect-[16/10] rounded-sm overflow-hidden shadow-2xl">
              <img 
                src="/images/villa-exterior.jpg" 
                alt="Villa Architecture" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floorplan Integration */}
      <FloorPlanShowcase />
    </section>
  );
}
