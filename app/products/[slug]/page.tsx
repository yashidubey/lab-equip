
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import ProductDetailLayout from "@/components/ProductDetailLayout";
import Product from "@/src/models/Product";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  await connectDB();

  const product: any = await Product.findOne({
    slug,
    isActive: true,
  }).lean();

  if (!product) {
    return {
      title: "Product Not Found | Labzen",
      description: "The requested product could not be found.",
    };
  }

  const image =
    Array.isArray(product.images) &&
    typeof product.images[0] === "string"
      ? product.images[0]
      : undefined;

  const title = `${product.name} Supplier in India | Labzen`;

  const description =
    product.shortDescription?.trim() ||
    `Explore ${product.name} from Labzen, a trusted supplier of laboratory equipment and scientific instruments in India.`;

  return {
    title,
    description,

    keywords: [
      product.name,
      "laboratory equipment supplier india",
      "scientific instruments supplier",
      "laboratory instruments",
      "research laboratory equipment",
      "labzen",
    ],

    alternates: {
      canonical: `https://www.labzen.in/products/${product.slug}`,
    },

    openGraph: {
      title,
      description,
      url: `https://www.labzen.in/products/${product.slug}`,
      siteName: "Labzen",
      type: "website",
      images: image ? [{ url: image }] : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

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

  const image =
    Array.isArray(product.images) &&
    typeof product.images[0] === "string"
      ? product.images[0]
      : null;

  const safeBlocks = Array.isArray(product.contentBlocks)
    ? JSON.parse(JSON.stringify(product.contentBlocks))
    : [];

  const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",

  name: product.name,

  description:
    product.shortDescription || product.description || "",

  image: image ? [image] : [],

  brand: {
    "@type": "Brand",
    name: "Labzen",
  },

  url: `https://www.labzen.in/products/${product.slug}`,

  offers: {
    "@type": "Offer",
    url: `https://www.labzen.in/products/${product.slug}`,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "Labzen",
    },
  },
};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <ProductDetailLayout
        name={product.name}
        shortDescription={product.shortDescription}
        description={product.description}
        image={image}
        blocks={safeBlocks}
      />
    </>
  );
}

