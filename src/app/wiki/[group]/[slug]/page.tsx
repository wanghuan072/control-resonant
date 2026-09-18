import { notFound } from "next/navigation";
import WikiDetailPage from "@/page/wiki/WikiDetailPage";
import { getWikiDetail, wikiDetails } from "@/lib/data/wiki";
import { createMetadata } from "@/seo/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return wikiDetails.map((entry) => ({ group: entry.group, slug: entry.slug }));
}
type Props = { params: Promise<{ group: string; slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { group, slug } = await params;
  const entry = getWikiDetail(group, slug);
  if (!entry) return {};
  return createMetadata({
    title: entry.seo.title,
    description: entry.seo.description,
    path: `/wiki/${group}/${slug}`,
    type: "article",
    updatedAt: entry.updatedAt,
  });
}
export default async function WikiDetailRoute({ params }: Props) {
  const { group, slug } = await params;
  const entry = getWikiDetail(group, slug);
  if (!entry) notFound();
  return <WikiDetailPage entry={entry} />;
}
