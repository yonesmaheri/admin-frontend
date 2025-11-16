import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token");
  try {
    const res = await fetch("https://yonesma.ir/api/admin/me", {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken?.value}` || "",
      },
    });
    const isLoggedIn = res.ok;
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
