"use client";

import { useState } from "react";
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
 */
export default function ProjectTabs({ tabs }: { tabs: Tab[] }) {
  const [at, setAt] = useState(0);
  const active = tabs[at];

  return (
    <>
      <div className={styles.compareGroup} data-reveal="">
        <nav className={styles.tabs} aria-label="Project">
          {tabs.map((tab, i) => (
            <button
              key={tab.name}
              type="button"
              className={i === at ? styles.tabOn : styles.tab}
              aria-current={i === at ? "true" : undefined}
              onClick={() => setAt(i)}
            >
              {tab.name}
            </button>
          ))}
        </nav>

        {active.panel}
      </div>

      {active.body ?? <ComingSoon name={active.name} />}
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
