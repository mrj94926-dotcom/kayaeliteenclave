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
      SELECT id FROM subscribers WHERE email = ${email}
    `;

    if (existing.length > 0) {
      return { success: true, message: "You're already subscribed!" };
    }

    await sql`
      INSERT INTO subscribers (email)
      VALUES (${email})
    `;

    revalidatePath("/admin/newsletter");
    return { success: true };
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}
