"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Plane, Hotel, Building2, BarChart3, Users, ArrowUpRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true;
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function InvestmentROISection() {
  const stats = [
    { 
      label: "Projected Annual Appreciation", 
      value: 18,
      suffix: "%+", 
      description: "Conservative growth estimates based on Madurai's airport economic corridor trajectory.",
      icon: TrendingUp 
    },
    { 
      label: "Strategic Distance to Landmark", 
      value: 50,
      suffix: " Meters", 
      description: "Directly opposite the upcoming 7-star hospitality landmark and economic hub.",
      icon: Hotel 
    },
    { 
      label: "Hospitality Revenue Model", 
      value: 12,
      suffix: "% Yield", 
      description: "Targeted annual yield through our professionally managed service apartment operations.",
      icon: BarChart3 
    },
    { 
      label: "Regional Infrastructure Boost", 
      value: 400,
      suffix: "Cr+", 
      description: "Total government and private investment in the immediate airport corridor area.",
      icon: Building2 
    },
  ];

  return (
    <section className="pt-28 md:pt-32 pb-24 md:pb-40 bg-white text-slate-900 scroll-mt-20 overflow-hidden" id="investment">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-primary/40" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary/60">Investment Intelligence</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight mb-8">
            The Financial <span className="italic text-gradient">Edge</span>
          </h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed max-w-2xl">
            Our business model is engineered for generational wealth. By integrating high-end hospitality management with premium real estate, we deliver an asset that works for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className="group p-10 bg-slate-50 border border-slate-100 rounded-sm hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-right">
                  <p className="text-primary font-bold text-3xl tracking-tighter">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
                {stat.label}
                <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{stat.description}</p>
              
              {/* Visual ROI Indicator (Small Chart-like element) */}
              <div className="mt-8 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 + (i * 0.2) }}
                  className="h-full bg-primary/40"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cinematic Backdrop Mixed Renders */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30">
          <div className="aspect-video rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img src="/images/masterplan-aerial.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-video rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img src="/images/community-pool.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-video rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img src="/images/villa-exterior.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
