import Link from "next/link";
import { HubHero } from "@/components/content/HubHero";
import { guideDestination } from "@/lib/data/guide-destinations";
import { getGuidePillars } from "@/lib/data/pillars";
import hubData from "@/data/site/hubs.json";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import styles from "@/style/page/hubs/research-hub.module.css";

export default function ResearchHubPage({ id }: { id: string }) {
  const hub = hubData.find((h) => h.id === id)!;
  const guideLinks = [
    ...new Set(
      hub.guideSlugs.map((slug) => guideDestination(slug).split("#")[0]),
    ),
  ];
  const guideTitle = (href: string) =>
    getGuidePillars().find((pillar) => pillar.href === href)?.title ?? "Guide";
  return (
    <>
      <JsonLd
        data={collectionSchema(
          hub.title,
          `/${id}`,
          guideLinks.map((href) => ({
            name: guideTitle(href),
            href,
          })),
        )}
      />
      <HubHero
        dark={id === "bosses" || id === "walkthrough"}
        eyebrow={hub.eyebrow}
        title={hub.title}
        description={hub.description}
        image={hub.image}
        imageAlt={hub.imageAlt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          {
            label:
              id === "map" ? "Map" : id.charAt(0).toUpperCase() + id.slice(1),
          },
        ]}
      />
      <div className={`container ${styles.layout}`}>
        <div>
          <section id="featured-guides">
            <h2>{hub.introTitle}</h2>
            <p className={styles.intro}>{hub.intro}</p>
            <ul>
              {guideLinks.map((href) => (
                <li key={href}>
                  <Link href={href}>{guideTitle(href)} →</Link>
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.section} id="quick-reference">
            <h2>{hub.table.caption}</h2>
            <div
              className={styles.tableWrap}
              tabIndex={0}
              role="region"
              aria-label={hub.table.caption}
            >
              <table>
                <caption className="sr-only">{hub.table.caption}</caption>
                <thead>
                  <tr>
                    {hub.table.headers.map((h) => (
                      <th key={h} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hub.table.rows.map((r, i) => (
                    <tr key={i}>
                      {r.map((cell, j) =>
                        j === 0 ? (
                          <th scope="row" key={j}>
                            {cell}
                          </th>
                        ) : (
                          <td key={j}>{cell}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          {hub.sections.map((s) => (
            <section id={s.id} key={s.id} className={styles.section}>
              <h2>{s.title}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.cards && (
                <div className={styles.cards}>
                  {s.cards.map((c) => (
                    <article key={c.title}>
                      <h3>{c.title}</h3>
                      <p>{c.text}</p>
                      <Link
                        href={
                          c.href.startsWith("/guides/")
                            ? guideDestination(c.href.split("/").at(-1)!)
                            : c.href
                        }
                      >
                        {"linkLabel" in c
                          ? c.linkLabel
                          : "Read the connected guide"}{" "}
                        →
                      </Link>
                    </article>
                  ))}
                </div>
              )}
              {"steps" in s && s.steps && (
                <ol className={styles.steps}>
                  {s.steps.map((step) => (
                    <li key={step.title}>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </li>
                  ))}
                </ol>
              )}
              {s.bullets && (
                <ul className={styles.bullets}>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <aside className={styles.aside}>
          <h2>On this page</h2>
          <nav aria-label="Page sections">
            <ul>
              <li>
                <a href="#featured-guides">Featured guides</a>
              </li>
              <li>
                <a href="#quick-reference">At a glance</a>
              </li>
              {hub.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <h2>Connected guides</h2>
          <ul>
            {hub.quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={
                    l.href.startsWith("/guides/")
                      ? guideDestination(l.href.split("/").at(-1)!)
                      : l.href
                  }
                >
                  {l.name} ↗
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
