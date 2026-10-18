
import { NextResponse } from "next/server";

export function proxy(request) {
  const sessionCookie = request.cookies.get("addis-eats-session");

  if (!sessionCookie?.value) {
    const signInUrl = new URL("/signin", request.url);

    signInUrl.searchParams.set(
      "next",
      `${request.nextUrl.pathname}${request.nextUrl.search}`
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};
