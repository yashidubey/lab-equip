import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
    ADMIN_SECRET: process.env.ADMIN_SECRET,
  });
}
