import type { CSSProperties } from "react";
import { WORK } from "@/content/work";
import CardShell from "./CardShell";
import styles from "./Works.module.css";

/**
 * Two cards per row on desktop, one on phones.
 *
 * The two frames don't share a card ratio — 716 x 897 against the mobile
 * frame's 362 x 423.5 — so every overlay carries BOTH sets of numbers as custom
 * properties and the stylesheet's media query picks. Doing it here rather than
 * with JS means there's no breakpoint to measure and nothing to re-render.
 */
export default function Works() {
  return (
    <section id="works" className={`inset ${styles.section}`}>
      <h2 className="srOnly">Works</h2>

      <ul className={styles.grid}>
        {WORK.map((card, i) => (
          <li
            key={card.name}
            className={styles.card}
            data-reveal=""
            // the second of a pair follows a beat later, so a row arrives as a
            // pair rather than as one wide block
            style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as CSSProperties}
          >
            <CardShell href={card.href}>
            <div
              className={styles.mediaBox}
              data-lum={card.backdrop.join(",")}
              style={{ background: card.background }}
            >
              {card.photo && (
                <img
                  className={styles.photo}
                  src={card.photo}
                  alt={card.art ? "" : card.alt ?? ""}
                  draggable={false}
                />
              )}

              {card.scrim && <div className={styles.scrim} style={{ background: card.scrim }} />}

              {/* the design's own box, locked to the card's height and centred,
                  so the artwork keeps its proportions in a card that on a short
                  window no longer has them */}
              <div className={styles.stage}>
                {card.art && (
                  <div
                    className={styles.art}
                    style={
                      {
                        "--art-top": `${card.art.top}%`,
                        "--art-w": `${card.art.width}%`,
                        "--art-ratio": card.art.ratio,
                        "--m-art-top": `${card.mobile.art?.top ?? card.art.top}%`,
                        "--m-art-w": `${card.mobile.art?.width ?? card.art.width}%`,
                      } as CSSProperties
                    }
                  >
                    <img
                      src={card.art.src}
                      alt={card.alt ?? ""}
                      style={{
                        left: `${card.art.img.left}%`,
                        top: `${card.art.img.top}%`,
                        width: `${card.art.img.width}%`,
                        height: `${card.art.img.height}%`,
                      }}
                      draggable={false}
                    />
                  </div>
                )}

                {card.video && (
                  <div
                    className={card.video.kind === "phone" ? styles.phone : styles.window}
                    style={
                      {
                        "--v-top": `${card.video.top}%`,
                        "--v-h": `${card.video.height}%`,
                        "--v-w": `${card.video.width}%`,
                        "--m-v-top": `${card.mobile.video?.top ?? card.video.top}%`,
                        "--m-v-h": `${card.mobile.video?.height ?? card.video.height}%`,
                        "--m-v-w": `${card.mobile.video?.width ?? card.video.width}%`,
                      } as CSSProperties
                    }
                  >
                    <video
                      src={card.video.src}
                      poster={card.video.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>

              {/* outside the stage: on desktop it hugs the card's corner and
                  takes its size from the card's height; the mobile frame
                  centres it instead */}
              <img
                className={styles.mark}
                style={
                  {
                    "--mark-left": `${card.mark.left}%`,
                    "--mark-top": `${card.mark.top}%`,
                    "--mark-h": `${card.mark.height}%`,
                    "--m-mark-top": `${card.mobile.mark.top}%`,
                    "--m-mark-w": `${card.mobile.mark.width}%`,
                  } as CSSProperties
                }
                src={card.mark.src}
                alt=""
                draggable={false}
              />
            </div>

            <div className={styles.caption}>
              <h3 className={styles.title}>
                <em className={styles.name}>{card.name}</em> — {card.blurb}
                {card.href && (
                  <span className={styles.arrow} aria-hidden="true">
                    &#8599;
                  </span>
                )}
              </h3>
              <p className={styles.dates}>{card.dates}</p>
            </div>
            </CardShell>
          </li>
        ))}
      </ul>
    </section>
  );
}
