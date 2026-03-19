import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {

    const {
      name,
      phone,
      email,
      state,
      district,
      address,
      voter_id,
      membership_type,
      membership_plan,
      volunteer,
      payment_screenshot
    } = await req.json();

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 01–12

    // Insert first
    const result = await pool.query(
      `
      INSERT INTO members
      (name, phone, email, state, district, address, voter_id, membership_type, membership_plan, volunteer, payment_screenshot)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id
      `,
      [
        name,
        phone,
        email,
        state,
        district,
        address,
        voter_id,
        membership_type,
        membership_plan,
        volunteer,
        payment_screenshot
      ]
    );

    const id = result.rows[0].id;

    // Generate member ID
    const stateCode = state.substring(0, 2).toUpperCase();
    const districtCode = district.substring(0, 3).toUpperCase();
    const memberCode = `ABD-${stateCode}-${districtCode}-${year}-${month}-${String(id).padStart(5, "0")}`;

    await pool.query(
      `UPDATE members SET member_code=$1 WHERE id=$2`,
      [memberCode, id]
    );

    return NextResponse.json({
      message: "Member registered successfully",
      member_id: memberCode
    });

  } catch (error: any) {

    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Phone number already registered" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Database insert failed" },
      { status: 500 }
    );
  }
}