import { Settings, User, Palette, Phone, Globe, Bell, Shield, Save } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-slate-100 rounded-2xl text-slate-400 border border-slate-200 shadow-sm">
              <Settings size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-serif text-[#0F172A] tracking-tight">System Configuration</h1>
              <p className="text-slate-400 text-sm font-medium mt-1">Management of global CRM parameters and strategic communication protocols.</p>
            </div>
          </div>
        </div>
        <button className="px-8 py-4 bg-[#0F172A] text-white rounded-2xl text-[10px] font-black tracking-widest uppercase hover:bg-slate-800 transition-all shadow-xl shadow-[#0F172A]/10 flex items-center gap-3 active:scale-95">
          <Save size={18} /> Commit Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Section */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
            <User size={20} className="text-[#D4AF37]" />
            <h3 className="text-xl font-serif text-[#0F172A]">Executive Profile</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Legal Name</label>
              <input type="text" placeholder="Admin Executive" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-[#0F172A] focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Verified Email Node</label>
              <input type="email" placeholder="admin@kayaelite.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-[#0F172A] focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white transition-all" />
            </div>
          </div>
        </div>

        {/* Branding & Socials */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
            <Palette size={20} className="text-[#D4AF37]" />
            <h3 className="text-xl font-serif text-[#0F172A]">Communication & Branding</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">WhatsApp Protocol Number</label>
              <input type="text" placeholder="+91 99999 99999" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-[#0F172A] focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Official Company Email</label>
              <input type="text" placeholder="contact@kayaelite.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-[#0F172A] focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white transition-all" />
            </div>
          </div>
        </div>

        {/* Search & SEO */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
            <Globe size={20} className="text-[#D4AF37]" />
            <h3 className="text-xl font-serif text-[#0F172A]">Search Engine Parameters</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Global Meta Description</label>
              <textarea rows={3} placeholder="The pinnacle of private living..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-[#0F172A] focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white transition-all resize-none" />
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm opacity-60">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Shield size={20} className="text-slate-400" />
              <h3 className="text-xl font-serif text-slate-400 italic underline decoration-slate-200">Two-Factor Authentication</h3>
            </div>
            <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-not-allowed">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Restricted for Root Administrator only.</p>
        </div>
      </div>
    </div>
  );
}
