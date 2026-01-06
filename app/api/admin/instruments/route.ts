import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Instrument from "@/src/models/instrument";

async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("admin-auth")?.value === "true";
}

function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ============================
// GET ALL INSTRUMENTS – ADDED
// ============================
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const instruments = await Instrument.find()
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(instruments, { status: 200 });
}
// ← END ADDED GET PART

// ============================
// CREATE INSTRUMENT (ADMIN)
// ============================
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();

  if (!body.name || !body.slug) {
    return NextResponse.json(
      { error: "Name and Slug are required." },
      { status: 400 }
    );
  }

  if (body.website) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const images = Array.isArray(body.images)
    ? body.images.map(sanitizeText)
    : [];

  try {
    const instrument = await Instrument.create({
      name: sanitizeText(body.name),
      slug: sanitizeText(body.slug),
      description: sanitizeText(body.description),
      shortDescription: sanitizeText(body.shortDescription),
      images,
      isActive: true,
    });

    return NextResponse.json(instrument, { status: 201 });
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "Slug already exists. Please use a unique slug." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Server error occurred while creating instrument." },
      { status: 400 }
    );
  }
}
