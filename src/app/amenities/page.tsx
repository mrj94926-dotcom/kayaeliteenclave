"use client";

import { motion } from "framer-motion";
import { Waves, Coffee, Home, ChefHat, Droplets, ShieldCheck, Key, Leaf, Briefcase } from "lucide-react";

export default function AmenitiesPage() {
  const amenities = [
    { icon: Waves, title: "Swimming Pool", desc: "Infinity edge pool overlooking the serene lake." },
    { icon: Coffee, title: "Elegant Lounge", desc: "A sophisticated space for networking and relaxation." },
    { icon: Home, title: "Clubhouse", desc: "State-of-the-art recreational center for residents." },
    { icon: ChefHat, title: "Communal Kitchen", desc: "Fully equipped gourmet kitchen for events and gatherings." },
    { icon: Droplets, title: "Lake View Spaces", desc: "Dedicated quiet zones offering uninterrupted water views." },
    { icon: ShieldCheck, title: "24/7 Security", desc: "Multi-tier security system with trained personnel." },
    { icon: Key, title: "Smart Access", desc: "Keyless entry and automated home management." },
    { icon: Leaf, title: "Landscaped Garden", desc: "Meticulously maintained green spaces and walking tracks." },
    { icon: Briefcase, title: "Managed Services", desc: "Concierge and housekeeping services for passive income investors." },
  ];

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold tracking-widest uppercase mb-4 block text-sm">World-Class Lifestyle</span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Luxury <span className="text-gradient">Amenities</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience a hospitality-inspired lifestyle. Our premium amenities are designed to offer unparalleled comfort, security, and recreational opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-card p-8 rounded-3xl border border-border hover:border-primary/50 transition-colors duration-500 overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 rounded-[3rem] overflow-hidden relative shadow-2xl h-[400px]"
        >
          <img 
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop" 
            alt="Clubhouse" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center p-12 md:p-20">
            <div className="max-w-xl">
              <span className="text-primary font-medium tracking-widest uppercase mb-4 block text-sm">The Centerpiece</span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">The Elite Clubhouse</h2>
              <p className="text-white/80">
                A sprawling architectural marvel designed to be the social heartbeat of the enclave. Featuring indoor games, a private cinema, and elegant dining spaces.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
