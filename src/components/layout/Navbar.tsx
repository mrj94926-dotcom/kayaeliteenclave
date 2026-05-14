"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Phone, User, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force a darkened background state if we're not on the home page and not scrolled
  const showBackground = isScrolled || !isHomePage;
  const textColorClass = showBackground ? "text-foreground" : "text-white/90";
  const logoInvertClass = !showBackground ? "brightness-0 invert" : "";

  const navLinks = [
    { name: "Masterplan", href: "#story" },
    { name: "Villas", href: "#floorplans" },
    { name: "Amenities", href: "#amenities" },
    { name: "Investment ROI", href: "#investment" },
    { name: "Gallery", href: "/gallery" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && isHomePage) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showBackground ? "glass py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center z-50">
          <img 
            src="/images/logo.png" 
            alt="Kaya Elite Enclave" 
            className={`transition-all duration-300 ${showBackground ? 'h-10' : 'h-14'} w-auto object-contain ${logoInvertClass}`} 
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-xs tracking-widest transition-colors hover:text-primary font-medium ${textColorClass}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 z-50">
          <Link
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden lg:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-transform hover:scale-105"
          >
            <Phone size={14} />
            Schedule Visit
          </Link>

          {session ? (
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center gap-2 p-1 rounded-full border transition-all ${
                  showBackground ? "border-slate-200 hover:bg-slate-50" : "border-white/20 hover:bg-white/10"
                }`}
              >
                {session.user?.image ? (
                  <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${showBackground ? "bg-slate-100 text-slate-600" : "bg-white/10 text-white"}`}>
                    <User size={16} />
                  </div>
                )}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-2">
                  <div className="px-4 py-3 border-b border-slate-50">
                    <p className="text-sm font-bold text-slate-900 truncate">{session.user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                  </div>
                  {(session.user as any).role === "ADMIN" && (
                    <Link 
                      href="/admin" 
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <LayoutDashboard size={16} className="text-slate-400" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border transition-all ${
                showBackground ? "border-slate-200 text-slate-900 hover:bg-slate-50" : "border-white/20 text-white hover:bg-white/10"
              }`}
            >
              Login
            </button>
          )}

          <button
            className={`md:hidden p-2 ${showBackground || mobileMenuOpen ? "text-foreground" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 h-screen bg-background pt-24 px-6 flex flex-col md:hidden z-40"
          >
            <nav className="flex flex-col gap-6 text-xl font-serif">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-foreground hover:text-primary transition-colors border-b border-border pb-4"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="text-foreground hover:text-primary transition-colors border-b border-border pb-4"
              >
                Schedule Visit
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
