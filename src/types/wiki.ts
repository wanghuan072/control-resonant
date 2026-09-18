export type WikiGroupId =
  "characters" | "world" | "combat" | "enemies" | "missions";

export type WikiDetail = {
  group: WikiGroupId;
  slug: string;
  title: string;
  type: string;
  summary: string;
  seo: { title: string; description: string };
  image?: string;
  imageAlt?: string;
  updatedAt: string;
  facts: { label: string; value: string }[];
  comparison?: {
    heading: string;
    introduction: string;
    columns: string[];
    rows: string[][];
  };
  sections: {
    heading: string;
    paragraphs: string[];
    connections?: { path: string; reason: string }[];
  }[];
  playerTakeaway: string;
  related: string[];
  sourceIds: string[];
};
