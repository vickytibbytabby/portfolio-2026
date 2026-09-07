"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./case.module.css";

/** The line, word by word, so it can be lit one word at a time. `noGap` is the
 *  word the full stop hangs off — without it the period drifts off on its own. */
const WORDS: { t: string; em?: boolean; noGap?: boolean }[] = [
  ...`I led all research and design for the app and website as the sole designer with an engineering team of 40 at`
    .split(" ")
    .map((t) => ({ t })),
  { t: "Arena", em: true },
  { t: "Club", em: true, noGap: true },
  { t: ".", noGap: true },
];

/** Where the line is on screen when the first and last words light up, as a
 *  fraction of the window height. */
const FROM = 0.82;
const TO = 0.36;

/**
 * The lede reads itself: the words start grey and turn black as you scroll
 * through them, like a karaoke line.
 *
 * Progress comes from where the paragraph sits in the window rather than from
 * absolute scroll position, so it works the same wherever the page is entered
 * from — including landing on it already scrolled.
 */
export default function Lede() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(WORDS.length);
      return;
    }

    let queued = false;
    const measure = () => {
      queued = false;
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      const p = (h * FROM - r.top) / (h * (FROM - TO));
      setLit(Math.round(Math.min(1, Math.max(0, p)) * WORDS.length));
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p className={styles.lede} ref={ref}>
      {WORDS.map((w, i) => {
        const word = (
          <span className={styles.word} data-on={i < lit || undefined}>
            {w.noGap ? w.t : `${w.t} `}
          </span>
        );
        return (
          <span key={`${w.t}-${i}`}>{w.em ? <em>{word}</em> : word}</span>
        );
      })}
    </p>
  );
}
