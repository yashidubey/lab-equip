import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Category from "@/src/models/category";
import Product from "@/src/models/Product";

/**
 * Homepage – Laboteck-style B2B layout
 */

async function getCategories() {
  await connectDB();
  return Category.find().sort({ name: 1 }).lean();
}

async function getFeaturedProducts() {
  await connectDB();

  const products = await Product.find(
    { isActive: true },
    { name: 1, slug: 1, shortDescription: 1, images: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return products.map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    shortDescription: p.shortDescription,
    image:
      Array.isArray(p.images) && typeof p.images[0] === "string"
        ? p.images[0]
        : null,
  }));
}

export default async function HomePage() {
  const categories = await getCategories();
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="space-y-24">
      {/* ================= HERO ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Advanced Laboratory Equipment Solutions
            </h1>

            <p className="text-slate-700 text-lg mb-8">
              Reliable scientific instruments and laboratory systems designed
              for research, testing, quality control, and industrial applications.
            </p>

            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Explore Products
            </Link>
          </div>

          <div className="relative w-full h-80 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dmwlw3iy1/image/upload/v1766579836/Screenshot_2025-12-24_180652_qgfaik.png"
              alt="Laboratory equipment"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ================= PRODUCT CATEGORIES ================= */}
      <section>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">
            Product Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category: any) => (
              <Link
                key={category._id}
                href={`/products/category/${category.slug}`}
                className="border border-slate-300 rounded-lg p-6 text-center hover:shadow-lg bg-white transition block"
              >
                <div className="h-24 flex items-center justify-center bg-slate-100 rounded mb-4 overflow-hidden">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-slate-400 text-sm">
                      No image
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-slate-800">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
{/* ================= FEATURED PRODUCTS ================= */}
{/* ================= FEATURED PRODUCTS ================= */}
<section className="bg-slate-50 py-20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-3xl font-bold text-slate-900">
        Featured Products
      </h2>

      <Link href="/products" className="text-blue-600 hover:underline">
        View all →
      </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {featuredProducts.map((p) => (
        <Link
          key={p.id}
          href={`/products/${p.slug}`}
          className="block bg-white border border-slate-300 rounded-lg p-6 hover:shadow-lg transition"
        >
          {/* IMAGE */}
          <div className="h-44 flex items-center justify-center bg-slate-100 rounded mb-4 overflow-hidden">
            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            ) : (
              <span className="text-slate-400 text-sm">
                Image not available
              </span>
            )}
          </div>

          {/* NAME */}
          <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">
            {p.name}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm text-slate-600 text-center">
            {p.shortDescription}
          </p>
        </Link>
      ))}
    </div>
  </div>
</section>



      {/* ================= WHY CHOOSE US ================= */}
      <section>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Industry Expertise",
                desc: "Decades of experience supplying laboratory equipment across industries.",
              },
              {
                title: "Quality Assurance",
                desc: "Products sourced from trusted manufacturers with global standards.",
              },
              {
                title: "Technical Support",
                desc: "Pre-sales and post-sales support from trained professionals.",
              },
              {
                title: "Reliable Delivery",
                desc: "Efficient logistics and dependable delivery timelines.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold mb-2 text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
