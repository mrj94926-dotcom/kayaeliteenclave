"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Storytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // Pin the section and animate text reveals
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
        },
      });

      textRefs.current.forEach((text, i) => {
        if (!text) return;
        tl.fromTo(
          text,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1 }
        )
        // fade out the previous text unless it's the last one
        if (i < textRefs.current.length - 1) {
          tl.to(text, { opacity: 0, y: -50, scale: 1.1, duration: 1 }, "+=0.5");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-background flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
          alt="Texture" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div ref={addToRefs} className="absolute inset-x-0 mx-auto flex flex-col items-center justify-center pointer-events-none opacity-0">
          <p className="text-primary font-semibold tracking-widest uppercase mb-4 text-sm">A Vision Realized</p>
          <h2 className="text-4xl md:text-6xl font-serif text-foreground max-w-4xl leading-tight">
            Designed for those who appreciate the <span className="text-gradient font-style-italic">subtle luxury</span> of space and light.
          </h2>
        </div>
        
        <div ref={addToRefs} className="absolute inset-x-0 mx-auto flex flex-col items-center justify-center pointer-events-none opacity-0">
          <p className="text-primary font-semibold tracking-widest uppercase mb-4 text-sm">Location Intelligence</p>
          <h2 className="text-4xl md:text-6xl font-serif text-foreground max-w-4xl leading-tight">
            Directly opposite the upcoming 7-star hotel near <span className="text-gradient">Madurai Airport</span>.
          </h2>
        </div>
        
        <div ref={addToRefs} className="absolute inset-x-0 mx-auto flex flex-col items-center justify-center pointer-events-none opacity-0">
          <p className="text-primary font-semibold tracking-widest uppercase mb-4 text-sm">The Financial Edge</p>
          <h2 className="text-4xl md:text-6xl font-serif text-foreground max-w-4xl leading-tight">
            Not just a home. A high-yield <span className="text-gradient">commercial asset</span> with recurring income potential.
          </h2>
        </div>
      </div>
    </section>
  );
}
