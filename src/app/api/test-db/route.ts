import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    console.log("Testing database connection (Direct SQL)...");
    const result = await sql`SELECT NOW()`;
    
    return NextResponse.json({ 
      status: "success", 
      message: "Database connection successful",
      data: result 
    });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json({ 
      status: "error", 
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
