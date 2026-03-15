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

        if (!name || !phone || !district) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await pool.query(
            `
  INSERT INTO members
(name, phone, email, state, district, address, voter_id, membership_type, membership_plan, volunteer, payment_screenshot)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    `,
            [name.trim(), phone.trim(), email?.trim() || null, district.trim(), volunteer, payment_screenshot]
        );

        return NextResponse.json({ message: "Member registered successfully" });
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