import { Calendar } from "lucide-react";

export default function AdminAppointmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">Appointments</h1>
        <p className="text-slate-500">Manage site visits and consultations.</p>
      </div>

      <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center">
        <Calendar className="mx-auto text-slate-200 mb-4" size={48} />
        <h3 className="text-lg font-bold text-slate-400 mb-2">No Appointments Scheduled</h3>
        <p className="text-slate-400 max-w-xs mx-auto text-sm">
          Once users start booking site visits through the contact form, they will appear here.
        </p>
      </div>
    </div>
  );
}
