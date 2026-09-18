import Image from "next/image";
import Link from "next/link";
import { guideDestination } from "@/lib/data/guide-destinations";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { ReleaseInfoPanel } from "@/page/home/components/ReleaseInfoPanel";
import { getGuidePillars } from "@/lib/data/pillars";
import { getWikiGroups, wikiDetails } from "@/lib/data/wiki";
import updates from "@/data/updates/timeline.json";
import { JsonLd } from "@/seo/JsonLd";
import { homeSchema } from "@/seo/schema";
import { buyingFacts, displayDate } from "@/config/buying";
import styles from "@/style/page/home/home.module.css";

const playerQuestions = [
  {
    number: "01",
    kicker: "Before you play",
    title: "When and where can I play?",
    text: "Compare release dates, editions, platforms and published PC targets.",
    links: [
      { label: "Release timing", href: "/game-info#release-date" },
      { label: "Check your device", href: "/game-info#device-check" },
    ],
  },
  {
    number: "02",
    kicker: "Learn the game",
    title: "How does combat work?",
    text: "Start with the melee-and-ability loop, then compare Forms, Talents and Artifacts.",
    links: [
      { label: "Gameplay systems", href: "/gameplay" },
      { label: "Skills and equipment", href: "/wiki/combat" },
    ],
  },
  {
    number: "03",
    kicker: "Meet the cast and threats",
    title: "Who is involved?",
    text: "Follow Dylan, Jesse and Zoe, or look up enemy factions and previewed Resonants.",
    links: [
      { label: "Characters", href: "/wiki/characters" },
      { label: "Enemies and Bosses", href: "/wiki/enemies" },
    ],
  },
  {
    number: "04",
    kicker: "Explore Manhattan",
    title: "Where do I go?",
    text: "Understand known Zones, traversal tools, quest types and previewed activities.",
    links: [
      { label: "World and Locations", href: "/locations" },
      { label: "Missions and Activities", href: "/wiki/missions" },
    ],
  },
];

export default function HomePage() {
  const pillars = getGuidePillars();
  const groups = getWikiGroups();
  return (
    <>
      <JsonLd data={homeSchema()} />
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Your way into altered Manhattan</p>
            <h1>
              <small>CONTROL Resonant —</small> Know the game.
              <br />
              <em> Find your way.</em>
            </h1>
            <p className={styles.lead}>
              Check when the game launches, see whether your setup is ready,
              then get to know Dylan, the Aberrant, Manhattan&apos;s Zones and
              the enemies waiting inside them. Start with the question you have
              and follow it into a guide or Wiki page.
            </p>
            <div className={styles.heroActions}>
              <Link href="/gameplay">
                Explore the gameplay <ArrowRight size={17} />
              </Link>
              <Link href="/game-info#release-date">Release and platforms</Link>
            </div>
          </div>
          <ReleaseInfoPanel />
        </div>
      </section>

      <section className={`container ${styles.intentSection}`}>
        <header>
          <div>
            <span>Start with your question</span>
            <h2>What do you need to know?</h2>
          </div>
          <p>
            Pick the question on your mind; each path leads to a specific
            answer.
          </p>
        </header>
        <div className={styles.intentGrid}>
          {playerQuestions.map((question) => (
            <article key={question.number}>
              <span className={styles.intentNumber}>{question.number}</span>
              <small>{question.kicker}</small>
              <h3>{question.title}</h3>
              <p>{question.text}</p>
              <nav aria-label={question.title}>
                {question.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label} <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            </article>
          ))}
        </div>
      </section>

      <section className={`container ${styles.fieldPreview}`}>
        <div>
          <span>Before you buy</span>
          <h2>Release dates, editions and PC requirements</h2>
          <p>
            Digital release is {displayDate(buyingFacts.digitalRelease)}.
            Physical copies have a separate date, and system targets are not
            independent performance tests. Check your platform and edition
            before deciding.
          </p>
        </div>
        <div>
          <Link href="/game-info#release-date">
            <strong>Release timing</strong>
            <span>Digital, physical and platform dates</span>
            <ArrowRight size={16} />
          </Link>
          <Link href="/game-info#editions">
            <strong>Edition comparison</strong>
            <span>What each version includes</span>
            <ArrowRight size={16} />
          </Link>
          <Link href="/game-info#device-check">
            <strong>Device check</strong>
            <span>Compare your PC with published targets</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className={`container ${styles.guides}`}>
        <header>
          <div>
            <span>Four focused routes</span>
            <h2>CONTROL Resonant guides</h2>
          </div>
          <Link href="/guides">
            View all guides <ArrowRight size={16} />
          </Link>
        </header>
        <div>
          {pillars.map((pillar) => (
            <article key={pillar.id}>
              <Link href={pillar.href} className={styles.guideImage}>
                <Image
                  src={pillar.image}
                  alt=""
                  fill
                  sizes="(max-width:700px) 100vw, 25vw"
                />
                <span>{pillar.number}</span>
              </Link>
              <p>{pillar.eyebrow}</p>
              <h3>
                <Link href={pillar.href}>{pillar.title}</Link>
              </h3>
              <p>{pillar.description}</p>
              <Link href={pillar.href}>
                Open guide <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.wiki}>
        <div className="container">
          <header>
            <div>
              <span>People, powers and places</span>
              <h2>Explore the CONTROL Resonant Wiki</h2>
            </div>
            <p>
              Meet the people driving Dylan&apos;s story, compare his combat
              options, and see how enemies, locations and missions connect.
            </p>
            <Link href="/wiki">
              Open Wiki <ArrowRight size={16} />
            </Link>
          </header>
          <div className={styles.wikiGrid}>
            {groups.map((group) => (
              <Link href={`/wiki/${group.id}`} key={group.id}>
                <div>
                  <Image
                    src={group.image}
                    alt=""
                    fill
                    sizes="(max-width:650px) 50vw, 20vw"
                  />
                </div>
                <span>{group.number}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <small>
                  {
                    wikiDetails.filter((entry) => entry.group === group.id)
                      .length
                  }{" "}
                  in-depth pages
                </small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`container ${styles.latest}`}>
        <header>
          <div>
            <span>What has changed</span>
            <h2>Latest CONTROL Resonant updates</h2>
          </div>
          <Link href="/updates">
            All updates <ArrowRight size={16} />
          </Link>
        </header>
        <ol>
          {updates.slice(0, 4).map((item) => (
            <li key={`${item.date}-${item.title}`}>
              <time dateTime={item.date}>{item.date}</time>
              <span>{item.type}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.guideSlug && (
                  <Link href={guideDestination(item.guideSlug)}>
                    Related guide <ArrowRight size={14} />
                  </Link>
                )}
                {"detailPath" in item && item.detailPath && (
                  <Link href={item.detailPath}>
                    {"detailLabel" in item
                      ? item.detailLabel
                      : "View the details"}{" "}
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
        <aside>
          <Gamepad2 size={21} />
          <strong>Getting started?</strong>
          <span>Learn Dylan&apos;s combat rhythm and what to do first.</span>
          <Link href="/guides/getting-started">
            Read the guide <ArrowRight size={15} />
          </Link>
        </aside>
      </section>
      <section
        className={`container ${styles.about}`}
        aria-labelledby="about-title"
      >
        <div>
          <span>About this site</span>
          <h2 id="about-title">The answer you need, then the next one</h2>
        </div>
        <div>
          <p>
            CONTROL Resonant sends Dylan Faden out of the Oldest House and into
            a Manhattan broken into distinct Zones. He fights with the
            shape-shifting Aberrant, earns supernatural Combat Abilities and
            follows both the main story and optional World Quests. This site
            brings the practical questions together: what version to buy, how
            the combat systems fit, who the characters are and where the named
            activities take place.
          </p>
          <p>
            Start with <Link href="/game-info">Game Info</Link> if you are
            choosing a platform or edition. Use{" "}
            <Link href="/guides">Guides</Link> when you need a way to approach a
            fight or activity, and the <Link href="/wiki">Wiki</Link> when you
            want to look up a specific person, power, enemy or place. We will
            add exact routes and results as they can be checked in the released
            game.
          </p>
        </div>
      </section>
      <section
        className={`container ${styles.faq}`}
        aria-labelledby="faq-title"
      >
        <div>
          <span>Quick answers</span>
          <h2 id="faq-title">CONTROL Resonant FAQ</h2>
        </div>
        <div className={styles.faqList}>
          <article>
            <h3>When does CONTROL Resonant come out?</h3>
            <p>
              The digital release is {displayDate(buyingFacts.digitalRelease)}.
              Physical console copies are scheduled for{" "}
              {displayDate(buyingFacts.physicalRelease)}. Availability and early
              access depend on the platform, edition and store listing.
            </p>
            <Link href="/game-info#release-date">
              See the release dates <ArrowRight size={14} />
            </Link>
          </article>
          <article>
            <h3>Who do you play as?</h3>
            <p>
              Dylan Faden is the playable lead. He leaves the Oldest House to
              face the crisis in Manhattan while searching for his sister,
              Jesse.
            </p>
            <Link href="/wiki/characters/dylan-faden">
              Meet Dylan <ArrowRight size={14} />
            </Link>
          </article>
          <article>
            <h3>Do I need to play CONTROL first?</h3>
            <p>
              No. Dylan&apos;s story stands on its own, though knowing Jesse,
              the FBC and the Hiss adds context to the people he meets.
            </p>
            <Link href="/guides/getting-started#story-context">
              Get the story setup <ArrowRight size={14} />
            </Link>
          </article>
          <article>
            <h3>Is this an open-world game?</h3>
            <p>
              No. Manhattan is made of large, distinct Zones with main and
              optional activities. There is no verified street-by-street map or
              full collectible route yet.
            </p>
            <Link href="/locations">
              Explore the known places <ArrowRight size={14} />
            </Link>
          </article>
          <article>
            <h3>How does combat work?</h3>
            <p>
              The Aberrant changes weapon Forms. Melee hits refill the resource
              for Combat Abilities, while Talents and Artifacts let you shape
              the build around your preferred approach.
            </p>
            <Link href="/gameplay#combat-loop">
              Learn the combat loop <ArrowRight size={14} />
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
