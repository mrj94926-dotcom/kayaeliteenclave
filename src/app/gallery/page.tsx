"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: "/images/masterplan-villas.jpg", title: "Project Vision" },
    { src: "/images/layout-vertical.jpg", title: "Site Layout" },
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop", title: "Villa Exterior" },
    { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop", title: "Living Area" },
    { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop", title: "Master Bedroom" },
    { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", title: "Lake View Deck" },
    { src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop", title: "Clubhouse" },
    { src: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop", title: "Landscaped Gardens" },
  ];

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-widest uppercase mb-4 block text-sm">Visual Journey</span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Project <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Immerse yourself in the architectural brilliance and serene environment of Kaya Elite Enclave.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.1 }}
              className="break-inside-avoid"
            >
              <div 
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedImage(img.src)}
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="text-white mx-auto mb-2" size={32} />
                    <p className="text-white font-medium">{img.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence mode="wait">
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[101]"
                onClick={() => setSelectedImage(null)}
              >
                <X size={36} />
              </button>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedImage} 
                  alt="Gallery Lightbox" 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
