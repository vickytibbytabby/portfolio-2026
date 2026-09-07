import Link from "next/link";
import TopNav from "./TopNav";
import styles from "./PagePlaceholder.module.css";

/**
 * Holds a route open while its Figma frame is still out of reach.
 *
 * The nav and the work card already link here, so the alternative was a 404.
 * Replace the whole component with the real page — it isn't a layout anything
 * else depends on.
 */
export default function PagePlaceholder({ title, note }: { title: string; note: string }) {
  return (
    <>
      <TopNav />
      <main className={`inset ${styles.page}`}>
        <h1 className="sectionTitle">{title}</h1>
        <p className={styles.note}>{note}</p>
        <p>
          <Link className={styles.back} href="/">
            &larr; Back
          </Link>
        </p>
      </main>
    </>
  );
}
