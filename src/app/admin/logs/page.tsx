import { sql } from "@/lib/db";
import { History, Clock, Activity, Zap, ShieldCheck, Mail, Users, Trash2 } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminLogsPage() {
  const logs = await sql`
    SELECT * FROM activity_logs 
    ORDER BY created_at DESC 
    LIMIT 100
  `;

  const getIcon = (type: string | null) => {
    switch (type) {
      case 'lead': return <Users size={16} className="text-[#D4AF37]" />;
      case 'update': return <Zap size={16} className="text-blue-500" />;
      case 'delete': return <Trash2 size={16} className="text-red-500" />;
      case 'mail': return <Mail size={16} className="text-emerald-500" />;
      default: return <Activity size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-slate-100 rounded-2xl text-slate-400 border border-slate-200 shadow-sm">
              <History size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-serif text-[#0F172A] tracking-tight">Audit Trail</h1>
              <p className="text-slate-400 text-sm font-medium mt-1">Chronological intelligence log for the Kaya Elite CRM system.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Event Signature</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Intelligence Brief</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Classification</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.length > 0 ? logs.map((log: any) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-sm group-hover:border-[#D4AF37]/30 transition-all">
                        {getIcon(log.type)}
                      </div>
                      <span className="text-sm font-bold text-[#0F172A] tracking-tight">{log.event}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-md">{log.description}</p>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-3 py-1 bg-slate-50 border border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400 rounded-full">
                      {log.type || "System"}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      <Clock size={14} className="text-[#D4AF37]" />
                      {new Date(log.created_at).toLocaleString('en-GB')}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-10 py-24 text-center text-slate-300 font-black uppercase tracking-[0.2em]">
                    System initialized. No activity records found.
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
