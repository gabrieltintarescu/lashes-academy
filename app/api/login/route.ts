import { NextRequest, NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const { password } = await req.json();
    const correctPassword = process.env.APP_PASSWORD;

    if (!correctPassword) {
        return NextResponse.json({ error: "Password not configured" }, { status: 500 });
    }

    if (password === correctPassword) {
        const token = await createToken();
        const res = NextResponse.json({ ok: true });
        res.cookies.set("auth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });
        return res;
    }

    return NextResponse.json({ error: "Parolă incorectă" }, { status: 401 });
}
