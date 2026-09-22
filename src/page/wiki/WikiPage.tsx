import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { getWikiGroups, getWikiTopics, wikiDetails } from "@/lib/data/wiki";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import type { WikiGroupId } from "@/types/wiki";
import styles from "@/style/page/wiki/wiki.module.css";

export default function WikiPage() {
  const groups = getWikiGroups();
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "CONTROL Resonant Wiki",
          "/wiki",
          groups.map((group) => ({
            name: group.title,
            href: `/wiki/${group.id}`,
          })),
        )}
      />
      <HubHero
        eyebrow="People, powers, threats and places"
        title="CONTROL Resonant Wiki — Find What You Need to Know"
        description="Look up Dylan and the FBC, compare Aberrant Forms and Combat Abilities, identify an enemy, or see how a Manhattan Zone and its activities fit together."
        image={groups[0].image}
        imageAlt="CONTROL Resonant Wiki character artwork"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wiki" }]}
        action={
          <Link href="/search">
            Search the Wiki <ArrowRight size={17} />
          </Link>
        }
      />
      <section
        className={`container ${styles.questionIndex}`}
        aria-labelledby="question-index-title"
      >
        <div>
          <span>Start with a question</span>
          <h2 id="question-index-title">
            Browse characters, combat, enemies, locations and missions
          </h2>
          <p>
            We use system overviews for the way the game plays and Wiki files
            for a specific person, place, threat, or named activity.
          </p>
        </div>
        <nav aria-label="Wiki questions">
          <Link href="/gameplay">
            How do Forms, powers and Artifacts work together?{" "}
            <ArrowRight size={16} />
          </Link>
          <Link href="/wiki/characters">
            Who are Dylan, Jesse and Zoe? <ArrowRight size={16} />
          </Link>
          <Link href="/wiki/enemies">
            Which enemies and Resonants have been shown?{" "}
            <ArrowRight size={16} />
          </Link>
          <Link href="/wiki/world">
            Which place or Zone am I looking at? <ArrowRight size={16} />
          </Link>
          <Link href="/map#confirmed-locations">
            How do Zones, vertical routes and movement gates connect?{" "}
            <ArrowRight size={16} />
          </Link>
          <Link href="/wiki/missions">
            Is this a campaign lead, Jesse Quest, World Quest or Fault?{" "}
            <ArrowRight size={16} />
          </Link>
        </nav>
      </section>
      <section
        className={`container ${styles.groupList}`}
        aria-label="Wiki fields"
      >
        {groups.map((group) => {
          const count = getWikiTopics(group.id as WikiGroupId).length;
          const featured = wikiDetails
            .filter((entry) => entry.group === group.id)
            .slice(0, 3);
          return (
            <article key={group.id}>
              <div className={styles.number}>{group.number}</div>
              <div className={styles.copy}>
                <span>
                  {count} topics ·{" "}
                  {
                    wikiDetails.filter((entry) => entry.group === group.id)
                      .length
                  }{" "}
                  in-depth pages
                </span>
                <h2>
                  <Link href={`/wiki/${group.id}`}>{group.title}</Link>
                </h2>
                <p>{group.description}</p>
                <nav aria-label={`Start with ${group.title}`}>
                  {featured.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/wiki/${entry.group}/${entry.slug}`}
                    >
                      {entry.title} <ArrowRight size={14} />
                    </Link>
                  ))}
                </nav>
                <Link className={styles.openField} href={`/wiki/${group.id}`}>
                  Browse {group.title} <ArrowRight size={16} />
                </Link>
              </div>
              <Link
                className={styles.image}
                href={`/wiki/${group.id}`}
                aria-label={`Browse ${group.title}`}
              >
                <Image
                  src={group.image}
                  alt=""
                  fill
                  sizes="(max-width:700px) 100vw, 28vw"
                />
              </Link>
            </article>
          );
        })}
      </section>
      <section
        className={`container ${styles.context}`}
        aria-labelledby="use-wiki-heading"
      >
        <div>
          <span>From information to a decision</span>
          <h2 id="use-wiki-heading">
            Use the Wiki when play stops making sense
          </h2>
          <p>
            A name alone rarely solves a problem. Move from a Wiki file to the
            page that answers the next question: which ability covers a build
            weakness, which locations can be identified, or which arena hazard
            defines a known boss encounter.
          </p>
        </div>
        <nav aria-label="Player tools connected to the Wiki">
          <Link href="/guides/combat-builds">
            Diagnose a build problem <ArrowRight size={16} />
          </Link>
          <Link href="/wiki/combat/combat-abilities">
            Compare Barrage, Seekers and Shield <ArrowRight size={16} />
          </Link>
          <Link href="/map#confirmed-locations">
            Check confirmed locations and map status <ArrowRight size={16} />
          </Link>
          <Link href="/bosses">
            Check known encounter hazards <ArrowRight size={16} />
          </Link>
        </nav>
      </section>
      <section
        className={`container ${styles.context}`}
        aria-labelledby="context-heading"
      >
        <div>
          <span>Series context / not a sequel checklist</span>
          <h2 id="context-heading">What from CONTROL matters to Resonant?</h2>
          <p>
            The FBC, Ordinary and Dylan&apos;s P6 history explain the new
            premise. These are series-background files from CONTROL (2019), not
            additional Resonant missions, enemies or Manhattan map areas.
          </p>
        </div>
        <nav aria-label="CONTROL background for Resonant players">
          {[
            ["The FBC", "/wiki/world/federal-bureau-of-control"],
            ["The Ordinary AWE", "/wiki/world/ordinary-awe"],
            [
              "P6 and the Prime Candidate Program",
              "/wiki/world/prime-candidate-program",
            ],
            ["The returning Bureau cast", "/wiki/characters/casper-darling"],
            ["The Hiss", "/wiki/enemies/the-hiss"],
          ].map(([label, href]) => (
            <Link href={href} key={href}>
              {label} <ArrowRight size={16} />
            </Link>
          ))}
        </nav>
      </section>
    </>
  );
}
