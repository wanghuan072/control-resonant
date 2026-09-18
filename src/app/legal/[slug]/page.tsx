import { notFound } from "next/navigation";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import LegalPage from "@/page/legal/LegalPage";
import { legalPages, type LegalSlug } from "@/data/legal/pages";
import { createMetadata } from "@/seo/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!(slug in legalPages)) return {};
  return createMetadata({ path: `/legal/${slug}` });
}
export default async function LegalRoute({ params }: Props) {
  const { slug } = await params;
  if (!(slug in legalPages)) notFound();
  const page = legalPages[slug as LegalSlug];
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: page.title, href: `/legal/${slug}` },
        ])}
      />
      <LegalPage eyebrow="Legal / CONTROL Resonant Guide" {...page} />
    </>
  );
}
