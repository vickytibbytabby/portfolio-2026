import type { CSSProperties } from "react";
import styles from "./Contact.module.css";

const EMAIL = "vickyyjen@gmail.com";

/** The resume is a download; the rest open. */
const LINKS = [
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "Resume", href: "/resume.pdf" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/vickyjen" },
];

export default function Contact() {
  return (
    <footer id="contact" className={`inset ${styles.section}`}>
      <h2 className={`sectionTitle ${styles.title}`} data-reveal="">
        Let&rsquo;s Chat!
      </h2>

      <nav
        className={styles.links}
        aria-label="Get in touch"
        data-reveal=""
        style={{ "--reveal-delay": "90ms" } as CSSProperties}
      >
        {LINKS.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <a
              key={link.label}
              className={styles.link}
              href={link.href}
              {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              {...(link.href.endsWith(".pdf") ? { download: "" } : {})}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </footer>
  );
}
