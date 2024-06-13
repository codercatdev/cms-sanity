import { type NextRequest, NextResponse } from "next/server";
import { publicURL } from "./lib/utils";

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};

export async function middleware(request: NextRequest) {
  const login = request.nextUrl.pathname.startsWith("/login");
  let sessionCookie = request.cookies.get("app.at");
  let sessionExpireCookie = request.cookies.get("app.at_exp");
  let tokenCookie = request.cookies.get("app.idt");

  const sendToLogin = () => {
    if (login) {
      // If sending to login, it could mean that cookies are off
      // so we will delete them all before redirect
      request.cookies.delete("app.at");
      request.cookies.delete("app.at_exp");
      request.cookies.delete("app.idt");
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  };

  // If any cookies missing then go to login
  if (!sessionCookie || !sessionExpireCookie || !tokenCookie)
    return sendToLogin();

  //Call the authentication endpoint
  const responseAPI = await fetch(publicURL() + "/api/auth/session/verify", {
    headers: {
      Cookie: `app.at=${sessionCookie?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200 && !login) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //Return to /dashboard if token valid and trying to access login
  if (responseAPI.status === 200 && login) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
