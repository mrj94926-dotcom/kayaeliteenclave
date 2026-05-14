"use client";

import { motion } from "framer-motion";
import { Bed, Bath, Square, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "The Sapphire Villa",
      type: "4 BHK Premium Lakefront",
      area: "4,500 sq.ft",
      desc: "Our flagship property offering uninterrupted lake views, a private deck, and state-of-the-art smart home integration.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
      beds: 4,
      baths: 5,
    },
    {
      id: 2,
      name: "The Emerald Villa",
      type: "3 BHK Luxury Residence",
      area: "3,200 sq.ft",
      desc: "Designed for modern families, featuring expansive living areas, a private garden, and direct access to the central promenade.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      beds: 3,
      baths: 4,
    },
    {
      id: 3,
      name: "The Topaz Suite (Service Model)",
      type: "2 BHK Investment Villa",
      area: "1,800 sq.ft",
      desc: "Optimized for the hospitality model, offering high rental yields and fully managed services for investors.",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
      beds: 2,
      baths: 2,
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold tracking-widest uppercase mb-4 block text-sm">Portfolio</span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Luxury <span className="text-gradient">Villas</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our collection of architecturally stunning villas, designed to offer an unparalleled standard of living and substantial investment returns.
          </p>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative group">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 lg:px-12">
                <div className="mb-2">
                  <span className="text-sm font-semibold tracking-widest text-primary uppercase">{project.type}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">{project.name}</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Square size={20} className="text-primary" />
                    <span className="font-medium text-foreground">{project.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed size={20} className="text-primary" />
                    <span className="font-medium text-foreground">{project.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={20} className="text-primary" />
                    <span className="font-medium text-foreground">{project.baths} Baths</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-colors text-center"
                  >
                    Request Pricing
                  </Link>
                  <Link 
                    href={`/virtual-tour?id=${project.id}`} 
                    className="glass px-8 py-3 rounded-full font-medium transition-colors text-center hover:bg-white/50 border border-primary/20 flex items-center justify-center gap-2"
                  >
                    Virtual Tour <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
