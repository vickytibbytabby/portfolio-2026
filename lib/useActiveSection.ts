"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy for the left rail. Tracks which section owns the middle of the
 * viewport rather than which one merely intersects it, so the active item
 * changes at a predictable moment scrolling in either direction.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    const pick = () => {
      const line = window.innerHeight * 0.4;
      let current = nodes[0];
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) current = node;
      }
      setActive(current.id);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [ids]);

  return active;
}
