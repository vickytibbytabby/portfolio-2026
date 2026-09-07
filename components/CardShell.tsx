"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { canTransition, fadeTo } from "@/lib/pageTransition";
import styles from "./Works.module.css";

/**
 * A card is a link only when there's a case study behind it. The two shells are
 * the same flex column either way, so a linked card and a plain one sit at the
 * same rhythm; `data-link` is what the hover rules key off.
 *
 * Clicking a linked card dissolves into the case study rather than cutting to
 * it — see `lib/pageTransition.ts`.
 */
export default function CardShell({ href, children }: { href?: string; children: ReactNode }) {
  const router = useRouter();

  if (!href) return <div className={styles.shell}>{children}</div>;

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // let the browser handle open-in-new-tab, middle click, downloads
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!href.startsWith("/") || !canTransition()) return;

    e.preventDefault();
    fadeTo(() => router.push(href));
  };

  return (
    <Link className={styles.shell} href={href} data-link="" onClick={onClick}>
      {children}
    </Link>
  );
}
