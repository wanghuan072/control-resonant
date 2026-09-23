import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import { siteConfig } from "@/config/site";
import { gameInfoTopics } from "@/config/game-info-topics";
import styles from "@/style/page/game-info/game-info-article.module.css";

const heroTitles: Record<string, string> = {
  "/game-info/nvidia-rtx-bundle":
    "CONTROL Resonant RTX 50 Bundle — Eligibility and Redemption",
  "/game-info/physical-release-steelbook":
    "CONTROL Resonant Physical Release — SteelBook Edition",
  "/game-info/trailers":
    "CONTROL Resonant Trailers — Gameplay Videos and Music",
};

type Topic = (typeof gameInfoTopics)[number];

export default function GameInfoArticle({
  topic,
  lead,
  image,
  children,
}: {
  topic: Topic;
  lead: string;
  image: string;
  children: React.ReactNode;
}) {
  const url = `${siteConfig.url}${topic.href}`;
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: heroTitles[topic.href] ?? topic.title,
            description: topic.description,
            url,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            datePublished: topic.updatedAt,
            dateModified: topic.updatedAt,
            image: `${siteConfig.url}${image}`,
            author: {
              "@type": "Organization",
              name: siteConfig.editorialTeam.name,
              url: `${siteConfig.url}${siteConfig.editorialTeam.url}`,
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.editorialTeam.name,
            },
            inLanguage: "en",
          },
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Release Date", href: "/game-info/release-date" },
            { name: topic.title, href: topic.href },
          ]),
        ]}
      />
      <HubHero
        eyebrow="Game info / useful details"
        title={heroTitles[topic.href] ?? topic.title}
        description={lead}
        image={image}
        imageAlt={`${topic.title} artwork`}
        editorialDate={topic.updatedAt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Release Date", href: "/game-info/release-date" },
          { label: topic.title },
        ]}
      />
      <div className={`container ${styles.layout}`}>
        <article className={styles.article}>{children}</article>
        <aside className={styles.aside} aria-label="Related game information">
          <span>Continue the briefing</span>
          <h2>Related game information</h2>
          <Link href="/game-info/release-date">
            Release dates and editions <ArrowRight size={16} />
          </Link>
          <Link href="/game-info/system-requirements">
            System requirements <ArrowRight size={16} />
          </Link>
          {gameInfoTopics
            .filter((item) => item.href !== topic.href)
            .map((item) => (
              <Link href={item.href} key={item.href}>
                {item.title.replace("CONTROL Resonant ", "")}{" "}
                <ArrowRight size={16} />
              </Link>
            ))}
          <Link href="/game-info/release-date#editions">
            Compare all editions <ArrowRight size={16} />
          </Link>
        </aside>
      </div>
    </>
  );
}
