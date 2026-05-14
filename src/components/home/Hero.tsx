"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building, Leaf, Shield, Download } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background with Cinematic Zoom */}
      <motion.div 
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "linear" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
        <img 
          src="/images/villa-exterior.jpg" 
          alt="Kaya Elite Villa" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-20 text-center text-white pt-40 pb-32 md:pt-60 md:pb-40 min-h-screen flex flex-col items-center justify-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          {/* Tagline */}
          <div className="flex flex-col items-center space-y-6 mb-12">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-[1px] bg-primary/60" 
            />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold text-primary/80">
              The Pinnacle of Private Living
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif leading-[1.05] tracking-tight mb-10">
            Kaya Elite <span className="text-gradient italic block md:inline">Enclave</span>
          </h1>
          
          {/* Description */}
          <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed px-4 mb-16">
            Discover a curated collection of ultra-luxury villas directly opposite Madurai's upcoming 7-star hospitality landmark.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <Link 
              href="/masterplan"
              className="w-full md:w-auto px-10 py-5 bg-primary text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-primary/90 transition-all rounded-sm flex items-center justify-center gap-4 group shadow-2xl shadow-primary/20"
            >
              Explore Masterplan
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact"
              className="w-full md:w-auto px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white/10 transition-all rounded-sm flex items-center justify-center"
            >
              Schedule Visit
            </Link>
          </div>

          {/* Amenity Badges (Fixed Flow) */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-white/40 text-[9px] uppercase tracking-[0.5em] font-bold">
            <span className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> Lakefront Luxury</span>
            <span className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> 7-Star Proximity</span>
            <span className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> High-Yield Asset</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator (Restored Text) */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 hidden md:flex"
      >
        <span className="text-[8px] uppercase tracking-[0.5em] text-white/30">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent" />
      </motion.div>
    </section>
  );
}
