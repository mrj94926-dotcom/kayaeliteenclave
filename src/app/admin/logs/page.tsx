import { sql } from "@/lib/db";
import { History, Search } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminLogsPage() {
  const logs = await sql`
    SELECT * FROM activity_logs 
    ORDER BY created_at DESC 
    LIMIT 100
  `;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-slate-900 rounded-2xl text-slate-100 shadow-sm border border-slate-800">
              <History size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-[#0F172A]">Activity Logs</h1>
              <p className="text-slate-500 text-sm font-medium">System-wide strategic events and audit trails.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filter audit logs..." 
              className="w-full bg-white border border-slate-200 rounded-2xl py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 focus:shadow-lg focus:shadow-[#D4AF37]/5 transition-all"
            />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-white">
              <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Event</th>
              <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Description</th>
              <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {logs.map((log: any) => (
              <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-10 py-6">
                  <span className="text-sm font-bold text-[#0F172A]">{log.event || log.action}</span>
                </td>
                <td className="px-10 py-6">
                  <span className="text-sm text-slate-600">{log.description}</span>
                </td>
                <td className="px-10 py-6 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  {new Date(log.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={3} className="px-10 py-16 text-center text-slate-400 font-black uppercase tracking-widest text-xs">
                  No activity logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
