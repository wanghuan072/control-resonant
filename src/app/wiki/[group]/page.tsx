import { notFound } from "next/navigation";
import WikiGroupPage from "@/page/wiki/WikiGroupPage";
import { getWikiGroup, getWikiGroups } from "@/lib/data/wiki";
import { createMetadata } from "@/seo/metadata";
import type { WikiGroupId } from "@/types/wiki";

export const dynamicParams = false;
export function generateStaticParams() {
  return getWikiGroups().map((group) => ({ group: group.id }));
}
type Props = { params: Promise<{ group: string }> };
export async function generateMetadata({ params }: Props) {
  const { group: id } = await params;
  const group = getWikiGroup(id);
  if (!group) return {};
  return createMetadata({ path: `/wiki/${id}` });
}
export default async function WikiGroupRoute({ params }: Props) {
  const { group } = await params;
  if (!getWikiGroup(group)) notFound();
  return <WikiGroupPage id={group as WikiGroupId} />;
}
