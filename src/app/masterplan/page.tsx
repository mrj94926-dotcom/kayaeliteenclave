"use client";

import { motion } from "framer-motion";
import { MapPin, ZoomIn, Info } from "lucide-react";
import { useState } from "react";

export default function MasterplanPage() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    { id: 1, x: 40, y: 15, title: "Premium Lakefront", desc: "Prime plots with direct panoramic views of the water." },
    { id: 2, x: 48, y: 60, title: "9m Wide Road", desc: "Spacious central avenue for grand access." },
    { id: 3, x: 72, y: 70, title: "7.2m Internal Road", desc: "Well-planned internal circulation for privacy." },
    { id: 4, x: 10, y: 30, title: "Residential Enclave", desc: "Secure and peaceful living environment." },
  ];

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-widest uppercase mb-4 block text-sm">Interactive Map</span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Masterplan <span className="text-gradient">& Layout</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the intelligently engineered layout of Kaya Elite Enclave. Featuring a 9m wide grand central avenue and 7.2m internal roads, all oriented towards the serene lake.
          </p>
        </motion.div>

        {/* Masterplan Viewer */}
        <div className="relative bg-muted rounded-[2rem] shadow-2xl overflow-hidden border border-border/50 h-[600px] md:h-[800px] group">
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full text-sm text-foreground shadow-sm">
            <ZoomIn size={16} className="text-primary" />
            <span>Hover to explore hotspots</span>
          </div>

          <div className="relative w-full h-full">
            {/* The base masterplan image */}
            <img 
              src="/images/layout-vertical.jpg" 
              alt="Masterplan" 
              className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/5" />

            {/* Hotspots */}
            {hotspots.map((spot) => (
              <div 
                key={spot.id}
                className="absolute z-20 transition-all"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                  {/* Glowing ring */}
                  <div className="absolute inset-0 bg-primary/40 rounded-full animate-ping" />
                  
                  {/* Core dot */}
                  <div className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${activeHotspot === spot.id ? 'bg-primary scale-110' : 'bg-white shadow-lg'}`}>
                    <MapPin size={16} className={activeHotspot === spot.id ? 'text-white' : 'text-primary'} />
                  </div>

                  {/* Tooltip */}
                  {activeHotspot === spot.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute top-12 left-1/2 -translate-x-1/2 w-48 bg-card p-4 rounded-xl shadow-xl border border-border pointer-events-none"
                    >
                      <h4 className="font-semibold text-sm mb-1">{spot.title}</h4>
                      <p className="text-xs text-muted-foreground">{spot.desc}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Villa Community Render */}
        <div className="mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">The <span className="text-gradient">Vision</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A glimpse into your future home. Modern architecture harmonized with the natural beauty of the lakefront.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border border-border/50"
          >
            <img 
              src="/images/masterplan-villas.jpg" 
              alt="Villa Community Layout" 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        {/* Location Advantages */}
        <div className="mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">Location <span className="text-gradient">Advantages</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Strategically positioned in Madurai's fastest-growing corridor.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Madurai Airport", time: "5 Mins", desc: "Immediate access to international and domestic flights." },
              { title: "Upcoming 7-Star Hotel", time: "Opposite", desc: "Directly facing the future of luxury hospitality." },
              { title: "Velammal Stadium", time: "10 Mins", desc: "Close to major landmarks and sports infrastructure." }
            ].map((loc, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-3xl border border-border/50 hover:border-primary/30 transition-all hover:-translate-y-2 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{loc.title}</h3>
                <p className="text-primary font-semibold mb-4">{loc.time}</p>
                <p className="text-muted-foreground text-sm">{loc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
