import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("user_token")?.value;
  const publicPaths = ["/signin", "/signup", "/reset-password", "/verifyOtp"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!token) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  } else {
    if (isPublicPath) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  return NextResponse.next();
};
export const config = {
  matcher: [
    "/",
    "/home",
    "/create",
    "/update",
    "/signin",
    "/signup",
    "/reset-password",
    "/verifyOtp",
  ],
};
