"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  async function fetchCategories() {
    const res = await fetch("/api/categories", {
      credentials: "include",
      cache: "no-store",
    });
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : []);
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category?")) return;

    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    fetchCategories();
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Categories
        </h1>

        <Link
          href="/admin/categories/new"
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-semibold"
        >
          + Add Category
        </Link>
      </div>

      <table className="w-full border border-slate-300 bg-white">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left text-slate-900">Name</th>
            <th className="p-3 text-left text-slate-900">Slug</th>
            <th className="p-3 text-center text-slate-900">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr
              key={c._id}
              className="border-t border-slate-200"
            >
              <td className="p-3 text-slate-800 font-medium">
                {c.name}
              </td>
              <td className="p-3 text-slate-600">
                {c.slug}
              </td>
              <td className="p-3 text-center space-x-4">
                <Link
                  href={`/admin/categories/${c._id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteCategory(c._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
