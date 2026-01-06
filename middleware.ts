import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const adminCookie = req.cookies.get("admin-auth");
  const isAdminLoggedIn = !!adminCookie;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminLoginApi = pathname === "/api/admin/login";
  const isAdminLoginPage = pathname === "/admin/login";

  const isProductApi = pathname.startsWith("/api/products");
  const isCategoryApi = pathname.startsWith("/api/categories");

  const isWriteOperation =
    req.method === "POST" ||
    req.method === "PUT" ||
    req.method === "DELETE";

  if (isAdminLoginPage || isAdminLoginApi) {
    return NextResponse.next();
  }

  if (isAdminPage && !isAdminLoggedIn) {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }

  if (isAdminApi && !isAdminLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    (isProductApi || isCategoryApi) &&
    isWriteOperation &&
    !isAdminLoggedIn
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/products/:path*",
    "/api/categories/:path*",
  ],
};
