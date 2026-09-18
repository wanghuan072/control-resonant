import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Gamepad2,
  Monitor,
  Package,
} from "lucide-react";
import updates from "@/data/updates/timeline.json";
import { gameInfoTopics } from "@/config/game-info-topics";
import { guideDestination } from "@/lib/data/guide-destinations";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import { buyingFacts, displayDate } from "@/config/buying";
import { BuyingDecision } from "@/page/game-info/BuyingDecision";
import { HubHero } from "@/components/content/HubHero";
import styles from "@/style/page/game-info/game-info.module.css";

const answerGroups = [
  {
    title: "Release & editions",
    text: "Digital launch, physical timing, early access and what each edition adds.",
    links: [
      [
        "Release date & platforms",
        "control-resonant-release-date-and-platforms",
      ],
      [
        "Editions & preorder",
        "control-resonant-editions-and-pre-order-bonuses",
      ],
      ["How long is it?", "how-long-is-control-resonant"],
    ],
  },
  {
    title: "Platforms & access",
    text: "Where the game runs and which services are—or are not—announced.",
    links: [
      ["Game Pass status", "is-control-resonant-on-game-pass"],
      ["Steam Deck support", "control-resonant-steam-deck-support"],
      ["Nintendo Switch 2", "is-control-resonant-coming-to-switch-2"],
    ],
  },
  {
    title: "PC & controls",
    text: "Hardware tiers, PC features, languages, controls and accessibility options.",
    links: [
      ["PC requirements", "control-resonant-pc-system-requirements"],
      [
        "PC features & controls",
        "control-resonant-pc-features-languages-and-controls",
      ],
      ["Denuvo status", "does-control-resonant-use-denuvo"],
      ["Assist Mode", "control-resonant-assist-mode-and-accessibility"],
    ],
  },
  {
    title: "Before you play",
    text: "Understand the sequel, story entry point and single-player format.",
    links: [
      ["Is it a sequel?", "is-control-resonant-a-sequel"],
      ["Play CONTROL first?", "should-you-play-control-first"],
      [
        "Single-player or multiplayer?",
        "is-control-resonant-single-player-or-multiplayer",
      ],
    ],
  },
] as const;

export default function GameInfoPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "CONTROL Resonant game information",
          "/game-info",
          gameInfoTopics.map((topic) => ({
            name: topic.title,
            href: topic.href,
          })),
        )}
      />
      <HubHero
        eyebrow="Game info / make the right choice"
        title="CONTROL Resonant Game Info — Choose Your Edition and Platform"
        description="See when each version releases, what Standard and Deluxe include, and how your PC or PlayStation compares with the listed requirements and modes."
        image="/images/home/manhattan-key-art.jpg"
        imageAlt="CONTROL Resonant Manhattan key art"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Game Info" }]}
        action={<Link href="#decision">Compare your options →</Link>}
      />
      <section className={styles.factStrip} id="release-date">
        <div className="container">
          <div>
            <CalendarDays />
            <span>Digital release</span>
            <strong>{displayDate(buyingFacts.digitalRelease, "short")}</strong>
          </div>
          <div>
            <Package />
            <span>Physical release</span>
            <strong>{displayDate(buyingFacts.physicalRelease, "short")}</strong>
          </div>
          <div>
            <Gamepad2 />
            <span>Console</span>
            <strong>PS5 / Xbox Series</strong>
          </div>
          <div>
            <Monitor />
            <span>PC & Mac</span>
            <strong>PC at launch / Mac later</strong>
          </div>
        </div>
      </section>
      <BuyingDecision />
      <section className={`container ${styles.platformModes}`} id="editions">
        <header>
          <span>Buying file / edition comparison</span>
          <h2>CONTROL Resonant Editions & Pre-order Bonuses</h2>
          <p>
            Keep format, timing and extras separate. Store bonuses can differ by
            platform and region; the linked guide explains the exact listings.
          </p>
        </header>
        <div
          className={styles.modeTable}
          role="region"
          aria-label="Edition and release comparison"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Edition</th>
                <th scope="col">Format</th>
                <th scope="col">Published extras</th>
                <th scope="col">Timing</th>
              </tr>
            </thead>
            <tbody>
              {buyingFacts.editions.map((edition) => (
                <tr key={edition.id}>
                  <th scope="row">{edition.name}</th>
                  <td>{edition.format}</td>
                  <td>{edition.extras}</td>
                  <td>{edition.timing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.modeNote}>
          Preorder outfits and Pickpocket&apos;s Tool are separate from the
          edition contents above.{" "}
          <Link href="/guides/getting-started#platform-check">
            Understand digital timing and platform choices →
          </Link>
          {" · "}
          <Link href="/game-info/physical-release-steelbook">
            Physical release and SteelBook details →
          </Link>
        </p>
      </section>
      <section
        className={`container ${styles.platformModes}`}
        id="pc-requirements"
      >
        <header>
          <span>Hardware file / September chart</span>
          <h2>CONTROL Resonant PC System Requirements</h2>
          <p>
            These are Remedy&apos;s published target configurations with
            upscaling, not independent benchmark results. The earlier developer
            FAQ used an older storage figure; the September specification
            requires 120 GB SSD space.
          </p>
        </header>
        <div
          className={styles.modeTable}
          role="region"
          aria-label="PC hardware targets"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Tier</th>
                <th scope="col">Target</th>
                <th scope="col">Example GPU</th>
                <th scope="col">Graphics</th>
              </tr>
            </thead>
            <tbody>
              {buyingFacts.pc.tiers.map((tier) => (
                <tr key={tier.id}>
                  <th scope="row">{tier.name}</th>
                  <td>{tier.target}</td>
                  <td>{tier.gpus.join(", ")}</td>
                  <td>{tier.graphics}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.modeNote}>
          All published tiers specify {buyingFacts.pc.ramGb} GB RAM and a{" "}
          {buyingFacts.pc.ssdGb} GB SSD. These three rows cover non-ray-traced
          targets; ray- and path-tracing have separate published tiers not
          evaluated by the checker.{" "}
          <Link href="/game-info#device-check">
            Check your listed components →
          </Link>
          {" · "}
          <Link href="/game-info/nvidia-rtx-bundle">
            Check the RTX 50 bundle →
          </Link>
        </p>
      </section>
      <section className={`container ${styles.platformModes}`} id="ps5-modes">
        <header>
          <span>September 15 / console briefing</span>
          <h2>PS5 and PS5 Pro Performance Modes</h2>
          <p>
            These are Remedy&apos;s target resolutions and frame rates, not a
            performance measurement of the final build. Balanced mode requires a
            120Hz-compatible display.
          </p>
        </header>
        <div
          className={styles.modeTable}
          role="region"
          aria-label="PlayStation performance modes"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Console</th>
                <th scope="col">Mode</th>
                <th scope="col">Target</th>
                <th scope="col">Additional feature</th>
              </tr>
            </thead>
            <tbody>
              {buyingFacts.ps5Modes.map((mode) => (
                <tr key={`${mode.console}-${mode.mode}`}>
                  <th scope="row">{mode.console}</th>
                  <td>{mode.mode}</td>
                  <td>{mode.target}</td>
                  <td>{mode.feature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.modeNote}>
          DualSense trigger feedback, compatible-headset 3D Audio, PS5
          Activities for main-story progress and post-launch Game Help were also
          described. Remedy estimates 25–35 hours for the main story; completion
          time varies.
        </p>
      </section>
      <section className={`container ${styles.platformModes}`} id="assist-mode">
        <header>
          <span>Accessibility / combat adjustment</span>
          <h2>Assist Mode and Accessibility Settings</h2>
          <p>
            Remedy says Assist Mode can be changed during play, can make combat
            easier or harder, and does not lock trophies or achievements.
          </p>
        </header>
        <div
          className={styles.modeTable}
          role="region"
          aria-label="Assist Mode adjustment groups"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">If the friction is…</th>
                <th scope="col">Relevant controls</th>
                <th scope="col">What they change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Too many attacks to read</th>
                <td>Enemy Aggression, Enemy Projectile Speed</td>
                <td>Encounter pressure and projectile pace</td>
              </tr>
              <tr>
                <th scope="row">Dodge timing</th>
                <td>Perfect Dodge Window</td>
                <td>Timing tolerance; can also be tightened</td>
              </tr>
              <tr>
                <th scope="row">Damage or stagger</th>
                <td>Incoming Damage, Outgoing Damage, Outgoing Falter</td>
                <td>Survival, damage dealt and posture pressure</td>
              </tr>
              <tr>
                <th scope="row">Power or melee positioning</th>
                <td>Power Recovery Speed, Enhanced Melee Magnetizing</td>
                <td>Ability recovery and close-range targeting</td>
              </tr>
              <tr>
                <th scope="row">Story-first play</th>
                <td>Immortality, One-Hit Kills, One-Hit Falters</td>
                <td>Optional high-impact assistance</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={styles.modeNote}>
          <Link href="/guides/getting-started#assist-mode">
            Read the full Assist Mode guide →
          </Link>
        </p>
      </section>
      <section className={`container ${styles.answers}`} id="platform-access">
        <header>
          <div>
            <span>Direct answers</span>
            <h2>Release, Platform and Purchase Questions</h2>
          </div>
          <p>
            No duplicate news feed and no wall of generic cards. Each group
            answers a different pre-play question.
          </p>
        </header>
        <div className={styles.answerGrid}>
          {answerGroups.map((group, index) => (
            <article key={group.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.title}</h3>
              <p>{group.text}</p>
              <ul>
                {group.links.map(([label, slug]) => (
                  <li key={slug}>
                    <Link href={guideDestination(slug)}>
                      {label}
                      <ArrowRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className={styles.answerGrid}>
          <article>
            <span>Platform answer</span>
            <h3>Is CONTROL Resonant on Game Pass?</h3>
            <p>
              No Game Pass launch has been announced. Xbox Play Anywhere is
              confirmed, but it is not a Game Pass subscription entitlement.
            </p>
          </article>
          <article>
            <span>Platform answer</span>
            <h3>Is there a Switch 2 version?</h3>
            <p>
              No Nintendo Switch 2 version has been announced. The confirmed
              launch platforms are PS5, Xbox Series X|S and PC; Mac is planned
              later.
            </p>
          </article>
          <article>
            <span>PC answer</span>
            <h3>Is Denuvo confirmed?</h3>
            <p>
              No Denuvo announcement has been published. A missing storefront
              notice before release is not proof that the final PC build is
              DRM-free.
            </p>
          </article>
          <article>
            <span>Handheld answer</span>
            <h3>What about Steam Deck?</h3>
            <p>
              Remedy says Steam Deck is supported at launch. Final compatibility
              status and measured performance still need release testing.
            </p>
          </article>
        </div>
      </section>
      <section
        className={`container ${styles.answers}`}
        aria-labelledby="purchase-files-heading"
      >
        <header>
          <div>
            <span>Focused buying answers</span>
            <h2 id="purchase-files-heading">
              Physical Editions, RTX Bundle and Official Trailers
            </h2>
          </div>
          <p>
            Three specific questions that need more than a line in an edition
            table.
          </p>
        </header>
        <div className={styles.answerGrid}>
          {gameInfoTopics.map((topic, index) => (
            <article key={topic.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>
                <Link href={topic.href}>
                  {topic.title.replace("CONTROL Resonant ", "")}
                </Link>
              </h3>
              <p>{topic.description}</p>
              <Link href={topic.href}>
                Read the focused answer <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.buying}>
        <div className="container">
          <header>
            <span>Priority files</span>
            <h2>Before-you-buy reading</h2>
          </header>
          <div>
            <Link href="/guides/getting-started#platform-check">
              Getting started: platform and first-session setup →
            </Link>
            <Link href="/game-info/physical-release-steelbook">
              Physical edition and SteelBook details →
            </Link>
            <Link href="/game-info/nvidia-rtx-bundle">
              RTX bundle eligibility and redemption →
            </Link>
          </div>
        </div>
      </section>
      <section className={`container ${styles.updates}`} id="updates">
        <header>
          <div>
            <span>Change log</span>
            <h2>Latest game changes</h2>
          </div>
          <Link href="/updates">
            Open the full timeline <ArrowRight size={15} />
          </Link>
        </header>
        <ol>
          {updates.slice(0, 5).map((item) => (
            <li key={`${item.date}-${item.title}`}>
              <time dateTime={item.date}>{item.date}</time>
              <span>{item.type}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.guideSlug && (
                  <Link href={guideDestination(item.guideSlug)}>
                    Read the connected guide <ArrowRight size={14} />
                  </Link>
                )}
                {"detailPath" in item && item.detailPath && (
                  <Link href={item.detailPath}>
                    View the details <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
