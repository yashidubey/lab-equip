import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Category from "@/src/models/category";

// 🔐 Admin check
async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("admin-auth")?.value === "true";
}

// ============================
// UPDATE CATEGORY (ADMIN)
// ============================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid category ID" },
      { status: 400 }
    );
  }

  await connectDB();
  const body = await req.json();

  if (!body?.name || !body.name.trim()) {
    return NextResponse.json(
      { error: "Category name is required" },
      { status: 400 }
    );
  }

  const name = body.name.trim();
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // 🔒 Prevent duplicate slug
  const exists = await Category.findOne({
    slug,
    _id: { $ne: id },
  });

  if (exists) {
    return NextResponse.json(
      { error: "Category with this name already exists" },
      { status: 409 }
    );
  }

  const updated = await Category.findByIdAndUpdate(
    id,
    {
      name,
      slug,
      description:
        typeof body.description === "string"
          ? body.description.trim()
          : "",
      image:
        typeof body.image === "string" &&
        body.image.startsWith("http")
          ? body.image
          : "",
    },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json(
      { error: "Category not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}

// ============================
// DELETE CATEGORY (ADMIN)
// ============================
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid category ID" },
      { status: 400 }
    );
  }

  await connectDB();

  // ❗ IMPORTANT:
  // We DO NOT delete products.
  // Products will automatically become "Uncategorized" (category = null)
  await Category.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
