import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json();

    await pool.query(
      `UPDATE members SET payment_status=$1 WHERE id=$2`,
      [status, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}