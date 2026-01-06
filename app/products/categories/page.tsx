import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Category from "@/src/models/category";
import Product from "@/src/models/Product";

function getSafeImage(input: unknown): string | null {
  if (typeof input !== "string") return null;
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input;
  }
  return null;
}

export default async function CategoriesWithProductsPage() {
  await connectDB();

  const categories = await Category.find().sort({ name: 1 }).lean();

  const products = await Product.find({
  isActive: true,
  category: { $ne: null }, // 🔥 EXCLUDE NULL CATEGORY
})
  .select("name slug shortDescription images category")
  .lean();


  return (
    <section className="max-w-7xl mx-auto px-8 py-16 bg-white mt-12 rounded-lg shadow-sm space-y-20">
      <h1 className="text-4xl font-bold text-gray-900">
        Products by Category
      </h1>

      {categories.map((cat: any) => {
        const catProducts = products.filter(
          (p: any) =>
            p.category?.toString() === cat._id.toString()
        );

        return (
          <div key={cat._id} id={cat.slug}>
            {/* CATEGORY HEADER */}
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-gray-900">
                {cat.name}
              </h2>
            </div>

            {/* EMPTY */}
            {catProducts.length === 0 && (
              <p className="text-gray-600">
                No products available in this category.
              </p>
            )}

            {/* PRODUCTS */}
            {catProducts.length > 0 && (
              <div className="border-t divide-y">
                {catProducts.map((p: any) => {
                  const image =
                    Array.isArray(p.images) &&
                    p.images.length > 0
                      ? getSafeImage(p.images[0])
                      : null;

                  return (
                    <Link
                      key={p._id}
                      href={`/products/${p.slug}`}
                      className="block py-6 hover:bg-gray-50 transition"
                    >
                      <div className="flex gap-6">
                        <div className="w-40">
                          {image ? (
                            <Image
                              src={image}
                              alt={p.name}
                              width={160}
                              height={120}
                              className="object-contain"
                            />
                          ) : (
                            <div className="text-sm text-gray-400">
                              No image
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {p.name}
                          </h3>
                          <p className="text-gray-600 max-w-2xl">
                            {p.shortDescription}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
