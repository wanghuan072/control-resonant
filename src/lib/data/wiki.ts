import groups from "@/data/site/wiki-groups.json";
import details from "@/data/wiki/details.json";
import expandedDetails from "@/data/wiki/expanded-details.json";
import legacyContextDetails from "@/data/wiki/legacy-context-details.json";
import detailAdditions from "@/data/wiki/detail-additions.json";
import dossierAdditions from "@/data/wiki/dossier-additions.json";
import wikiSeo from "@/data/wiki/seo.json";
import { getDatabaseCategories } from "@/lib/data/database";
import type { DatabaseRecord } from "@/types/database";
import type { WikiDetail, WikiGroupId } from "@/types/wiki";

const additions = detailAdditions as Record<
  string,
  { heading: string; paragraphs: string[] }
>;
const dossiers = dossierAdditions as Record<
  string,
  {
    sections: {
      heading: string;
      paragraphs: string[];
      connections: { path: string; reason: string }[];
    }[];
  }
>;
const relatedAdditions: Record<string, string[]> = {
  "characters/dylan-faden": [
    "world/fbc-field-office",
    "world/the-gap",
    "world/ordinary-awe",
    "world/prime-candidate-program",
    "characters/casper-darling",
  ],
  "characters/jesse-faden": [
    "world/ordinary-awe",
    "world/prime-candidate-program",
    "characters/emily-pope",
  ],
  "characters/zoe-de-vera": [
    "world/fbc-field-office",
    "world/federal-bureau-of-control",
  ],
  "combat/aberrant": ["combat/aberrant-forms", "combat/combat-abilities"],
  "combat/reach": ["combat/new-game-plus"],
  "world/manhattan": ["world/fbc-field-office", "world/the-gap"],
  "world/oldest-house": [
    "world/fbc-field-office",
    "world/federal-bureau-of-control",
    "world/prime-candidate-program",
  ],
  "missions/metro-fault": ["missions/world-quests-and-faults"],
  "enemies/central-resonant": ["enemies/first-resonant-entity"],
};
export const wikiDetails = [
  ...details,
  ...expandedDetails,
  ...legacyContextDetails,
].map((entry) => {
  const key = `${entry.group}/${entry.slug}`;
  const addition = additions[key];
  const dossier = dossiers[key];
  const seo = (
    wikiSeo as Record<string, { title: string; description: string }>
  )[key];
  return {
    ...entry,
    seo,
    sections: [
      ...entry.sections,
      ...(addition ? [addition] : []),
      ...(dossier?.sections ?? []),
    ],
    related: [...entry.related, ...(relatedAdditions[key] ?? [])],
  };
}) as WikiDetail[];

export function getWikiGroups() {
  return groups;
}

export function getWikiGroup(id: string) {
  return groups.find((group) => group.id === id);
}

export function getWikiDetail(group: string, slug: string) {
  return wikiDetails.find(
    (entry) => entry.group === group && entry.slug === slug,
  );
}

export function wikiDetailPath(entry: WikiDetail) {
  return `/wiki/${entry.group}/${entry.slug}`;
}

export type WikiTopic = {
  id: string;
  name: string;
  type: string;
  label: string;
  description: string;
  category: string;
  scope?: string;
  playerNote?: string;
  facts: { label: string; value: string }[];
  href?: string;
};

function topicFromRecord(
  categoryId: string,
  record: DatabaseRecord,
): WikiTopic {
  const detail = wikiDetails.find(
    (entry) =>
      entry.group === categoryGroup(categoryId) &&
      entry.slug === (record.detailSlug ?? record.id),
  );
  return {
    id: record.id,
    name: record.name,
    type: record.label.split(" · ")[0],
    label: record.label,
    description: record.description,
    category: categoryId,
    scope: record.scope,
    playerNote: record.playerNote,
    facts: detail?.facts ?? record.details ?? [],
    href: detail ? wikiDetailPath(detail) : undefined,
  };
}

export function categoryGroup(categoryId: string): WikiGroupId {
  return (groups.find((group) => group.categoryIds.includes(categoryId))?.id ??
    "world") as WikiGroupId;
}

export function getWikiTopics(groupId: WikiGroupId): WikiTopic[] {
  const group = getWikiGroup(groupId);
  if (!group) return [];
  const topicsById = new Map<string, WikiTopic>();
  const records = getDatabaseCategories()
    .filter((category) => group.categoryIds.includes(category.id))
    .flatMap((category) =>
      category.items.map((record) => topicFromRecord(category.id, record)),
    );
  for (const topic of records) {
    topicsById.set(`${topic.category}/${topic.id}`, topic);
  }
  for (const detail of wikiDetails.filter((entry) => entry.group === groupId)) {
    const existing = records.some(
      (topic) => topic.href === wikiDetailPath(detail),
    );
    if (existing) continue;
    topicsById.set(`${detail.group}/${detail.slug}`, {
      id: detail.slug,
      name: detail.title,
      type: detail.type,
      label: detail.type,
      description: detail.summary,
      category: detail.group,
      facts: detail.facts,
      href: wikiDetailPath(detail),
    });
  }
  return [...topicsById.values()];
}
