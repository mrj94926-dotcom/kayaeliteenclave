import { neon } from "@neondatabase/serverless";

// Use the pooled DATABASE_URL for efficient serverless connections
const connectionString = process.env.DATABASE_URL!;

export const sql = neon(connectionString);
