import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { buyingFacts } from "@/config/buying";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/game-info/game-info-detail.module.css";

const faq = [
  {
    question: "How much RAM does CONTROL Resonant need?",
    answer:
      "The final Minimum and Recommended PC specifications both list 16 GB of RAM.",
  },
  {
    question: "Does CONTROL Resonant require an SSD?",
    answer:
      "Yes. The final PC requirements specify an SSD and 120 GB of available storage.",
  },
  {
    question: "Can a GTX 1070 run CONTROL Resonant?",
    answer:
      "A GeForce GTX 1070 appears in the Minimum configuration for a 1080p/30fps Low target using Quality upscaling with ray tracing disabled. That is a published target, not a guarantee for every system.",
  },
  {
    question: "What GPU is recommended for CONTROL Resonant?",
    answer:
      "The Recommended configuration lists an RTX 3060 Ti, RX 6700 XT or Intel Arc B580 for a 1440p/60fps Medium target using Balanced upscaling with ray tracing disabled.",
  },
  {
    question: "Is CONTROL Resonant supported on Steam Deck?",
    answer:
      "Remedy says Steam Deck is supported at launch. Final compatibility status and measured performance still require release-build testing.",
  },
  {
    question: "Is Denuvo confirmed for CONTROL Resonant?",
    answer:
      "No Denuvo announcement has been published. The absence of a pre-release storefront notice does not prove that the final PC build is DRM-free.",
  },
];

export default function SystemRequirementsPage() {
  const [minimum, recommended, enthusiast] = buyingFacts.pc.tiers;
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "CONTROL Resonant System Requirements",
            url: "https://controlresonant.org/game-info/system-requirements",
            dateModified: "2026-09-21",
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
            {
              name: "System Requirements",
              href: "/game-info/system-requirements",
            },
          ]),
        ]}
      />
      <HubHero
        eyebrow="Game info / hardware check"
        title="CONTROL Resonant System Requirements — PC and Console Specs"
        description="Compare the final Minimum and Recommended PC specifications, understand the resolution and frame-rate targets, and check PlayStation graphics modes."
        image="/images/guides/pc-system-requirements.jpg"
        imageAlt="PC display showing CONTROL Resonant imagery"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "System Requirements" },
        ]}
        action={<a href="#pc-specs">Compare PC specifications ↓</a>}
      />

      <div className={`container ${styles.page}`}>
        <section className={styles.directAnswer} id="pc-specs">
          <div>
            <span>Minimum PC target</span>
            <h2>Minimum PC requirements for 1080p at 30 FPS</h2>
            <p>
              The published target uses Low settings, Quality upscaling and ray
              tracing off. It lists an Intel Core i5-8500 or Ryzen 5 3500 with a
              GTX 1070, RX 5600 XT or Intel Arc A580; the full comparison below
              also shows the Recommended 1440p target.
            </p>
          </div>
          <aside className={styles.specCard}>
            <span>Shared requirement</span>
            <strong>120 GB SSD</strong>
            <span>Memory</span>
            <strong>16 GB RAM</strong>
            <span>Operating system</span>
            <strong>Windows 10 / 11 64-bit</strong>
          </aside>
        </section>

        <section className={styles.section} aria-labelledby="pc-table-title">
          <header className={styles.sectionHeading}>
            <div>
              <span>01 / Final PC chart</span>
              <h2 id="pc-table-title">
                Minimum vs Recommended PC requirements
              </h2>
            </div>
            <p>
              We read these as target configurations built around upscaling, not
              independent benchmarks or promises for every CPU, GPU, and driver
              combination.
            </p>
          </header>
          <div
            className={styles.tableWrap}
            role="region"
            aria-label="CONTROL Resonant minimum and recommended system requirements"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Minimum</th>
                  <th>Recommended</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Performance target</th>
                  <td>{minimum.target}</td>
                  <td>{recommended.target}</td>
                </tr>
                <tr>
                  <th>Graphics settings</th>
                  <td>{minimum.graphics}</td>
                  <td>{recommended.graphics}</td>
                </tr>
                <tr>
                  <th>Operating system</th>
                  <td>{buyingFacts.pc.os}</td>
                  <td>{buyingFacts.pc.os}</td>
                </tr>
                <tr>
                  <th>Processor</th>
                  <td>{minimum.cpus.join(" / ")}</td>
                  <td>{recommended.cpus.join(" / ")}</td>
                </tr>
                <tr>
                  <th>Graphics card</th>
                  <td>{minimum.gpus.join(" / ")}</td>
                  <td>{recommended.gpus.join(" / ")}</td>
                </tr>
                <tr>
                  <th>Memory</th>
                  <td>{buyingFacts.pc.ramGb} GB RAM</td>
                  <td>{buyingFacts.pc.ramGb} GB RAM</td>
                </tr>
                <tr>
                  <th>Storage</th>
                  <td>{buyingFacts.pc.ssdGb} GB available / SSD required</td>
                  <td>{buyingFacts.pc.ssdGb} GB available / SSD required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="enthusiast-title">
          <header className={styles.sectionHeading}>
            <div>
              <span>02 / Higher-resolution target</span>
              <h2 id="enthusiast-title">The published 4K non-RT GPU target</h2>
            </div>
            <p>
              The separate Enthusiast example targets {enthusiast.target} on{" "}
              {enthusiast.graphics.toLowerCase()}. It lists an{" "}
              {enthusiast.gpus.join(" or ")}, but does not provide a matching
              CPU example. We would use it as a GPU target, not a complete PC
              build recommendation.
            </p>
          </header>
        </section>

        <section className={styles.toolCta}>
          <div>
            <span>Interactive check</span>
            <h2>Compare your own setup with a published target</h2>
            <p>
              We keep the requirements table as the permanent reference. The
              checker compares your CPU, GPU, memory, storage, and performance
              target, then tells you which parts we can match and which remain
              unknown.
            </p>
          </div>
          <Link href="/tools/pc-system-checker#system-checker">
            Open the system checker <ArrowRight size={16} />
          </Link>
        </section>

        <section className={styles.splitSection}>
          <div>
            <span>03 / Read the target correctly</span>
            <h2>Minimum does not mean native 1080p</h2>
            <p>
              The Minimum target explicitly uses Quality upscaling. Recommended
              uses Balanced upscaling. Your output resolution, internal render
              resolution and observed frame rate are not the same measurement.
            </p>
          </div>
          <div>
            <span>04 / Before you install</span>
            <h2>Leave room beyond the listed 120GB</h2>
            <p>
              The requirement describes available game storage. Platform
              updates, shader caches, capture files and free space needed by the
              operating system can raise the practical space you should keep
              available.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="features-title">
          <header className={styles.sectionHeading}>
            <div>
              <span>05 / PC rendering features</span>
              <h2 id="features-title">
                Upscaling, ray tracing and path tracing
              </h2>
            </div>
            <p>{buyingFacts.pc.technology}</p>
          </header>
          <div className={styles.featureGrid}>
            <article>
              <strong>DLSS 4.5</strong>
              <p>
                Available on supported NVIDIA hardware. Individual DLSS features
                depend on the GPU generation.
              </p>
            </article>
            <article>
              <strong>FSR 4.1</strong>
              <p>
                Available on supported AMD hardware. Support for a technology
                name does not mean every listed GPU exposes every feature.
              </p>
            </article>
            <article>
              <strong>Ray / path tracing</strong>
              <p>
                Separate hardware targets apply. The Minimum and Recommended
                rows above both describe ray tracing as disabled.
              </p>
            </article>
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="review-performance-title"
        >
          <header className={styles.sectionHeading}>
            <div>
              <span>06 / Review-build reality check</span>
              <h2 id="review-performance-title">
                What published PC testing adds to the official chart
              </h2>
            </div>
            <p>
              We compared the launch-window PC tests with Remedy&apos;s chart,
              and the pattern is clear: demanding settings lean heavily on
              upscaling. One review rig still cannot promise a frame rate for
              your PC.
            </p>
          </header>
          <div className={styles.featureGrid}>
            <article>
              <strong>Official targets remain the baseline</strong>
              <p>
                Minimum and Recommended already assume Quality or Balanced
                upscaling with ray tracing disabled. Compare your parts with
                those rows before looking at Ultra or path-traced results.
              </p>
            </article>
            <article>
              <strong>High-end features carry a real cost</strong>
              <p>
                Review coverage reports that ray tracing, path tracing and the
                highest presets can require aggressive upscaling or frame
                generation even on powerful GPUs. Treat those as optional image
                features, not the expected default.
              </p>
            </article>
            <article>
              <strong>Use matching test conditions</strong>
              <p>
                Resolution, preset, upscaler mode, frame generation, driver, CPU
                and game build all affect a benchmark. A GPU name without those
                conditions is not enough to predict performance.
              </p>
            </article>
          </div>
          <p className={styles.tableNote}>
            We compare hardware classes with the published targets. We do not
            turn third-party review charts into a guessed FPS result.
          </p>
        </section>

        <section
          className={styles.section}
          id="console-modes"
          aria-labelledby="console-title"
        >
          <header className={styles.sectionHeading}>
            <div>
              <span>07 / Console targets</span>
              <h2 id="console-title">PS5 and PS5 Pro graphics modes</h2>
            </div>
            <p>
              Console modes are target combinations, not a PC-equivalent
              hardware requirement. Balanced mode on PS5 Pro requires a 120Hz
              display.
            </p>
          </header>
          <div
            className={styles.tableWrap}
            role="region"
            aria-label="CONTROL Resonant PlayStation graphics modes"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th>Console</th>
                  <th>Mode</th>
                  <th>Target</th>
                  <th>Feature</th>
                </tr>
              </thead>
              <tbody>
                {buyingFacts.ps5Modes.map((item) => (
                  <tr key={`${item.console}-${item.mode}`}>
                    <th>{item.console}</th>
                    <td>{item.mode}</td>
                    <td>{item.target}</td>
                    <td>{item.feature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.tableNote}>
            PS5 also supports DualSense trigger feedback, compatible-headset 3D
            Audio and Activities for main-story progress. There is no equivalent
            Xbox performance-mode table here, so PC or PS5 targets should not be
            projected onto Xbox Series X|S.
          </p>
        </section>

        <section
          className={styles.section}
          id="compatibility"
          aria-labelledby="compatibility-title"
        >
          <header className={styles.sectionHeading}>
            <div>
              <span>08 / Limits of the chart</span>
              <h2 id="compatibility-title">
                What PC requirements cannot confirm
              </h2>
            </div>
            <p>
              We cannot use desktop component targets to predict handheld
              performance, console modes, or final DRM. For those answers, we
              need the platform announcement, storefront status, or a check of
              the release build.
            </p>
          </header>
          <div className={styles.featureGrid}>
            <article>
              <strong>Steam Deck</strong>
              <p>
                Launch support is stated, but we would wait for final-build
                testing before assuming a preset, frame rate, or verification
                badge.
              </p>
            </article>
            <article>
              <strong>Xbox Series</strong>
              <p>
                The game is confirmed for Series X|S, but no matching mode chart
                is available here. We would not reuse PS5 targets as Xbox
                claims.
              </p>
            </article>
            <article>
              <strong>PC DRM</strong>
              <p>
                No Denuvo announcement is recorded. The final storefront and
                executable information remain the relevant checks.
              </p>
            </article>
          </div>
          <p className={styles.tableNote}>
            <Link href="/game-info/platforms">
              Compare platform access and support status{" "}
              <ArrowRight size={14} />
            </Link>
          </p>
        </section>

        <section className={styles.section} aria-labelledby="assist-title">
          <header className={styles.sectionHeading}>
            <div>
              <span>09 / Accessibility and difficulty</span>
              <h2 id="assist-title">Assist Mode controls that change combat</h2>
            </div>
            <p>
              Assist Mode can be adjusted during play, can make combat easier or
              harder, and does not lock trophies or achievements. These controls
              help distinguish hardware performance from an encounter setting.
            </p>
          </header>
          <div
            className={styles.tableWrap}
            role="region"
            aria-label="CONTROL Resonant Assist Mode settings"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th>If the friction is…</th>
                  <th>Relevant controls</th>
                  <th>What they change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Too many attacks to read</th>
                  <td>Enemy Aggression, Enemy Projectile Speed</td>
                  <td>Encounter pressure and projectile pace</td>
                </tr>
                <tr>
                  <th>Dodge timing</th>
                  <td>Perfect Dodge Window</td>
                  <td>Timing tolerance; it can also be tightened</td>
                </tr>
                <tr>
                  <th>Damage or stagger</th>
                  <td>Incoming Damage, Outgoing Damage, Outgoing Falter</td>
                  <td>Survival, damage dealt and posture pressure</td>
                </tr>
                <tr>
                  <th>Power or melee positioning</th>
                  <td>Power Recovery Speed, Enhanced Melee Magnetizing</td>
                  <td>Ability recovery and close-range targeting</td>
                </tr>
                <tr>
                  <th>Story-first play</th>
                  <td>Immortality, One-Hit Kills, One-Hit Falters</td>
                  <td>Optional high-impact assistance</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.tableNote}>
            <Link href="/guides/getting-started#assist-mode">
              Read the practical Assist Mode guide <ArrowRight size={14} />
            </Link>
          </p>
        </section>

        <section className={styles.section} aria-labelledby="language-title">
          <header className={styles.sectionHeading}>
            <div>
              <span>10 / Language support</span>
              <h2 id="language-title">Audio and interface languages</h2>
            </div>
          </header>
          <dl className={styles.languageList}>
            <div>
              <dt>Full audio, interface and subtitles</dt>
              <dd>{buyingFacts.pc.languages.fullAudio}</dd>
            </div>
            <div>
              <dt>Interface and subtitles</dt>
              <dd>{buyingFacts.pc.languages.textOnly}</dd>
            </div>
          </dl>
        </section>

        <section className={styles.faq} aria-labelledby="requirements-faq">
          <header className={styles.sectionHeading}>
            <div>
              <span>Quick answers</span>
              <h2 id="requirements-faq">System requirements FAQ</h2>
            </div>
          </header>
          <div>
            {faq.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <nav
          className={styles.nextPage}
          aria-label="Continue to release details"
        >
          <div>
            <span>Planning a purchase?</span>
            <strong>
              Compare dates, editions, bonuses and physical copies.
            </strong>
          </div>
          <Link href="/game-info/release-date">
            Open the release guide <ArrowRight size={18} />
          </Link>
        </nav>
      </div>
    </>
  );
}
