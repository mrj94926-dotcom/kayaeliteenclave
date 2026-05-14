import { 
  Users, 
  TrendingUp, 
  Calendar, 
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { sql } from "@/lib/db";
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
      change: "+12%", 
      trend: "up",
      color: "blue"
    },
    { 
      label: "Hot Leads", 
      value: 0, 
      icon: TrendingUp, 
      change: "0%", 
      trend: "neutral",
      color: "orange"
    },
    { 
      label: "Appointments", 
      value: 0, 
      icon: Calendar, 
      change: "0%", 
      trend: "neutral",
      color: "green"
    },
    { 
      label: "Unread Messages", 
      value: 0, 
      icon: MessageSquare, 
      change: "-2%", 
      trend: "down",
      color: "purple"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === "up" ? "text-emerald-600" : stat.trend === "down" ? "text-red-600" : "text-slate-500"
              }`}>
                {stat.change}
                {stat.trend === "up" ? <ArrowUpRight size={14} /> : stat.trend === "down" ? <ArrowDownRight size={14} /> : null}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Recent Leads</h3>
            <button className="text-primary text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentLeads.length > 0 ? recentLeads.map((lead: any) => (
              <div key={lead.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                    {lead.name?.charAt(0) || "L"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.email}</p>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-center text-slate-400 py-8">No leads found yet.</p>
            )}
          </div>
        </div>

        {/* Quick Analytics Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="bg-slate-50 w-full h-full rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-8">
            <TrendingUp size={48} className="text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-400 mb-2">Analytics Chart Coming Soon</h3>
            <p className="text-sm text-slate-400 max-w-xs">
              Interactive lead growth and conversion analytics will be available as more data is collected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
