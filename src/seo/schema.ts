import { siteConfig } from "@/config/site";
import type { WikiDetail } from "@/types/wiki";

const organization = {
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.editorialTeam.name,
  url: `${siteConfig.url}/legal/about-us`,
  logo: `${siteConfig.url}/images/logo.png`,
  email: siteConfig.email,
};
export function homeSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    { "@context": "https://schema.org", ...organization },
  ];
}
export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href.startsWith("http")
        ? item.href
        : `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    })),
  };
}
export function collectionSchema(
  name: string,
  path: string,
  items: { name: string; href: string }[],
) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name,
      url: `${siteConfig.url}${path}`,
      inLanguage: "en",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          url: item.href.startsWith("http")
            ? item.href
            : `${siteConfig.url}${item.href}`,
        })),
      },
    },
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name, href: path },
    ]),
  ];
}
export function wikiDetailSchema(entry: WikiDetail, groupTitle: string) {
  const path = `/wiki/${entry.group}/${entry.slug}`;
  const url = `${siteConfig.url}${path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: entry.title,
      description: entry.summary,
      ...(entry.image ? { image: `${siteConfig.url}${entry.image}` } : {}),
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      datePublished: entry.updatedAt,
      dateModified: entry.updatedAt,
      author: organization,
      publisher: organization,
      inLanguage: "en",
      articleSection: groupTitle,
      about: { "@type": "VideoGame", name: "CONTROL Resonant" },
    },
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Wiki", href: "/wiki" },
      { name: groupTitle, href: `/wiki/${entry.group}` },
      { name: entry.title, href: path },
    ]),
  ];
}
