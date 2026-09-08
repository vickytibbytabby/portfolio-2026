import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import TopNav from "@/components/TopNav";
import Unlock from "./Unlock";
import styles from "./locked.module.css";

export const metadata: Metadata = {
  title: "Arena Club — Vicky Jen",
  description: "This case study is password protected.",
  robots: { index: false },
};

export default function LockedPage() {
  return (
    <>
      <TopNav />

      <main className={styles.page}>
        <h1 className={styles.title}>This one&rsquo;s under wraps.</h1>
        <p className={styles.note}>
          The Arena Club study covers work that isn&rsquo;t public yet. Drop me a line and
          I&rsquo;ll send the password over.
        </p>
        <Unlock />
      </main>

      <SiteFooter />
    </>
  );
}
