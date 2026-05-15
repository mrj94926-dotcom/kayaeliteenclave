"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- LEAD ACTIONS ---

export async function updateLeadStatus(id: string, status: string) {
  try {
    await sql`
      UPDATE leads 
      SET status = ${status} 
      WHERE id = ${id}
    `;
    
    // Log the activity
    await sql`
      INSERT INTO activity_logs (action, event, description, type)
      VALUES ('Update', 'Lead Status Updated', 'Lead status changed to ' || ${status} || '.', 'update')
    `;

    revalidatePath("/admin/leads");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update lead status:", error);
    return { success: false };
  }
}

export async function deleteLead(id: string) {
  try {
    await sql`DELETE FROM leads WHERE id = ${id}`;
    
    await sql`
      INSERT INTO activity_logs (action, event, description, type)
      VALUES ('Delete', 'Lead Deleted', 'A prospect record was permanently removed from the CRM.', 'delete')
    `;

    revalidatePath("/admin/leads");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete lead:", error);
    return { success: false };
  }
}

export async function addLeadNote(leadId: string, note: string) {
  try {
    // This assumes a 'lead_notes' table or similar exists. 
    // For now, we'll just log it or update a notes field if it exists.
    await sql`
      INSERT INTO activity_logs (action, event, description, type)
      VALUES ('Add Note', 'Admin Note Added', 'New intelligence note added to lead profile.', 'note')
    `;
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- APPOINTMENT ACTIONS ---

export async function updateAppointmentStatus(id: string, status: string) {
  try {
    // Logic for updating appointment in DB
    revalidatePath("/admin/appointments");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- NEWSLETTER ACTIONS ---

export async function removeSubscriber(email: string) {
  try {
    await sql`DELETE FROM newsletter WHERE email = ${email}`;
    revalidatePath("/admin/newsletter");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
