"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Globe, ShieldCheck, Download, Calendar, Bookmark } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-10">
            <img src="/images/logo.png" alt="Kaya Elite" className="h-14 w-auto mx-auto" />
          </Link>
          <h1 className="text-3xl font-serif text-slate-900 mb-3">Secure Investor Access</h1>
          <p className="text-slate-500 text-sm">Experience the next phase of luxury investment</p>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-2">Member Privileges</h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                { icon: Download, text: "Download Exclusive Brochure" },
                { icon: Calendar, text: "Schedule Private Site Visits" },
                { icon: ShieldCheck, text: "Access Gated Investor Data" },
                { icon: Bookmark, text: "Save Interested Properties" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-medium text-slate-600">
                  <item.icon size={14} className="text-primary" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-4 bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Globe size={20} className="text-primary-light" />
            Continue with Google
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
            By continuing, you agree to our <br/> 
            <span className="text-slate-600 cursor-pointer hover:text-primary transition-colors">Terms of Service</span> & 
            <span className="text-slate-600 cursor-pointer hover:text-primary transition-colors ml-1">Privacy Policy</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
