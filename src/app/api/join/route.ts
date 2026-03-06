import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { name, phone, email, district, volunteer, paymentScreenshot } = await req.json();

        if (!name || !phone || !district) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await pool.query(
            `
  INSERT INTO members (name, phone, email, district, volunteer, payment_screenshot)
VALUES ($1, $2, $3, $4, $5, $6)
    `,
            [name.trim(), phone.trim(), email?.trim() || null, district.trim(), volunteer, paymentScreenshot]
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