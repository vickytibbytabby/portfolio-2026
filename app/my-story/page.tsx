import type { Metadata } from "next";
import type { CSSProperties } from "react";
import SiteFooter from "@/components/SiteFooter";
import TopNav from "@/components/TopNav";
import FoodScatter from "./FoodScatter";
import styles from "./story.module.css";

export const metadata: Metadata = {
  title: "My Story — Vicky Jen",
  description:
    "Taiwanese product designer based in sunny Los Angeles.",
};

/** The food photos scattered around the Instagram screenshot (Figma 81:672).
 *  `tilt` is where each one settles once the screenshot is opened. */
const FOOD = [
  { src: "/story/food-1.webp", label: "$60-wagyu-rice-bowl.jpg", x: 280.587, y: 652.207, tilt: -5.5 },
  { src: "/story/food-2.webp", label: "紅燒肉.jpg", x: 1004.587, y: 713.207, tilt: 4.5 },
  { src: "/story/food-3.webp", label: "canto-steamed-chicken.jpg", x: 283.587, y: 1182.207, tilt: 4 },
  { src: "/story/food-4.webp", label: "#we-have-it-at-home.jpg", x: 970.587, y: 1120.207, tilt: -4 },
];

const PRINCIPLES = [
  {
    title: "Good design feels invisible.",
    body: "It just works, without making you think about it.",
  },
  { title: "Prototype to test.", body: "A picture speaks a thousand words." },
  {
    title: "Keep asking why.",
    body: "Solve the problem behind the screen, not just the screen.",
  },
  {
    title: "We could all use some more personality.",
    body: "Functional is the baseline. Good design should also feel like something.",
  },
];

export default function StoryPage() {
  return (
    <>
      <TopNav />

      <main className={styles.page}>
        <img className={styles.portrait} src="/story/kid.webp" alt="Vicky as a child" />

        <div className={styles.intro}>
          <p>
            Hey! I&rsquo;m Vicky, a Taiwanese product designer based in sunny Los Angeles.
          </p>
          <p>
            I studied Design Media Arts at UCLA and now design products at Arena Club.
          </p>
          <p>
            Outside of work, I&rsquo;m usually cooking, painting, taking photos, or
            picking up a new craft. I also run a food account where I share the Taiwanese
            and Chinese food I grew up with.
          </p>
        </div>

        {/* Tucked inside the Instagram shot until you hover or tap it. */}
        <FoodScatter food={FOOD} />

        <h2 className={styles.principlesTitle} data-reveal="">My design principles</h2>

        <ul className={styles.principles}>
          {PRINCIPLES.map((p, i) => (
            <li
              key={p.title}
              className={styles.card}
              data-reveal=""
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
            >
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>

        <div className={styles.cta} data-reveal="">
          <p>Interested? Hit that email button.</p>
          <a className={styles.emailButton} href="mailto:vickyyjen@gmail.com">
            Email Button
          </a>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
