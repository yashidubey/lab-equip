import { connectDB } from "@/lib/db";
import Blog from "@/src/models/Blog";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function getBlog(slug: string) {
  await connectDB();

  const blog = await Blog.findOne({
    slug,
    isPublished: true,
  }).lean();

  return blog;
}

async function getRelatedBlogs(
  category: string,
  slug: string
) {
  await connectDB();

  const blogs = await Blog.find({
    category,
    slug: { $ne: slug },
    isPublished: true,
  })
    .limit(3)
    .sort({ createdAt: -1 })
    .lean();

  return blogs;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const blog: any = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.seoTitle || blog.title,

    description:
      blog.seoDescription || blog.excerpt,

    keywords: blog.keywords,

    alternates: {
      canonical: `https://www.labzen.in/blog/${blog.slug}`,
    },

    openGraph: {
      title: blog.seoTitle || blog.title,
      description:
        blog.seoDescription || blog.excerpt,
      images: [blog.coverImage],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.seoTitle || blog.title,
      description:
        blog.seoDescription || blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

export default async function BlogDetails({
  params,
}: Props) {
  const { slug } = await params;

  const blog: any = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const related: any[] = await getRelatedBlogs(
    blog.category,
    blog.slug
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage,
    author: {
      "@type": "Organization",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Labzen",
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <article className="max-w-5xl mx-auto px-6 py-14">

        <Link
          href="/blog"
          className="text-blue-600 hover:underline"
        >
          ← Back to Blog
        </Link>

        <h1 className="text-5xl font-bold mt-6 mb-5">
          {blog.title}
        </h1>

        <div className="flex gap-6 text-slate-500 mb-8">

          <span>{blog.author}</span>

          <span>{blog.category}</span>

          <span>
            {new Date(
              blog.createdAt
            ).toLocaleDateString()}
          </span>

        </div>

        {blog.coverImage && (
          <div className="relative h-[500px] rounded-xl overflow-hidden mb-10">

            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
            />

          </div>
        )}

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />

        {related.length > 0 && (
          <section className="mt-24">

            <h2 className="text-3xl font-bold mb-8">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {related.map((item: any) => (

                <Link
                  key={item._id.toString()}
                  href={`/blog/${item.slug}`}
                  className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white"
                >

                  {item.coverImage && (
                    <div className="relative h-56">

                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />

                    </div>
                  )}

                  <div className="p-5">

                    <h3 className="font-bold text-lg mb-2">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 line-clamp-3">
                      {item.excerpt}
                    </p>

                  </div>

                </Link>

              ))}

            </div>

          </section>
        )}

      </article>
    </>
  );
}