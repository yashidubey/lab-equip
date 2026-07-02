import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Product from "@/src/models/Product";
import crypto from "crypto";

// 🔐 Admin check
async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("admin-auth")?.value === "true";
}

// 🛡️ Text sanitizer
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

// ============================
// GET SINGLE PRODUCT
// ============================
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await connectDB();
  const product = await Product.findById(id).lean();

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// ============================
// UPDATE PRODUCT (ADMIN)
// ============================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await connectDB();

  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();

  if (typeof body.name === "string") {
    product.name = sanitizeText(body.name);
  }

  if (typeof body.shortDescription === "string") {
    product.shortDescription = sanitizeText(body.shortDescription);
  }

  if (typeof body.description === "string") {
    product.description = sanitizeText(body.description);
  }

  // ✅ NEW: Save Navbar visibility
  if (typeof body.showInNavbar === "boolean") {
    product.showInNavbar = body.showInNavbar;
  }

  product.category = body.category || null;

  if (Array.isArray(body.images)) {
    product.images = body.images.filter((u: any) => typeof u === "string");
  }

  // ✅ Preserve / Generate Block IDs
  if (Array.isArray(body.contentBlocks)) {
    product.contentBlocks = body.contentBlocks.map((b: any) => ({
      id: b.id || crypto.randomUUID(),
      title: sanitizeText(b.title),
      items: Array.isArray(b.items)
        ? b.items.map(sanitizeText)
        : [],
      image: typeof b.image === "string" ? b.image : "",
    }));
  }

  await product.save();

  return NextResponse.json({ success: true });
}

// ============================
// DELETE PRODUCT
// ============================
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await connectDB();

  await Product.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}