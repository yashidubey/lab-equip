import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Product from "@/src/models/Product";
import { Types } from "mongoose";

type ProductDB = {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  shortDescription: string;
  images?: string[];
};

async function getProducts() {
  await connectDB();

  const products = (await Product.find(
    { isActive: true },
    {
      name: 1,
      slug: 1,
      shortDescription: 1,
      images: 1,
    }
  )
    .sort({ createdAt: -1 })
    .lean()) as ProductDB[];

  return products.map((p) => ({
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

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 bg-white mt-6 md:mt-12">
      {/* HEADER */}
      <div className="mb-6 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
          Our Products
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-full md:max-w-3xl">
          Explore our range of laboratory instruments and equipment designed
          for research, testing, and industrial applications.
        </p>
      </div>

      {/* LIST */}
      <div className="border-t border-gray-200 divide-y divide-gray-200">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.slug}`}
            className="block hover:bg-gray-50 transition"
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 md:py-8 items-start">
              {/* IMAGE */}
              <div className="w-full md:w-48 flex-shrink-0">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={192}
                    height={140}
                    className="object-contain w-full max-w-[192px] md:max-w-none h-auto mx-auto md:mx-0"
                  />
                ) : (
                  <div className="text-xs md:text-sm text-gray-400 text-center md:text-left">
                    Image not available
                  </div>
                )}
              </div>

              {/* TEXT */}
              <div className="w-full">
                <h2 className="text-base md:text-xl font-semibold text-gray-900 mb-1 text-center md:text-left">
                  {p.name}
                </h2>

                <p className="text-xs md:text-base text-gray-600 mb-2 max-w-full md:max-w-3xl text-center md:text-left">
                  {p.shortDescription}
                </p>

                <span className="text-blue-600 text-xs md:text-sm font-medium block text-center md:text-left">
                  View Details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
