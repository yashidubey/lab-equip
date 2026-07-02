import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/src/models/Product";

export async function GET() {
  await connectDB();

  const products = await Product.find({
    isActive: true,
    showInNavbar: true,
  })
    .sort({ name: 1 })
    .select("name slug")
    .lean();

  return NextResponse.json(products, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}