import { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import Product from "@/src/models/Product";
import Category from "@/src/models/category";
import Blog from "@/src/models/Blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.labzen.in";

  await connectDB();

  const products = await Product.find(
    { isActive: true },
    { slug: 1 }
  ).lean();

  const categories = await Category.find(
    {},
    { slug: 1 }
  ).lean();

  const blogs = await Blog.find(
    { isPublished: true },
    { slug: 1, updatedAt: 1 }
  ).lean();

  const productUrls = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((category: any) => ({
    url: `${baseUrl}/products/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogUrls = blogs.map((blog: any) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },

    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },

    ...categoryUrls,
    ...productUrls,
    ...blogUrls,
  ];
}