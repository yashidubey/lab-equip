import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import ClientHeader from "@/components/ClientHeader";

/* ✅ SEO + GOOGLE SEARCH CONSOLE VERIFICATION */
export const metadata: Metadata = {
  title: {
    default: "LabEquip Solutions | Laboratory Equipment Supplier",
    template: "%s | LabEquip Solutions",
  },
  description:
    "LabEquip Solutions provides high-quality laboratory instruments and scientific equipment for research, education, and industrial applications.",
  verification: {
    google: "XH-5ojTVbJWOcyjdUITdHBcRZ9V77rtOxlrr7FgoDAk",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        {/* HEADER (CLIENT COMPONENT) */}
        <ClientHeader />

        {/* PAGE CONTENT */}
        <main className="min-h-screen">{children}</main>

        {/* FOOTER */}
        <footer className="bg-slate-900 text-slate-300 mt-24">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-3">
                LabEquip Solutions
              </h4>
              <p className="leading-relaxed">
                Independent distributor of laboratory equipment and scientific
                instruments for research, education, and industry.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">
                Products
              </h4>
              <ul className="space-y-1">
                <li>Analytical Instruments</li>
                <li>Measuring Equipment</li>
                <li>Lab Accessories</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">
                Quick Links
              </h4>
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">
                Contact
              </h4>
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                <span>Email: laboteckld@gmail.com</span>
                <span>Contact: +91-9910891848</span>
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 text-center py-4 text-xs">
            © {new Date().getFullYear()} LabEquip Solutions. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
