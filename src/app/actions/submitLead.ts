"use server";

import { sql } from "@/lib/db";
import { isDisposableEmail } from "@/lib/validateEmail";
import { revalidatePath } from "next/cache";

import fs from "fs";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "submission.log");

function logToFile(msg: string) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(LOG_FILE, `[${timestamp}] ${msg}\n`);
}

export async function submitLeadAction(formData: FormData) {
  logToFile("--- LEAD SUBMISSION START (DIRECT SQL) ---");
  try {
    const name = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const budget = formData.get("investmentBudget") as string;
    const message = formData.get("message") as string || "";

    logToFile(`FORM DATA RECEIVED: ${JSON.stringify({ name, phone, email, budget, message })}`);

    if (!name || !phone || !email) {
      logToFile("SUBMISSION FAILED: Missing fields");
      return { success: false, error: "Missing required fields" };
    }

    // Validate email
    logToFile(`VALIDATING EMAIL: ${email}`);
    const isDisposable = isDisposableEmail(email);
    if (isDisposable) {
      logToFile(`SUBMISSION FAILED: Disposable email ${email}`);
      return { success: false, error: "Please provide a valid, non-disposable email address." };
    }

    logToFile("DB WRITE START - Table: leads (with Retries)");
    
    // Retry logic
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        attempts++;
        await sql`
          INSERT INTO leads (name, email, phone, budget, message)
          VALUES (${name}, ${email}, ${phone}, ${budget}, ${message})
        `;
        break; // Success!
      } catch (err: any) {
        logToFile(`DB WRITE ATTEMPT ${attempts} FAILED: ${err.message}`);
        if (attempts === maxAttempts) throw err;
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }

    logToFile(`DB WRITE SUCCESS`);

    logToFile("REVALIDATING ADMIN PATH...");
    revalidatePath("/admin/leads");
    
    logToFile("--- LEAD SUBMISSION COMPLETE ---");
    return { success: true };
  } catch (error: any) {
    logToFile(`--- DB ERROR: ${error.message} ---`);
    logToFile(`Error Stack: ${error.stack}`);
    
    let errorMsg = "An unexpected error occurred. Please try again.";
    if (error.message?.includes("connection") || error.message?.includes("Pool") || error.message?.includes("fetch")) {
      errorMsg = "Database connection error. Please try again in a moment.";
    }

    return { success: false, error: errorMsg };
  }
}
