import type { MetadataRoute } from "next";
import { gameInfoTopics } from "@/config/game-info-topics";

import {
  databaseNavigation,
  legalNavigation,
  primaryNavigation,
} from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getGuidePillars } from "@/lib/data/pillars";
import { wikiDetails } from "@/lib/data/wiki";
import { pageTdk } from "@/seo/tdk";

export default function sitemap(): MetadataRoute.Sitemap {
  const topicDates = new Map<string, string>(
    gameInfoTopics.map((topic) => [topic.href, topic.updatedAt]),
  );
  const wikiDates = new Map<string, string>(
    wikiDetails.map((entry) => [
      `/wiki/${entry.group}/${entry.slug}`,
      entry.updatedAt,
    ]),
  );
  const fixedPaths = [
    ...new Set([
      "/",
      ...primaryNavigation
        .filter((item) => item.href !== "/game-info")
        .map((item) => item.href),
      ...databaseNavigation.map((item) => item.href),
      ...gameInfoTopics.map((topic) => topic.href),
      ...wikiDetails.map((entry) => `/wiki/${entry.group}/${entry.slug}`),
      ...legalNavigation.map((item) => item.href),
      "/bosses",
      ...getGuidePillars().map((pillar) => pillar.href),
    ]),
  ];
  const guideDates = new Map(
    getGuidePillars().map((pillar) => [pillar.href, pillar.updatedAt]),
  );

  return [
    ...fixedPaths.map((path) => {
      const lastModified =
        topicDates.get(path) ??
        wikiDates.get(path) ??
        guideDates.get(path) ??
        pageTdk[path as keyof typeof pageTdk]?.updatedAt;
      return {
        url: `${siteConfig.url}${path === "/" ? "" : path}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency:
          path === "/updates" ? ("weekly" as const) : ("monthly" as const),
        priority: path === "/" ? 1 : path === "/wiki" ? 0.9 : 0.7,
      };
    }),
  ];
}
