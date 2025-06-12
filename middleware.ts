import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard"];
const AUTH_ROUTES = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  try {
    const authToken = request.cookies.get("token")?.value;

    const isLoggedIn = authToken;
    const path = request.nextUrl.pathname;

    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      path.startsWith(route)
    );
    const isAuthRoute = AUTH_ROUTES.some(
      (route) => path === route || path === `${route}/`
    );

    // If user is trying to access protected route without being logged in
    if (isProtectedRoute && !isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // If user is already logged in and trying to access login/signup pages
    if (isAuthRoute && isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // If there's an error getting user data, treat as not logged in
    const path = request.nextUrl.pathname;
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      path.startsWith(route)
    );

    if (isProtectedRoute) {
      console.log("Error occurred, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Simpler matcher for testing
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/",
  ],
};
