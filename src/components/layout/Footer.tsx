"use client";

import Link from "next/link";
import { ArrowRight, Check, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { subscribeNewsletterAction } from "@/app/actions/newsletter";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <img 
                src="/images/logo.png" 
                alt="Kaya Elite Enclave" 
                className="h-16 w-auto object-contain brightness-0 invert" 
              />
            </div>
            <p className="text-background/70 text-sm leading-relaxed max-w-xs">
              The next phase of commercial investment in Madurai. Luxury lake-facing villas designed for premium hospitality and recurring income.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-primary">Explore</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li><Link href="/masterplan" className="hover:text-primary transition-colors">Masterplan</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Villa Types</Link></li>
              <li><Link href="/investment" className="hover:text-primary transition-colors">Investment ROI</Link></li>
              <li><Link href="/amenities" className="hover:text-primary transition-colors">Luxury Amenities</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-primary">Contact</h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0" size={18} />
                <span>Plot No.5A, Aruppukottai Main Road,<br />Opp. Little Diamond Matric School,<br />Villapuram, Madurai - 625012.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={18} />
                <a href="tel:+918608500055" className="hover:text-primary transition-colors">+91 86085 00055</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={18} />
                <a href="mailto:kayaeliteenclave@gmail.com" className="hover:text-primary transition-colors">kayaeliteenclave@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-medium text-primary">Newsletter</h4>
            <p className="text-sm text-background/70">Subscribe for exclusive updates on project progress and investment opportunities.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/50">
          <p>&copy; 2026 Kaya Elite Enclave. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const result = await subscribeNewsletterAction(email);
      if (result.success) {
        setStatus("success");
        setMessage(result.message || "Subscribed successfully!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred.");
    }
  }

  return (
    <div className="space-y-2">
      <form className="flex" onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Your email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background/10 border border-background/20 text-background px-4 py-3 rounded-l-md w-full focus:outline-none focus:border-primary text-sm"
          required
          disabled={status === "loading" || status === "success"}
        />
        <button 
          type="submit" 
          disabled={status === "loading" || status === "success"}
          className="bg-primary text-primary-foreground px-4 py-3 rounded-r-md hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-50"
        >
          {status === "loading" ? (
            <Loader2 className="animate-spin" size={18} />
          ) : status === "success" ? (
            <Check size={18} />
          ) : (
            <ArrowRight size={18} />
          )}
        </button>
      </form>
      {status === "success" && <p className="text-emerald-400 text-xs font-medium">{message}</p>}
      {status === "error" && <p className="text-red-400 text-xs font-medium">{message}</p>}
    </div>
  );
}
