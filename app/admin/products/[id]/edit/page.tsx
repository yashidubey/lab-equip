"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";

type Category = {
  _id: string;
  name: string;
};

type ContentBlock = {
  id: string;
  title: string;
  items: string;
  image: string;
};

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    description: "",
    category: "",
    showInNavbar: false,
    images: [] as string[],
    contentBlocks: [] as ContentBlock[],
  });

  // LOAD CATEGORIES
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) =>
        setCategories(Array.isArray(data) ? data : [])
      );
  }, []);

  // LOAD PRODUCT
  useEffect(() => {
    fetch(`/api/products/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          shortDescription: data.shortDescription || "",
          description: data.description || "",
          category: data.category || "",
          showInNavbar: data.showInNavbar ?? false,
          images: Array.isArray(data.images) ? data.images : [],
          contentBlocks: Array.isArray(data.contentBlocks)
            ? data.contentBlocks.map((b: any) => ({
                id: b.id,
                title: b.title || "",
                items: Array.isArray(b.items)
                  ? b.items.join("\n")
                  : "",
                image: b.image || "",
              }))
            : [],
        });
      });
  }, [id]);

  // BLOCK HANDLERS
  function addBlock() {
    setForm({
      ...form,
      contentBlocks: [
        ...form.contentBlocks,
        {
          id: crypto.randomUUID(),
          title: "",
          items: "",
          image: "",
        },
      ],
    });
  }

  function updateBlock(index: number, patch: Partial<ContentBlock>) {
    const updated = [...form.contentBlocks];
    updated[index] = { ...updated[index], ...patch };
    setForm({ ...form, contentBlocks: updated });
  }

  function removeBlock(index: number) {
    const updated = [...form.contentBlocks];
    updated.splice(index, 1);
    setForm({ ...form, contentBlocks: updated });
  }

  async function save() {
    setError("");

    const payload = {
      ...form,
      images: form.images.filter(Boolean),
      contentBlocks: form.contentBlocks.map((b) => ({
        id: b.id,
        title: b.title,
        items: b.items
          .split("\n")
          .map((i) => i.trim())
          .filter(Boolean),
        image: b.image,
      })),
    };

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError("Update failed");
      return;
    }

    router.push("/admin/products");
  }

  return (
    <section className="max-w-6xl mx-auto p-8 space-y-16 bg-slate-100">
      <h1 className="text-3xl font-extrabold text-slate-900 border-b border-slate-300 pb-4">
        Edit Product
      </h1>

      {error && (
        <p className="text-red-700 bg-red-100 border border-red-300 p-3 rounded">
          {error}
        </p>
      )}

      {/* BASIC DETAILS */}
      <div className="bg-white border border-slate-300 rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          Basic Details
        </h2>

        <div>
          <label className="block font-semibold text-slate-900 mb-1">
            Product Name
          </label>
          <input
            className="border border-slate-500 p-3 w-full text-slate-900 placeholder-slate-500"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-900 mb-1">
            Category
          </label>
          <select
            className="border border-slate-500 p-3 w-full bg-white text-slate-900"
            value={form.category || ""}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-3 font-semibold text-slate-900">
            <input
              type="checkbox"
              checked={form.showInNavbar}
              onChange={(e) =>
                setForm({
                  ...form,
                  showInNavbar: e.target.checked,
                })
              }
              className="w-5 h-5"
            />
            Show this product in the navbar dropdown
          </label>
        </div>

        <div>
          <label className="block font-semibold text-slate-900 mb-1">
            Short Description
          </label>
          <input
            className="border border-slate-500 p-3 w-full text-slate-900 placeholder-slate-500"
            value={form.shortDescription}
            onChange={(e) =>
              setForm({
                ...form,
                shortDescription: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-900 mb-1">
            Description
          </label>
          <textarea
            className="border border-slate-500 p-3 w-full text-slate-900 placeholder-slate-500"
            rows={5}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* PRODUCT IMAGE */}
      <div className="bg-white border border-slate-300 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Product Image
        </h2>

        <ImageUploader
          onUpload={(url) =>
            setForm({
              ...form,
              images: [url, ...form.images.slice(1)],
            })
          }
        />

        {form.images[0] && (
          <img
            src={form.images[0]}
            className="w-64 h-64 object-contain border border-slate-400 rounded"
          />
        )}
      </div>

      {/* CONTENT BLOCKS */}
      <div className="bg-white border border-slate-300 rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">
            Content Blocks
          </h2>

          <button
            onClick={addBlock}
            className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded font-bold"
          >
            + Add Block
          </button>
        </div>

        {form.contentBlocks.map((block, index) => (
          <div
            key={block.id}
            className="border border-slate-400 rounded-lg p-4 space-y-4"
          >
            <input
              className="border border-slate-500 p-3 w-full text-slate-900 placeholder-slate-500"
              placeholder="Block Heading"
              value={block.title}
              onChange={(e) =>
                updateBlock(index, { title: e.target.value })
              }
            />

            <textarea
              className="border border-slate-500 p-3 w-full text-slate-900 placeholder-slate-500"
              rows={4}
              placeholder="Block content (one per line)"
              value={block.items}
              onChange={(e) =>
                updateBlock(index, { items: e.target.value })
              }
            />

            <ImageUploader
              onUpload={(url) =>
                updateBlock(index, { image: url })
              }
            />

            {block.image && (
              <img
                src={block.image}
                className="w-48 h-48 object-contain border border-slate-400 rounded"
              />
            )}

            <button
              onClick={() => removeBlock(index)}
              className="text-red-700 font-semibold"
            >
              Remove Block
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={save}
        className="bg-teal-800 hover:bg-teal-900 text-white px-10 py-4 rounded-lg font-extrabold text-lg shadow-lg"
      >
        Save Product
      </button>
    </section>
  );
}