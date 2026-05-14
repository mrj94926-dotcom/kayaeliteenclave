"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const StorySection = ({ 
  tag, 
  title, 
  description, 
  image, 
  reverse = false 
}: { 
  tag: string; 
  title: string; 
  description: string; 
  image: string; 
  reverse?: boolean;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} className="py-24 md:py-40 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}>
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/2 space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-px bg-primary/40" 
                />
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary/60">
                  {tag}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.15]">
                {title}
              </h2>
            </div>
            
            <p className="text-slate-600 text-lg leading-relaxed max-w-lg font-light">
              {description}
            </p>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="pt-4"
            >
              <div className="h-px w-24 bg-gradient-to-r from-primary/40 to-transparent mb-6" />
              <button className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-900 hover:text-primary transition-colors flex items-center gap-3 group">
                Discover the Vision
                <span className="w-8 h-px bg-slate-900 group-hover:w-12 group-hover:bg-primary transition-all" />
              </button>
            </motion.div>
          </motion.div>

          {/* Cinematic Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] md:aspect-[16/11] overflow-hidden rounded-sm shadow-2xl shadow-slate-200">
              <motion.img 
                style={{ y }}
                src={image} 
                alt={title}
                className="w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/5 mix-blend-multiply" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function Storytelling() {
  const sections = [
    {
      tag: "Location Intelligence",
      title: "Opposite Madurai’s next luxury landmark.",
      description: "Positioned with precision directly opposite the upcoming 7-star hospitality landmark and the thriving airport economic corridor. A strategic location poised for unprecedented appreciation.",
      image: "/images/masterplan-aerial.jpg",
      reverse: false
    },
    {
      tag: "Investment Advantage",
      title: "Hospitality-driven recurring income potential.",
      description: "Designed not just for living, but for generational wealth. A long-term commercial asset engineered for high-yield hospitality income and tourism growth.",
      image: "/images/community-pool.jpg",
      reverse: true
    },
    {
      tag: "Architecture Section",
      title: "Crafted for modern luxury living.",
      description: "A sanctuary of minimal architecture and curated amenities, where every line is designed to elevate the subtle luxury of space and light.",
      image: "/images/villa-exterior.jpg",
      reverse: false
    }
  ];

  return (
    <div className="bg-[#FCFBFA]" id="story"> {/* Warm Architectural White */}
      {sections.map((section, i) => (
        <StorySection key={i} {...section} />
      ))}
      
      {/* Subtle Section Divider */}
      <div className="container mx-auto px-6 py-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </div>
  );
}
