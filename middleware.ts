import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { COOKIE, hash } from "@/lib/unlock";

/**
 * The Arena Club study is client work, so it sits behind a password.
 *
 * The check is server-side: the page never reaches the browser without a valid
 * cookie, so it can't be read out of the HTML or the network tab the way a
 * client-side gate can. The cookie holds a hash of the password rather than the
 * password, and is httpOnly so a script on the page can't read it either.
 */
export async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value;
  if (token && token === (await hash(process.env.CASE_PASSWORD ?? ""))) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/work/arena-club/locked";
  return NextResponse.rewrite(url);
}

/* The matcher has to be a literal — Next analyses it at build time, and a
   variable here silently widens it to every request, which caught the unlock
   route itself and rewrote it to the locked page. */
export const config = { matcher: ["/work/arena-club"] };
