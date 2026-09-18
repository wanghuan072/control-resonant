import { notFound, permanentRedirect } from "next/navigation";
import { legacyGuideDestinations } from "@/lib/data/guide-destinations";

export function generateStaticParams() {
  return Object.keys(legacyGuideDestinations).map((slug) => ({ slug }));
}

export default async function LegacyGuideRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = legacyGuideDestinations[slug];
  if (!destination) notFound();
  permanentRedirect(destination);
}
