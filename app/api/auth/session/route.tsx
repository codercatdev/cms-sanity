import Tokens from "csrf";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { app } from "@/lib/server/firebase";
import { jwtDecode } from "jwt-decode";
import { NextRequest } from "next/server";

const csrf = new Tokens();
export async function POST(request: NextRequest) {
  const data = await request.json();
  const { idToken } = data;

  if (!idToken)
    return Response.json({ error: "Missing idToken" }, { status: 401 });

  const cookieStore = cookies();
  const csrfToken = cookieStore.get("app.csrf");

  if (!csrfToken || !csrfToken.value)
    return Response.json({ error: "Missing app.csrf cookie" }, { status: 401 });

  if (!process.env.PRIVATE_CSRF)
    return Response.json({ error: "Missing PRIVATE_CSRF" }, { status: 500 });

  const isValid = await csrf.verify(process.env.PRIVATE_CSRF, csrfToken.value);
  if (!isValid)
    return Response.json({ error: "Invalid app.csrf" }, { status: 401 });

  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.

  try {
    const decodedIdToken = await getAuth(app).verifyIdToken(idToken);
    // Only process if the user just signed in in the last 2 minutes.
    if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 2 * 60) {
      const sessionCookie = await getAuth(app).createSessionCookie(idToken, {
        expiresIn,
      });
      cookieStore.set("app.at", sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: expiresIn,
      });

      // Set the expiration time in a cookie so we can check client side
      const jwtPalyoad = jwtDecode(sessionCookie);
      const expiration = jwtPalyoad.exp;

      if (expiration) {
        cookieStore.set("app.at_exp", expiration.toString(), {
          sameSite: "strict",
          path: "/",
          maxAge: expiresIn,
        });
      }
      return Response.json({ success: true });
    }
    return Response.json({ error: "Recent sign-in required" }, { status: 401 });
  } catch (error: any) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 401 });
  }
}
