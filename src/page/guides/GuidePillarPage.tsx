import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpen } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { longformGuides } from "@/data/guides/longform";
import { getGuidePillar, getGuidePillars } from "@/lib/data/pillars";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import { siteConfig } from "@/config/site";
import type { GuidePillarId } from "@/types/guide-pillar";
import styles from "@/style/page/guides/guide-reading.module.css";

export default function GuidePillarPage({ id }: { id: GuidePillarId }) {
  const pillar = getGuidePillar(id);
  const guide = longformGuides[id];
  const url = `${siteConfig.url}${pillar.href}`;
  const headline = pillar.title;
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${url}#article`,
            headline,
            description: pillar.seo.description,
            url,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            datePublished: guide.updatedAt,
            dateModified: guide.updatedAt,
            image: `${siteConfig.url}${pillar.image}`,
            author: { "@type": "Organization", name: siteConfig.name },
            publisher: { "@type": "Organization", name: siteConfig.name },
            inLanguage: "en",
          },
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Guides", href: "/guides" },
            { name: pillar.title, href: pillar.href },
          ]),
        ]}
      />
      <article>
        <HubHero
          eyebrow={`Field manual / ${pillar.number} / ${pillar.eyebrow}`}
          title={`CONTROL Resonant ${pillar.title} — Guide`}
          description={pillar.intro}
          image={pillar.image}
          imageAlt={`${pillar.title} guide artwork`}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Guides", href: "/guides" },
            { label: pillar.title },
          ]}
          meta={
            <>
              <span>{guide.readTime}</span>
              <span>
                Updated{" "}
                <time dateTime={guide.updatedAt}>{guide.updatedAt}</time>
              </span>
            </>
          }
        />

        <div className={`container ${styles.readingGrid}`}>
          <div className={styles.mainColumn}>
            <section className={styles.brief} aria-labelledby="field-answer">
              <div>
                <span>Start here / direct answer</span>
                <BookOpen size={23} />
              </div>
              <h2 id="field-answer">What this guide helps you accomplish</h2>
              <p>{guide.answer}</p>
              <a href="#chapter-1">
                Start reading <ArrowDown size={16} />
              </a>
            </section>

            <nav className={styles.mobileContents} aria-label="Guide chapters">
              <details>
                <summary>
                  On this page <span aria-hidden="true">+</span>
                </summary>
                <ol>
                  {guide.chapters.map((chapter) => (
                    <li key={chapter.id}>
                      <a href={`#${chapter.id}`}>{chapter.title}</a>
                    </li>
                  ))}
                </ol>
              </details>
            </nav>

            {guide.chapters.map((chapter, index) => (
              <section
                className={styles.chapter}
                id={chapter.id}
                key={chapter.id}
              >
                <div className={styles.chapterRail} aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className={styles.chapterBody}>
                  <p
                    className={styles.chapterEyebrow}
                    id={`chapter-${index + 1}`}
                  >
                    {chapter.eyebrow}
                  </p>
                  <h2>{chapter.title}</h2>
                  {chapter.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {chapter.image && (
                    <figure className={styles.figure}>
                      <Image
                        src={chapter.image.src}
                        alt={chapter.image.alt}
                        width={1200}
                        height={675}
                        sizes="(max-width:900px) 100vw, 65vw"
                      />
                      <figcaption>{chapter.image.caption}</figcaption>
                    </figure>
                  )}
                  {chapter.table && (
                    <div
                      className={styles.tableWrap}
                      role="region"
                      aria-label={chapter.title}
                      tabIndex={0}
                    >
                      <table>
                        <thead>
                          <tr>
                            {chapter.table.headers.map((header) => (
                              <th key={header} scope="col">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {chapter.table.rows.map((row) => (
                            <tr key={row[0]}>
                              <th scope="row">{row[0]}</th>
                              {row.slice(1).map((cell, cellIndex) => (
                                <td key={`${row[0]}-${cellIndex}`}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {chapter.steps && (
                    <ol className={styles.steps}>
                      {chapter.steps.map((step, stepIndex) => (
                        <li key={step.title}>
                          <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                          <div>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                  {chapter.bullets && (
                    <ul className={styles.bullets}>
                      {chapter.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {chapter.links && (
                    <nav
                      className={styles.chapterLinks}
                      aria-label={`Related to ${chapter.title}`}
                    >
                      {chapter.links.map((link) => (
                        <Link href={link.href} key={link.href}>
                          {link.label} <ArrowRight size={16} />
                        </Link>
                      ))}
                    </nav>
                  )}
                </div>
              </section>
            ))}

            <section
              className={styles.nextReading}
              aria-labelledby="next-reading-heading"
            >
              <p>Continue the investigation</p>
              <h2 id="next-reading-heading">
                Continue with the guide that matches your next objective
              </h2>
              <div>
                {guide.related.map((item) => (
                  <Link href={item.href} key={item.href}>
                    <strong>{item.label}</strong>
                    <span>{item.note}</span>
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.sidebar} aria-label="Guide navigation">
            <div className={styles.sticky}>
              <div className={styles.sidebarTop}>
                <span>On this page</span>
                <span>
                  {String(guide.chapters.length).padStart(2, "0")} chapters
                </span>
              </div>
              <nav aria-label="Contents">
                <ol>
                  {guide.chapters.map((chapter, index) => (
                    <li key={chapter.id}>
                      <a href={`#${chapter.id}`}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {chapter.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className={styles.routeNote}>
                <strong>Reading route</strong>
                <p>{guide.route.join(" → ")}</p>
              </div>
              <Link href="/guides" className={styles.backLink}>
                All four guides <ArrowRight size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </article>
      <nav
        className={`container ${styles.guideSwitch}`}
        aria-label="Other guide routes"
      >
        {getGuidePillars()
          .filter((item) => item.id !== id)
          .map((item) => (
            <Link href={item.href} key={item.id}>
              <span>{item.number}</span>
              <strong>{item.title}</strong>
              <ArrowRight size={16} />
            </Link>
          ))}
      </nav>
    </>
  );
}
