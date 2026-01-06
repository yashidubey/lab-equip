"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProducts() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/products", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }

      fetchProducts();
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="max-w-6xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Products
        </h1>

        <Link
          href="/admin/products/new"
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-medium"
        >
          + Add Product
        </Link>
      </div>

      {loading && (
        <p className="text-slate-600">Loading products…</p>
      )}

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      {!loading && products.length === 0 && (
        <p className="text-slate-600">No products found.</p>
      )}

      {!loading && products.length > 0 && (
        <table className="w-full border border-slate-300 bg-white">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left text-slate-900 font-semibold">
                Name
              </th>
              <th className="p-3 text-center text-slate-900 font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="p-3 text-slate-800 font-medium">
                  {p.name}
                </td>

                <td className="p-3 text-center space-x-6">
                  <Link
                    href={`/admin/products/${p._id}/edit`}
                    className="text-blue-700 hover:underline font-medium"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-red-700 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
