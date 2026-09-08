import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import CaseNav from "@/components/CaseNav";
import SiteFooter from "@/components/SiteFooter";
import styles from "./airbnb.module.css";

export const metadata: Metadata = {
  title: "Airbnb — Vicky Jen",
  description:
    "Redesigning Airbnb's map feature around local insights, so choosing where to stay in a new city stops being guesswork.",
};

const TRAVEL = [
  { src: "/case/airbnb/travel-hcmc.webp", label: "Ho Chi Minh City, Vietnam" },
  { src: "/case/airbnb/travel-uluwatu.webp", label: "Uluwatu, Bali, Indonesia" },
  { src: "/case/airbnb/travel-lazarus.webp", label: "Lazarus, Singapore" },
];

const QUESTIONS = [
  "Which area is most popular?",
  "Is there food near my airbnb?",
  "How will we get around the city?",
  "Is this neighborhood safe?",
];

const STATS = [
  { n: "59%", of: "of Airbnb users are 25–44", src: "Search Logistics" },
  { n: "77%", of: "choose Airbnb to live like a local", src: "Search Logistics" },
];

const QUOTES = [
  {
    q: "How do you currently find local insights about an area where you’re considering staying? Have you faced any challenges in this process?",
    a: "I usually end up searching on google maps or TikTok. It can be a hassle because I have to go to multiple apps to find this information.",
  },
  {
    q: "Can you share a specific instance where lack of local insights impacted your stay or experience in a destination?",
    a: "Once, I stayed in a perfect Airbnb, but it turned out to be quite far from lively areas and didn’t feel very safe at night.",
  },
];

const IDEAS = [
  {
    src: "/case/airbnb/idea-1.webp",
    n: "Approach 1",
    title: "A local insights feed",
    body: "Access hidden gems through a local insights feed recommended and verified by airbnb hosts.",
  },
  {
    src: "/case/airbnb/idea-2.webp",
    n: "Approach 2",
    title: "Community Spot Sharing",
    body: "Discover key attractions and insights at a glance with an intuitive, map-integrated exploration tool.",
  },
  {
    src: "/case/airbnb/idea-3.webp",
    n: "Approach 3",
    title: "Explorer Mode",
    body: "Discover key attractions and insights at a glance with an intuitive, map-integrated exploration tool.",
  },
];

const FINDINGS = [
  {
    n: "Finding 1",
    title: "The red color on the heat map reminds users of danger.",
    body: "Red reads as danger. The gradient needed to say density, not risk.",
  },
  {
    n: "Finding 2",
    title: "The map looks visually cluttered.",
    body: "Too many pins at once. Nobody could focus on the one thing they cared about.",
  },
  {
    n: "Finding 3",
    title: "Information feels out of date.",
    body: "No live data and no distances, so people didn't trust what they were looking at.",
  },
];

const FEATURES = [
  {
    n: "Feature 01",
    title: "Local Insights Density Heatmap",
    body: "A heat map of local attractions and eateries, so you can see at a glance which neighbourhoods have something going on.",
    src: "feature-1",
  },
  {
    n: "Feature 02",
    title: "Insight Type Filter Categories",
    body: "Dining, transportation, attractions, safety — filter the map down to the one thing you're actually asking about.",
    src: "feature-2",
  },
  {
    n: "Feature 03",
    title: "Live Data and Navigational Map Directions",
    body: "Live crowd levels and directions to each place, so the information holds up on the day.",
    src: "feature-3",
  },
];

const BUCKET = [
  { src: "/case/airbnb/bucket-reef.webp", label: "Great Barrier Reef in Australia" },
  { src: "/case/airbnb/bucket-lights.webp", label: "Northern Lights in Iceland" },
  { src: "/case/airbnb/bucket-surf.webp", label: "Surfing in Fiji Islands" },
];

export default function AirbnbCase() {
  return (
    <>
      <main className={styles.page}>
        {/* ---- hero ---- */}
        <header className={styles.hero} data-hero="">
          <video
            className={styles.heroArt}
            src="/case/airbnb/feature-1.mp4"
            poster="/case/airbnb/feature-1-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Explorer Mode on the Airbnb map"
          />
        </header>

        <BackLink />

        {/* ---- lede ---- */}
        <p className={styles.lede} data-reveal="">
          Redesigning Airbnb&rsquo;s map around local insights, so choosing where to stay
          in a new city stops being guesswork.
        </p>

        {/* ---- context ---- */}
        <dl className={styles.facts} data-reveal="">
          <div className={styles.fact}>
            <dt>Context</dt>
            <dd>
              <p>
                For my Kleiner Perkins 2024 Fellowship application, I did a case study on a
                problem that I personally encountered during my study abroad experience in
                Singapore.
              </p>
              <p>I was accepted into the KP fellowship with this case study.</p>
            </dd>
          </div>
        </dl>

        <div className={styles.body}>
          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Introduction</h2>
            <div className={styles.content}>
              <p>
                Airbnb has a listing for everywhere. Finding the right one is the hard
                part, especially in a city you don&rsquo;t know.
              </p>
              <p>
                I booked my way around Southeast Asia that year — Bali, Vietnam, the
                Philippines — and every booking came with the same guesswork. So I took
                the map feature apart and rebuilt it.
              </p>
              <ul className={styles.photos}>
                {TRAVEL.map((t) => (
                  <li key={t.src}>
                    <img src={t.src} alt={t.label} />
                    <span>{t.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Problem statement</h2>
            <div className={styles.content}>
              <h3>Finding the right airbnb in a foreign city is hard.</h3>
              <p>
                The same questions came up in every group chat, and the listing page never
                answered them. Guests book on a guess. Hosts are left describing their
                whole neighbourhood in a paragraph nobody reads.
              </p>
              <ul className={styles.chips}>
                {QUESTIONS.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>User analytics</h2>
            <div className={styles.content}>
              <h3>Users book through Airbnb for authentic local experiences.</h3>
              <p>
                People come to Airbnb to live somewhere rather than stay somewhere — and
                then get almost nothing about the somewhere.
              </p>
              <ul className={styles.stats}>
                {STATS.map((s) => (
                  <li key={s.n}>
                    <strong>{s.n}</strong>
                    <span>{s.of}</span>
                    <em>Source: {s.src}</em>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Qualitative research</h2>
            <div className={styles.content}>
              <h3>There are two types of users: research-oriented and spontaneous.</h3>
              <p>
                Five interviews, all Airbnb regulars aged 25 to 44. Two profiles came out
                of them: <strong>research-oriented users</strong>, who go off to other apps
                to vet a neighbourhood, and <strong>spontaneous users</strong>, who book on
                instinct and find out where they are on arrival.
              </p>
              <div className={styles.quotes}>
                {QUOTES.map((q) => (
                  <blockquote key={q.q}>
                    <p className={styles.ask}>{q.q}</p>
                    <p>&ldquo;{q.a}&rdquo;</p>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Quantitative research</h2>
            <div className={styles.content}>
              <h3>Both types of users want better methods to look for local insights.</h3>
              <p>
                Then a survey of 200 people. Only a third were happy with how they find
                local information today, and most of them were doing it somewhere other
                than Airbnb.
              </p>
              <div className={styles.pair}>
                <img className={styles.chart} src="/case/airbnb/chart-satisfaction.webp" alt="Satisfaction with current methods: 36%" />
                <img className={styles.chart} src="/case/airbnb/chart-methods.webp" alt="Current methods for finding local insights" />
              </div>
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Affinity map</h2>
            <div className={styles.content}>
              <h3>Users want more information regarding neighborhoods in foreign cities.</h3>
              <p>
                Mapping it all out, one gap ran through everything: people want to know
                what&rsquo;s around a listing, and the map is the obvious place to tell
                them.
              </p>
              <img className={styles.figure} src="/case/airbnb/affinity.webp" alt="The affinity map of interview and survey notes" />
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Goals</h2>
            <div className={styles.content}>
              <h3>
                Optimize Airbnb&rsquo;s interface with local information for improved
                decision-making.
              </h3>
              <p>
                Put the local knowledge in the map itself: faster decisions for guests,
                better-matched guests for hosts.
              </p>
              <div className={styles.pair}>
                <div className={styles.impact}>
                  <h4>Business impact</h4>
                  <p>
                    <strong>Retention.</strong> An easier search keeps people looking rather
                    than leaving.
                  </p>
                  <p>
                    <strong>Revenue.</strong> More time on the map means more bookings.
                  </p>
                </div>
                <div className={styles.impact}>
                  <h4>User impact</h4>
                  <p>Less decision fatigue</p>
                  <p>Less time wasted searching on third-party platforms</p>
                  <p>More local gems discovered</p>
                  <p>Better travel itineraries</p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Ideation</h2>
            <div className={styles.content}>
              <h3>
                How can we enhance Airbnb stay selections by providing comprehensive local
                neighborhood insights?
              </h3>
              <ul className={styles.ideas}>
                {IDEAS.map((i) => (
                  <li key={i.n}>
                    <img src={i.src} alt="" />
                    <p className={styles.kicker}>{i.n}</p>
                    <h4>{i.title}</h4>
                    <p>{i.body}</p>
                  </li>
                ))}
              </ul>
              <p>
                Approach 3 won: a heat map of where the good stuff is, with preview cards to
                browse it. It serves the planner and the improviser with the same screen.
              </p>
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>App audit</h2>
            <div className={styles.content}>
              <h3>The Airbnb map feature is limited.</h3>
              <p>
                The map today barely responds and tells you almost nothing about where you
                would be staying.
              </p>
              <img className={styles.figure} src="/case/airbnb/audit.webp" alt="An audit of the existing Airbnb map" />
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>User testing</h2>
            <div className={styles.content}>
              <h3>Gaining feedback from the community.</h3>
              <p>Five people used the prototype. Three things came back:</p>
              <img className={styles.figure} src="/case/airbnb/testing.webp" alt="The tested prototype of Explorer Mode" />
              <ul className={styles.findings}>
                {FINDINGS.map((f) => (
                  <li key={f.n}>
                    <p className={styles.kicker}>{f.n}</p>
                    <h4>{f.title}</h4>
                    <p>{f.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Final solutions</h2>
            <div className={styles.content}>
              <h3>Key features of &lsquo;Explorer Mode&rsquo;</h3>
              <p>Each one answers a finding.</p>
              {FEATURES.map((f) => (
                <div key={f.n} className={styles.feature}>
                  <p className={styles.kicker}>{f.n}</p>
                  <h4>{f.title}</h4>
                  <p>{f.body}</p>
                  <video
                    src={`/case/airbnb/${f.src}.mp4`}
                    poster={`/case/airbnb/${f.src}-poster.webp`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={f.title}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Measuring success</h2>
            <div className={styles.content}>
              <h3>Measuring results through &lsquo;Explorer Mode&rsquo;</h3>
              <p>I don&rsquo;t work at Airbnb, so this is what I&rsquo;d watch:</p>
              <ul className={styles.metrics}>
                <li>Bookings that start with a map interaction</li>
                <li>Retention of Explorer Mode users against everyone else</li>
                <li>Time spent in the map, before and after</li>
              </ul>
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Reflection</h2>
            <div className={styles.content}>
              <p>
                I wanted to fix half the app. Scoping it down to one problem, over several
                rounds, was most of the work — and the part I learned the most from.
              </p>
              <h4>For next time…</h4>
              <ul className={styles.metrics}>
                <li>Improve &lsquo;Explorer Mode&rsquo; search and discovery with themed filters.</li>
                <li>Enable offline map access for seamless navigation without internet.</li>
                <li>Promote sustainable travel by highlighting eco-friendly options.</li>
              </ul>
              <h4>Moving forward…</h4>
              <p>Keep testing it, keep cutting it back, keep travelling.</p>
              <h4>Travel bucket list</h4>
              <ul className={styles.photos}>
                {BUCKET.map((b) => (
                  <li key={b.src}>
                    <img src={b.src} alt={b.label} />
                    <span>{b.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <CaseNav
          prev={{ href: "/work/scallion-studios", label: "Scallion Studios" }}
          next={{
            href: "/work/ucla-football",
            label: "UCLA Football",
            bg: "/work-cards/ucla-football-bg.webp",
            shot: "/work-cards/ucla-football-art.webp",
          }}
        />

      </main>

      <SiteFooter />
    </>
  );
}
