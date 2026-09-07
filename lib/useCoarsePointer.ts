"use client";

import { useEffect, useState } from "react";

/**
 * True when the device has no real hover — touch screens. Drives the
 * tap-to-reveal fallbacks for the folder and the Works rows.
 *
 * Starts false so the server render and the first client render agree; the
 * effect corrects it before paint on touch devices.
 */
export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setCoarse(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return coarse;
}
