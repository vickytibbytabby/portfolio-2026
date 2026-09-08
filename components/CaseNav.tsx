import Link from "next/link";
import styles from "./CaseNav.module.css";

type Step = {
  href: string;
  /** The project's name, as it reads after "Previous" / "Next project". */
  label: string;
};

type NextStep = Step & {
  /** The tilted thumbnail. Both layers, as the work cards build them. */
  bg?: string;
  shot?: string;
};

/**
 * The foot of a case study: where you came from on the left, where you're going
 * on the right. The first study has nothing behind it, so `prev` is optional —
 * `next` then keeps its own side rather than drifting into the middle.
 */
export default function CaseNav({ prev, next }: { prev?: Step; next: NextStep }) {
  return (
    <nav className={styles.nav} aria-label="More work" data-reveal="">
      {prev ? (
        <Link href={prev.href} className={styles.prev}>
          <Arrow className={styles.prevArrow} back />
          <span>
            <span className={styles.kicker}>Previous:</span> {prev.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      <Link href={next.href} className={styles.next}>
        {next.bg && (
          <span className={styles.thumb}>
            <img src={next.bg} alt="" />
            {next.shot && <img className={styles.shot} src={next.shot} alt="" />}
          </span>
        )}
        <span>
          <span className={styles.kicker}>Next:</span> {next.label}
        </span>
        <Arrow className={styles.nextArrow} />
      </Link>
    </nav>
  );
}

function Arrow({ className, back }: { className: string; back?: boolean }) {
  return (
    <svg viewBox="0 0 54 23" aria-hidden="true" className={className}>
      <path
        d={back ? "M53 11.5H2M2 11.5 12 2M2 11.5 12 21" : "M1 11.5h51M52 11.5 42 2M52 11.5 42 21"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
