import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import { siteConfig } from "@/config/site";
import { gameInfoTopics } from "@/config/game-info-topics";
import styles from "@/style/page/game-info/game-info-article.module.css";

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
            headline: topic.title.replace(/^CONTROL Resonant /, ""),
            description: topic.description,
            url,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            datePublished: topic.updatedAt,
            dateModified: topic.updatedAt,
            image: `${siteConfig.url}${image}`,
            author: { "@type": "Organization", name: siteConfig.name },
            publisher: { "@type": "Organization", name: siteConfig.name },
            inLanguage: "en",
          },
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Game Info", href: "/game-info" },
            { name: topic.title, href: topic.href },
          ]),
        ]}
      />
      <HubHero
        eyebrow="Game info / useful details"
        title={topic.title.replace(/^CONTROL Resonant /, "")}
        description={lead}
        image={image}
        imageAlt={`${topic.title} artwork`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Game Info", href: "/game-info" },
          { label: topic.title },
        ]}
        meta={
          <span>
            Updated <time dateTime={topic.updatedAt}>{topic.updatedAt}</time>
          </span>
        }
      />
      <div className={`container ${styles.layout}`}>
        <article className={styles.article}>{children}</article>
        <aside className={styles.aside} aria-label="Related game information">
          <span>Continue the briefing</span>
          <h2>Related game information</h2>
          <Link href="/game-info">
            Game Info overview <ArrowRight size={16} />
          </Link>
          {gameInfoTopics
            .filter((item) => item.href !== topic.href)
            .map((item) => (
              <Link href={item.href} key={item.href}>
                {item.title.replace("CONTROL Resonant ", "")}{" "}
                <ArrowRight size={16} />
              </Link>
            ))}
          <Link href="/game-info#editions">
            Compare all editions <ArrowRight size={16} />
          </Link>
        </aside>
      </div>
    </>
  );
}
