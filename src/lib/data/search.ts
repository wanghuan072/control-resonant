import { databaseNavigation, primaryNavigation } from "@/config/navigation";
import { gameInfoTopics } from "@/config/game-info-topics";
import { getGuidePillars } from "@/lib/data/pillars";
import { getWikiTopics, wikiDetails, wikiDetailPath } from "@/lib/data/wiki";
import type { WikiGroupId } from "@/types/wiki";
import type { SearchEntry } from "@/types/content";

const primaryDescriptions: Record<string, string> = {
  "/": "CONTROL Resonant release details, guides, world overview, and frequently asked questions.",
  "/game-info":
    "Release timing, editions, platforms, PC requirements and answers before you buy.",
  "/gameplay":
    "How Aberrant Forms, Combat Abilities, Talents, Artifacts, traversal and Assist Mode fit together.",
  "/guides":
    "Four focused routes for getting started, builds, story progress and completion.",
  "/wiki":
    "Player-focused Wiki for characters, world, combat, enemies and missions.",
  "/locations":
    "Known Manhattan Zones, locations, traversal concepts and linked activities.",
  "/updates":
    "Dated release, platform, combat and accessibility announcements.",
};

export function getSearchEntries(): SearchEntry[] {
  const primary = primaryNavigation.map((item) => ({
    title: `CONTROL Resonant ${item.label}`,
    description: primaryDescriptions[item.href],
    href: item.href,
    type: "Hub",
  }));

  const database = databaseNavigation.map((item) => ({
    title: `CONTROL Resonant ${item.label}`,
    description: `${item.label} information and system details for CONTROL Resonant.`,
    href: item.href,
    type: "Wiki",
  }));

  const detailEntries = wikiDetails.map((entry) => ({
    title: entry.title,
    description: `${entry.summary} ${entry.facts.map((fact) => `${fact.label}: ${fact.value}`).join(" ")}`,
    href: wikiDetailPath(entry),
    type: "Wiki detail",
  }));
  const topics = databaseNavigation.flatMap((group) => {
    const id = group.href.split("/").at(-1) as WikiGroupId;
    return getWikiTopics(id)
      .filter((topic) => !topic.href)
      .map((topic) => ({
        title: topic.name,
        description: topic.description,
        href: group.href,
        type: "Wiki topic",
      }));
  });
  const pillars = getGuidePillars().map((pillar) => ({
    title: `CONTROL Resonant ${pillar.title}`,
    description: pillar.description,
    href: pillar.href,
    type: "Guide",
  }));
  return [
    {
      title: "CONTROL Resonant Guide",
      description: primaryDescriptions["/"],
      href: "/",
      type: "Home",
    },
    ...gameInfoTopics.map((topic) => ({
      title: topic.title,
      description: topic.description,
      href: topic.href,
      type: "Game info",
    })),
    ...pillars,
    ...primary,
    ...database,
    ...detailEntries,
    ...topics,
  ];
}
