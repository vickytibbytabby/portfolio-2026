"use client";

import { useEffect, useState } from "react";

/**
 * Luminance below which white ink wins. The dark cards top out around 0.29
 * (scallion) and 0.38 (airbnb) and want white; the gradient feet climb to 0.49
 * (arena's bright blue) and 0.77 (ucla's gold) and want black. 0.42 sits in the
 * gap, so nothing flips while it still reads well.
 */
const DARK_BELOW = 0.42;

/**
 * True when the pixels behind `probeY` are dark enough to need white ink.
 *
 * "Is a card behind it?" isn't good enough: these backgrounds are gradients, and
 * UCLA's runs from deep blue to a pale gold that reaches 0.77 luminance, where
 * white text disappears. So each card carries a luminance profile of its own
 * background (`data-lum`) and this reads the row actually sitting behind the
 * nav. The profiles describe the RENDERED card, so the lookup is a straight
 * proportion — there's no cover crop to correct for, because the card box and
 * the design box are the same 716 x 897.
 *
 * The cards are two to a row now, so the centred nav has one under each end of
 * it and a 40px strip of white page showing between them. It only goes white
 * when EVERY card it overlaps is dark: when the two disagree — the foot of the
 * last row, where Airbnb's red sits beside UCLA's gold — black is the one that
 * stays readable across the whole pill.
 */
export function useOnDark(probeY: number): boolean {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const check = () => {
      const nodes = document.querySelectorAll<HTMLElement>("[data-lum]");
      let behind = false;
      let allDark = true;

      for (const node of nodes) {
        const r = node.getBoundingClientRect();
        if (r.top > probeY || r.bottom < probeY) continue;

        const profile = node.dataset.lum?.split(",").map(Number);
        if (!profile?.length) continue;

        const t = (probeY - r.top) / r.height;
        const i = Math.max(0, Math.min(profile.length - 1, Math.round(t * (profile.length - 1))));

        behind = true;
        if (profile[i] >= DARK_BELOW) allDark = false;
      }

      // nothing behind it means the white page is
      setDark(behind && allDark);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [probeY]);

  return dark;
}
