"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Blog = {
  _id: string;
  title: string;
  category: string;
  author: string;
  isPublished: boolean;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchBlogs() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/blogs", {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch blogs.");
      }

      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteBlog(id: string) {
    if (!confirm("Delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed.");
      }

      fetchBlogs();
    } catch (err: any) {
      alert(err.message || "Delete failed.");
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-white">
          Blogs
        </h1>

        <Link
          href="/admin/blogs/new"
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-lg font-semibold transition"
        >
          + Add Blog
        </Link>

      </div>

      {loading && (
        <p className="text-white text-lg">
          Loading blogs...
        </p>
      )}

      {error && (
        <div className="bg-red-900/40 border border-red-500 text-red-200 rounded-lg p-4">
          {error}
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <div className="bg-[#111111] border border-slate-700 rounded-xl p-10 text-center text-white text-lg">
          No blogs found.
        </div>
      )}

      {!loading && blogs.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-700 shadow-lg">

          <table className="w-full bg-white">

            <thead className="bg-slate-900 text-white">

              <tr>
                <th className="text-left p-4 font-semibold">
                  Title
                </th>

                <th className="text-left p-4 font-semibold">
                  Category
                </th>

                <th className="text-left p-4 font-semibold">
                  Author
                </th>

                <th className="text-center p-4 font-semibold">
                  Status
                </th>

                <th className="text-center p-4 font-semibold">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >

                  <td className="p-4 text-black font-semibold">
                    {blog.title}
                  </td>

                  <td className="p-4 text-black font-medium">
                    {blog.category}
                  </td>

                  <td className="p-4 text-black font-medium">
                    {blog.author}
                  </td>

                  <td className="p-4 text-center">
                    {blog.isPublished ? (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                        Published
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                        Draft
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-center">

                    <div className="flex justify-center gap-5">

                      <Link
                        href={`/admin/blogs/${blog._id}/edit`}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </section>
  );
}