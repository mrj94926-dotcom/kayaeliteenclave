"use client";

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

export default function GallerySection() {
  const images = [
    { src: "/images/villa-exterior.jpg", span: "row-span-2 col-span-2", title: "Modern Facade" },
    { src: "/images/masterplan-aerial.jpg", span: "row-span-1 col-span-1", title: "Aerial Masterplan" },
    { src: "/images/community-pool.jpg", span: "row-span-2 col-span-1", title: "Lifestyle Amenities" },
    { src: "/images/floorplan-1.jpg", span: "row-span-1 col-span-1", title: "Architectural Layout" },
    { src: "/images/floorplan-2.jpg", span: "row-span-1 col-span-2", title: "Interior Engineering" },
  ];

  return (
    <section className="pt-28 md:pt-32 pb-24 md:pb-40 bg-white scroll-mt-20" id="gallery">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-px w-12 bg-primary/40" />
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary/60">Visual Collection</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight">
            Cinematic <span className="italic text-gradient">Gallery</span>
          </h2>
          <p className="text-slate-600 text-lg font-light">
            A curated showcase of architectural excellence and community life at Kaya Elite Enclave.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-6 h-[1000px]">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className={`${img.span} relative group overflow-hidden rounded-sm cursor-pointer`}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-500 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <Maximize2 className="text-white w-8 h-8 mb-4 translate-y-4 group-hover:translate-y-0 transition-transform" />
                <p className="text-white text-[10px] uppercase tracking-[0.4em] font-bold translate-y-4 group-hover:translate-y-0 transition-transform">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
