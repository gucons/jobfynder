import { getSessionServer } from "@/server/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getSessionServer();
  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";

  if (!session || !session.user) {
    // If not authenticated and trying to access protected route
    return isAuthPage
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated and trying to access auth pages
  if (isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
