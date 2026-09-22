import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { WikiIndexTable } from "@/page/wiki/WikiIndexTable";
import fieldMatrices from "@/data/wiki/field-matrices.json";
import {
  getWikiGroup,
  getWikiGroups,
  getWikiTopics,
  wikiDetails,
  wikiDetailPath,
} from "@/lib/data/wiki";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import type { WikiGroupId } from "@/types/wiki";
import styles from "@/style/page/wiki/wiki-group.module.css";

const editorial: Record<
  WikiGroupId,
  {
    heroTitle: string;
    heroDescription: string;
    question: string;
    answer: string;
    note: string;
    featuredTitle: string;
    indexTitle: string;
  }
> = {
  characters: {
    heroTitle: "CONTROL Resonant Characters — Follow the Faden Story",
    heroDescription:
      "Meet Dylan, Jesse, Zoe and the Bureau figures connected to their story. Check each person's role and relationship before following the next character link.",
    question: "Who matters to Dylan's search?",
    answer:
      "We start with the three people who frame the story: Dylan is the playable lead, Jesse is the missing FBC Director he is looking for, and Zoe is his field contact. The returning Bureau names add context, but we are not treating every casting reveal as a quest spoiler.",
    note: "We focus on roles and relationships first, because they tell you more than a list of returning actors.",
    featuredTitle: "Dylan, Jesse and FBC character files",
    indexTitle: "All named characters and relationships",
  },
  world: {
    heroTitle: "CONTROL Resonant World — Places and Their Connections",
    heroDescription:
      "Learn what each named place is, why it matters to Dylan and which characters, activities or systems connect to it. Use the Map page when an objective clue becomes a route problem.",
    question: "What is each place in Dylan's story?",
    answer:
      "We separate the new spaces from the old ones: Manhattan's Zones are the main setting, while the Oldest House is the Bureau headquarters from CONTROL. The field office is a hub and the Gap is Dylan's build space. Open a place file when you need its role or connected activity.",
    note: "When an older CONTROL location appears, we treat it as background until the new game shows that the route is playable.",
    featuredTitle: "Manhattan Zones and paranatural spaces",
    indexTitle: "World locations and traversal concepts",
  },
  combat: {
    heroTitle: "CONTROL Resonant Combat & Skills — Shape Dylan's Build",
    heroDescription:
      "Compare Aberrant Forms, Combat Abilities, Talents and Artifacts by what they do in a fight. See which choices affect traversal and which belong in a combat loadout.",
    question: "Which systems make up a combat build?",
    answer:
      "We break a build into four parts: the Aberrant supplies weapon Forms, Resonants grant Combat Abilities, Talents shape progression, and Artifacts add passive effects. Reach and Shift solve movement problems rather than filling boss-granted attack slots.",
    note: "We use review impressions to explain how a system feels in practice, but we leave exact values open until they can be checked on a known game version.",
    featuredTitle: "Aberrant Forms, Abilities and progression",
    indexTitle: "Combat systems and named equipment",
  },
  enemies: {
    heroTitle: "CONTROL Resonant Enemies & Bosses — Know What You're Facing",
    heroDescription:
      "Tell the Hiss and Mold apart from Resonants, then examine the named encounters and the hazards that have been shown so far.",
    question: "Which threats are actually distinct?",
    answer:
      "The Hiss and Mold return, while Resonants form the major boss class. From the encounters we reviewed, some Resonants can be left until Dylan has a stronger build. The Central Resonant is the clearest named example, with fire and magma shaping the arena.",
    note: "We keep factions, summons, and individual bosses separate, and we won't turn a few shown encounters into a made-up bestiary or drop table.",
    featuredTitle: "Hiss, Mold and Resonant threat files",
    indexTitle: "Enemy factions and named encounters",
  },
  missions: {
    heroTitle: "CONTROL Resonant Missions — Choose Your Next Lead",
    heroDescription:
      "Separate Dylan's main story from Jesse Quests, World Quests, Faults and Zone activities. Start with the activity type when you need movement, story context or a short combat challenge.",
    question: "What is a mission and what is a category?",
    answer:
      "We read Dylan's Journey as the campaign, Jesse Quests as routes to traversal powers, World Quests as optional stories, and Faults as distinct activities. Short challenges and discoveries belong to their Zones rather than a chapter list.",
    note: "We only publish route steps when we can support the prerequisite and result, instead of turning activity categories into imaginary chapters.",
    featuredTitle: "Campaign, traversal quests and Zone activities",
    indexTitle: "Named missions and activity types",
  },
};

const matrixLinks: Record<WikiGroupId, Record<string, string>> = {
  characters: {
    "Dylan Faden": "dylan-faden",
    "Jesse Faden": "jesse-faden",
    "Zoe De Vera": "zoe-de-vera",
    "Dr. Casper Darling": "casper-darling",
  },
  world: {
    "Manhattan Zones": "manhattan",
    "FBC field office": "fbc-field-office",
    "The Gap": "the-gap",
    "Oldest House": "oldest-house",
    "West Incursion Zone": "west-incursion-zone",
  },
  combat: {
    Flurry: "aberrant-forms",
    Slash: "aberrant-forms",
    Slice: "aberrant-forms",
    Crush: "aberrant-forms",
    Drill: "aberrant-forms",
    Extend: "aberrant-forms",
    Barrage: "combat-abilities",
    Seekers: "combat-abilities",
    Shield: "combat-abilities",
    Artifacts: "artifacts",
    "Reach and Shift": "reach",
  },
  enemies: {
    Hiss: "the-hiss",
    "First Resonant Entity": "first-resonant-entity",
    "Central Resonant": "central-resonant",
  },
  missions: {
    "World Quests": "world-quests-and-faults",
    Faults: "world-quests-and-faults",
    "Metro Fault": "metro-fault",
  },
};

export default function WikiGroupPage({ id }: { id: WikiGroupId }) {
  const group = getWikiGroup(id)!;
  const topics = getWikiTopics(id);
  const featured = wikiDetails.filter((entry) => entry.group === id);
  const copy = editorial[id];
  const matrix = fieldMatrices[id];
  return (
    <>
      <JsonLd
        data={collectionSchema(
          `CONTROL Resonant ${group.title}`,
          `/wiki/${id}`,
          featured.map((entry) => ({
            name: entry.title,
            href: wikiDetailPath(entry),
          })),
        )}
      />
      <HubHero
        eyebrow={`Wiki / field ${group.number}`}
        title={copy.heroTitle}
        description={copy.heroDescription}
        image={group.image}
        imageAlt={`${group.title} field artwork`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Wiki", href: "/wiki" },
          { label: group.title },
        ]}
        meta={
          <span>
            {topics.length} topics · {featured.length} in-depth pages
          </span>
        }
      />
      <div className="container">
        <section className={styles.briefing}>
          <div>
            <span>01 / The question</span>
            <h2>{copy.question}</h2>
          </div>
          <p>{copy.answer}</p>
        </section>
        {id === "world" && (
          <section className={styles.mapNotice}>
            <h2>Looking for a place from an objective?</h2>
            <p>
              We use the Wiki to explain what each place is. If you have a Zone
              name, Fault, or obstacle in front of you, use the{" "}
              <Link href="/map">Map status and confirmed locations</Link> to see
              what we can place now and which routes still need a direct check.
            </p>
          </section>
        )}
        {id === "enemies" && (
          <section className={styles.mapNotice}>
            <h2>Looking for a specific Boss encounter?</h2>
            <p>
              We separate factions from individual threats here. Open the{" "}
              <Link href="/bosses">known Boss encounters</Link> for the named
              fights and hazards we&apos;ve seen so far; we won&apos;t guess the
              rest of the roster.
            </p>
          </section>
        )}
        <section className={styles.matrix}>
          <div className={styles.sectionHeading}>
            <div>
              <span>Field comparison</span>
              <h2>{matrix.title}</h2>
            </div>
            <p>{matrix.intro}</p>
          </div>
          <div role="region" aria-label={matrix.title} tabIndex={0}>
            <table>
              <thead>
                <tr>
                  {matrix.columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">
                      {matrixLinks[id][row[0]] ? (
                        <Link href={`/wiki/${id}/${matrixLinks[id][row[0]]}`}>
                          {row[0]} <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                      ) : (
                        row[0]
                      )}
                    </th>
                    {row.slice(1).map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className={styles.featured}>
          <div className={styles.sectionHeading}>
            <div>
              <span>Field files</span>
              <h2>{copy.featuredTitle}</h2>
            </div>
            <p>
              These have enough distinct facts and player context for a
              dedicated file.
            </p>
          </div>
          <div className={styles.featureGrid}>
            {featured.map((entry) => (
              <Link key={entry.slug} href={wikiDetailPath(entry)}>
                <strong>{entry.title}</strong>
                <span>{entry.type}</span>
                <p>{entry.summary}</p>
                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </section>
        <section className={styles.index}>
          <div className={styles.sectionHeading}>
            <div>
              <span>Current indexed topics / not a full-game list</span>
              <h2>{copy.indexTitle}</h2>
            </div>
            <p>{copy.note}</p>
          </div>
          <WikiIndexTable group={id} topics={topics} />
        </section>
        <nav className={styles.next} aria-label="Other Wiki fields">
          {getWikiGroups()
            .filter((item) => item.id !== id)
            .map((item) => (
              <Link key={item.id} href={`/wiki/${item.id}`}>
                {item.title} <ArrowRight size={15} />
              </Link>
            ))}
        </nav>
      </div>
    </>
  );
}
