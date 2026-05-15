import { sql } from "@/lib/db";
import { TrendingUp, Users, Home, Activity } from "lucide-react";
import { LeadGrowthChart, ConversionPieChart } from "@/components/admin/DashboardCharts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const totalLeadsRes = await sql`SELECT COUNT(*)::int as count FROM leads`;
  const closedLeadsRes = await sql`SELECT COUNT(*)::int as count FROM leads WHERE status = 'Closed'`;
  const appointmentsRes = await sql`SELECT COUNT(*)::int as count FROM appointments`;

  const totalLeads = totalLeadsRes[0].count;
  const closedLeads = closedLeadsRes[0].count;
  const appointments = appointmentsRes[0].count;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600 border border-emerald-500/20">
              <TrendingUp size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-[#0F172A]">Advanced Analytics</h1>
              <p className="text-slate-500 text-sm font-medium">Deep insights into conversion and portfolio metrics.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Acquisitions</p>
            <h3 className="text-4xl font-serif text-[#0F172A] mt-2">{totalLeads}</h3>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl text-slate-400"><Users size={24} /></div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Conversions</p>
            <h3 className="text-4xl font-serif text-[#D4AF37] mt-2">{closedLeads}</h3>
          </div>
          <div className="p-4 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]"><Activity size={24} /></div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Site Visits Scheduled</p>
            <h3 className="text-4xl font-serif text-[#0F172A] mt-2">{appointments}</h3>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl text-slate-400"><Home size={24} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-2xl font-serif text-[#0F172A] mb-1">Acquisition Velocity</h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-10">Monthly lead accumulation metrics</p>
          <LeadGrowthChart />
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-2xl font-serif text-[#0F172A] mb-1">Source Distribution</h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-10">Intelligence by channel</p>
          <ConversionPieChart />
        </div>
      </div>
    </div>
  );
}
