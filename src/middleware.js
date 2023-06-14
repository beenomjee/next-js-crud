import { NextResponse } from "next/server";

const checkTokenMiddleware = (req, res) => {
  const token = req.cookies.get("token");
  if (req.url.includes("/signup") || req.url.includes("/signin")) {
    if (token) return NextResponse.redirect(new URL("/", req.url));
  } else {
    if (!token) return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/signup", "/signin", "/", "/todo/:path*"],
};

export default checkTokenMiddleware;
