import { sql } from "@/lib/db";
import LeadsTable from "@/components/admin/LeadsTable";
import { Users, UserPlus, Download } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await sql`
    SELECT * FROM leads 
    ORDER BY created_at DESC
  `;

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/20">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-white">Lead Management</h1>
              <p className="text-slate-500 text-sm font-light">Managing {leads.length} identified prospects for Kaya Elite.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-white transition-all flex items-center gap-3">
            <Download size={18} /> Export CSV
          </button>
          <button className="px-6 py-3 bg-primary text-white rounded-2xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-3">
            <UserPlus size={18} /> Add Prospect
          </button>
        </div>
      </div>

      {/* Leads Table Section */}
      <LeadsTable initialLeads={leads} />
    </div>
  );
}
