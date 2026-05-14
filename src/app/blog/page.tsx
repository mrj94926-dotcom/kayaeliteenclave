"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Why Madurai Airport Corridor is the Next Real Estate Hotspot",
      excerpt: "An in-depth analysis of the infrastructure developments driving unprecedented capital appreciation in southern Madurai.",
      date: "May 10, 2026",
      author: "Investment Team",
      category: "Market Insights",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "The Rise of Service Apartments in Tier-2 Cities",
      excerpt: "How the hospitality-managed real estate model is offering investors higher yields compared to traditional residential leasing.",
      date: "April 28, 2026",
      author: "Financial Advisory",
      category: "Investment Strategies",
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "A Look Inside Kaya Elite Enclave's Clubhouse",
      excerpt: "Discover the premium amenities and architectural thought process behind our luxury communal spaces.",
      date: "April 15, 2026",
      author: "Design Team",
      category: "Project Updates",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-widest uppercase mb-4 block text-sm">Knowledge Hub</span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Real Estate <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with the latest market trends, investment strategies, and project updates from Kaya Elite Enclave.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-3xl overflow-hidden border border-border group hover:border-primary/30 transition-colors flex flex-col h-full"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-serif font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <button className="flex items-center gap-2 text-primary font-medium text-sm group/btn mt-auto">
                  Read Article 
                  <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
