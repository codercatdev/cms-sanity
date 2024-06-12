import { error } from "console";
import Tokens from "csrf";
import { cookies } from "next/headers";

const csrf = new Tokens();
export async function GET(request: Request) {
  if (!process.env.PRIVATE_CSRF)
    return Response.json({ error: "Missing PRIVATE_CSRF" }, { status: 500 });

  const csrfToken = csrf.create(process.env.PRIVATE_CSRF);
  cookies().set({
    name: "app.csrf",
    value: csrfToken,
    httpOnly: true,
    path: "/",
  });
  return Response.json({ csrfToken });
}
