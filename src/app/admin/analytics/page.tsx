import { sql } from "@/lib/db";
import { LeadGrowthChart, ConversionPieChart } from "@/components/admin/DashboardCharts";
import { TrendingUp, Users, Target, Activity, Zap, ShieldCheck } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const stats = [
    { label: "Acquisition Velocity", value: "+28%", icon: TrendingUp, detail: "vs. previous quarter" },
    { label: "Lead Quality Score", value: "8.4/10", icon: ShieldCheck, detail: "Strategic engagement index" },
    { label: "Market Reach", value: "1.2M", icon: Target, detail: "Total impressions across channels" },
    { label: "Network Activity", value: "94%", icon: Zap, detail: "System uptime and sync status" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37] border border-[#D4AF37]/20 shadow-sm">
              <TrendingUp size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-serif text-[#0F172A] tracking-tight">Market Intelligence</h1>
              <p className="text-slate-400 text-sm font-medium mt-1">Advanced data visualization for the Kaya Elite asset portfolio.</p>
            </div>
          </div>
        </div>
      </div>

      {/* High-Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:border-[#D4AF37]/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400">
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-3xl font-serif text-[#0F172A] mb-1">{stat.value}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{stat.label}</p>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{stat.detail}</p>
          </div>
        ))}
      </div>

      {/* Major Analytics Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm">
          <div className="mb-12">
            <h3 className="text-2xl font-serif text-[#0F172A] mb-1">Growth Trajectory</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">Historical lead acquisition performance</p>
          </div>
          <LeadGrowthChart />
        </div>

        <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm">
          <div className="mb-12">
            <h3 className="text-2xl font-serif text-[#0F172A] mb-1">Channel Intelligence</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">Acquisition by source</p>
          </div>
          <ConversionPieChart />
          <div className="mt-10 space-y-5">
            {[
              { name: "Digital Search", value: "40%", status: "Stable" },
              { name: "Direct Network", value: "35%", status: "Increasing" },
              { name: "Social Channels", value: "25%", status: "Stable" },
            ].map(source => (
              <div key={source.name} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-[#0F172A]">{source.name}</p>
                  <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest mt-0.5">{source.status}</p>
                </div>
                <span className="text-sm font-black text-[#0F172A]">{source.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
