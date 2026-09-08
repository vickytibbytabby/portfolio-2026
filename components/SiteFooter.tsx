import styles from "./SiteFooter.module.css";

/** The resume is a download; the rest open. */
const LINKS = [
  { label: "Email", href: "mailto:vickyyjen@gmail.com" },
  { label: "Resume", href: "/resume.pdf" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/vickyjen" },
];

/** Shared foot of the sub-pages: name and a nudge on the left, links right. */
export default function SiteFooter() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner} data-reveal="">
        <div className={styles.name}>
          <p className={styles.big}>Vicky Jen</p>
          <p className={styles.small}>Let&rsquo;s chat!</p>
        </div>

        <nav className={styles.links} aria-label="Get in touch">
          {LINKS.map((l) => (
            <a
              key={l.label}
              className={styles.link}
              href={l.href}
              {...(l.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              {...(l.href.endsWith(".pdf")
                ? { download: "Vicky Jen Resume.pdf", type: "application/pdf" }
                : {})}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
