/** Shared by the middleware and the unlock route, so neither imports the other. */
export const COOKIE = "case_unlock";

/** SHA-256 via WebCrypto — the only digest the middleware runtime offers. */
export async function hash(value: string) {
  const bytes = new TextEncoder().encode(`arena-club:${value}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
