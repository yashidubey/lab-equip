import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Category from "@/src/models/category";

/* ================= ADMIN CHECK ================= */
async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("admin-auth")?.value === "true";
}

/* ================= CSRF CHECK – FIXED ================= */
async function validateCSRF(req: Request) {
  const cookieStore = await cookies();

  const csrfCookie = cookieStore.get("csrf-token")?.value;
  const csrfHeader = req.headers.get("x-csrf-token");

  return csrfCookie && csrfHeader && csrfCookie === csrfHeader;
}
// ← END FIXED CSRF HELPER

/* ================= TEXT SANITIZER ================= */
function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/* ================= URL SANITIZER ================= */
function sanitizeUrl(input: unknown): string {
  if (typeof input !== "string") return "";
  if (!input.startsWith("http")) return "";
  return input.trim();
}

/* ================= GET (PUBLIC) ================= */
export async function GET() {
  await connectDB();

  const categories = await Category.find()
    .sort({ name: 1 })
    .lean();

  return NextResponse.json(categories, { status: 200 });
}

/* ================= CREATE (ADMIN) – FIXED AWAIT ================= */
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 🔐 CSRF check awaited correctly
  if (!(await validateCSRF(req))) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }
  // ← END FIX

  await connectDB();
  const body = await req.json();

  if (!body?.name) {
    return NextResponse.json(
      { error: "Category name is required" },
      { status: 400 }
    );
  }

  const name = sanitizeText(body.name);

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const exists = await Category.findOne({ slug });

  if (exists) {
    return NextResponse.json(
      { error: "Category already exists" },
      { status: 409 }
    );
  }

  const category = await Category.create({
    name,
    slug,
    description: sanitizeText(body.description),
    image: sanitizeUrl(body.image),
  });

  return NextResponse.json(category, { status: 201 });
}
