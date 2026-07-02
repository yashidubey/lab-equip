"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function NewProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    description: "",
    category: "", // ⬅️ EMPTY = NO CATEGORY
    showInNavbar: false,
    images: [] as string[],
    contentBlocks: [] as ContentBlock[],
  });

  // LOAD CATEGORIES
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []));
  }, []);

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

  function updateBlock(
    index: number,
    key: keyof ContentBlock,
    value: string
  ) {
    const blocks = [...form.contentBlocks];
    blocks[index] = { ...blocks[index], [key]: value };
    setForm({ ...form, contentBlocks: blocks });
  }

  function removeBlock(index: number) {
    const blocks = [...form.contentBlocks];
    blocks.splice(index, 1);
    setForm({ ...form, contentBlocks: blocks });
  }

  async function submit() {
    setError("");

    const payload = {
      ...form,
      category: form.category || null,
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

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create product");
      return;
    }

    router.push("/admin/products");
  }

  return (
    <section className="max-w-5xl mx-auto p-8 space-y-12 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900">
        Add Product
      </h1>

      {error && (
        <p className="text-red-700 bg-red-100 p-3 rounded border border-red-300">
          {error}
        </p>
      )}

      {/* ================= BASIC DETAILS ================= */}
      <div className="bg-white border border-slate-300 rounded-lg p-6 space-y-6">
        <div>
          <label className="block font-semibold text-slate-900 mb-1">
            Product Name
          </label>
          <input
            className="border border-slate-400 p-3 w-full text-slate-900 bg-white"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* CATEGORY (OPTIONAL) */}
        <div>
          <label className="block font-semibold text-slate-900 mb-1">
            Category (Optional)
          </label>
          <select
            className="border border-slate-400 p-3 w-full bg-white text-slate-900"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="">
              — No Category (Show only in Products) —
            </option>

            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ SHOW IN NAVBAR */}
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
            className="border border-slate-400 p-3 w-full text-slate-900 bg-white"
            value={form.shortDescription}
            onChange={(e) =>
              setForm({ ...form, shortDescription: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-900 mb-1">
            Description
          </label>
          <textarea
            className="border border-slate-400 p-3 w-full text-slate-900 bg-white"
            rows={5}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>
      </div>

      {/* ================= PRIMARY IMAGE ================= */}
      <div className="bg-white border border-slate-300 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Product Image
        </h2>

        <ImageUploader
          onUpload={(url) =>
            setForm({
              ...form,
              images: [url],
            })
          }
        />

        {form.images[0] && (
          <img
            src={form.images[0]}
            className="w-64 h-64 object-contain border border-slate-400 rounded bg-white"
          />
        )}
      </div>

      {/* ================= CONTENT BLOCKS ================= */}
      <div className="bg-white border border-slate-300 rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">
            Content Blocks
          </h2>

          <button
            onClick={addBlock}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
          >
            + Add Block
          </button>
        </div>

        {form.contentBlocks.map((block, i) => (
          <div
            key={block.id}
            className="border border-slate-300 rounded-lg p-4 space-y-4 bg-slate-50"
          >
            <input
              className="border border-slate-400 p-3 w-full text-slate-900 bg-white"
              placeholder="Block Heading"
              value={block.title}
              onChange={(e) =>
                updateBlock(i, "title", e.target.value)
              }
            />

            <textarea
              className="border border-slate-400 p-3 w-full text-slate-900 bg-white"
              rows={4}
              placeholder="One point per line"
              value={block.items}
              onChange={(e) =>
                updateBlock(i, "items", e.target.value)
              }
            />

            <ImageUploader
              onUpload={(url) =>
                updateBlock(i, "image", url)
              }
            />

            {block.image && (
              <img
                src={block.image}
                className="w-48 h-48 object-contain border rounded bg-white"
              />
            )}

            <button
              onClick={() => removeBlock(i)}
              className="text-red-600 font-semibold"
            >
              Remove Block
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={submit}
        className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg"
      >
        Save Product
      </button>
    </section>
  );
}