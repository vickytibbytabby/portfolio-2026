import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import CaseNav from "@/components/CaseNav";
import SiteFooter from "@/components/SiteFooter";
import styles from "./scallion.module.css";

export const metadata: Metadata = {
  title: "Scallion Studios — Vicky Jen",
  description:
    "An Instagram cooking account growing into a home for my recipes — and a web app that turns each one into a step-by-step cook.",
};

const FACTS = [
  {
    q: "Why Scallions?",
    a: "Scallions have always been a staple in the food I grew up eating in Taiwan. They somehow make their way into almost everything I cook, so when I needed a name, Scallion Studios felt pretty natural.",
  },
  {
    q: "What is it?",
    a: "Scallion Studios started as an Instagram cooking account, but I’m growing it into a home for my recipes. I’m currently designing a web app that turns each recipe into an easy, step-by-step cooking experience, with plans to eventually expand it into a mobile app.",
  },
];

export default function ScallionStudiosCase() {
  return (
    <>
      <main className={styles.page}>
        {/* ---- hero ---- */}
        <header className={styles.hero} data-hero="">
          <img className={styles.heroArt} src="/case/scallion/hero.webp" alt="" />
          {/* The recording came with a flat grey backdrop; it's cropped to the
              chassis and the corners are rounded off, so only the phone is left. */}
          <video
            className={styles.phone}
            src="/case/scallion/phone.mp4"
            poster="/case/scallion/phone-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="The Scallion Studios recipe app"
          />
        </header>

        <BackLink />

        {/* ---- lede ---- */}
        <p className={styles.lede} data-reveal="">
          I&rsquo;ve always loved cooking. Somewhere along the way, I realized I loved
          sharing it just as much. Scallion Studios is where those two things meet.
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

        {/* ---- the account ---- */}
        <section className={styles.showcase} data-reveal="" aria-label="Scallion Studios on Instagram">
          <div className={styles.panel}>
            <img
              className={styles.insta}
              src="/story/insta.webp"
              alt="The scallion.studios Instagram profile"
            />
          </div>

          <p className={styles.soon}>
            Case study coming soon. currently busy filming videos and building apps.
          </p>
        </section>

        <CaseNav
          prev={{ href: "/work/arena-club", label: "Arena Club" }}
          next={{
            href: "/work/airbnb",
            label: "Airbnb",
            bg: "/work-cards/airbnb-bg.webp",
            shot: "/work-cards/airbnb-content.webp",
          }}
        />

      </main>

      <SiteFooter />
    </>
  );
}
