"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { useCoarsePointer } from "@/lib/useCoarsePointer";
import styles from "./story.module.css";

export type Food = { src: string; label: string; x: number; y: number; tilt: number };

/** The Instagram screenshot's frame box — the photos collapse into its centre. */
const INSTA = { x: 614.73, y: 782.68, w: 265.797, h: 540.88 };
/** A figure at frame size: the 234-wide 3:4 photo, an 8 gap and a 15 caption. */
const PHOTO = { w: 234, h: 234 / 0.75 + 8 + 15 };

/**
 * The food photos stay tucked inside the Instagram screenshot until you ask for
 * them: hover it (or tap, on a phone) and they spread out to their places in
 * the frame and settle at a tilt.
 *
 * Each photo's closed position is the offset from its own centre to the
 * screenshot's, so they all collapse into the same point rather than merely
 * shrinking where they stand.
 */
export default function FoodScatter({ food }: { food: Food[] }) {
  const [open, setOpen] = useState(false);
  const coarse = useCoarsePointer();

  const hover = coarse
    ? {}
    : { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) };

  return (
    <section
      className={styles.scatter}
      aria-label="Food photography"
      data-reveal=""
      data-open={open || undefined}
    >
      <button
        type="button"
        className={styles.instaButton}
        aria-expanded={open}
        aria-label={open ? "Hide the food photos" : "Show the food photos"}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        {...hover}
      >
        <img className={styles.insta} src="/story/insta.webp" alt="The scallion.studios Instagram profile" />
        <span className={styles.hint}>{coarse ? "tap here" : "hover me"}</span>
      </button>

      {/* On phones this collapses to nothing when closed, so there's no gap
          waiting to be filled; on desktop it's not a box at all. */}
      <div className={styles.spillWrap}>
        <div className={styles.spill}>
          {food.map((f, i) => (
            <figure
              key={f.src}
              className={styles.food}
              style={
                {
                  "--x": f.x,
                  "--y": f.y,
                  "--dx": INSTA.x + INSTA.w / 2 - (f.x + PHOTO.w / 2),
                  "--dy": INSTA.y + INSTA.h / 2 - (f.y + PHOTO.h / 2),
                  "--tilt": f.tilt,
                  "--d": `${i * 70}ms`,
                } as CSSProperties
              }
            >
              <img src={f.src} alt="" draggable={false} />
              <figcaption>{f.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
