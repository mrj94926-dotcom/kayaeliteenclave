"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { LeadGenerationForm } from "@/components/home/LeadGenerationForm";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-0 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-widest uppercase mb-4 block text-sm">Get in Touch</span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Private <span className="text-gradient">Consultation</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Schedule a site visit or request a detailed financial prospectus. Our investment advisors are ready to assist you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card p-8 rounded-3xl border border-border text-center hover:border-primary/50 transition-colors"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <Phone size={28} />
            </div>
            <h3 className="font-bold mb-2">Call Us</h3>
            <p className="text-muted-foreground text-sm mb-4">Available Mon-Sat, 9am - 7pm</p>
            <a href="tel:+918608500055" className="text-primary font-medium hover:underline">+91 86085 00055</a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card p-8 rounded-3xl border border-border text-center hover:border-primary/50 transition-colors"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <Mail size={28} />
            </div>
            <h3 className="font-bold mb-2">Email Us</h3>
            <p className="text-muted-foreground text-sm mb-4">We'll respond within 24 hours</p>
            <a href="mailto:kayaeliteenclave@gmail.com" className="text-primary font-medium hover:underline">kayaeliteenclave@gmail.com</a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card p-8 rounded-3xl border border-border text-center hover:border-primary/50 transition-colors lg:col-span-2"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <MapPin size={28} />
            </div>
            <h3 className="font-bold mb-2">Corporate Office</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Plot No.5A, Aruppukottai Main Road,<br />
              Opp. Little Diamond Matric School,<br />
              Villapuram, Madurai - 625012.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Reusing the Lead Generation Form */}
      <LeadGenerationForm />
    </div>
  );
}
