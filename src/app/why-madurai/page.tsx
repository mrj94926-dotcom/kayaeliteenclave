"use client";

import { motion } from "framer-motion";
import { Building, TrendingUp, Plane, MapPin } from "lucide-react";
import Head from "next/head";

export default function WhyMaduraiPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* SEO Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold tracking-widest uppercase mb-4 block text-sm">Strategic Location</span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Why Invest in <span className="text-gradient">Madurai?</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Madurai is rapidly transforming from a cultural heritage center into a modern economic powerhouse. Discover why the airport corridor is the most coveted real estate destination in Tamil Nadu.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-[400px] rounded-3xl overflow-hidden mb-24 relative shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop" 
            alt="Madurai Cityscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 right-8 z-20">
            <div className="glass-dark p-6 rounded-2xl max-w-md backdrop-blur-md border border-white/20">
              <h3 className="text-white font-serif text-2xl mb-2">A City on the Rise</h3>
              <p className="text-white/80 text-sm">Experiencing unprecedented infrastructure growth and tourism expansion.</p>
            </div>
          </div>
        </motion.div>

        {/* Key Drivers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <Plane size={28} />
            </div>
            <h2 className="text-3xl font-serif">Aviation & Infrastructure</h2>
            <p className="text-muted-foreground">
              The expansion of Madurai International Airport is a catalyst for regional growth. Increased connectivity brings higher volumes of business travelers and tourists, directly inflating the demand for premium accommodations like Kaya Elite Enclave.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-center gap-3 text-sm text-foreground">
                <MapPin className="text-primary" size={16} /> Direct international connectivity
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <MapPin className="text-primary" size={16} /> Expanding cargo terminals boosting business
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <MapPin className="text-primary" size={16} /> Highway infrastructure connecting major southern hubs
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <Building size={28} />
            </div>
            <h2 className="text-3xl font-serif">Commercial Boom</h2>
            <p className="text-muted-foreground">
              With the upcoming 7-star hotel and developments like the Velammal Cricket Stadium, the southern corridor of Madurai is witnessing a massive commercial influx. This translates to rapid land appreciation and high rental yields.
            </p>
            <div className="bg-card p-6 rounded-2xl border border-border mt-6">
              <h4 className="font-semibold mb-2">Investment Highlight</h4>
              <p className="text-sm text-muted-foreground">
                Properties within a 5km radius of the airport have seen a consistent year-over-year appreciation, outpacing traditional city-center investments.
              </p>
            </div>
          </motion.div>
        </div>

        {/* SEO Text Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted p-10 rounded-3xl"
        >
          <h3 className="text-2xl font-serif mb-4">Luxury Villas in Madurai</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Finding premium real estate and luxury villas in Madurai has traditionally meant compromising on space or connectivity. Kaya Elite Enclave disrupts this by offering expansive, lake-facing villas near Madurai Airport. Designed for the discerning investor, these properties serve as both a prestigious address and a lucrative commercial asset.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Whether you are looking for investment properties in Madurai or a serene lakefront villa, the strategic positioning of this enclave ensures you benefit from the city's upward trajectory. The integration of a service apartment model provides a seamless path to passive income, making it the premier choice for luxury real estate investment in Tamil Nadu.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
