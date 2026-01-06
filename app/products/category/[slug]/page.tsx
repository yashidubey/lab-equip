import Link from "next/link";
import { connectDB } from "@/lib/db";
import Product from "@/src/models/Product";
import Category from "@/src/models/category";
import { Types } from "mongoose";

type ProductDB = {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  shortDescription: string;
  images?: string[];
};

async function getCategoryAndProducts(slug: string) {
  await connectDB();

  const category = await Category.findOne({ slug }).lean();

  if (!category) {
    return { category: null, products: [] };
  }

  const products = (await Product.find(
    {
      isActive: true,
      category: category._id,
    },
    {
      name: 1,
      slug: 1,
      shortDescription: 1,
      images: 1,
    }
  )
    .sort({ createdAt: -1 })
    .lean()) as ProductDB[];

  const formatted = products.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    shortDescription: p.shortDescription,
    image:
      Array.isArray(p.images) && typeof p.images[0] === "string"
        ? p.images[0]
        : null,
  }));

  return { category, products: formatted };
}

export default async function CategoryProductsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { category, products } = await getCategoryAndProducts(slug);

  if (!category) {
    return (
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 bg-white mt-6 md:mt-12 text-center">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
          Category not found
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          The category you are looking for does not exist.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 bg-white mt-6 md:mt-12">
      {/* PAGE HEADER */}
      <div className="mb-6 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 text-center md:text-left">
          {category.name}
        </h1>

        {category.description && (
          <p className="text-xs md:text-base text-gray-600 max-w-full md:max-w-3xl text-center md:text-left">
            {category.description}
          </p>
        )}
      </div>

      {/* CATEGORY IMAGE */}
      {category.image && (
        <div className="mb-8 md:mb-12 w-full h-40 sm:h-52 md:h-64 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>
      )}

      {/* EMPTY STATE */}
      {products.length === 0 && (
        <p className="text-xs md:text-base text-gray-600 text-center md:text-left">
          No products available in this category.
        </p>
      )}

      {/* PRODUCT LIST */}
      {products.length > 0 && (
        <div className="border-t border-gray-200 divide-y divide-gray-200">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="block hover:bg-gray-50 transition"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-4 md:py-8 items-center md:items-start">
                {/* IMAGE */}
                <div className="w-full md:w-48 flex-shrink-0 flex justify-center md:justify-start">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-32 sm:w-40 md:w-48 h-auto sm:h-32 md:h-36 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-xs md:text-sm text-gray-400 text-center md:text-left">
                      Image not available
                    </div>
                  )}
                </div>

                {/* TEXT */}
                <div className="w-full">
                  <h2 className="text-sm sm:text-base md:text-xl font-semibold text-gray-900 mb-1 text-center md:text-left">
                    {p.name}
                  </h2>

                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 max-w-full md:max-w-3xl text-center md:text-left">
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
      )}
    </section>
  );
}
