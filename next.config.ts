import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** ================= ENV ================= */
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
  },

  /** ================= IMAGES ================= */
  images: {
    /**
     * ❌ domains is legacy
     * ✅ remotePatterns is REQUIRED & reliable in Next 14
     * (Keeping BOTH causes no harm, but remotePatterns is what actually works)
     */

    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  /** ================= SECURITY HEADERS ================= */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
