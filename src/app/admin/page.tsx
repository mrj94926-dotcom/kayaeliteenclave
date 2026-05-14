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
  
  const recentLeads = await sql`
    SELECT * FROM leads 
    ORDER BY created_at DESC 
    LIMIT 5
  `;

  const stats = [
    { 
      label: "Total Leads", 
      value: totalLeads, 
      icon: Users, 
      change: "+12.5%", 
      trend: "up",
      description: "Total registered interest"
    },
    { 
      label: "Active Inquiries", 
      value: "24", 
      icon: MessageSquare, 
      change: "+4.2%", 
      trend: "up",
      description: "Awaiting follow-up"
    },
    { 
      label: "Site Visits", 
      value: "8", 
      icon: Calendar, 
      change: "+18%", 
      trend: "up",
      description: "Scheduled this month"
    },
    { 
      label: "Conversion Rate", 
      value: "3.2%", 
      icon: Activity, 
      change: "-1.5%", 
      trend: "down",
      description: "Lead to customer ratio"
    },
  ];

  return (
    <div className="space-y-10">
      {/* Page Title & Actions */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Executive Overview</h1>
          <p className="text-slate-500 text-sm">Welcome back, Admin. Here is what is happening with Kaya Elite today.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold tracking-wide hover:bg-slate-800 transition-all">Export Report</button>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold tracking-wide hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            <UserPlus size={16} />
            Add New Lead
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={stat.label} className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:border-primary/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon size={80} className="text-primary" />
            </div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3.5 rounded-2xl bg-slate-800/50 text-primary border border-slate-700/50 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <stat.icon size={22} />
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                stat.trend === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
              }`}>
                {stat.change}
                {stat.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl font-serif text-white">{stat.value}</h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-[10px] text-slate-600 italic mt-2">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts & Lead Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lead Growth Chart */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-serif text-white mb-1">Lead Generation Performance</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Monthly growth analytics</p>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
              <button className="px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-white transition-all shadow-md">12M</button>
              <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all">6M</button>
              <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all">30D</button>
            </div>
          </div>
          <LeadGrowthChart />
        </div>

        {/* Lead Source Intelligence */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl">
          <h3 className="text-xl font-serif text-white mb-1">Source Intelligence</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-10">Channel distribution</p>
          <ConversionPieChart />
          <div className="mt-8 space-y-4">
            {[
              { name: "Direct Search", value: "40%", color: "bg-primary" },
              { name: "Social Referral", value: "25%", color: "bg-slate-700" },
              { name: "External Portals", value: "35%", color: "bg-slate-800" },
            ].map((source) => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${source.color}`} />
                  <span className="text-xs text-slate-400">{source.name}</span>
                </div>
                <span className="text-xs font-bold text-white">{source.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Lead Pipeline */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-serif text-white mb-1">New Pipeline Leads</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Recent registrations</p>
            </div>
            <Link href="/admin/leads" className="text-primary text-[10px] uppercase tracking-[0.2em] font-bold hover:underline flex items-center gap-2">
              View Full List <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {recentLeads.length > 0 ? recentLeads.map((lead: any) => (
              <div key={lead.id} className="group flex items-center justify-between p-5 rounded-2xl bg-slate-900/60 border border-slate-800/50 hover:border-primary/20 hover:bg-slate-800/50 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center font-bold text-primary text-lg group-hover:scale-110 transition-transform">
                    {lead.name?.charAt(0) || "L"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{lead.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{lead.interested_property || "Elite Villa"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="px-3 py-1 bg-primary/10 text-primary text-[9px] uppercase tracking-widest font-bold rounded-full mb-2">New Lead</div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-bold">
                    <Clock size={12} /> {new Date(lead.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center text-slate-500 py-12 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
                <Users size={32} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm">No new pipeline leads identified.</p>
              </div>
            )}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl">
          <h3 className="text-xl font-serif text-white mb-1">CRM Activity Log</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-10">System timeline</p>
          <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
            {[
              { time: "2m ago", event: "New Lead Submission", desc: "Siddharth Verma submitted interest for 4BHK Villa.", type: "lead" },
              { time: "45m ago", event: "Site Visit Scheduled", desc: "Meeting scheduled with Dr. Rajesh for Sunday.", type: "appointment" },
              { time: "2h ago", event: "New Subscriber", desc: "Newsletter signup via footer contact form.", type: "mail" },
              { time: "5h ago", event: "Lead Status Update", desc: "Priya Malhotra marked as 'Hot Lead'.", type: "update" },
            ].map((activity, i) => (
              <div key={i} className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center z-10">
                  <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-primary animate-pulse" : "bg-slate-600"}`} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-white">{activity.event}</h4>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{activity.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            View Full Audit Trail
          </button>
        </div>
      </div>
    </div>
  );
}
