import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { pageTdk } from "@/seo/tdk";

type MetadataInput = {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
  publishedAt?: string;
  updatedAt?: string;
};
export function createMetadata({
  title,
  description,
  path,
  type = "website",
  keywords,
  publishedAt,
  updatedAt,
}: MetadataInput): Metadata {
  const canonical = `${siteConfig.url}${path === "/" ? "" : path}`;
  const selected = pageTdk[path as keyof typeof pageTdk];
  const resolvedTitle = selected?.title ?? title ?? "CONTROL Resonant Guide";
  const resolvedDescription =
    selected?.description ?? description ?? siteConfig.description;
  const socialImage = "/images/og-image.png";
  const socialImageAlt = "CONTROL Resonant Guide social sharing artwork";
  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: keywords ?? [
      "CONTROL Resonant",
      resolvedTitle.replace(/^CONTROL Resonant\s*/, ""),
    ],
    alternates: { canonical },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: siteConfig.name,
      type,
      locale: "en_US",
      images: [
        { url: socialImage, alt: socialImageAlt, width: 1730, height: 925 },
      ],
      ...(type === "article"
        ? {
            publishedTime: publishedAt,
            modifiedTime: updatedAt,
            authors: [`${siteConfig.url}/legal/about-us`],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [{ url: socialImage, alt: socialImageAlt }],
    },
  };
}
