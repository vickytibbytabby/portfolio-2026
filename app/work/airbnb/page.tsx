import type { Metadata } from "next";
import Link from "next/link";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import styles from "./airbnb.module.css";

export const metadata: Metadata = {
  title: "Airbnb — Vicky Jen",
  description:
    "Redesigning Airbnb's map feature around local insights, so choosing where to stay in a new city stops being guesswork.",
};

const FACTS = [
  { q: "Role", a: "Product Designer" },
  { q: "Tools", a: "Figma, Google Forms" },
  { q: "Timeline", a: "January 2024" },
];

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
  { n: "59%", of: "Airbnb users are aged 25–44", src: "Search Logistics" },
  { n: "77%", of: "Guests say they choose airbnb to live like locals", src: "Search Logistics" },
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
    body: "Red is often associated with danger, suggesting a need for a more intuitive gradient.",
  },
  {
    n: "Finding 2",
    title: "The map looks visually cluttered.",
    body: "The abundance of pins on the map made it hard to focus on specific interests like safety or food.",
  },
  {
    n: "Finding 3",
    title: "Information feels out of date.",
    body: "Without real-time information or information about the distance from and to restaurants and attractions, users felt that the information was unreliable and out of date.",
  },
];

const FEATURES = [
  {
    n: "Feature 01",
    title: "Local Insights Density Heatmap",
    body: "This feature displays a heatmap of local attractions and eateries, guiding users to high-density neighborhoods for deeper exploration and informed stay decisions.",
    src: "feature-1",
  },
  {
    n: "Feature 02",
    title: "Insight Type Filter Categories",
    body: "Introducing distinct categories such as dining, transportation, attractions, and safety to facilitate targeted and a visually simple interface.",
    src: "feature-2",
  },
  {
    n: "Feature 03",
    title: "Live Data and Navigational Map Directions",
    body: "Enhanced exploration by integrating live crowd level data and providing mapped directions to each location.",
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

        <BackLink heroInk="dark" />

        {/* ---- lede ---- */}
        <p className={styles.lede} data-reveal="">
          Redesigning the Airbnb map feature to streamline user decision-making by
          integrating accessible local insights, simplifying the search for the perfect
          stay.
        </p>

        {/* ---- facts ---- */}
        <dl className={styles.facts} data-reveal="">
          {FACTS.map((f) => (
            <div key={f.q} className={styles.fact}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.body}>
          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Introduction</h2>
            <div className={styles.content}>
              <p>
                Airbnb offers a vast selection of unique places to stay and things to do
                worldwide, but finding the right fit can be tough, especially in new
                cities. Travelers often struggle to match their needs with available
                options, and the limited information can result in choices that don&rsquo;t
                meet expectations.
              </p>
              <p>
                During my study abroad program in Singapore, I explored Southeast Asia,
                visiting bucket-list destinations like Bali, Vietnam, and the Philippines
                through Airbnb. Inspired by this experience, I embarked on a personal
                passion project to redesign a key aspect of the Airbnb booking
                process&mdash;the map feature. My aim was to streamline the decision-making
                journey for users, enhancing the efficiency of selecting the perfect place
                to stay.
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
                A key challenge I encountered during these trips was choosing the right
                Airbnb when navigating foreign cities. Many questions regarding the
                neighborhood of the Airbnb popped up in groupchats.
              </p>
              <p>
                For guests, the primary concern is to make a decision that aligns with
                their preferences and travel itineraries; the lack of information can lead
                to a mismatch between expectation and reality.
              </p>
              <p>
                For hosts, they may face the challenge of highlighting the unique
                advantages of their location to attract potential guests. This is currently
                done through a lengthy written description.
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
                With Airbnb&rsquo;s younger audience seeking authentic local experiences,
                the platform&rsquo;s current lack of detailed local insights limits
                travelers&rsquo; ability to fully immerse with their destinations. Bridging
                this information gap will enable users to choose the right airbnb for them.
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
                To gain deeper insights, I conducted five comprehensive interviews with
                individuals aged between 25 and 44, all of whom have prior experience using
                Airbnb.
              </p>
              <p>
                The interviews revealed two main user profiles: <strong>Research-Oriented
                Users</strong>, who use third-party platforms to gather information about
                their Airbnb location, and <strong>Spontaneous Users</strong>, who tend to
                book impulsively, often finding themselves in unexpected areas.
              </p>
              <ul className={styles.faces}>
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>
                    <img src={`/case/airbnb/face-${i}.webp`} alt="" />
                  </li>
                ))}
              </ul>
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
                To get a broader understanding of user perspectives, I carried out an online
                survey with 200 participants to assess their preferences for local insights
                and how these insights might influence their Airbnb booking choices.
              </p>
              <div className={styles.pair}>
                <img src="/case/airbnb/chart-satisfaction.webp" alt="Satisfaction with current methods: 36%" />
                <img src="/case/airbnb/chart-methods.webp" alt="Current methods for finding local insights" />
              </div>
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Affinity map</h2>
            <div className={styles.content}>
              <h3>Users want more information regarding neighborhoods in foreign cities.</h3>
              <p>
                This affinity map revealed a significant gap in providing detailed local
                insights. The insights gathered suggested solutions such as enhancing
                Airbnb&rsquo;s map feature by offering local insights and real-time local
                information to improve user experience and satisfaction.
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
                My key design goal is to streamline Airbnb&rsquo;s interface and enrich it
                with accessible local insights, simplifying the user decision-making
                process, boosting platform engagement and satisfaction.
              </p>
              <p>
                For guests, the aim is to enable faster and more efficient discovery of
                suitable accommodations. For hosts, the focus is on improving property
                visibility through enhanced functionalities and attracting guests whose
                preferences align with what the property offers.
              </p>
              <div className={styles.pair}>
                <div className={styles.impact}>
                  <h4>Business impact</h4>
                  <p>
                    <strong>Increased user retention.</strong> Simplifying discovery with the
                    map feature encourages users to stay longer and return, reducing
                    drop-offs.
                  </p>
                  <p>
                    <strong>Revenue growth.</strong> Improved map engagement leads to more
                    bookings, directly increasing Airbnb&rsquo;s earnings.
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
                Based on user research and pain points, I chose approach 3,
                &lsquo;Explorer Mode&rsquo;, to meet our users&rsquo; varied needs, from
                planners to explorers. This feature uses a heat map to show the density of
                local insights along with preview cards to browse images of the location.
              </p>
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>App audit</h2>
            <div className={styles.content}>
              <h3>The Airbnb map feature is limited.</h3>
              <p>
                Before starting my design process, I reviewed Airbnb&rsquo;s map feature and
                identified shortcomings such as the non-interactive interface and scarce
                information, making it hard for users to find suitable accommodations.
              </p>
              <img className={styles.figure} src="/case/airbnb/audit.webp" alt="An audit of the existing Airbnb map" />
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>User testing</h2>
            <div className={styles.content}>
              <h3>Gaining feedback from the community.</h3>
              <p>
                To refine and improve the design, I conducted user testing with 5
                participants, resulting in three key findings:
              </p>
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
              <p>
                Based on these findings, I created product solutions specific to the pain
                points found during the user testing.
              </p>
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
              <p>
                Although I do not work at Airbnb, I&rsquo;m confident this idea could
                succeed with proper validation and iteration. Success metrics could include:
              </p>
              <ul className={styles.metrics}>
                <li># of bookings made directly from &lsquo;Explorer Mode&rsquo; map interactions</li>
                <li># of users retained, comparing &lsquo;Explorer Mode&rsquo; users against non-map users</li>
                <li># of hours users spend in the map feature with &lsquo;Explorer Mode&rsquo; compared to previous levels</li>
              </ul>
            </div>
          </section>

          <section className={styles.row} data-reveal="">
            <h2 className={styles.label}>Reflection</h2>
            <div className={styles.content}>
              <p>
                As an active user of Airbnb, there were many features I wanted to explore and
                address inspired by my travels in Southeast Asia. But ultimately I had to
                scope it down to one problem to dive deeper on. This study was the result of
                multiple rounds of problem definition and scoping of issues. Overall, the
                process was both rewarding and personally meaningful.
              </p>
              <h4>For next time…</h4>
              <ul className={styles.metrics}>
                <li>Improve &lsquo;Explorer Mode&rsquo; search and discovery with themed filters.</li>
                <li>Enable offline map access for seamless navigation without internet.</li>
                <li>Promote sustainable travel by highlighting eco-friendly options.</li>
              </ul>
              <h4>Moving forward…</h4>
              <p>
                My focus is on continuous improvement — gathering feedback, refining the
                solution, and exploring new enhancements to better the Airbnb experience,
                making every travel experience memorable.
              </p>
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

        {/* ---- next ---- */}
        <Link href="/#works" className={styles.next} data-reveal="">
          <span className={styles.nextThumb}>
            <img src="/work-cards/ucla-football-bg.webp" alt="" />
            <img className={styles.nextShot} src="/work-cards/ucla-football-art.webp" alt="" />
          </span>
          Next project: UCLA Football new recruits illustration
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
