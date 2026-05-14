"use client";

import { motion } from "framer-motion";
import { Waves, Coffee, ShieldCheck, TreePine, MapPin, Zap } from "lucide-react";

const AmenityCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: any; 
  title: string; 
  description: string; 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-sm hover:border-primary/20 hover:shadow-xl transition-all duration-500 group"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-serif text-slate-900 mb-3">{title}</h3>
      <p className="text-sm text-slate-500 font-light leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default function Amenities() {
  const amenities = [
    {
      icon: Waves,
      title: "Infinity Pool",
      description: "A temperature-controlled sanctuary overlooking the serene lakefront."
    },
    {
      icon: Coffee,
      title: "Exclusive Clubhouse",
      description: "A social nexus designed for private events and high-tier networking."
    },
    {
      icon: TreePine,
      title: "Botanical Trails",
      description: "Curated landscape architecture with native flora and morning walk paths."
    },
    {
      icon: ShieldCheck,
      title: "24/7 Security",
      description: "Advanced biometric access and perimeter surveillance for absolute peace."
    },
    {
      icon: Zap,
      title: "Smart Infrastructure",
      description: "EV charging stations and high-speed fiber connectivity throughout."
    },
    {
      icon: MapPin,
      title: "Premium Proximity",
      description: "Direct access to Madurai's upcoming 7-star hospitality landmark."
    }
  ];

  return (
    <section className="py-24 md:py-40 relative overflow-hidden scroll-mt-20" id="amenities">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/community-pool.jpg" 
          alt="Amenities Background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCFBFA] via-transparent to-[#FCFBFA]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-px w-12 bg-primary/40" />
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary/60">Curated Amenities</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight">
            Designed for the <span className="italic text-gradient">Exceptional</span>
          </h2>
          <p className="text-slate-600 text-lg font-light leading-relaxed">
            Every amenity is an extension of your home, crafted to deliver a hospitality-driven lifestyle in a private community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, i) => (
            <AmenityCard key={i} {...amenity} />
          ))}
        </div>
      </div>
    </section>
  );
}
