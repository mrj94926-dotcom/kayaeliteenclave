import { sql } from "@/lib/db";
import { Calendar, Clock, MapPin, MoreVertical, Trash2, CheckCircle2, User, Phone, Mail, Plus } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminAppointmentsPage() {
  const appointments = await sql`
    SELECT a.*, l.name as lead_name, l.phone as lead_phone 
    FROM appointments a
    LEFT JOIN leads l ON a.lead_id = l.id
    ORDER BY a.appointment_date ASC
  `;

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37] border border-[#D4AF37]/20 shadow-sm">
              <Calendar size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-serif text-[#0F172A] tracking-tight">Visit Coordination</h1>
              <p className="text-slate-400 text-sm font-medium mt-1">Managing {appointments.length} confirmed site visits and consultations.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#D4AF37] text-white rounded-2xl text-[10px] font-black tracking-widest uppercase hover:bg-[#B8962D] transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center gap-3">
            <Plus size={18} />
            Schedule Protocol
          </button>
        </div>
      </div>

      {/* Grid of Appointments */}
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {appointments.map((apt: any) => (
            <div key={apt.id} className="bg-white border border-slate-200 p-8 rounded-[2rem] hover:border-[#D4AF37]/30 transition-all group shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-[#D4AF37] text-xl group-hover:scale-110 transition-transform duration-500">
                    {apt.client_name?.charAt(0) || "C"}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#D4AF37] transition-colors">{apt.client_name}</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1.5">{apt.type || "Site Visit"}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                    apt.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Calendar size={16} className="text-[#D4AF37]" />
                    <span className="text-xs font-bold">{new Date(apt.appointment_date).toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Clock size={16} className="text-[#D4AF37]" />
                    <span className="text-xs font-bold">{new Date(apt.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Phone size={16} className="text-[#D4AF37]" />
                    <span className="text-xs font-bold">{apt.lead_phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Mail size={16} className="text-[#D4AF37]" />
                    <span className="text-xs font-bold truncate max-w-[120px]">{apt.client_email || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin size={14} className="text-[#D4AF37]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Kaya Elite Enclave Site</span>
                </div>
                <div className="flex gap-3">
                  <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-[#0F172A] hover:border-slate-200 transition-all shadow-sm active:scale-90">
                    <MoreVertical size={18} />
                  </button>
                  <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm active:scale-90">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-24 rounded-[3rem] shadow-sm border border-slate-200 text-center max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Calendar className="text-slate-200" size={32} />
          </div>
          <h3 className="text-2xl font-serif text-[#0F172A] mb-4">No Active Coordinations</h3>
          <p className="text-slate-400 max-w-md mx-auto text-sm font-medium leading-relaxed">
            Site visits scheduled via the acquisition gateway will materialize here for strategic management.
          </p>
          <button className="mt-10 px-8 py-4 bg-[#D4AF37] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#B8962D] transition-all shadow-xl shadow-[#D4AF37]/20">
            Schedule Immediate Tour
          </button>
        </div>
      )}
    </div>
  );
}
