import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getCurrentUser from "./lib/user";

const PROTECTED_ROUTES = ["/dashboard"];
const AUTH_ROUTES = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  console.log("🚀 MIDDLEWARE IS RUNNING - Path:", request.nextUrl.pathname);

  try {
    const result = await getCurrentUser();

    // More robust check for logged in user
    const isLoggedIn = result && result.email && result._id;
    const path = request.nextUrl.pathname;

    console.log("Middleware - User result:", result);
    console.log("Middleware - Is logged in:", isLoggedIn);
    console.log("Middleware - Current path:", path);

    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      path.startsWith(route)
    );
    const isAuthRoute = AUTH_ROUTES.some(
      (route) => path === route || path === `${route}/`
    );

    console.log("Middleware - Is protected route:", isProtectedRoute);
    console.log("Middleware - Is auth route:", isAuthRoute);

    // If user is trying to access protected route without being logged in
    if (isProtectedRoute && !isLoggedIn) {
      console.log("Redirecting to login from protected route");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // If user is already logged in and trying to access login/signup pages
    if (isAuthRoute && isLoggedIn) {
      console.log("Redirecting logged-in user away from auth pages");
      return NextResponse.redirect(new URL("/", request.url));
    }

    console.log("Middleware - Allowing access to:", path);
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
