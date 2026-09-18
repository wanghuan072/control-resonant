export type GuideFact = {
  label: string;
  value: string;
};

export type GuideTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type GuideSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: { title: string; text: string }[];
  subsections?: { title: string; paragraphs: string[]; bullets?: string[] }[];
  sourceRefs?: number[];
  links?: { label: string; href: string }[];
  evidence?:
    "Official information" | "Preview observation" | "Editorial advice";
  table?: GuideTable;
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
};

export type GuideSource = {
  label: string;
  href: string;
  kind?:
    | "Official"
    | "Developer interview"
    | "Media preview"
    | "Video"
    | "Community";
};

export type Guide = {
  slug: string;
  title: string;
  category:
    | "Game Information"
    | "Getting Started"
    | "Gameplay"
    | "Accessibility"
    | "Progression";
  excerpt: string;
  introduction: string;
  quickAnswer: string;
  image: string;
  imageAlt: string;
  updatedAt: string;
  publishedAt?: string;
  coverage?: "Official information" | "Preview analysis" | "Planning guide";
  faq?: { question: string; answer: string }[];
  video?: {
    id: string;
    title: string;
    publisher: string;
    date: string;
    note: string;
  };
  readTime: string;
  featured: boolean;
  facts: GuideFact[];
  sections: GuideSection[];
  sources: GuideSource[];
  relatedSlugs: string[];
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };
};
export type GuidePillarId =
  "getting-started" | "combat-builds" | "story-walkthrough" | "completion";
