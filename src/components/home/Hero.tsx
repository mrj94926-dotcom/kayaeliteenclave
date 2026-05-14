"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Building, Leaf, Shield } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        {/* We use a placeholder luxury villa image. Replace with video/actual render later */}
        <img 
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop" 
          alt="Kaya Elite Enclave Luxury Villa" 
          className="w-full h-full object-cover scale-105"
        />
      </motion.div>

      {/* Content */}
      <div className="container relative z-30 mx-auto px-6 flex flex-col items-center justify-center text-center pb-32 pt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-8 leading-tight"
        >
          Kaya Elite <br/><span className="text-gradient">Enclave</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-white/80 text-lg md:text-xl max-w-2xl mb-10"
        >
          Luxury Lakefront Villas & Investment Community Near Madurai Airport. The next phase of commercial and residential appreciation.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2">
            Explore Project <ArrowRight size={18} />
          </button>
          <button className="glass-dark hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium transition-all">
            Schedule Site Visit
          </button>
        </motion.div>
      </div>

      {/* Floating Stats / Glass Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        className="absolute bottom-6 left-0 right-0 z-20 hidden md:flex justify-center gap-6 px-6"
      >
        <div className="glass-dark px-6 py-4 rounded-2xl flex items-center gap-4 border-l-2 border-l-primary w-64 hover:-translate-y-2 transition-transform duration-300">
          <div className="bg-primary/20 p-3 rounded-full text-primary">
            <Building size={24} />
          </div>
          <div className="text-left text-white">
            <p className="text-xs text-white/60 uppercase tracking-wider">Premium ROI</p>
            <p className="font-semibold">Service Apartment Model</p>
          </div>
        </div>

        <div className="glass-dark px-6 py-4 rounded-2xl flex items-center gap-4 border-l-2 border-l-primary w-64 hover:-translate-y-2 transition-transform duration-300">
          <div className="bg-primary/20 p-3 rounded-full text-primary">
            <Leaf size={24} />
          </div>
          <div className="text-left text-white">
            <p className="text-xs text-white/60 uppercase tracking-wider">Lakefront</p>
            <p className="font-semibold">Scenic Views</p>
          </div>
        </div>

        <div className="glass-dark px-6 py-4 rounded-2xl flex items-center gap-4 border-l-2 border-l-primary w-64 hover:-translate-y-2 transition-transform duration-300">
          <div className="bg-primary/20 p-3 rounded-full text-primary">
            <Shield size={24} />
          </div>
          <div className="text-left text-white">
            <p className="text-xs text-white/60 uppercase tracking-wider">Security</p>
            <p className="font-semibold">Gated Community</p>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center md:hidden"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase mb-2">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
