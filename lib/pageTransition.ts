/**
 * The site's page-to-page transition: a soft dissolve.
 *
 * The outgoing page fades to the page colour, the route swaps behind that, and
 * the new page fades up — where its own entrance animations (and the scroll
 * reveals) take over. The veil is appended to `document.body`, outside the
 * React root, so it survives the route change happening underneath it.
 */

const OUT = 220;
const IN = 300;
/** A beat at full cover, so a slow paint never shows through. */
const HOLD = 70;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function canTransition() {
  return typeof document.body.animate === "function" && !prefersReducedMotion();
}

export function fadeTo(navigate: () => void) {
  const veil = document.createElement("div");
  veil.setAttribute("aria-hidden", "true");
  Object.assign(veil.style, {
    position: "fixed",
    inset: "0",
    zIndex: "999",
    background: "var(--bg)",
    opacity: "0",
    pointerEvents: "none",
  });
  document.body.append(veil);

  const cover = veil.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: OUT,
    easing: EASE,
    fill: "forwards",
  });

  const reveal = () => {
    const out = veil.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: IN,
      easing: EASE,
      fill: "forwards",
    });
    const drop = () => veil.remove();
    out.finished.then(drop, drop);
  };

  cover.finished.then(
    () => {
      navigate();
      window.setTimeout(reveal, HOLD);
    },
    () => {
      navigate();
      reveal();
    },
  );
}
