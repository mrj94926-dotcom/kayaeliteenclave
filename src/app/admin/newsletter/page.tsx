import { sql } from "@/lib/db";
import { Mail, Trash2, Download, Search, UserCheck } from "lucide-react";
import { removeSubscriber } from "@/lib/actions/crm";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const subscribers = await sql`
    SELECT * FROM newsletter 
    ORDER BY created_at DESC
  `;

  async function handleDelete(email: string) {
    "use server";
    await removeSubscriber(email);
    revalidatePath("/admin/newsletter");
  }

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37] border border-[#D4AF37]/20 shadow-sm">
              <Mail size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-serif text-[#0F172A] tracking-tight">Audience Intelligence</h1>
              <p className="text-slate-400 text-sm font-medium mt-1">Managing {subscribers.length} verified portfolio subscribers.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black tracking-widest uppercase text-slate-500 hover:text-[#0F172A] transition-all shadow-sm">
            <Download size={18} className="inline mr-2" /> Export Dataset
          </button>
        </div>
      </div>

      {/* Table Controls */}
      <div className="relative max-w-md group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Filter subscribers..." 
          className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 focus:shadow-lg focus:shadow-[#D4AF37]/5 transition-all"
        />
      </div>

      {/* Subscribers Table */}
      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Subscriber Identity</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Status</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Activation Date</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {subscribers.map((sub: any) => (
                <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/30 transition-all shadow-sm">
                        <UserCheck size={18} />
                      </div>
                      <span className="text-sm font-bold text-[#0F172A] tracking-tight">{sub.email}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-100 shadow-sm">
                      Active
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{new Date(sub.created_at).toLocaleDateString('en-GB')}</span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <form action={handleDelete.bind(null, sub.email)}>
                      <button 
                        type="submit"
                        className="p-2.5 text-slate-400 hover:text-red-500 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-red-100 transition-all active:scale-90"
                      >
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-10 py-20 text-center text-slate-300 font-black uppercase tracking-[0.2em]">
                    No active subscribers found in the CRM registry.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
