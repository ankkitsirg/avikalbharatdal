import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  const result = await pool.query(
    "SELECT name, phone, district FROM members ORDER BY created_at DESC"
  );

  return NextResponse.json(result.rows);
}