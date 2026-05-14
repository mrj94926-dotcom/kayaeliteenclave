"use client";

import { motion } from "framer-motion";
import { TrendingUp, Plane, Hotel, Building2 } from "lucide-react";

export function InvestmentOpportunity() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 md:py-32 bg-accent relative overflow-hidden" id="investment">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="lg:w-1/2"
          >
            <span className="text-primary font-semibold tracking-widest uppercase mb-4 block text-sm">The Smart Choice</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">
              Invest Before the <br/> Market <span className="text-gradient font-style-italic">Explodes</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">
              Our business model centers on service apartment operations. With Madurai rapidly evolving into a modern urban hub driven by tourism and infrastructure growth, demand for premium short-term accommodation is rising.
            </p>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <motion.div variants={itemVariants} className="bg-background p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-colors">
                <Plane className="text-primary mb-4" size={28} />
                <h4 className="font-semibold text-foreground mb-2">Airport Connectivity</h4>
                <p className="text-sm text-muted-foreground">Strategic proximity to Madurai International Airport drives constant high-value transit demand.</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-background p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-colors">
                <TrendingUp className="text-primary mb-4" size={28} />
                <h4 className="font-semibold text-foreground mb-2">Appreciation Engine</h4>
                <p className="text-sm text-muted-foreground">Landmark developments like the Velammal Cricket Stadium are accelerating local property values.</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-background p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-colors">
                <Hotel className="text-primary mb-4" size={28} />
                <h4 className="font-semibold text-foreground mb-2">Tourism Growth</h4>
                <p className="text-sm text-muted-foreground">Capitalize on year-round spiritual and medical tourism with our managed hospitality model.</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-background p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-colors">
                <Building2 className="text-primary mb-4" size={28} />
                <h4 className="font-semibold text-foreground mb-2">Passive Income</h4>
                <p className="text-sm text-muted-foreground">Revenue generation via partnerships with travel agencies and online booking platforms.</p>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src="/images/layout-vertical.jpg" 
                alt="Luxury Villa Investment" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="glass-dark p-6 rounded-xl border border-white/20">
                  <h3 className="text-white font-serif text-2xl mb-2">Profit-Sharing Model</h3>
                  <p className="text-white/80 text-sm">Gain access to a stable, recurring income stream tailored to your individual preferences with a one-time premium investment.</p>
                </div>
              </div>
            </div>
            
            {/* Floating decorative element */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-primary/10 w-40 h-40 rounded-full blur-3xl -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
