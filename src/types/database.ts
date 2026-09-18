export type DatabaseRecord = {
  id: string;
  name: string;
  label: string;
  description: string;
  href: string;
  scope?: string;
  details?: { label: string; value: string }[];
  background?: { label: string; text: string };
  playerNote?: string;
  sourceIds?: string[];
  image?: {
    src: string;
    alt: string;
    caption: string;
    sourceUrl: string;
    credit: string;
  };
};
export type DatabaseCategory = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  sectionTitle: string;
  sectionDescription: string;
  items: DatabaseRecord[];
  facts: string[];
  note: string;
  guideSlug: string;
  sourceIds: string[];
  checkedAt?: string;
  backgroundList?: {
    title: string;
    description: string;
    items: string[];
    sourceId: string;
  };
  seo: { title: string; description: string };
};
