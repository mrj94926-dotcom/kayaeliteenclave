"use client";

import { motion } from "framer-motion";
import { TrendingUp, PieChart, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function InvestmentPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-primary font-semibold tracking-widest uppercase mb-4 block text-sm">Financial Vision</span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6 leading-tight">
            The ROI <span className="text-gradient">Advantage</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Kaya Elite Enclave is structured as a premium service apartment complex, offering investors a unique opportunity to generate passive income through our managed hospitality model.
          </p>
        </motion.div>

        {/* The Model */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-serif">The Service Apartment Model</h2>
            <p className="text-muted-foreground">
              Unlike traditional residential properties, our villas are optimized for short-term and medium-term rentals. We partner with travel agencies, online booking platforms, and local operators to ensure consistent occupancy.
            </p>
            
            <ul className="space-y-4">
              {[
                "Fully managed property maintenance",
                "Marketing and guest acquisition handled for you",
                "Profit-sharing tailored to your preferences",
                "Capital appreciation on land value"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 shrink-0" size={20} />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-[2rem] shadow-xl border border-border"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <PieChart size={24} />
              </div>
              <h3 className="text-xl font-bold">Revenue Distribution</h3>
            </div>
            
            {/* Simulated Chart */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Investor Share</span>
                  <span className="text-primary font-bold">Optimal %</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "70%" }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="bg-gradient-to-r from-gold to-gold-light h-full rounded-full"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Management & Operations</span>
                  <span className="text-muted-foreground font-bold">Standard %</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "30%" }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    className="bg-border h-full rounded-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-sm text-muted-foreground italic">
                * Actual percentages are discussed during the private consultation based on chosen investment tier.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Growth Corridors */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-serif mb-4">Madurai's Growth Corridor</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Why investing near Madurai Airport is the smartest financial decision this decade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl"
          >
            <TrendingUp className="text-primary mb-6" size={32} />
            <h3 className="text-xl font-bold mb-3">Infrastructure Boom</h3>
            <p className="text-sm text-muted-foreground">
              With new highways and the upcoming 7-star hotel opposite the enclave, the area is slated for massive infrastructural funding.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-3xl"
          >
            <BarChart3 className="text-primary mb-6" size={32} />
            <h3 className="text-xl font-bold mb-3">Tourism Demand</h3>
            <p className="text-sm text-muted-foreground">
              Madurai attracts millions annually. High-end, secure, and managed villas provide a highly sought-after alternative to crowded hotels.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl"
          >
            <TrendingUp className="text-primary mb-6" size={32} />
            <h3 className="text-xl font-bold mb-3">Capital Appreciation</h3>
            <p className="text-sm text-muted-foreground">
              Land values in the airport corridor have historically outperformed the city average, securing your initial investment.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-foreground text-background p-12 md:p-16 rounded-[3rem] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          
          <h2 className="text-3xl md:text-5xl font-serif mb-6 relative z-10">Secure Your Asset Today</h2>
          <p className="text-background/80 mb-10 max-w-xl mx-auto relative z-10">
            Schedule a private consultation with our investment advisors to view detailed financial projections and available plots.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 relative z-10"
          >
            Request Financial Prospectus <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
