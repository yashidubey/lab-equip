// lib/adminConfig.ts
import bcrypt from "bcryptjs";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_SECRET = process.env.ADMIN_SECRET;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_SECRET) {
  throw new Error("Missing admin environment variables");
}

// 🔐 Hash once per server start
export const ADMIN_PASSWORD_HASH = bcrypt.hashSync(
  ADMIN_PASSWORD,
  12
);
