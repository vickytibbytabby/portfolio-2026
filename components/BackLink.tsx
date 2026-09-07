"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./BackLink.module.css";

/** Roughly the arrow's own centre, in CSS px from the top of the window. */
const PROBE_Y = 60;
/** Ignore the jitter of a trackpad settling. */
const THRESHOLD = 6;
/** Near the top it always shows, whichever way you were going. */
const ALWAYS_AT = 40;

/**
 * The way back stays with you: pinned to the top-left corner, out of the way
 * when you're reading down the page and back the moment you turn around.
 *
 * The arrow is drawn white, which is right over the hero and invisible over the
 * white body — so it's painted as a mask in `currentColor` and the ink flips
 * once the hero has passed under it.
 */
export default function BackLink() {
  const [hidden, setHidden] = useState(false);
  const [onArt, setOnArt] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    last.current = window.scrollY;
    const hero = document.querySelector<HTMLElement>("[data-hero]");

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last.current;

      setScrolled(y > ALWAYS_AT);
      if (y <= ALWAYS_AT) setHidden(false);
      else if (Math.abs(delta) > THRESHOLD) setHidden(delta > 0);

      last.current = y;
      if (hero) setOnArt(hero.getBoundingClientRect().bottom > PROBE_Y);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/#works"
      className={styles.back}
      data-hidden={hidden || undefined}
      data-scrolled={scrolled || undefined}
      data-ink={onArt ? undefined : "dark"}
    >
      <span className={styles.backArrow} aria-hidden="true" />
      Back
    </Link>
  );
}
