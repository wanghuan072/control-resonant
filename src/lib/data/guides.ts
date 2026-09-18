import guideData from "@/data/guides/guides.json";
import expandedGuideData from "@/data/guides/expanded-guides.json";
import systemGuideData from "@/data/guides/system-guides.json";
import fieldGuideData from "@/data/guides/field-guides.json";
import type { Guide } from "@/types/guide";

const guides = (
  [
    ...fieldGuideData,
    ...expandedGuideData,
    ...systemGuideData,
    ...guideData,
  ] as Guide[]
).map((guide) => {
  const content = [
    guide.introduction,
    guide.quickAnswer,
    ...guide.sections.flatMap((section) => [
      section.title,
      ...(section.paragraphs ?? []),
      ...(section.bullets ?? []),
      ...(section.table?.rows.flat() ?? []),
      ...(section.steps ?? []).flatMap((step) => [step.title, step.text]),
      ...(section.subsections ?? []).flatMap((sub) => [
        sub.title,
        ...sub.paragraphs,
        ...(sub.bullets ?? []),
      ]),
    ]),
    ...(guide.faq ?? []).flatMap((item) => [item.question, item.answer]),
  ].join(" ");
  return {
    ...guide,
    readTime: `${Math.max(1, Math.ceil(content.split(/\s+/).length / 220))} min read`,
  };
});

export function getAllGuides(): Guide[] {
  return guides;
}

export function getFeaturedGuides(): Guide[] {
  return guides.filter((guide) => guide.featured);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getRelatedGuides(guide: Guide): Guide[] {
  return guide.relatedSlugs
    .map((slug) => getGuideBySlug(slug))
    .filter((item): item is Guide => Boolean(item));
}
