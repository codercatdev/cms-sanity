import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};

export async function middleware(request: NextRequest) {
  const login = request.nextUrl.pathname.startsWith("/login");
  let sessionCookie = request.cookies.get("app.at");

  const sendToLogin = () => {
    if (login) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  };

  if (!sessionCookie) return sendToLogin();

  //Call the authentication endpoint
  const responseAPI = await fetch(
    process.env.URL + "/api/auth/session/verify",
    {
      headers: {
        Cookie: `app.at=${sessionCookie?.value}`,
      },
    }
  );

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
