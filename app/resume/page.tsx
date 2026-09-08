import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import TopNav from "@/components/TopNav";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Resume — Vicky Jen",
  description: "Vicky Jen — product designer in Los Angeles.",
};

/**
 * The resume as a page rather than a link straight to the PDF.
 *
 * A browser set to download PDFs — Chrome's default on plenty of machines, and
 * most phones — saves the file instead of showing it, whatever the link and the
 * headers say. A page always opens, so the resume is a rendered page image here
 * and the PDF hangs off it for anyone who wants the file.
 */
export default function ResumePage() {
  return (
    <>
      <TopNav />

      <main className={styles.page}>
        <div className={styles.bar}>
          <h1 className={styles.title}>Resume</h1>
          <a className={styles.download} href="/resume.pdf" download="Vicky Jen Resume.pdf">
            Download PDF
          </a>
        </div>

        <img
          className={styles.sheet}
          src="/resume-page-1.webp"
          alt="Vicky Jen's resume"
          width={1600}
          height={2070}
        />
      </main>

      <SiteFooter />
    </>
  );
}
