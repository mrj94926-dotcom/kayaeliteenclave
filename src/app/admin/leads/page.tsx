import { sql } from "@/lib/db";
export const runtime = "nodejs";
import { LeadsTable } from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await sql`
    SELECT * FROM leads 
    ORDER BY created_at DESC
  `;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Leads Management</h1>
          <p className="text-slate-500">View and manage potential investors for Kaya Elite Enclave.</p>
        </div>
      </div>

      <LeadsTable initialLeads={leads} />
    </div>
  );
}
