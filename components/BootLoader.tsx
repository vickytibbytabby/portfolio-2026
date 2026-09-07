"use client";

import { useEffect, useState } from "react";
import styles from "./BootLoader.module.css";

/** How long a load has to take before it's worth showing a spinner for. */
const SPINNER_AFTER = 350;
/** The page never waits longer than this, however heavy the media is. */
const CAP = 3500;
const SPOKES = 12;

/**
 * Covers the page on a first landing and lifts once the fonts and the media
 * have settled, so nobody watches the site assemble itself.
 *
 * It renders on the server too, which is the point: the cover is in the first
 * paint rather than appearing a moment after it. `data-boot` on <html> is what
 * fades the page up underneath — and because only this component ever sets it,
 * a page whose script never runs is simply visible.
 */
export default function BootLoader() {
  const [done, setDone] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.boot = "wait";

    const spinner = window.setTimeout(() => setSlow(true), SPINNER_AFTER);
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      root.dataset.boot = "ready";
      setDone(true);
    };

    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }));
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    const cap = new Promise<void>((r) => window.setTimeout(r, CAP));

    void Promise.race([Promise.all([loaded, fonts]), cap]).then(finish);

    return () => {
      window.clearTimeout(spinner);
      settled = true;
    };
  }, []);

  return (
    <div className={styles.cover} data-done={done || undefined} aria-hidden="true">
      <div className={styles.box} data-slow={slow || undefined}>
        <span className={styles.spinner}>
          {Array.from({ length: SPOKES }, (_, i) => (
            <i
              key={i}
              style={{
                rotate: `${(360 / SPOKES) * i}deg`,
                animationDelay: `${-(1 - i / SPOKES).toFixed(3)}s`,
              }}
            />
          ))}
        </span>
        <span className={styles.word}>loading</span>
      </div>
    </div>
  );
}
