import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "superadmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const result = await pool.query(
    "SELECT name, phone, district,payment_screenshot, payment_status FROM members ORDER BY created_at DESC"
  );

  return NextResponse.json(result.rows);
}