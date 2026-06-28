import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Blog from "@/src/models/Blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laboratory Blog | Labzen",
  description:
    "Read the latest laboratory equipment guides, scientific instrument articles, buying guides and research insights from Labzen.",
  alternates: {
    canonical: "https://www.labzen.in/blog",
  },
};

async function getBlogs() {
  await connectDB();

  const blogs = await Blog.find({
    isPublished: true,
  })
    .sort({ createdAt: -1 })
    .lean();

  return blogs.map((blog: any) => ({
    id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    image: blog.coverImage,
    category: blog.category,
    author: blog.author,
    createdAt: blog.createdAt,
  }));
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="mb-12 text-center">

        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Labzen Blog
        </h1>

        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Laboratory equipment guides, scientific instrument
          articles, buying guides and industry insights.
        </p>

      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            No blogs published yet.
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">

          {blogs.map((blog) => (

            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition"
            >

              <div className="relative h-60">

                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full bg-slate-200 flex items-center justify-center">
                    No Image
                  </div>
                )}

              </div>

              <div className="p-6">

                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                  {blog.category}
                </span>

                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {blog.title}
                </h2>

                <p className="text-slate-600 mb-5 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex justify-between text-sm text-slate-500">

                  <span>{blog.author}</span>

                  <span>
                    {new Date(blog.createdAt).toLocaleDateString()}
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