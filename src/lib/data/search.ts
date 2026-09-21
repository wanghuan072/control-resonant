import { databaseNavigation, primaryNavigation } from "@/config/navigation";
import { gameInfoTopics } from "@/config/game-info-topics";
import { tools } from "@/config/tools";
import { getGuidePillars } from "@/lib/data/pillars";
import { getWikiTopics, wikiDetails, wikiDetailPath } from "@/lib/data/wiki";
import type { WikiGroupId } from "@/types/wiki";
import type { SearchEntry } from "@/types/content";

const primaryDescriptions: Record<string, string> = {
  "/": "CONTROL Resonant release details, guides, world overview, and frequently asked questions.",
  "/gameplay":
    "How Aberrant Forms, Combat Abilities, Talents, Artifacts, traversal and Assist Mode fit together.",
  "/guides":
    "Four focused routes for getting started, builds, story progress and completion.",
  "/wiki":
    "Player-focused Wiki for characters, world, combat, enemies and missions.",
  "/map":
    "Pre-release map status, confirmed Manhattan places and the location details still awaiting final-game verification.",
  "/tools":
    "Open focused CONTROL Resonant player utilities, including the PC system requirements checker.",
  "/updates":
    "Dated release, platform, combat and accessibility announcements.",
};

export function getSearchEntries(): SearchEntry[] {
  const primary = primaryNavigation
    .filter((item) => item.href !== "/game-info")
    .map((item) => ({
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
  const toolEntries = tools.map((tool) => ({
    title: `CONTROL Resonant ${tool.title}`,
    description: tool.description,
    href: tool.href,
    type: "Tool",
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
    ...toolEntries,
    ...primary,
    ...database,
    ...detailEntries,
    ...topics,
  ];
}
