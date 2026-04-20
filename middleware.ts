import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const password = process.env.APP_PASSWORD;

    // If no password configured, allow access
    if (!password) return NextResponse.next();

    // Skip auth for the login API route
    if (req.nextUrl.pathname.startsWith("/api/login")) return NextResponse.next();

    const authCookie = req.cookies.get("auth")?.value;
    if (authCookie === password) return NextResponse.next();

    // Rewrite to login page
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
