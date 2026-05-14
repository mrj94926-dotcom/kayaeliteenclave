"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await signIn("resend", { 
        email, 
        callbackUrl: "/admin",
        redirect: false 
      });
      
      if (result?.error) {
        setError(result.error === "EmailSignin" ? "Check your email provider settings." : result.error);
      } else {
        setSent(true);
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <img src="/images/logo.png" alt="Kaya Elite" className="h-12 w-auto mx-auto" />
          </Link>
          <h1 className="text-3xl font-serif text-slate-900 mb-3">Welcome Back</h1>
          <p className="text-slate-500 text-sm">Sign in to access your dashboard</p>
        </div>

        {sent ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Check your email</h3>
            <p className="text-slate-500 mb-8">
              We've sent a secure login link to <span className="font-semibold text-slate-900">{email}</span>.
            </p>
            <button 
              onClick={() => setSent(false)}
              className="text-primary font-bold text-sm hover:underline"
            >
              Try another email
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <button 
              onClick={() => signIn("google", { callbackUrl: "/admin" })}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all hover:shadow-lg hover:shadow-slate-100"
            >
              <Globe size={20} className="text-primary" />
              Continue with Google
            </button>

            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-grow h-px bg-slate-100" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Or use email</span>
              <div className="flex-grow h-px bg-slate-100" />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? "Sending link..." : "Send Login Link"}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        )}

        <p className="mt-10 text-center text-xs text-slate-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
