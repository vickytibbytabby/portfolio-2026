import FolderCollage from "./FolderCollage";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      {/* A stage with the exact proportions of the Figma frame (1512 x 982),
          scaled by --u to fit the window. Everything inside is positioned as a
          % of it, so the composition never stretches — on a wide, short window
          the whole collage shrinks instead of the photos growing into each
          other. */}
      <div className={styles.stage}>
        <FolderCollage />

        <div className={styles.copy}>
          <p>Hey, im vicky. A product designer based in Los Angeles.</p>
          <p>I&rsquo;m currently designing for collectors @ Arena Club.</p>
        </div>
      </div>
    </section>
  );
}
