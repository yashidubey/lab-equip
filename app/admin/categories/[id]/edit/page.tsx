"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const category = data.find(
          (c: any) => c._id === id
        );
        if (category) setName(category.name);
      });
  }, [id]);

  async function save() {
    setError("");

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Update failed");
      return;
    }

    router.push("/admin/categories");
  }

  return (
    <section className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">
        Edit Category
      </h1>

      {error && (
        <p className="text-red-700 bg-red-100 p-3 rounded">
          {error}
        </p>
      )}

      <div>
        <label className="block font-semibold text-slate-900 mb-1">
          Category Name
        </label>
        <input
          className="border border-slate-400 p-3 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button
        onClick={save}
        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded font-semibold"
      >
        Update Category
      </button>
    </section>
  );
}  