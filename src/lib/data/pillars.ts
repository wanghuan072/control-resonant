import data from "@/data/guides/pillars.json";
import type { GuidePillarId } from "@/types/guide";

export type GuidePillar = {
  id: GuidePillarId;
  updatedAt: string;
  number: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  intro: string;
  image: string;
  href: string;
  highlights: string[];
  slugs: string[];
  seo: { title: string; description: string };
};

export function getGuidePillars() {
  return data as GuidePillar[];
}
export function getGuidePillar(id: GuidePillarId) {
  return getGuidePillars().find((pillar) => pillar.id === id)!;
}
export function getPillarForGuide(slug: string) {
  return getGuidePillars().find((pillar) => pillar.slugs.includes(slug));
}
