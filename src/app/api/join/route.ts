import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, phone, email, district, volunteer } = await req.json();

    if (!name || !phone || !district) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await pool.query(
      `
      INSERT INTO members (name, phone, email, district, volunteer)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [name, phone, email, district, volunteer]
    );

    return NextResponse.json({ message: "Member registered successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Database insert failed" },
      { status: 500 }
    );
  }
}