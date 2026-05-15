import { sql } from "@/lib/db";
import { ShieldCheck, UserPlus } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await sql`SELECT * FROM users ORDER BY created_at DESC`;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37] border border-[#D4AF37]/20">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-[#0F172A]">Access Control</h1>
              <p className="text-slate-500 text-sm font-medium">Manage {users.length} authorized personnel.</p>
            </div>
          </div>
        </div>
        <button className="px-6 py-3 bg-[#D4AF37] text-white rounded-2xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#B8962D] transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3">
          <UserPlus size={18} /> Add User
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">User Profile</th>
              <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Role & Access</th>
              <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Registration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user: any) => (
              <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-400 text-lg">
                      {user.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">{user.name}</p>
                      <p className="text-xs text-slate-400 font-medium mt-1">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <span className="px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-black border bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20">
                    {user.role || "ADMIN"}
                  </span>
                </td>
                <td className="px-10 py-8 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
