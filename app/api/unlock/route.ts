import { NextResponse } from "next/server";
import { COOKIE, hash } from "@/lib/unlock";

/** Trades the right password for the cookie the middleware looks for. */
export async function POST(req: Request) {
  const { password } = (await req.json()) as { password?: string };
  const expected = process.env.CASE_PASSWORD ?? "";

  if (!expected || password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await hash(expected), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
