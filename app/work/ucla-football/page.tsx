import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import CaseNav from "@/components/CaseNav";
import SiteFooter from "@/components/SiteFooter";
import styles from "./ucla.module.css";

export const metadata: Metadata = {
  title: "UCLA Football — Vicky Jen",
  description:
    "A welcome poster for incoming UCLA Football athletes, mailed as nine puzzle pieces that assemble into a map of Los Angeles.",
};

const FACTS = [
  {
    q: "Context",
    a: "While working with UCLA Football’s graphics team, I was asked to create a welcome piece for incoming student athletes.",
  },
  {
    q: "The constraint",
    a: "College recruiting rules limited each piece of mail we could send to A4 size.",
  },
  {
    q: "The solution",
    a: "Instead of shrinking the poster, I turned the constraint into the concept. I designed it as nine individual puzzle pieces that could be mailed separately, then assembled by each player to reveal a map of their new home.",
  },
];

export default function UclaFootballCase() {
  return (
    <>
      <main className={styles.page}>
        {/* ---- hero ---- */}
        <header className={styles.hero} data-hero="">
          <img className={styles.poster} src="/case/ucla/poster.webp" alt="The welcome poster and letter" />
        </header>

        <BackLink />

        {/* ---- lede ---- */}
        <p className={styles.lede} data-reveal="">
          A big welcome to LA, delivered in nine pieces.
        </p>

        {/* ---- facts ---- */}
        <dl className={styles.facts} data-reveal="">
          {FACTS.map((f) => (
            <div key={f.q} className={styles.fact}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>

        {/* ---- the illustration ---- */}
        <section className={styles.showcase} data-reveal="" aria-label="Drawing the map">
          <div className={styles.panel}>
            {/* the recording is square with black bars down each side; it's
                cropped to the drawing itself */}
            <video
              className={styles.map}
              src="/case/ucla/timelapse.mp4"
              poster="/case/ucla/timelapse-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="A time-lapse of the map being drawn"
            />
          </div>
        </section>

        <div className={styles.body}>
          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Finding the look</h2>
            <div className={styles.content}>
              <p>
                I wanted the illustration to feel unmistakably UCLA, but still capture the
                warmth and energy of Los Angeles. I built the city from simplified geometric
                forms, using UCLA&rsquo;s deep blues and white with yellow highlights
                inspired by the LA sunset.
              </p>
              <img className={styles.figure} src="/case/ucla/mood.webp" alt="Colour and form studies for the poster" />
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Final deliverable</h2>
            <div className={styles.content}>
              <p>
                The final 25 &times; 33&rdquo; poster was sent to 285+ incoming UCLA Football
                athletes for the 2024 season, turning a mailing constraint into a memorable
                welcome to their new home.
              </p>
            </div>
          </section>
        </div>

        <CaseNav
          prev={{ href: "/work/airbnb", label: "Airbnb" }}
          next={{ href: "/my-story", label: "My story" }}
        />

      </main>

      <SiteFooter />
    </>
  );
}
