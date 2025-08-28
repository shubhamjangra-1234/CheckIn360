import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value;

  // If user is logged in and visits login/signup → redirect to attendance
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/attendance", request.nextUrl));
  }

  // If user is not logged in and visits a protected route → redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      // ✅ Attendance: allow any authenticated user (user or admin)

      // ✅ Admin: only allow role === "admin"
      if (path.startsWith("/admin") && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/attendance", request.nextUrl));
      }

    } catch (err:unknown) {
      console.log("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/attendance/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
  ],
};

