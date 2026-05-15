import { sql } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    if (!q || q.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const query = `%${q}%`;

    const [leads, appointments, users, newsletter, properties, logs] = await Promise.all([
      sql`SELECT id, name, email FROM leads WHERE name ILIKE ${query} OR email ILIKE ${query} LIMIT 5`,
      sql`SELECT id, client_name, client_email FROM appointments WHERE client_name ILIKE ${query} OR client_email ILIKE ${query} LIMIT 5`,
      sql`SELECT id, name, email FROM users WHERE name ILIKE ${query} OR email ILIKE ${query} LIMIT 3`,
      sql`SELECT id, email FROM newsletter WHERE email ILIKE ${query} LIMIT 3`,
      sql`SELECT id, title FROM properties WHERE title ILIKE ${query} LIMIT 3`,
      sql`SELECT id, event, action FROM activity_logs WHERE event ILIKE ${query} OR action ILIKE ${query} LIMIT 5`
    ]);

    const results = [
      ...leads.map((l: any) => ({ type: "Lead", title: l.name, subtitle: l.email, url: "/admin/leads" })),
      ...appointments.map((a: any) => ({ type: "Appointment", title: a.client_name, subtitle: a.client_email, url: "/admin/appointments" })),
      ...users.map((u: any) => ({ type: "User", title: u.name, subtitle: u.email, url: "/admin/users" })),
      ...newsletter.map((n: any) => ({ type: "Newsletter", title: n.email, subtitle: "Subscriber", url: "/admin/newsletter" })),
      ...properties.map((p: any) => ({ type: "Property", title: p.title, subtitle: "Listing", url: "/admin/properties" })),
      ...logs.map((lg: any) => ({ type: "Log", title: lg.event || lg.action, subtitle: "Activity Log", url: "/admin/logs" }))
    ];

    return NextResponse.json({ results });
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
