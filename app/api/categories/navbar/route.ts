import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/src/models/category";
import Product from "@/src/models/Product";

export async function GET() {
  await connectDB();

  const categories = await Category.find({
    slug: {
      $in: ["shakers", "meters", "sieves"],
    },
  })
    .sort({ name: 1 })
    .lean();

  const result = await Promise.all(
    categories.map(async (category: any) => {
      const products = await Product.find(
        {
          isActive: true,
          category: category._id,
        },
        {
          name: 1,
          slug: 1,
        }
      )
        .sort({ name: 1 })
        .lean();

      return {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        products,
      };
    })
  );

  return NextResponse.json(result);
}