import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buyingFacts, displayDate } from "@/config/buying";
import styles from "@/style/page/home/home.module.css";

export function HomeClosingSection() {
  return (
    <section className={styles.closingBriefing}>
      <div className={`container ${styles.closingGrid}`}>
        <figure>
          <Image
            src="/images/gameplay/warped-transit.jpg"
            alt="Warped transit space in CONTROL Resonant"
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
          />
          <figcaption>Player briefing / start with what you need</figcaption>
        </figure>
        <section className={styles.about} aria-labelledby="about-title">
          <div>
            <span>About this site</span>
            <h2 id="about-title">One route from a question to an answer</h2>
          </div>
          <div>
            <p>
              CONTROL Resonant sends Dylan Faden out of the Oldest House and
              into a Manhattan broken into distinct Zones. He fights with the
              shape-shifting Aberrant, earns supernatural Combat Abilities and
              follows both the main story and optional World Quests. This site
              brings the practical questions together: what version to buy, how
              the combat systems fit, who the characters are and where the named
              activities take place.
            </p>
            <p>
              Start with the{" "}
              <Link href="/game-info/release-date">
                release and edition guide
              </Link>{" "}
              if you are choosing a platform or copy. Use{" "}
              <Link href="/guides">Guides</Link> when you need a way to approach
              a fight or activity, and the <Link href="/wiki">Wiki</Link> when
              you want to look up a specific person, power, enemy or place. When
              the question needs your own hardware or buying preferences, use
              the <Link href="/tools">player tools</Link>. The{" "}
              <Link href="/map">map page</Link> currently separates confirmed
              locations from the Zone and marker data that still requires the
              released game.
            </p>
          </div>
        </section>
      </div>
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
            <h3>Is CONTROL Resonant Control 2?</h3>
            <p>
              Yes. CONTROL Resonant is the sequel to CONTROL, with Dylan Faden
              as the playable lead. Jesse remains central to the story, but this
              is Dylan&apos;s journey.
            </p>
            <Link href="/guides/getting-started#story-context">
              Get the story setup <ArrowRight size={14} />
            </Link>
          </article>
          <article>
            <h3>When does CONTROL Resonant come out?</h3>
            <p>
              The digital release is {displayDate(buyingFacts.digitalRelease)}.
              Physical console copies are scheduled for{" "}
              {displayDate(buyingFacts.physicalRelease)}. Availability and early
              access depend on the platform, edition and store listing.
            </p>
            <Link href="/game-info/release-date">
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
              Not in the conventional seamless-map sense. Manhattan is divided
              into large, focused Zones with story and optional activities.
              Vertical spaces, gravity changes and traversal gates make a flat
              map only part of the navigation answer.
            </p>
            <Link href="/map">
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
    </section>
  );
}
