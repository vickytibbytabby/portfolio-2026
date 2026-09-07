"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Anything marked `data-reveal` fades and rises as it comes into view.
 *
 * One observer for the whole document rather than a wrapper component per
 * block: several of these pages place their blocks at exact frame coordinates,
 * and an extra wrapping element would break that layout.
 *
 * The hiding rule in `globals.css` is keyed off `html[data-reveal="on"]`, which
 * this sets on mount — so with JS off, or if this never runs, every block is
 * simply visible.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.dataset.reveal = "on";

    const all = () => Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      all().forEach((el) => (el.dataset.shown = ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "";
          io.unobserve(entry.target);
        }
      },
      // Bottom: a little short of the foot of the window, so a block starts
      // moving just before it would otherwise be fully on screen.
      // Top: effectively unbounded, so anything already scrolled PAST counts as
      // seen. Without it, jumping down the page (an anchor link, a flick on a
      // trackpad) leaves the blocks it skipped invisible until you scroll back.
      { rootMargin: "100000px 0px -8% 0px", threshold: 0.04 },
    );

    const watch = () => all().forEach((el) => io.observe(el));
    watch();

    // Blocks can arrive after this effect has run — switching a tab swaps a
    // whole panel of them in. Without this they'd never be observed, and the
    // hiding rule would leave them invisible for good.
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
