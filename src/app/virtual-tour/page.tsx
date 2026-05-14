"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export default function VirtualTourPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen flex flex-col">
      <div className="container mx-auto px-6 max-w-7xl flex-1 flex flex-col">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold tracking-widest uppercase mb-4 block text-sm">Immersive Experience</span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Virtual <span className="text-gradient">Tour</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the luxury of Kaya Elite Enclave from anywhere in the world. Step inside our premium lake-facing villas.
          </p>
        </motion.div>

        {/* 360 Viewer Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full flex-1 min-h-[500px] md:min-h-[700px] rounded-3xl overflow-hidden relative shadow-2xl bg-muted border border-border group"
        >
          {/* Simulated 360 View image */}
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
            alt="Virtual Tour Preview" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-500 group-hover:bg-black/20 group-hover:backdrop-blur-0" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 pointer-events-none">
            <div className="w-20 h-20 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20 pointer-events-auto cursor-pointer hover:bg-primary/40 transition-colors">
              <PlayCircle size={48} className="text-white" />
            </div>
            <h3 className="text-2xl font-serif mb-2 text-shadow">Interactive 360° Walkthrough</h3>
            <p className="text-white/80 text-sm">Click to enter the model villa</p>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
            <div className="glass-dark px-4 py-2 rounded-lg text-xs font-medium text-white border border-white/20">
              Living Area & Kitchen
            </div>
            <div className="flex gap-2">
              <button className="glass-dark w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20">
                <span className="text-white font-bold">+</span>
              </button>
              <button className="glass-dark w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20">
                <span className="text-white font-bold">-</span>
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
