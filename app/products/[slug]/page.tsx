export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import ProductDetailLayout from "@/components/ProductDetailLayout";
import Product from "@/src/models/Product";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await connectDB();

  const product: any = await Product.findOne({
    slug,
    isActive: true,
  }).lean();

  if (!product) {
    return (
      <div className="p-12 text-center text-slate-700">
        Product not found
      </div>
    );
  }

  // 🔁 Convert MongoDB objects to plain JSON-safe values
  const safeBlocks = Array.isArray(product.contentBlocks)
    ? JSON.parse(JSON.stringify(product.contentBlocks))
    : [];

  return (
    <ProductDetailLayout
      name={product.name}
      shortDescription={product.shortDescription}
      description={product.description}
      image={
        Array.isArray(product.images) && typeof product.images[0] === "string"
          ? product.images[0]
          : null
      }
      blocks={safeBlocks}    // ← now plain objects only
    />
  );
}
