"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./case.module.css";

export type Tab = {
  name: string;
  /** The before/after panel. Tabs without one show only the empty state. */
  panel?: ReactNode;
  /** The write-up. Missing means the case study isn't written yet. */
  body?: ReactNode;
};

/**
 * The project switcher above the before/after panel.
 *
 * Every tab is a real button — a tab you can't press is worse than no tab — and
 * the ones with nothing behind them yet land on the same empty state rather
 * than a dead end.
 *
 * Switching is animated in two parts: the white pill slides along the row to
 * the tab you picked, and the panel under it leaves and arrives in the
 * direction you moved, so the change reads as travel rather than a cut. The
 * incoming content is keyed on the tab, so React remounts it and the entry
 * animation runs every time.
 */
export default function ProjectTabs({ tabs }: { tabs: Tab[] }) {
  const [at, setAt] = useState(0);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const navRef = useRef<HTMLElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  const go = (i: number) => {
    if (i === at) return;
    setDir(i > at ? "fwd" : "back");
    setAt(i);
  };

  // The pill is measured rather than styled onto the button, so it can slide
  // between them. Frame units mean the widths move with the window, so it
  // re-measures on resize too.
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const measure = () => {
      const btn = nav.querySelectorAll("button")[at] as HTMLElement | undefined;
      if (btn) setPill({ x: btn.offsetLeft, w: btn.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(nav);
    return () => ro.disconnect();
  }, [at]);

  // The row scrolls sideways on a phone; keep the tab you picked in view.
  useEffect(() => {
    const nav = navRef.current;
    const btn = nav?.querySelectorAll("button")[at] as HTMLElement | undefined;
    btn?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [at]);

  const active = tabs[at];

  return (
    <>
      <div className={styles.compareGroup} data-reveal="">
        <nav className={styles.tabs} aria-label="Project" ref={navRef}>
          {pill && (
            <span
              className={styles.tabPill}
              style={{ transform: `translateX(${pill.x}px)`, width: `${pill.w}px` }}
              aria-hidden="true"
            />
          )}
          {tabs.map((tab, i) => (
            <button
              key={tab.name}
              type="button"
              className={i === at ? styles.tabOn : styles.tab}
              aria-current={i === at ? "true" : undefined}
              onClick={() => go(i)}
            >
              {tab.name}
            </button>
          ))}
        </nav>

        <div className={styles.swap} key={`panel-${at}`} data-dir={dir}>
          {active.panel}
        </div>
      </div>

      <div className={styles.swapBody} key={`body-${at}`} data-dir={dir}>
        {active.body ?? <ComingSoon name={active.name} />}
      </div>
    </>
  );
}

function ComingSoon({ name }: { name: string }) {
  return (
    <section className={styles.soon} data-reveal="">
      <p className={styles.soonTitle}>Case Study Coming Soon</p>
      <p className={styles.soonNote}>
        {name} is still being written up. Check back shortly.
      </p>
    </section>
  );
}
