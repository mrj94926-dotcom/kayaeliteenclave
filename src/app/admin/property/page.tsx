import { sql } from "@/lib/db";
import { Building2, Plus, Search, Filter, Home, Layout, Trash2, Edit3, Image as ImageIcon, MapPin } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminPropertyPage() {
  const properties = await sql`SELECT * FROM properties ORDER BY created_at DESC`;

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37] border border-[#D4AF37]/20 shadow-sm">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-serif text-[#0F172A] tracking-tight">Asset Management</h1>
              <p className="text-slate-400 text-sm font-medium mt-1">Direct synchronization with Sanity CMS for Kaya Elite property listings.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#D4AF37] text-white rounded-2xl text-[10px] font-black tracking-widest uppercase hover:bg-[#B8962D] transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center gap-3">
            <Plus size={18} />
            Provision Asset
          </button>
        </div>
      </div>

      {/* Grid of Properties */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {properties.map((prop) => (
          <div key={prop.id} className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm hover:border-[#D4AF37]/30 transition-all group">
            <div className="h-56 bg-slate-100 relative group-hover:scale-[1.02] transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-md ${
                  prop.status === 'Active' ? 'bg-emerald-500/80 text-white border-emerald-400/50' : 'bg-slate-500/80 text-white border-slate-400/50'
                }`}>
                  {prop.status}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">{prop.description || "Premium Asset"}</p>
                <h3 className="text-xl font-serif">{prop.title}</h3>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-400 font-bold">
                  <MapPin size={14} className="text-[#D4AF37]" />
                  <span className="text-[10px] uppercase tracking-widest">{prop.location}</span>
                </div>
                <span className="text-lg font-serif text-[#D4AF37]">{prop.price}</span>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-50">
                <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0F172A] hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all active:scale-95">
                  <Edit3 size={14} /> Edit Listing
                </button>
                <button className="p-3.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-100 transition-all active:scale-90">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Placeholder */}
        <button className="border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 hover:border-[#D4AF37]/50 hover:bg-white transition-all group min-h-[400px]">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/5 transition-all mb-4">
            <Plus size={32} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-[#0F172A] transition-colors">Add New Luxury Asset</p>
        </button>
      </div>
    </div>
  );
}
