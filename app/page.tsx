import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Category from "@/src/models/category";
import Product from "@/src/models/Product";
import type { Metadata } from "next";
import Blog from "@/src/models/Blog";

export const metadata: Metadata = {
  title:
    "Laboratory Equipment & Scientific Instruments Supplier in India | Labzen",

  description:
    "Labzen supplies laboratory equipment, scientific instruments, biosafety cabinets, PCR cabinets, incubators, analytical instruments and research laboratory solutions across India.",
    

    keywords: [
  "laboratory equipment supplier india",
  "scientific instruments supplier",
  "laboratory instruments",
  "biosafety cabinet supplier",
  "PCR cabinet supplier",
  "CO2 incubator supplier",
  "laboratory equipment greater noida",
  "research laboratory equipment",
],
  alternates: {
    canonical: "https://www.labzen.in",
  },

  openGraph: {
    title:
      "Laboratory Equipment & Scientific Instruments Supplier in India | Labzen",

    description:
      "Laboratory equipment and scientific instruments supplier serving research, education and industrial laboratories across India.",

    url: "https://www.labzen.in",
    siteName: "Labzen",
    type: "website",
  },
  twitter: {
  card: "summary_large_image",
  title:
    "Laboratory Equipment & Scientific Instruments Supplier in India | Labzen",
  description:
    "Labzen supplies laboratory equipment, scientific instruments, biosafety cabinets, PCR cabinets, incubators, analytical instruments and research laboratory solutions across India.",
},
};

/**
 * Homepage – Labzen Laboratory Equipment Website
 */

async function getCategories() {
  await connectDB();
  return Category.find().sort({ name: 1 }).lean();
}
async function getLatestBlogs() {
  await connectDB();

  const blogs = await Blog.find({
    isPublished: true,
  })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return blogs.map((blog: any) => ({
    id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    coverImage: blog.coverImage,
    createdAt: blog.createdAt,
  }));
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

const latestBlogs = await getLatestBlogs();

  return (
    <div className="space-y-24">
      {/* ================= HERO ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
           <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
  Laboratory Equipment & Scientific Instruments Supplier in India
</h1>

           <p className="text-slate-700 text-lg mb-8">
  Reliable laboratory equipment, scientific instruments, analytical systems,
  biosafety cabinets, incubators and testing solutions for research,
  education, healthcare and industrial laboratories across India.
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
             alt="Laboratory Equipment and Scientific Instruments Supplier in India"
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

<section className="py-24 bg-gradient-to-b from-white to-slate-50">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
        Trusted Across India
      </span>

      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
        Laboratory Equipment Supplier in India
      </h2>

      <p className="max-w-4xl mx-auto text-slate-600 text-lg leading-relaxed">
        Labzen delivers advanced laboratory equipment, scientific instruments,
        analytical systems and research solutions for pharmaceutical companies,
        educational institutions, healthcare facilities and industrial laboratories.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition">
        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
          <span className="text-2xl">🔬</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-4">
          Scientific Instruments
        </h3>

        <p className="text-slate-600 leading-relaxed">
          High-performance laboratory instruments designed for testing,
          measurement, analysis and research applications.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition">
        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-6">
          <span className="text-2xl">🧪</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-4">
          Laboratory Solutions
        </h3>

        <p className="text-slate-600 leading-relaxed">
          Biosafety cabinets, incubators, PCR workstations, analytical systems
          and laboratory accessories supporting modern scientific workflows.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition">
        <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
          <span className="text-2xl">🌏</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-4">
          Nationwide Support
        </h3>

        <p className="text-slate-600 leading-relaxed">
          Based in Greater Noida, Uttar Pradesh, serving customers across India
          with dependable delivery and responsive technical assistance.
        </p>
      </div>

    </div>

    <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-white">
      <div className="grid md:grid-cols-4 gap-8 text-center">

        <div>
          <h4 className="text-4xl font-bold mb-2">40+</h4>
          <p className="text-slate-300">
            Laboratory Products
          </p>
        </div>

        <div>
          <h4 className="text-4xl font-bold mb-2">100%</h4>
          <p className="text-slate-300">
            Quality Focused
          </p>
        </div>

        <div>
          <h4 className="text-4xl font-bold mb-2">24/7</h4>
          <p className="text-slate-300">
            Customer Support
          </p>
        </div>

        <div>
          <h4 className="text-4xl font-bold mb-2">India</h4>
          <p className="text-slate-300">
            Nationwide Service
          </p>
        </div>

      </div>
    </div>

  </div>
</section>
<section className="bg-slate-50 py-20">

  <div className="max-w-7xl mx-auto px-6">

    <div className="flex justify-between items-center mb-10">

      <h2 className="text-3xl font-bold">
        Latest Articles
      </h2>

      <Link
        href="/blog"
        className="text-blue-600 hover:underline"
      >
        View All →
      </Link>

    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {latestBlogs.map((blog) => (

        <Link
          key={blog.id}
          href={`/blog/${blog.slug}`}
          className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition"
        >

          {blog.coverImage && (

            <div className="relative h-56">

              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
              />

            </div>

          )}

          <div className="p-6">

            <h3 className="text-xl font-bold mb-3">
              {blog.title}
            </h3>

            <p className="text-slate-600 line-clamp-3">
              {blog.excerpt}
            </p>

          </div>

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
