"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  FOLDER,
  FOLDER_MOBILE,
  FOLDER_PHOTOS,
  FOLDER_PHOTOS_MOBILE,
} from "@/content/folderPhotos";
import { useCoarsePointer } from "@/lib/useCoarsePointer";
import { useIsMobile } from "@/lib/useIsMobile";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./FolderCollage.module.css";

/**
 * The photo data stores widths as a % of the 1512-wide Figma frame. On desktop
 * the layer is now full-bleed, so a % of the layer would inflate the art on a
 * wide window; converting to frame pixels keeps every element at its Figma size
 * while the x positions (still %) spread the composition across the window.
 */
const PCT_TO_FRAME = 1512 / 100;
const frameW = (pct: number, scale = 1) =>
  `calc(${(pct * PCT_TO_FRAME * scale).toFixed(3)} * var(--u))`;

/**
 * The spill runs a little larger than the frame's own sizes on desktop, so the
 * photos read as photos rather than thumbnails. Each one grows about its own
 * CENTRE — the left/top offsets below pull back half the growth — which keeps
 * the composition where the frame put it and keeps the spring offsets (which
 * are computed off the unscaled size) exactly right.
 */
const PHOTO_SCALE = 1.15;
const grow = (framePx: number) =>
  `${((framePx * (PHOTO_SCALE - 1)) / 2).toFixed(3)} * var(--u)`;

/**
 * The [Untitled] folder and the photos that spill out of it.
 *
 * The photos land at fixed positions across the whole hero (per the "Hero
 * Expanded" frame), not in an arc around the folder — so they can't be children
 * of the folder. Instead everything shares one absolutely-positioned layer and
 * z-index does the interleaving: folder back, photos, folder front. That's what
 * makes them read as coming out of the folder's paper slot.
 */
export default function FolderCollage() {
  const [open, setOpen] = useState(false);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const layerRef = useRef<HTMLDivElement>(null);
  const coarse = useCoarsePointer();
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  // Phones use a portrait scatter; the landscape frame is unreadable at 390px.
  const folder = mobile ? FOLDER_MOBILE : FOLDER;
  const photos = mobile ? FOLDER_PHOTOS_MOBILE : FOLDER_PHOTOS;

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    const measure = (r: DOMRectReadOnly | DOMRect) => setBox({ w: r.width, h: r.height });
    const ro = new ResizeObserver(([entry]) => measure(entry.contentRect));
    ro.observe(el);
    measure(el.getBoundingClientRect());
    return () => ro.disconnect();
  }, []);

  // One design pixel, derived from the layer: the box is exactly 982 frame px
  // tall on desktop. Phones keep the old percentage sizing — that scatter is a
  // portrait composition of its own, not the Figma frame.
  const ready = box.w > 0 && box.h > 0;
  const u = box.h / 982;
  const sizeOf = (pct: number) => (mobile ? (pct / 100) * box.w : pct * PCT_TO_FRAME * u);

  // The folder art is square, so height follows its width.
  const folderSize = sizeOf(folder.width);
  const folderTop = (folder.y / 100) * box.h;
  // Where each photo starts: tucked inside the folder, so it springs out of the slot.
  const folderCentre = { x: ((folder.x + folder.width / 2) / 100) * box.w, y: folderTop + folderSize / 2 };

  const hoverProps = coarse
    ? {}
    : { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) };

  return (
    <div className={styles.layer} ref={layerRef} data-open={open || undefined}>
      {/* back of the folder */}
      <img
        className={styles.folderBack}
        style={{
          left: `${folder.x}%`,
          top: `${folder.y}%`,
          width: mobile ? `${folder.width}%` : frameW(folder.width),
        }}
        src="/assets/folder.png"
        alt=""
        draggable={false}
      />

      {/* The spill, in paint order — and not before the layer has been measured.
          Every closed position is derived from the layer's box, so rendering
          them against a zero box and then measuring would have motion animate
          them from wherever that put them into the folder, in full view, on
          first paint. */}
      {ready &&
        photos.map((photo, i) => {
          const w = sizeOf(photo.width);
          const centre = {
            x: (photo.x / 100) * box.w + w / 2,
            y: (photo.y / 100) * box.h + w / photo.aspect / 2,
          };
          return (
            <motion.figure
              key={photo.src}
              className={styles.photo}
              style={{
                left: mobile
                  ? `${photo.x}%`
                  : `calc(${photo.x}% - ${grow(photo.width * PCT_TO_FRAME)})`,
                top: mobile
                  ? `${photo.y}%`
                  : `calc(${photo.y}% - ${grow((photo.width * PCT_TO_FRAME) / photo.aspect)})`,
                width: mobile ? `${photo.width}%` : frameW(photo.width, PHOTO_SCALE),
                // above the hero copy, so the spill lands over the text
                zIndex: 41 + i,
              }}
              initial={false}
              animate={
                open
                  ? { x: 0, y: 0, scale: 1, opacity: 1 }
                  : {
                      x: folderCentre.x - centre.x,
                      y: folderCentre.y - centre.y,
                      scale: 0.12,
                      opacity: reduced ? 0 : 1,
                    }
              }
              transition={
                reduced
                  ? { duration: 0.2 }
                  : {
                      type: "spring",
                      stiffness: 190,
                      damping: 24,
                      mass: 0.9,
                      delay: open ? i * 0.045 : (photos.length - 1 - i) * 0.025,
                    }
              }
            >
              <img
                className={styles.photoImg}
                style={{ aspectRatio: photo.aspect }}
                src={photo.src}
                alt={open ? photo.alt : ""}
                draggable={false}
              />
              <figcaption className={styles.caption}>{photo.label}</figcaption>
            </motion.figure>
          );
        })}

      {/* front panel, cut at the folder's paper line so photos slide out of the slot */}
      <img
        className={styles.folderFront}
        style={{
          left: `${folder.x}%`,
          top: folderTop + (folderSize * folder.frontTop) / 100,
          width: mobile ? `${folder.width}%` : frameW(folder.width),
        }}
        src="/assets/folder-front.png"
        alt=""
        draggable={false}
      />

      {/* the hover/tap target sits over the folder, above every layer */}
      <button
        type="button"
        className={styles.trigger}
        style={{
          left: `${folder.x}%`,
          top: folderTop,
          width: mobile ? `${folder.width}%` : frameW(folder.width),
        }}
        aria-expanded={open}
        aria-label={open ? "Close the Untitled folder" : "Open the Untitled folder"}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        {...hoverProps}
      >
        <span className={styles.label}>[Untitled]</span>
        {/* a cue that comes and goes, rather than a label parked under the art */}
        <span className={styles.cue}>{coarse ? "tap here" : "hover me"}</span>
      </button>
    </div>
  );
}
