import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import BackLink from "@/components/BackLink";
import Lede from "./Lede";
import ProjectTabs from "./ProjectTabs";
import styles from "./case.module.css";

export const metadata: Metadata = {
  title: "Arena Club — Vicky Jen",
  description:
    "Rethinking the Arena Club homepage around the collector: what's yours, what's changed, what's new.",
};

const TOOLS = [
  { src: "/case/arena/tool-figma.webp", name: "Figma" },
  { src: "/case/arena/tool-claude.webp", name: "Claude" },
  { src: "/case/arena/tool-codex.webp", name: "Codex" },
  { src: "/case/arena/tool-openai.webp", name: "ChatGPT" },
  { src: "/case/arena/tool-cursor.webp", name: "Cursor" },
];

/** The homepage: the old app beside the recording of the redesign. */
function HomepagePanel() {
  return (
    <section className={styles.compare} aria-label="Before and after">
      <div className={styles.compareCol}>
        <p className={styles.compareLabel}>Before</p>
        <video
          className={styles.beforeShot}
          src="/case/arena/before.mp4"
          poster="/case/arena/before-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="The Arena Club homepage before the redesign"
        />
      </div>
      <div className={styles.compareCol}>
        <p className={styles.compareLabel}>After</p>
        <HomeVideo className={styles.afterShot} />
      </div>
    </section>
  );
}

/**
 * A before/after pair where both sides are in the same iPhone mockup.
 *
 * The chassis was lifted out of the Slab Packs mockup and every other shot is
 * composited into its screen, so the two sides line up exactly — same body,
 * same bezel, same corner radius. They also share one class, so nothing can
 * make one bigger than the other.
 */
function FramedPair({
  slug,
  before,
  after,
}: {
  slug: string;
  before: string;
  after: string;
}) {
  return (
    <section className={styles.compare} aria-label="Before and after">
      <div className={styles.compareCol}>
        <p className={styles.compareLabel}>Before</p>
        <img className={styles.framedShot} src={`/case/arena/${slug}-before.webp`} alt={before} />
      </div>
      <div className={styles.compareCol}>
        <p className={styles.compareLabel}>After</p>
        <video
          className={styles.framedShot}
          src={`/case/arena/${slug}-after.mp4`}
          poster={`/case/arena/${slug}-after-poster.webp`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={after}
        />
      </div>
    </section>
  );
}

/** The homepage recording, reused wherever the design showed its still. */
function HomeVideo({ className }: { className: string }) {
  return (
    <div className={className}>
      <video
        src="/work-cards/arena-club.mp4"
        poster="/work-cards/arena-club-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="The redesigned Arena Club homepage"
      />
    </div>
  );
}

/** The homepage write-up: everything under the before/after panel. */
function HomepageBody() {
  return (
    <>
        <section className={styles.row} data-reveal="">
          <h2 className={styles.label}>The problem</h2>
          <div className={styles.content}>
            <h3>Arena Club is growing beyond sports/pokémon trading cards.</h3>
            <p>
              Arena Club is expanding into watches, coins, wine, and other collectibles.
              As the marketplace grows, our users&rsquo; interests become increasingly
              different.
            </p>
            <p>
              But our homepage still largely shows everyone the same repeated content
              that already exists elsewhere in the product.
            </p>
            <p>
              Experienced collectors often skip Home entirely and go straight to Packs,
              where they can find the same content with less scrolling.
            </p>
          </div>
        </section>

        <section className={styles.row} data-reveal="">
          <h2 className={styles.label}>Current data</h2>
          <div className={styles.content}>
            <h3>So... what should Home actually be for?</h3>
            <p>
              Looking at the existing homepage, In the first two pack sections, only 15%
              of users who click successfully convert and purchase a pack.
            </p>
            <p>
              The Buy Again section gets a fraction of those clicks, yet 50% convert.{" "}
              <strong>Which is 3× better conversion per click.</strong>
            </p>
            <div className={styles.figureCrop}>
              <img src="/case/arena/buyagain.webp" alt="The existing homepage next to the Buy Again section" />
            </div>
          </div>
        </section>

        <section className={styles.row} data-reveal="">
          <div className={styles.labelStack}>
            <h2 className={styles.label}>User testing process</h2>
            <div className={styles.labelTools}>
              <img className={styles.toolTilt} src="/case/arena/tool-claude.webp" alt="Claude" />
              <img className={styles.toolTiltB} src="/case/arena/tool-cursor.webp" alt="Cursor" />
            </div>
          </div>
          <div className={styles.content}>
            <h3>
              Instead of asking users what they want, I gave them a functional prototype
              to use and play with.
            </h3>
            <p>
              I built a V1 of a redesigned homepage with Claude code and published it to
              vercel to give a select cohort of users acces
            </p>
            <div className={styles.protoPanel}>
              <img className={styles.protoA} src="/case/arena/proto-a.webp" alt="" />
              <img className={styles.protoB} src="/case/arena/proto-b.webp" alt="" />
              <img className={styles.protoC} src="/case/arena/proto-c.webp" alt="" />
            </div>
            <p>
              I sent it to 45 Arena Club users and track every major interaction, what
              they click, what they ignore, and how they move through the page.
            </p>
            <p>
              The experience ends with a survey, followed by 11 user interviews to
              understand the behavior I&rsquo;m seeing.
            </p>
          </div>
        </section>

        <section className={styles.row} data-reveal="">
          <h2 className={styles.label}>Software Sidequest</h2>
          <div className={styles.content}>
            <p>
              To track and analyze these events and data, I used my user research log
              tool, also built fully with claude code, which I have been using to track
              and keep all my research and insights in one place.
            </p>
            <img className={styles.figure} src="/case/arena/log-1.webp" alt="The research log tool" />
            <img className={styles.figure} src="/case/arena/log-2.webp" alt="Interview transcripts and affinity mapping" />
          </div>
        </section>

        <section className={styles.row} data-reveal="">
          <h2 className={styles.label}>What I learned</h2>
          <div className={styles.content}>
            <h3>Home doesn&rsquo;t need more content. It needs more relevance.</h3>
            <p>Users don&rsquo;t need another place to browse the same inventory.</p>
            <p>
              What they want is an easier way to keep up with the things they already
              care about.
            </p>
            <p>
              Today, watchlists, offers, and auctions are spread across the product.
              Some collectors even rely on phone alarms, spreadsheets, and bookmarked
              filters to keep track.
            </p>
            <p>
              The research surfaces opportunities like saved searches, favorite packs,
              watchlist price changes, auctions ending soon, new listings, and active
              auctions.
            </p>
            <h3>
              Home can understand what I care about, what needs my attention, and what I
              might want next.
            </h3>
          </div>
        </section>

        <section className={styles.row} data-reveal="">
          <h2 className={styles.label}>Biggest challenge</h2>
          <div className={styles.content}>
            <h3>How do I show more without making Home feel overwhelming?</h3>
            <p>
              Once I knew what belonged on Home, the challenge became fitting it all
              together. More sections created more opportunities for discovery, but they
              also created more noise.
            </p>
            <p>
              I designed the first version around an MVP that could start learning what
              each collector cared about and eventually power deeper personalization. At
              the same time, I stripped back repetitive UI, unnecessary copy, and
              competing actions so the collectibles themselves could do more of the work.
            </p>
            <p>
              The goal wasn&rsquo;t to show everything. It was to learn what was worth
              showing each user.
            </p>
          </div>
        </section>

        <section className={styles.row} data-reveal="">
          <h2 className={styles.label}>The solution</h2>
          <div className={styles.content}>
            <h3>
              A homepage built around the collector.
              <br />
              What&rsquo;s yours &rarr; What&rsquo;s changed &rarr; What&rsquo;s new
            </h3>
            <div className={styles.solutionPanel}>
              <HomeVideo className={styles.solutionShot} />
            </div>
            <div className={styles.steps}>
              <p>
                01 / Pick up where you left off
                <br />
                <span>&nbsp;Bring time-sensitive activity like auctions and watchlist changes forward.</span>
              </p>
              <p>
                02 / Built around your interests
                <br />
                <span>&nbsp;Shape Home around the categories and collectibles each user cares about.</span>
              </p>
              <p>
                03 / Make discovery relevant
                <br />
                <span>&nbsp;Keep new inventory discoverable without making it the entire purpose of Home.</span>
              </p>
              <p>
                04 / Built to grow
                <br />
                <span>&nbsp;Add new categories without turning Home into an increasingly long, generic feed.</span>
              </p>
              <p>
                The research doesn&rsquo;t just tell us which sections to add. It gives
                Home a reason to exist and role in the user&rsquo;s journey when they
                enter the app.
              </p>
            </div>
          </div>
        </section>
    </>
  );
}

export default function ArenaClubCase() {
  return (
    <>
      <main className={styles.page}>
        {/* ---- hero ---- */}
        <header className={styles.hero} data-hero="">
          <video
            className={styles.heroArt}
            src="/case/arena/hero.mp4"
            poster="/case/arena/hero-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="An Arena Club Slab Pack turning"
          />
        </header>

        {/* pinned to the corner rather than parked on the hero */}
        <BackLink />

        {/* ---- lede ---- */}
        <Lede />

        {/* ---- facts ---- */}
        <dl className={styles.facts} data-reveal="">
          <div className={styles.fact}>
            <dt>What&rsquo;s Arena Club?</dt>
            <dd>
              Arena Club is the home built for collectors who live to chase. An all-in-one
              platform where sports cards, Trading Card Games, and other collectibles are
              bought, sold, traded, graded, vaulted, and ripped.
            </dd>
          </div>
          <div className={styles.fact}>
            <dt>My role</dt>
            <dd>
              I designed on all consumer facing features, but the following are core
              projects that transformed the design of the product.
            </dd>
          </div>
          <div className={styles.fact}>
            <dt>Everyday tools</dt>
            <dd className={styles.tools}>
              {TOOLS.map((t) => (
                <span key={t.src} className={styles.tool}>
                  <img src={t.src} alt={t.name} />
                  <span className={styles.toolName}>{t.name}</span>
                </span>
              ))}
            </dd>
          </div>
        </dl>

        {/* ---- body ---- */}
        <div className={styles.body}>
          <ProjectTabs
            tabs={[
              { name: "Homepage", panel: <HomepagePanel />, body: <HomepageBody /> },
              {
                name: "Slab Packs®",
                panel: (
                  <FramedPair
                    slug="slab"
                    before="The Slab Packs page before the redesign"
                    after="The redesigned Slab Packs flow"
                  />
                ),
              },
              {
                name: "Offers",
                panel: (
                  <FramedPair
                    slug="offers"
                    before="The Offers page before the redesign"
                    after="The redesigned Offers flow"
                  />
                ),
              },
              { name: "Showrooms" },
            ]}
          />
        </div>

        {/* ---- next ---- */}
        <Link href="/work/scallion-studios" className={styles.next} data-reveal="">
          <span className={styles.nextThumb}>
            <img src="/case/arena/next-bg.webp" alt="" />
            <img className={styles.nextShot} src="/case/arena/next-shot.webp" alt="" />
          </span>
          Next project: Scallion Studios recipe app
          <svg viewBox="0 0 54 23" aria-hidden="true" className={styles.nextArrow}>
            <path
              d="M1 11.5h51M52 11.5 42 2M52 11.5 42 21"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </main>

      <SiteFooter />
    </>
  );
}
