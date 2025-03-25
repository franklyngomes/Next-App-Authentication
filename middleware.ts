import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
  matcher: ["/home", "/create", "/"],
};
export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("user_token");

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  return NextResponse.next();
};
