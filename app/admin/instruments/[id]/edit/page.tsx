"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Block = {
  id: string;
  title: string;
  items: string;
  image: string;
};

export default function EditInstrumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    (async () => {
      const { id } = await params;
      setId(id);

      const res = await fetch(`/api/admin/instruments/${id}`, {
        credentials: "include",
      });
      const data = await res.json();

      setName(data.name || "");
      setDescription(data.description || "");
      setImages(Array.isArray(data.images) ? data.images : []);

      if (Array.isArray(data.contentBlocks) && data.contentBlocks.length) {
        setBlocks(
          data.contentBlocks.map((b: any) => ({
            id: b.id,
            title: b.title,
            items: (b.items || []).join("\n"),
            image: b.image || "",
          }))
        );
      } else {
        setBlocks([
          {
            id: "applications",
            title: data.applicationsTitle || "Applications",
            items: (data.applications || []).join("\n"),
            image: "",
          },
          {
            id: "features",
            title: data.featuresTitle || "Features",
            items: (data.features || []).join("\n"),
            image: "",
          },
        ]);
      }
    })();
  }, [params]);

  async function uploadMainImage(file: File) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      credentials: "include",
      body: fd,
    });

    const data = await res.json();
    setImages((prev) => [data.url, ...prev.slice(1)]);
  }

  async function uploadBlockImage(file: File, index: number) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      credentials: "include",
      body: fd,
    });

    const data = await res.json();

    const copy = [...blocks];
    copy[index].image = data.url;
    setBlocks(copy);
  }

  function addBlock() {
    setBlocks((b) => [
      ...b,
      {
        id: crypto.randomUUID(),
        title: "",
        items: "",
        image: "",
      },
    ]);
  }

  async function save() {
    await fetch(`/api/admin/instruments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name,
        description,
        images,
        contentBlocks: blocks.map((b) => ({
          id: b.id,
          title: b.title,
          image: b.image || "",
          items: b.items
            .split("\n")
            .map((v) => v.trim())
            .filter(Boolean),
        })),
      }),
    });

    alert("Instrument saved");
    router.refresh();
  }

  return (
    <section className="max-w-5xl mx-auto p-8 space-y-16 bg-slate-100">
      <h1 className="text-3xl font-extrabold text-slate-900 border-b pb-4">
        Edit Instrument
      </h1>

      {/* BASIC DETAILS */}
      <div className="bg-white border border-slate-300 rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-slate-900 font-semibold mb-1">
            Instrument Name
          </label>
          <input
            className="border border-slate-400 p-3 w-full text-slate-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-slate-900 font-semibold mb-1">
            Description
          </label>
          <textarea
            className="border border-slate-400 p-3 w-full text-slate-900"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      {/* INSTRUMENT IMAGE */}
      <div className="bg-white border border-slate-300 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Instrument Image
        </h2>

        <input
          type="file"
          accept="image/*"
          className="text-slate-900 font-medium"
          onChange={(e) =>
            e.target.files && uploadMainImage(e.target.files[0])
          }
        />

        {images[0] && (
          <img
            src={images[0]}
            alt="Instrument"
            className="w-64 h-64 object-contain border border-slate-400 rounded"
          />
        )}
      </div>

      {/* CONTENT BLOCKS */}
      <div className="bg-white border border-slate-300 rounded-lg p-6 space-y-8">
        <h2 className="text-xl font-bold text-slate-900">
          Content Blocks
        </h2>

        {blocks.map((block, i) => (
          <div
            key={block.id}
            className="border border-slate-400 rounded-lg p-5 space-y-4 bg-slate-50"
          >
            <div>
              <label className="block text-slate-900 font-semibold mb-1">
                Block Heading
              </label>
              <input
                className="border border-slate-400 p-2 w-full text-slate-900"
                value={block.title}
                onChange={(e) => {
                  const copy = [...blocks];
                  copy[i].title = e.target.value;
                  setBlocks(copy);
                }}
              />
            </div>

            <div>
              <label className="block text-slate-900 font-semibold mb-1">
                Block Content
              </label>
              <textarea
                className="border border-slate-400 p-2 w-full text-slate-900"
                rows={5}
                value={block.items}
                onChange={(e) => {
                  const copy = [...blocks];
                  copy[i].items = e.target.value;
                  setBlocks(copy);
                }}
              />
            </div>

            <div>
              <label className="block text-slate-900 font-semibold mb-1">
                Block Image (Right Side)
              </label>
              <input
                type="file"
                accept="image/*"
                className="text-slate-900 font-medium"
                onChange={(e) =>
                  e.target.files &&
                  uploadBlockImage(e.target.files[0], i)
                }
              />
              {block.image && (
                <img
                  src={block.image}
                  className="mt-3 w-40 h-40 object-contain border border-slate-400 rounded"
                />
              )}
            </div>
          </div>
        ))}

        <button
          onClick={addBlock}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-lg font-semibold shadow-md"
        >
          + Add Content Block
        </button>
      </div>

      <button
        onClick={save}
        className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg"
      >
        Save Instrument
      </button>
    </section>
  );
}
