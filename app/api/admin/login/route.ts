export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH,
} from "@/lib/adminConfig";

import { rateLimit } from "@/lib/rateLimit";
import { generateCSRFToken } from "@/lib/csrf";

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("host") ??
      "unknown";

    if (!rateLimit(`admin-login-${ip}`, 5, 5 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many login attempts" },
        { status: 429 }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(
      password,
      ADMIN_PASSWORD_HASH
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 4,
    });

    response.cookies.set("csrf-token", generateCSRFToken(), {
      httpOnly: false,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
