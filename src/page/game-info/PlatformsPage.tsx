import Link from "next/link";
import {
  ArrowRight,
  Check,
  Cloud,
  Gamepad2,
  HelpCircle,
  Laptop,
  Monitor,
  ShieldCheck,
  X,
} from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { platformEntries, platformFacts } from "@/config/platforms";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/game-info/platforms.module.css";

const faq = [
  {
    question: "Which platforms will CONTROL Resonant launch on?",
    answer:
      "The September 24, 2026 digital launch covers Windows PC, PlayStation 5, Xbox Series X|S and Xbox on PC. GeForce NOW and Steam Deck launch support are also announced. Mac follows later in 2026.",
  },
  {
    question: "Is CONTROL Resonant on Game Pass?",
    answer:
      "No Game Pass inclusion has been announced in the official launch information checked on September 20, 2026. Xbox Play Anywhere support does not mean the game is part of the Game Pass library.",
  },
  {
    question: "What does Xbox Play Anywhere include?",
    answer:
      "A qualifying digital Xbox purchase can be played on Xbox console and Xbox on PC without buying it twice, with saves, add-ons and achievements carried between supported devices.",
  },
  {
    question: "Does CONTROL Resonant support Steam Deck?",
    answer:
      "Launch support is announced. A Valve Verified or Playable badge, measured frame rate, recommended preset and battery-life result still require final-build testing.",
  },
  {
    question: "Is CONTROL Resonant coming to Nintendo Switch 2?",
    answer:
      "No Nintendo Switch 2 version has been announced. The PC requirements do not confirm or rule out a future console port.",
  },
  {
    question: "Is GeForce NOW the same as Game Pass?",
    answer:
      "No. GeForce NOW streams supported games through connected stores and service availability, while Game Pass is a subscription game library. One does not confirm access through the other.",
  },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "Not announced") return <X aria-hidden="true" size={15} />;
  if (status === "Later") return <HelpCircle aria-hidden="true" size={15} />;
  return <Check aria-hidden="true" size={15} />;
}

export default function PlatformsPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "CONTROL Resonant Platforms",
            url: "https://controlresonant.org/game-info/platforms",
            dateModified: platformFacts.checkedAt,
            about: { "@type": "VideoGame", name: "CONTROL Resonant" },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Platforms", href: "/game-info/platforms" },
          ]),
        ]}
      />

      <HubHero
        eyebrow="Game info / platform access"
        title="CONTROL Resonant Platforms — Where and How You Can Play"
        description="Compare every announced platform, release window and access method, then separate Xbox Play Anywhere from Game Pass and launch support from final performance testing."
        image="/images/home/dylan-manhattan.jpg"
        imageAlt="Dylan Faden standing in CONTROL Resonant's distorted Manhattan"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Platforms" }]}
        action={<a href="#platform-matrix">Compare platforms ↓</a>}
      />

      <div className={`container ${styles.page}`}>
        <section className={styles.answer} aria-labelledby="platform-answer">
          <div>
            <span className={styles.kicker}>Direct answer</span>
            <h2 id="platform-answer">
              PC, PS5 and Xbox launch first; Mac follows later
            </h2>
            <p>
              The digital launch is September 24, 2026. Steam Deck and GeForce
              NOW support are announced for launch, while Nintendo Switch 2 and
              Game Pass are not announced. Those last two are status answers,
              not predictions about what Remedy may do later.
            </p>
          </div>
          <dl className={styles.signalBoard}>
            <div>
              <dt>Launch date</dt>
              <dd>24 SEP 2026</dd>
            </div>
            <div>
              <dt>Launch systems</dt>
              <dd>PC · PS5 · XBOX</dd>
            </div>
            <div>
              <dt>Later</dt>
              <dd>MAC · 2026</dd>
            </div>
            <div>
              <dt>Last checked</dt>
              <dd>20 SEP 2026</dd>
            </div>
          </dl>
        </section>

        <section className={styles.matrix} id="platform-matrix">
          <header className={styles.sectionHeader}>
            <div>
              <span>01 / Platform matrix</span>
              <h2>Choose a platform by access, not by logo</h2>
            </div>
            <p>
              Release timing is only part of the decision. Purchase model,
              cross-device access and the information still missing can change
              which version fits you.
            </p>
          </header>
          <div
            className={styles.tableWrap}
            role="region"
            aria-label="CONTROL Resonant platform and access comparison"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Status</th>
                  <th>How access works</th>
                  <th>Why choose it</th>
                  <th>Still unknown</th>
                </tr>
              </thead>
              <tbody>
                {platformEntries.map((entry) => (
                  <tr key={entry.name}>
                    <th>
                      {entry.name}
                      <small>{entry.timing}</small>
                    </th>
                    <td>
                      <span
                        className={`${styles.status} ${entry.status === "Not announced" ? styles.statusMissing : ""}`}
                      >
                        <StatusIcon status={entry.status} /> {entry.status}
                      </span>
                    </td>
                    <td>{entry.access}</td>
                    <td>{entry.playerValue}</td>
                    <td>{entry.openQuestion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.decisionSection}>
          <header className={styles.sectionHeader}>
            <div>
              <span>02 / Fast decisions</span>
              <h2>Start with the way you want to play</h2>
            </div>
            <p>
              These are practical routes through the confirmed information, not
              universal rankings of one platform over another.
            </p>
          </header>
          <div className={styles.decisionGrid}>
            <article>
              <Monitor aria-hidden="true" />
              <span>Highest graphics control</span>
              <h3>Windows PC</h3>
              <p>
                Choose PC for the widest rendering options, but compare your CPU
                and GPU against the published targets before buying.
              </p>
              <Link href="/game-info/system-requirements">
                Compare PC requirements <ArrowRight size={15} />
              </Link>
            </article>
            <article>
              <Gamepad2 aria-hidden="true" />
              <span>Published console modes</span>
              <h3>PlayStation 5</h3>
              <p>
                PS5 has the clearest published console-mode information. PS5 Pro
                adds a 40fps Balanced option that requires a 120Hz display.
              </p>
              <Link href="/game-info/system-requirements#console-modes">
                See PlayStation modes <ArrowRight size={15} />
              </Link>
            </article>
            <article>
              <Laptop aria-hidden="true" />
              <span>Console and PC continuity</span>
              <h3>Xbox Play Anywhere</h3>
              <p>
                A qualifying digital Xbox purchase is the confirmed route for
                playing across Xbox console and Xbox on PC with shared progress.
              </p>
              <a href="#xbox-access">
                Understand the entitlement <ArrowRight size={15} />
              </a>
            </article>
            <article>
              <Cloud aria-hidden="true" />
              <span>Portable or remote play</span>
              <h3>Deck and cloud</h3>
              <p>
                Steam Deck support and GeForce NOW are announced, but neither
                statement is a measured-performance guarantee for your setup.
              </p>
              <a href="#portable-play">
                Check the remaining limits <ArrowRight size={15} />
              </a>
            </article>
          </div>
        </section>

        <section className={styles.accessSection} id="xbox-access">
          <header className={styles.sectionHeader}>
            <div>
              <span>03 / Xbox access</span>
              <h2>Xbox Play Anywhere is not Game Pass</h2>
            </div>
            <p>
              The names appear together in Xbox searches, but they answer two
              different buying questions.
            </p>
          </header>
          <div className={styles.accessCompare}>
            <article>
              <div className={styles.accessLabel}>
                <ShieldCheck aria-hidden="true" /> Confirmed at launch
              </div>
              <h3>Xbox Play Anywhere</h3>
              <p>{platformFacts.playAnywhere}</p>
              <ul>
                <li>It is attached to a qualifying digital purchase.</li>
                <li>It covers Xbox console and Xbox on PC access.</li>
                <li>It carries saves, add-ons and achievements.</li>
              </ul>
            </article>
            <article>
              <div className={`${styles.accessLabel} ${styles.unconfirmed}`}>
                <HelpCircle aria-hidden="true" /> Not announced
              </div>
              <h3>Game Pass</h3>
              <p>{platformFacts.gamePass}</p>
              <ul>
                <li>Play Anywhere does not place a game in a subscription.</li>
                <li>
                  No Game Pass tier should be recommended for this game yet.
                </li>
                <li>
                  A future catalog addition remains possible, not confirmed.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.portableSection} id="portable-play">
          <header className={styles.sectionHeader}>
            <div>
              <span>04 / Portable and cloud play</span>
              <h2>Steam Deck, GeForce NOW and Mac support</h2>
            </div>
            <p>
              A platform announcement tells you that a route exists. It does not
              establish frame rate, battery life, queue time or regional
              availability.
            </p>
          </header>
          <div className={styles.factRows}>
            <article>
              <span>Steam Deck</span>
              <h3>Launch support is announced</h3>
              <p>
                {platformFacts.steamDeck} Do not convert desktop GPU targets
                into an expected Deck frame rate.
              </p>
            </article>
            <article>
              <span>GeForce NOW</span>
              <h3>Cloud support is a separate access route</h3>
              <p>
                A supported store copy, connected account, suitable service plan
                and regional availability still matter. It is not a Game Pass
                entitlement.
              </p>
            </article>
            <article>
              <span>Mac</span>
              <h3>The release comes later in 2026</h3>
              <p>
                Steam and Mac App Store plans are announced, but there is no
                exact launch day or final Mac hardware chart yet.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.boundarySection}>
          <div>
            <span>05 / No version announced</span>
            <h2>Nintendo Switch 2 has no confirmed release</h2>
            <p>
              {platformFacts.switch2} Retail placeholders, hardware comparisons
              and another Remedy game appearing on Nintendo hardware would not
              confirm this version.
            </p>
          </div>
          <aside>
            <strong>What would change this answer?</strong>
            <ol>
              <li>An announcement from Remedy or Nintendo</li>
              <li>An official Nintendo store listing</li>
              <li>A platform trailer or dated release notice</li>
            </ol>
          </aside>
        </section>

        <section className={styles.faq} aria-labelledby="platform-faq">
          <header className={styles.sectionHeader}>
            <div>
              <span>Quick answers</span>
              <h2 id="platform-faq">CONTROL Resonant platform FAQ</h2>
            </div>
          </header>
          <div className={styles.faqGrid}>
            {faq.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <nav
          className={styles.continue}
          aria-label="Continue checking game information"
        >
          <div>
            <span>Choose the next check</span>
            <strong>Confirm timing or compare your hardware.</strong>
          </div>
          <div>
            <Link href="/game-info/release-date">
              Release schedule <ArrowRight size={16} />
            </Link>
            <Link href="/tools">
              Check your PC <ArrowRight size={16} />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
