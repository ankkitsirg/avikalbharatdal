import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  const session = await auth();

  if (!session || session.user.role !== "superadmin") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  const result = await pool.query(
    "SELECT name, phone, district FROM members ORDER BY created_at DESC"
  );

  return NextResponse.json(result.rows);
}