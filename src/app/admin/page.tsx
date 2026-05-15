import { 
  Users, 
  TrendingUp, 
  Calendar, 
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CreditCard,
  UserPlus,
  Clock,
  ChevronRight
} from "lucide-react";
import { sql } from "@/lib/db";
import { LeadGrowthChart, ConversionPieChart } from "@/components/admin/DashboardCharts";
import Link from "next/link";

export const runtime = "nodejs";

export default async function AdminDashboard() {
  const totalLeadsRes = await sql`SELECT COUNT(*)::int as count FROM leads`;
  const totalLeads = totalLeadsRes[0].count;
  
  const activeLeadsRes = await sql`SELECT COUNT(*)::int as count FROM leads WHERE status != 'Closed'`;
  const activeLeads = activeLeadsRes[0].count;

  const siteVisitsRes = await sql`SELECT COUNT(*)::int as count FROM appointments`;
  const siteVisits = siteVisitsRes[0].count;

  const closedLeadsRes = await sql`SELECT COUNT(*)::int as count FROM leads WHERE status = 'Closed'`;
  const closedLeads = closedLeadsRes[0].count;
  const conversionRate = totalLeads > 0 ? ((closedLeads / totalLeads) * 100).toFixed(1) : "0.0";

  const recentLeads = await sql`
    SELECT * FROM leads 
    ORDER BY created_at DESC 
    LIMIT 5
  `;

  const recentLogs = await sql`
    SELECT * FROM activity_logs
    ORDER BY created_at DESC
    LIMIT 4
  `;

  const stats = [
    { 
      label: "Total Leads", 
      value: totalLeads.toString(), 
      icon: Users, 
      change: "Live", 
      trend: "up",
      description: "Total registered interest"
    },
    { 
      label: "Active Inquiries", 
      value: activeLeads.toString(), 
      icon: MessageSquare, 
      change: "Live", 
      trend: "up",
      description: "Awaiting follow-up"
    },
    { 
      label: "Site Visits", 
      value: siteVisits.toString(), 
      icon: Calendar, 
      change: "Live", 
      trend: "up",
      description: "Scheduled appointments"
    },
    { 
      label: "Conversion Rate", 
      value: `${conversionRate}%`, 
      icon: Activity, 
      change: "Live", 
      trend: totalLeads > 0 && closedLeads > 0 ? "up" : "down",
      description: "Lead to customer ratio"
    },
  ];

  return (
    <div className="space-y-10">
      {/* Page Title & Actions */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif text-[#0F172A] tracking-tight mb-2">Portfolio Intelligence</h1>
          <p className="text-slate-500 text-sm font-medium">Strategic overview of the Kaya Elite Enclave asset performance.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold tracking-widest uppercase text-slate-500 hover:bg-slate-50 transition-all shadow-sm">Export CRM Data</button>
          <button className="px-6 py-3 bg-[#D4AF37] text-white rounded-2xl text-xs font-bold tracking-widest uppercase hover:bg-[#B8962D] transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center gap-3">
            <UserPlus size={18} />
            Acquire Prospect
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={stat.label} className="bg-white border border-slate-200 p-8 rounded-3xl hover:border-[#D4AF37]/30 transition-all group relative overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <stat.icon size={100} className="text-[#D4AF37]" />
            </div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3.5 rounded-2xl bg-slate-50 text-[#D4AF37] border border-slate-100 group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500 shadow-sm">
                <stat.icon size={22} />
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                stat.trend === "up" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
              }`}>
                {stat.change}
                {stat.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl font-serif text-[#0F172A]">{stat.value}</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              <p className="text-[10px] text-slate-400 font-medium mt-3 italic">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts & Lead Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lead Growth Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl font-serif text-[#0F172A] mb-1">Acquisition Velocity</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">Monthly lead accumulation metrics</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
              <button className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white text-[#D4AF37] shadow-sm border border-slate-200 transition-all">12M</button>
              <button className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0F172A] transition-all">6M</button>
              <button className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0F172A] transition-all">30D</button>
            </div>
          </div>
          <LeadGrowthChart />
        </div>

        {/* Lead Source Intelligence */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-2xl font-serif text-[#0F172A] mb-1">Source Distribution</h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-10">Intelligence by channel</p>
          <ConversionPieChart />
          <div className="mt-8 space-y-4">
            {[
              { name: "Organic Search", value: "40%", color: "bg-[#D4AF37]" },
              { name: "Direct Referral", value: "25%", color: "bg-slate-700" },
              { name: "Partner Portals", value: "35%", color: "bg-slate-200" },
            ].map((source) => (
              <div key={source.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${source.color} shadow-sm`} />
                  <span className="text-xs font-bold text-slate-600">{source.name}</span>
                </div>
                <span className="text-xs font-black text-[#0F172A]">{source.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Lead Pipeline */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-serif text-[#0F172A] mb-1">Pipeline Activity</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">Latest high-value registrations</p>
            </div>
            <Link href="/admin/leads" className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-black hover:underline flex items-center gap-2 group">
              Intelligence Center <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentLeads.length > 0 ? recentLeads.map((lead: any) => (
              <div key={lead.id} className="group flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-transparent hover:border-[#D4AF37]/20 hover:bg-white hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center font-black text-[#D4AF37] text-lg group-hover:scale-110 transition-all duration-500">
                    {lead.name?.charAt(0) || "L"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#D4AF37] transition-colors">{lead.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{lead.interested_property || "Elite Portfolio"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] uppercase tracking-widest font-black rounded-full mb-2 border border-[#D4AF37]/20">Verified Lead</div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <Clock size={12} className="text-[#D4AF37]" /> {new Date(lead.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center text-slate-300 py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Users size={40} className="mx-auto mb-4 opacity-10" />
                <p className="text-xs font-black uppercase tracking-widest">No active pipeline registrations.</p>
              </div>
            )}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h3 className="text-2xl font-serif text-[#0F172A] mb-1">Audit Log</h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-10">Strategic system events</p>
          <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            {recentLogs.length > 0 ? recentLogs.map((activity: any, i: number) => (
              <div key={activity.id} className="relative pl-10 group">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center z-10 shadow-sm group-hover:border-[#D4AF37] transition-colors">
                  <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#D4AF37] animate-pulse" : "bg-slate-300"}`} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#D4AF37] transition-colors">{activity.event || activity.action}</h4>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{new Date(activity.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{activity.description}</p>
                </div>
              </div>
            )) : (
              <div className="text-center text-slate-400 text-xs py-4">No recent activity.</div>
            )}
          </div>
          <Link href="/admin/logs" className="block w-full mt-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] text-center uppercase tracking-widest font-black text-slate-400 hover:bg-[#0F172A] hover:text-white transition-all shadow-sm">
            Access Complete Audit Trail
          </Link>
        </div>
      </div>
    </div>
  );
}
