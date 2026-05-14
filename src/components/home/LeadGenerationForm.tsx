"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { submitLeadAction } from "@/app/actions/submitLead";

export function LeadGenerationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [debugLog, setDebugLog] = useState<{ step: string; status: string; data?: any }[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    const newLog = [{ step: "Initialization", status: "Started" }];
    setDebugLog(newLog);

    try {
      const formData = new FormData(e.currentTarget);
      const dataObj = Object.fromEntries(formData.entries());
      setDebugLog([...newLog, { step: "Form Data", status: "Captured", data: dataObj }]);

      const result = await submitLeadAction(formData);
      
      if (result.success) {
        setDebugLog(prev => [...prev, { step: "Server Action", status: "Success", data: result }]);
        setIsSuccess(true);
      } else {
        setDebugLog(prev => [...prev, { step: "Server Action", status: "Failed", data: result }]);
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
        <div className="bg-card rounded-3xl shadow-xl overflow-hidden border border-border">
          <div className="flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="md:w-5/12 relative min-h-[300px] md:min-h-full bg-muted">
              <img 
                src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1974&auto=format&fit=crop" 
                alt="Brochure Cover" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-10 flex flex-col justify-end">
                <span className="text-primary font-medium tracking-widest uppercase mb-2 text-xs">Exclusive</span>
                <h3 className="text-white font-serif text-3xl mb-4">Download The Brochure</h3>
                <p className="text-white/80 text-sm">Unlock floor plans, detailed ROI projections, and masterplan details.</p>
              </div>
            </div>

            {/* Form Side */}
            <div className="md:w-7/12 p-10 md:p-16 relative">
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
                    <p className="text-muted-foreground mb-6">Thank you for your interest. Your exclusive brochure is ready.</p>
                    <a 
                      href="/Kaya_Elite_Enclave_Brochure.pdf" 
                      download
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2"
                    >
                      Download PDF <ArrowRight size={18} />
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
                    <h3 className="text-2xl font-serif text-foreground mb-2">Register Interest</h3>
                    <p className="text-muted-foreground text-sm mb-6">Please provide your details to unlock the exclusive project brochure.</p>
                  </div>
                  
                  {errorMsg && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName"
                        required
                        className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-primary transition-colors text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        required
                        className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-primary transition-colors text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-primary transition-colors text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="investmentBudget" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Investment Budget</label>
                    <select 
                      id="investmentBudget" 
                      name="investmentBudget"
                      className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-primary transition-colors text-foreground"
                    >
                      <option value="">Select a range</option>
                      <option value="50L-1Cr">50 Lakhs - 1 Crore</option>
                      <option value="1Cr-2Cr">1 Crore - 2 Crores</option>
                      <option value="2Cr+">2 Crores +</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 mt-8 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="animate-spin" size={18} /> Processing...</>
                    ) : (
                      <><Check size={18} /> Unlock Brochure</>
                    )}
                  </button>
                  <p className="text-xs text-center text-muted-foreground mt-4">We respect your privacy. No spam, ever.</p>
                </motion.form>
              )}

              {/* Debug Panel (Dev Only) */}
              {process.env.NODE_ENV === "development" && debugLog.length > 0 && (
                <div className="mt-8 p-4 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-300 overflow-auto max-h-40">
                  <p className="text-slate-500 mb-2 border-b border-slate-800 pb-1 uppercase tracking-tighter">Debug Submission Log</p>
                  {debugLog.map((log, i) => (
                    <div key={i} className="mb-1">
                      <span className="text-blue-400">[{log.step}]</span> {log.status}
                      {log.data && <span className="text-slate-500"> - {JSON.stringify(log.data)}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
