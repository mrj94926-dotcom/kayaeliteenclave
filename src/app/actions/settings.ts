"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveSettings(formData: FormData) {
  try {
    const entries = Array.from(formData.entries());
    
    for (const [key, value] of entries) {
      if (typeof value === "string") {
        await sql`
          INSERT INTO settings (key, value)
          VALUES (${key}, ${value})
          ON CONFLICT (key) DO UPDATE SET value = ${value}
        `;
      }
    }

    await sql`
      INSERT INTO activity_logs (action, event, description, type)
      VALUES ('Updated', 'Settings Configured', 'System configuration parameters were updated.', 'settings')
    `;

    revalidatePath("/admin/settings");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Save settings error:", error);
    return { success: false, error: error.message };
  }
}
