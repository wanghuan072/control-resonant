import Link from "next/link";
import Image from "next/image";
import wikiGroups from "@/data/site/wiki-groups.json";
import { HubHero } from "@/components/content/HubHero";
import { guideDestination } from "@/lib/data/guide-destinations";
import { getDatabaseCategory } from "@/lib/data/database";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import styles from "@/style/page/database/database.module.css";

export default function DatabaseCategoryPage({ id }: { id: string }) {
  const c = getDatabaseCategory(id);
  return (
    <>
      <JsonLd
        data={collectionSchema(
          c.title,
          `/${id}`,
          c.items.map((i) => ({ name: i.name, href: `/${id}#${i.id}` })),
        )}
      />
      <HubHero
        eyebrow={c.eyebrow}
        title={c.title}
        description={c.description}
        image={c.heroImage}
        imageAlt={c.heroAlt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Wiki", href: "/wiki" },
          { label: id.replaceAll("-", " ") },
        ]}
      />
      <nav
        className={`container ${styles.categoryNav}`}
        aria-label="Wiki categories"
      >
        {wikiGroups.map((group) => (
          <Link
            key={group.id}
            href={`/wiki#${group.id}`}
            aria-current={group.categoryIds.includes(id) ? "page" : undefined}
          >
            {group.title}
          </Link>
        ))}
      </nav>
      <div className={`container ${styles.layout}`}>
        <div>
          <section>
            <div className={styles.heading}>
              <span>
                {c.items.length} entries · updated {c.checkedAt ?? "2026-09-15"}
              </span>
              <h2>{c.sectionTitle}</h2>
              <p>{c.sectionDescription}</p>
            </div>
            <div
              className={styles.tableWrap}
              role="region"
              aria-label={c.sectionTitle}
              tabIndex={0}
            >
              <table>
                <caption>
                  {c.title.replace("CONTROL Resonant ", "")} quick index
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Record</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {c.items.map((i) => (
                    <tr key={i.id}>
                      <th scope="row">
                        <a href={`#${i.id}`}>{i.name} ↓</a>
                      </th>
                      <td>{i.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className={styles.records}>
            <h2>
              {id === "characters"
                ? "Character files"
                : "What each entry means for you"}
            </h2>
            {c.items.map((item) => (
              <article id={item.id} key={item.id}>
                <div className={item.image ? styles.recordColumns : undefined}>
                  {item.image && (
                    <figure className={styles.portrait}>
                      <div>
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          fill
                          sizes="(max-width:650px) 140px, 176px"
                        />
                      </div>
                      <figcaption>
                        {item.image.caption}
                        <span>{item.image.credit}</span>
                      </figcaption>
                    </figure>
                  )}
                  <div className={styles.recordCopy}>
                    <p className={styles.label}>{item.label}</p>
                    <h3>{item.name}</h3>
                    {item.scope && <p className={styles.scope}>{item.scope}</p>}
                    <p>{item.description}</p>
                    {item.details && (
                      <dl className={styles.recordFacts}>
                        {item.details.map((detail) => (
                          <div key={detail.label}>
                            <dt>{detail.label}</dt>
                            <dd>{detail.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {item.background && (
                      <details className={styles.background}>
                        <summary>{item.background.label}</summary>
                        <p>{item.background.text}</p>
                      </details>
                    )}
                    {item.playerNote && (
                      <div className={styles.playerNote}>
                        <h4>Player takeaway</h4>
                        <p>{item.playerNote}</p>
                      </div>
                    )}
                    <div className={styles.recordActions}>
                      {(item.href.startsWith("/") ||
                        item.href.startsWith("#")) && (
                        <Link href={item.href}>Continue reading →</Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
          {c.backgroundList && (
            <section className={styles.further}>
              <h2>{c.backgroundList.title}</h2>
              <p>{c.backgroundList.description}</p>
              <details className={styles.background}>
                <summary>
                  Show original-game mission order — title spoilers
                </summary>
                <ol className={styles.legacyMissions}>
                  {c.backgroundList.items.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ol>
              </details>
            </section>
          )}
          <section className={styles.further}>
            <h2>Read the connected guide</h2>
            <Link href={guideDestination(c.guideSlug)}>
              Open the relevant field manual →
            </Link>
          </section>
        </div>
        <aside className={styles.aside}>
          <nav aria-label="On this page">
            <h2>On this page</h2>
            <ol className={styles.recordToc}>
              {c.items.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.name}</a>
                </li>
              ))}
            </ol>
          </nav>
          <h2>Quick context</h2>
          <ul>
            {c.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Link href="/wiki">← All Wiki sections</Link>
        </aside>
      </div>
    </>
  );
}
