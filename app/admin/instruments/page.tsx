"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCSRFToken } from "@/lib/getCSRF";
import Link from "next/link";

type Instrument = {
  id: string;
  name: string;
  slug: string;
  isActive?: boolean;
};

export default function AdminInstrumentsPage() {
  const router = useRouter();
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [error, setError] = useState("");

  // Load instruments
  useEffect(() => {
    fetch("/api/admin/instruments", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInstruments(
            data.map((i: any) => ({
              id: i._id.toString(),
              name: i.name,
              slug: i.slug,
              isActive: i.isActive,
            }))
          );
        } else {
          setError(data.error || "Failed to load instruments");
        }
      })
      .catch(() =>
        setError("Failed to load instruments")
      );
  }, []);

  // ========================
  // DELETE LOGIC – FIXED
  // ========================
  async function handleDelete(id: string) {
    try {
      const res = await fetch(
        `/api/admin/instruments/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "x-csrf-token": getCSRFToken(),
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data.error || "Delete failed"
        );
      }

      // Update UI after successful deletion
      setInstruments(
        instruments.filter(
          (inst) => inst.id !== id
        )
      );

      alert("Instrument deleted successfully");

      router.refresh();
    } catch (err: any) {
      alert(
        err.message || "Failed to delete instrument"
      );
    }
  }
  // ← END FIXED DELETE PART

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-white mt-10 rounded-xl border shadow-sm text-black">
      <div className="flex justify-between items-center mb-8 border-b pb-3">
        <h1 className="text-3xl font-bold text-slate-900">
          Manage Instruments
        </h1>

        <Link
          href="/admin/instruments/new"
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
        >
          Add New Instrument
        </Link>
      </div>

      {error && (
        <p className="mb-6 text-red-700 bg-red-100 p-3 rounded-md text-sm">
          {error}
        </p>
      )}

      <div className="space-y-4">
        {instruments.length === 0 && (
          <p className="text-slate-600 text-center py-10">
            No instruments available
          </p>
        )}

        {instruments.map((inst) => (
          <div
            key={inst.id}
            className="flex justify-between items-center p-4 border rounded-lg bg-slate-50 hover:bg-slate-100 transition"
          >
            <div>
              <h2 className="font-semibold text-lg text-slate-900">
                {inst.name}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Slug: {inst.slug}
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/admin/instruments/${inst.id}/edit`}
                className="text-teal-700 hover:underline text-sm font-medium"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={() =>
                  handleDelete(inst.id)
                }
                className="text-red-700 hover:underline text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
