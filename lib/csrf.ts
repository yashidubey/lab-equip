import crypto from "crypto";

export function generateCSRFToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function validateCSRF(
  cookieToken?: string,
  headerToken?: string
) {
  if (!cookieToken || !headerToken) return false;
  return cookieToken === headerToken;
}
