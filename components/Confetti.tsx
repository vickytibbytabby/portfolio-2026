"use client";

import { useEffect } from "react";

/** Press and hold on empty page; the longer you hold, the harder it comes. */
const RAMP = 2600;
/** Beyond this it stops getting busier — a hold shouldn't be able to run away. */
const MAX = 220;
const COLORS = ["#0069ea", "#0046ea", "#c8785a", "#f5b301", "#ff6b9a", "#19b26b"];
const INTERACTIVE = "a, button, input, textarea, select, label, summary, video, [role='button']";

const GRAVITY = 1150;
/** Per 60th of a second. Anything much lower kills the sideways throw within a
 *  few frames and the burst collapses into a column. */
const DRAG = 0.985;

type Bit = {
  x: number; y: number; vx: number; vy: number;
  rot: number; vr: number; w: number; h: number;
  color: string; life: number; ttl: number; round: boolean;
};

/**
 * Confetti that answers a press-and-hold, and it comes out in surges rather
 * than a steady stream — a fountain, not a hose. Each pulse throws a batch up
 * a cone; hold on and the pulses come faster and carry more, until it's really
 * spouting. Letting go sets off one last pop, sized by how long you leaned on
 * it. A quick click does almost nothing, which is the point.
 *
 * Drawn on a canvas rather than as elements: at full pelt there are a couple of
 * hundred pieces on screen and that's a lot of DOM to move every frame.
 */
export default function Confetti() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: "997",
      pointerEvents: "none",
    });
    document.body.append(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1;
    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    const bits: Bit[] = [];
    let holding = false;
    let since = 0;
    let at = { x: 0, y: 0 };
    /** When the next surge is due, in performance.now() time. */
    let owed = 0;
    let raf = 0;
    let last = 0;

    /** 0 at the moment of pressing, 1 once the hold is at full pelt. */
    const heat = (held: number) => Math.min(1, held / RAMP);

    const add = (t: number, spread: number, aim: number, power: number) => {
      if (bits.length >= MAX) return;
      const angle = aim + (Math.random() - 0.5) * spread;
      const speed = (150 + 430 * t) * power * (0.7 + Math.random() * 0.6);
      const w = 4 + Math.random() * 4;
      bits.push({
        x: at.x,
        y: at.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 14,
        w,
        h: Math.random() < 0.28 ? w : w * 1.7,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 0,
        ttl: 1 + Math.random() * 0.9,
        round: Math.random() < 0.22,
      });
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (holding && now >= owed) {
        const t = heat(now - since);
        // the surges come closer together and carry more the longer you hold
        const count = Math.round(2 + 26 * t * t);
        const spread = Math.PI * (0.3 + 0.45 * t);
        // each surge leans a little off vertical, so it never looks metronomic
        const aim = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;
        const power = 0.85 + Math.random() * 0.3;
        for (let i = 0; i < count; i++) add(t, spread, aim, power);
        owed = now + (460 - 300 * t) * (0.85 + Math.random() * 0.3);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = bits.length - 1; i >= 0; i--) {
        const b = bits[i];
        b.life += dt;
        if (b.life >= b.ttl) {
          bits.splice(i, 1);
          continue;
        }
        b.vy += GRAVITY * dt;
        b.vx *= Math.pow(DRAG, dt * 60);
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.rot += b.vr * dt;

        const fade = Math.min(1, (b.ttl - b.life) / 0.45);
        ctx.save();
        ctx.globalAlpha = 0.9 * fade;
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.fillStyle = b.color;
        if (b.round) {
          ctx.beginPath();
          ctx.arc(0, 0, b.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
        }
        ctx.restore();
      }

      if (holding || bits.length) raf = requestAnimationFrame(frame);
      else raf = 0;
    };

    const run = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const down = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (e.button !== 0 || !target || target.closest(INTERACTIVE)) return;
      holding = true;
      since = performance.now();
      owed = 0; // the first surge goes off immediately
      at = { x: e.clientX, y: e.clientY };
      run();
    };

    const move = (e: PointerEvent) => {
      at = { x: e.clientX, y: e.clientY };
    };

    const up = () => {
      if (!holding) return;
      const t = heat(performance.now() - since);
      holding = false;
      // one last pop, sized by how long you leaned on it
      if (t > 0.25) {
        const n = Math.round(8 + 46 * t);
        for (let i = 0; i < n; i++) add(Math.min(1, t + 0.25), Math.PI * 2, -Math.PI / 2, 1.1);
      }
      run();
    };

    window.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    window.addEventListener("blur", up);

    return () => {
      window.removeEventListener("resize", size);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("blur", up);
      if (raf) cancelAnimationFrame(raf);
      canvas.remove();
    };
  }, []);

  return null;
}
