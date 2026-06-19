
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24 text-center">
      <h1 className="text-6xl font-bold text-slate-900 mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold text-slate-800 mb-4">
        Page Not Found
      </h2>

      <p className="text-slate-600 mb-8">
        The page you are looking for does not exist or may have been moved.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </Link>

        <Link
          href="/products"
          className="border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-50 transition"
        >
          Browse Products
        </Link>
      </div>
    </section>
  );
}

