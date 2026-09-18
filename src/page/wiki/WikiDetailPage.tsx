import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { getWikiDetail, getWikiGroup, wikiDetailPath } from "@/lib/data/wiki";
import { JsonLd } from "@/seo/JsonLd";
import { wikiDetailSchema } from "@/seo/schema";
import type { WikiDetail } from "@/types/wiki";
import styles from "@/style/page/wiki/wiki-detail.module.css";

const guideLinks: Record<string, { label: string; href: string }> = {
  "characters/dylan-faden": {
    label: "Follow the newcomer reading route",
    href: "/guides/getting-started#what-changed",
  },
  "characters/jesse-faden": {
    label: "Read the spoiler-light story primer",
    href: "/guides/getting-started#story-context",
  },
  "world/ordinary-awe": {
    label: "Continue from the series history to the new game",
    href: "/guides/getting-started#what-changed",
  },
  "combat/aberrant": {
    label: "Learn the Aberrant combat loop",
    href: "/guides/combat-builds#aberrant-forms",
  },
  "combat/reach": {
    label: "Read the Metro Fault preview route",
    href: "/guides/story-walkthrough#metro-fault",
  },
  "missions/metro-fault": {
    label: "Read the Metro Fault preview route",
    href: "/guides/story-walkthrough#metro-fault",
  },
  "enemies/central-resonant": {
    label: "Read the boss preview guide",
    href: "/guides/story-walkthrough#central-resonant",
  },
};

export default function WikiDetailPage({ entry }: { entry: WikiDetail }) {
  const group = getWikiGroup(entry.group)!;
  const guide = guideLinks[`${entry.group}/${entry.slug}`];
  const related = entry.related
    .map((path) => {
      const [groupId, slug] = path.split("/");
      return getWikiDetail(groupId, slug);
    })
    .filter((item): item is WikiDetail => Boolean(item));
  return (
    <>
      <JsonLd data={wikiDetailSchema(entry, group.title)} />
      <article className={styles.article}>
        <HubHero
          eyebrow={`Wiki / ${group.title} / ${entry.type}`}
          title={entry.title}
          description={entry.summary}
          image={entry.image}
          imageAlt={entry.imageAlt}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Wiki", href: "/wiki" },
            { label: group.title, href: `/wiki/${group.id}` },
            { label: entry.title },
          ]}
        />
        <div className={`container ${styles.layout}`}>
          <div>
            <nav className={styles.contents} aria-label="On this file">
              <span>On this file</span>
              <a href="#quick-facts">Quick facts</a>
              {entry.comparison && <a href="#comparison">Comparison</a>}
              {entry.sections.map((section, index) => (
                <a href={`#field-note-${index + 1}`} key={section.heading}>
                  {section.heading}
                </a>
              ))}
              <a href="#player-takeaway">Player takeaway</a>
            </nav>
            <section className={styles.factSection} id="quick-facts">
              <p className={styles.micro}>Case file / quick facts</p>
              <h2>{entry.title} at a glance</h2>
              <dl>
                {entry.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
            {entry.comparison && (
              <section className={styles.comparison} id="comparison">
                <p className={styles.micro}>Field comparison</p>
                <h2>{entry.comparison.heading}</h2>
                <p>{entry.comparison.introduction}</p>
                <div
                  role="region"
                  aria-label={entry.comparison.heading}
                  tabIndex={0}
                >
                  <table>
                    <thead>
                      <tr>
                        {entry.comparison.columns.map((column) => (
                          <th key={column} scope="col">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {entry.comparison.rows.map((row) => (
                        <tr key={row[0]}>
                          <th scope="row">{row[0]}</th>
                          {row.slice(1).map((value, index) => (
                            <td key={`${row[0]}-${index}`}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            {entry.sections.map((section, index) => (
              <section
                className={styles.textSection}
                id={`field-note-${index + 1}`}
                key={section.heading}
              >
                <p className={styles.micro}>
                  {String(index + 2).padStart(2, "0")} / Field notes
                </p>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.connections && (
                  <div className={styles.connections}>
                    <h3>Follow this thread</h3>
                    <ul>
                      {section.connections.map((connection) => {
                        const [groupId, slug] = connection.path.split("/");
                        const target = getWikiDetail(groupId, slug);
                        if (!target) return null;
                        return (
                          <li key={connection.path}>
                            <Link href={wikiDetailPath(target)}>
                              <strong>{target.title}</strong>
                              <span>{connection.reason}</span>
                              <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </section>
            ))}
            <section className={styles.takeaway} id="player-takeaway">
              <p className={styles.micro}>What this means for your run</p>
              <h2>Player takeaway</h2>
              <p>{entry.playerTakeaway}</p>
            </section>
            {guide && (
              <section className={styles.guideLink}>
                <h2>Need the route, not the definition?</h2>
                <p>
                  Guides focus on how to act. This Wiki file keeps the subject
                  and its known facts in one place.
                </p>
                <Link href={guide.href}>
                  {guide.label} <ArrowRight size={16} />
                </Link>
              </section>
            )}
          </div>
          <aside className={styles.aside}>
            <div>
              <span>File</span>
              <strong>
                {entry.group.toUpperCase()} / {entry.slug.toUpperCase()}
              </strong>
            </div>
            <div>
              <span>Updated</span>
              <time dateTime={entry.updatedAt}>{entry.updatedAt}</time>
            </div>
            <h2>Connected files</h2>
            <ul>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={wikiDetailPath(item)}>
                    {item.title} <ArrowRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
            <Link className={styles.back} href={`/wiki/${entry.group}`}>
              ← All {group.title} topics
            </Link>
          </aside>
        </div>
      </article>
    </>
  );
}
