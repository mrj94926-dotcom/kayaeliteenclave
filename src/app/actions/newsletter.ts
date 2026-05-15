"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function subscribeNewsletterAction(email: string) {
  try {
    if (!email) {
      return { success: false, error: "Email is required" };
    }

    // Check if subscriber already exists
    const existing = await sql`
      SELECT id FROM newsletter WHERE email = ${email}
    `;

    if (existing.length > 0) {
      return { success: true, message: "You're already subscribed!" };
    }

    const newSub = await sql`
      INSERT INTO newsletter (email)
      VALUES (${email})
      RETURNING id
    `;

    await sql`
      INSERT INTO notifications (title, message, type)
      VALUES ('New Newsletter Subscription', ${email + ' subscribed.'}, 'newsletter')
    `;

    await sql`
      INSERT INTO activity_logs (action, event, description, type, entity_id)
      VALUES ('Created', 'Portfolio Subscription', ${email + ' subscribed to newsletter.'}, 'newsletter', ${newSub[0].id})
    `;

    revalidatePath("/admin/newsletter");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}
