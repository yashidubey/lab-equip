
import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Product from "@/src/models/Product";
import Category from "@/src/models/category";

type ProductUI = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image: string | null;
};

async function getCategoryAndProducts(rawSlug: string) {
  await connectDB();

  const slug = decodeURIComponent(rawSlug);

  const category = await Category.findOne({ slug }).lean();

  if (!category || Array.isArray(category)) {
    return { category: null, products: [] as ProductUI[] };
  }

  const rawProducts = await Product.find(
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
    .lean();

  const products: ProductUI[] = rawProducts.map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    shortDescription: p.shortDescription ?? "",
    image:
      Array.isArray(p.images) && typeof p.images[0] === "string"
        ? p.images[0]
        : null,
  }));

  return { category, products };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  await connectDB();

  const category: any = await Category.findOne({
    slug: decodeURIComponent(slug),
  }).lean();

  if (!category) {
    return {
      title: "Category Not Found | Labzen",
    };
  }

  const title = `${category.name} Supplier in India | Labzen`;

  const description =
    category.description?.trim() ||
    `Explore ${category.name} products from Labzen, a trusted supplier of laboratory equipment and scientific instruments in India.`;

  return {
    title,
    description,

    keywords: [
      category.name,
      `${category.name} supplier india`,
      "laboratory equipment supplier india",
      "scientific instruments supplier",
      "laboratory instruments",
      "research laboratory equipment",
      "labzen",
    ],

    alternates: {
      canonical: `https://www.labzen.in/products/category/${category.slug}`,
    },

    openGraph: {
      title,
      description,
      url: `https://www.labzen.in/products/category/${category.slug}`,
      siteName: "Labzen",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
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
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Category not found
        </h1>
        <p className="text-gray-600">
          The category you are looking for does not exist.
        </p>
      </section>
    );
  }

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description:
      category.description ||
      `${category.name} products supplied by Labzen.`,
    url: `https://www.labzen.in/products/category/${category.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categorySchema),
        }}
      />

      <section className="max-w-7xl mx-auto px-4 py-10 bg-white mt-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {category.name}
          </h1>

          <p className="text-gray-600 max-w-3xl">
            {category.description ||
              `${category.name} products supplied by Labzen for research laboratories, educational institutions, healthcare facilities and industrial applications.`}
          </p>
        </div>

        {category.image && (
          <div className="mb-12 h-64 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
        )}

        {products.length === 0 && (
          <p className="text-gray-600">
            No products available in this category.
          </p>
        )}

        {products.length > 0 && (
          <div className="border-t divide-y">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="block py-8 hover:bg-gray-50 transition"
              >
                <div className="flex gap-8">
                  <div className="w-48">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-48 h-36 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-sm text-gray-400">
                        Image not available
                      </div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-1">
                      {p.name}
                    </h2>

                    <p className="text-gray-600 mb-2">
                      {p.shortDescription}
                    </p>

                    <span className="text-blue-600 text-sm font-medium">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

