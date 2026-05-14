"use client";

import { motion } from "framer-motion";
import { Clock, Hammer, CheckCircle2 } from "lucide-react";

export default function ConstructionUpdatesPage() {
  const updates = [
    {
      id: 1,
      date: "May 2026",
      title: "Land Levelling & Boundary Wall",
      status: "In Progress",
      desc: "Complete site clearing and preliminary boundary wall construction is underway to secure the enclave.",
      image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      date: "April 2026",
      title: "Ground Breaking Ceremony",
      status: "Completed",
      desc: "The official launch and bhoomi pooja were successfully conducted with key stakeholders.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold tracking-widest uppercase mb-4 block text-sm">Transparency</span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Construction <span className="text-gradient">Updates</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track the progress of Kaya Elite Enclave. We believe in complete transparency with our investors as we bring this vision to life.
          </p>
        </motion.div>

        <div className="relative border-l border-border/50 ml-6 md:ml-0 md:pl-0">
          {updates.map((update, idx) => (
            <motion.div 
              key={update.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="mb-16 relative md:flex gap-8 items-start"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[33px] md:static md:w-16 flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-background shadow-md ${update.status === 'Completed' ? 'bg-primary text-white' : 'bg-card text-primary'}`}>
                  {update.status === 'Completed' ? <CheckCircle2 size={24} /> : <Hammer size={24} />}
                </div>
              </div>

              {/* Content */}
              <div className="ml-8 md:ml-0 bg-card p-6 md:p-8 rounded-3xl border border-border flex-1 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <h3 className="text-2xl font-serif">{update.title}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">{update.date}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${update.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {update.status}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{update.desc}</p>
                <div className="rounded-2xl overflow-hidden h-64">
                  <img 
                    src={update.image} 
                    alt={update.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
