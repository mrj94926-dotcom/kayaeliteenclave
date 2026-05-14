"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ArrowRight, Lock, User } from "lucide-react";
import { submitLeadAction } from "@/app/actions/submitLead";
import { useSession, signIn } from "next-auth/react";

export function LeadGenerationForm() {
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    investmentBudget: ""
  });

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        fullName: session.user?.name || "",
        email: session.user?.email || ""
      }));
    }
  }, [session]);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session) {
      signIn("google");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const fd = new FormData(e.currentTarget);
      const result = await submitLeadAction(fd);
      
      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(result.error || "An error occurred");
      }
    } catch (err: any) {
      setDebugLog(prev => [...prev, { step: "Frontend Catch", status: "Error", data: err.message }]);
      setErrorMsg("A frontend error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-24 bg-background relative" id="brochure-download">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-card rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-border">
          <div className="flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="md:w-5/12 relative min-h-[350px] md:min-h-full bg-muted">
              <img 
                src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1974&auto=format&fit=crop" 
                alt="Brochure Cover" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent p-10 flex flex-col justify-end">
                <span className="text-primary font-bold tracking-[0.2em] uppercase mb-2 text-[10px]">Investor Exclusive</span>
                <h3 className="text-white font-serif text-3xl mb-4">Detailed Project <span className="text-primary-light">Portfolio</span></h3>
                <p className="text-white/80 text-sm leading-relaxed">Gain access to site plans, unit availability, and high-yield ROI projections.</p>
              </div>
            </div>

            {/* Form Side */}
            <div className="md:w-7/12 p-10 md:p-16 relative flex flex-col justify-center">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Check size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-foreground mb-2">Brochure Unlocked</h3>
                    <p className="text-muted-foreground mb-6">Thank you for your interest, {session?.user?.name}. Your exclusive brochure is ready.</p>
                    <a 
                      href="/Kaya_Elite_Enclave_Brochure.pdf" 
                      download
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 mx-auto"
                    >
                      Download PDF <Download size={18} />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Investor Registration</span>
                    </div>
                    <h3 className="text-3xl font-serif text-slate-900 mb-4">Unlock the <span className="text-gradient">Enclave Portfolio</span></h3>
                    {!session && (
                      <p className="text-slate-500 text-xs mb-4">Fill in your details below. You will be prompted to sign in with Google to verify your identity and download the brochure.</p>
                    )}
                  </div>
                  
                  {errorMsg && (
                    <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-xl border border-destructive/20">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-transparent border-b border-slate-200 py-3 focus:outline-none focus:border-primary transition-colors text-slate-900 font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 00000 00000"
                        className="w-full bg-transparent border-b border-slate-200 py-3 focus:outline-none focus:border-primary transition-colors text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => !session && setFormData({...formData, email: e.target.value})}
                      readOnly={!!session}
                      className={`w-full bg-transparent border-b py-3 font-medium transition-colors ${
                        session 
                        ? 'border-slate-100 text-slate-400 cursor-not-allowed' 
                        : 'border-slate-200 text-slate-900 focus:outline-none focus:border-primary'
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="investmentBudget" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Investment Budget</label>
                    <select 
                      id="investmentBudget" 
                      name="investmentBudget"
                      required
                      value={formData.investmentBudget}
                      onChange={(e) => setFormData({...formData, investmentBudget: e.target.value})}
                      className="w-full bg-transparent border-b border-slate-200 py-3 focus:outline-none focus:border-primary transition-colors text-slate-900 font-medium appearance-none"
                    >
                      <option value="">Select a range</option>
                      <option value="50L-1Cr">50 Lakhs - 1 Crore</option>
                      <option value="1Cr-2Cr">1 Crore - 2 Crores</option>
                      <option value="2Cr+">2 Crores +</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || status === "loading"}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white px-8 py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 mt-8 shadow-xl shadow-slate-900/10 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="animate-spin" size={18} /> Processing...</>
                    ) : (
                      <>
                        <ArrowRight size={18} /> 
                        {session ? "Request Access & Download" : "Sign in with Google & Download"}
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
                    <Shield size={12} className="text-emerald-500" />
                    <span>Encrypted & Secure Investor Verification</span>
                  </div>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Add Shield and Download icons to imports
import { Shield, Download as DownloadIcon } from "lucide-react";
const Download = DownloadIcon;
