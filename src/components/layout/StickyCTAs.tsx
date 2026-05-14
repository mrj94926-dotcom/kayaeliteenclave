"use client";

import { Phone, MessageCircle, Calendar } from "lucide-react";

export function StickyCTAs() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border flex justify-around items-center p-2 pb-safe">
      <a 
        href="tel:+918608500055"
        className="flex flex-col items-center justify-center p-2 text-foreground hover:text-primary transition-colors flex-1"
      >
        <Phone size={20} className="mb-1" />
        <span className="text-[10px] font-medium uppercase tracking-wider">Call Now</span>
      </a>
      
      <div className="w-px h-8 bg-border"></div>
      
      <a 
        href="https://wa.me/918608500055"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center p-2 text-[#25D366] hover:text-[#1da851] transition-colors flex-1"
      >
        <MessageCircle size={20} className="mb-1" />
        <span className="text-[10px] font-medium uppercase tracking-wider text-foreground">WhatsApp</span>
      </a>
      
      <div className="w-px h-8 bg-border"></div>
      
      <a 
        href="/contact"
        className="flex flex-col items-center justify-center p-2 text-primary hover:text-primary/80 transition-colors flex-1"
      >
        <Calendar size={20} className="mb-1" />
        <span className="text-[10px] font-medium uppercase tracking-wider text-foreground">Book Visit</span>
      </a>
    </div>
  );
}
