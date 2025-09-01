import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  try {
    const res = await fetch("http://yonesma.ir/api/admin/me", {
      method: "GET",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    });    
    const isLoggedIn = res.ok;
    let a = await res.json()
    console.log(a);
    

    if (url.pathname === "/auth" && isLoggedIn) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    if (url.pathname === "/dashboard" && !isLoggedIn) {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }
  } catch (err) {
    console.error("middleware error:", err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/dashboard"],
};
