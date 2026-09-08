"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useActiveSection } from "@/lib/useActiveSection";
import { useOnDark } from "@/lib/useOnDark";
import { canTransition, fadeTo } from "@/lib/pageTransition";
import styles from "./TopNav.module.css";

/** Sections of the homepage rather than pages of their own. */
const SECTIONS = [{ id: "home", label: "Home" }];

const IDS = SECTIONS.map((i) => i.id);

/** Fallback until the pill has been measured, in CSS px from the top. */
const PROBE_FALLBACK = 42;

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const home = pathname === "/";
  const active = useActiveSection(IDS);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  // The probe has to sit in the middle of the pill. Measured rather than
  // hard-coded: the pill's height moves with its padding, and a stale constant
  // once had it sampling a card BELOW the nav — white ink over white page.
  const [probeY, setProbeY] = useState(PROBE_FALLBACK);
  // the card art is the only dark thing on the page; ink flips over it
  const dark = useOnDark(probeY);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setProbeY(r.top + r.height / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Leaving for My story dissolves rather than cutting, the same way the work
   *  cards do. */
  const onStory = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (pathname === "/my-story" || !canTransition()) return;

    e.preventDefault();
    fadeTo(() => router.push("/my-story"));
  };

  return (
    <nav
      ref={navRef}
      className={styles.nav}
      aria-label="Sections"
      data-scrolled={scrolled || undefined}
      data-dark={dark || undefined}
    >
      <ul className={styles.list}>
        {SECTIONS.map((item) => {
          // only the homepage has this to scroll to, so from a case study they
          // have to navigate home first
          const on = home && active === item.id;
          return (
            <li key={item.id}>
              <Link
                href={`/#${item.id}`}
                className={styles.link}
                data-active={on || undefined}
                aria-current={on ? "true" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}

        <li>
          <Link
            href="/my-story"
            className={styles.link}
            data-active={pathname === "/my-story" || undefined}
            aria-current={pathname === "/my-story" ? "page" : undefined}
            onClick={onStory}
          >
            My story
          </Link>
        </li>

        {/* sits with the rest but isn't a page — it leaves the site */}
        <li>
          <a
            className={styles.link}
            href="/resume.pdf"
            type="application/pdf"
            download="Vicky Jen Resume.pdf"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}
