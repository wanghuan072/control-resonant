import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
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

const relationLabels = {
  characters: "Related character",
  world: "Related place",
  combat: "Related system",
  enemies: "Related threat",
  missions: "Related mission",
} as const;

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
          title={`CONTROL Resonant ${entry.title} — Wiki`}
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
              <a href="#player-takeaway">What players need to know</a>
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
                {related.slice(0, 4).map((item) => (
                  <div key={`related-${item.group}-${item.slug}`}>
                    <dt>{relationLabels[item.group]}</dt>
                    <dd>
                      <Link href={wikiDetailPath(item)}>{item.title}</Link>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
            {entry.image && (
              <figure className={styles.fullFrame}>
                <Image
                  src={entry.image}
                  alt={entry.imageAlt ?? ""}
                  width={1400}
                  height={788}
                  sizes="(max-width:1024px) 100vw, 760px"
                />
                <figcaption>
                  {entry.imageAlt ?? entry.title}. The complete frame is shown
                  without the Hero crop.
                </figcaption>
              </figure>
            )}
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
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <Fragment key={paragraph}>
                    <p>{paragraph}</p>
                    {section.inlineLinks
                      ?.filter((link) => link.afterParagraph === paragraphIndex)
                      .map((link) => (
                        <p key={link.href}>
                          {link.prefix}
                          <Link href={link.href}>{link.label}</Link>
                          {link.suffix}
                        </p>
                      ))}
                  </Fragment>
                ))}
                {section.connections && (
                  <div className={styles.connections}>
                    <h3>{relationLabels[entry.group]} files</h3>
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
              <h2>{entry.title}: what players need to know</h2>
              <p>{entry.playerTakeaway}</p>
            </section>
            {guide && (
              <section className={styles.guideLink}>
                <h2>Use {entry.title} in a step-by-step guide</h2>
                <p>
                  We keep the facts and context in this Wiki file. When you need
                  to turn them into a decision or route, continue with the
                  connected guide.
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
            <Link className={styles.back} href={`/wiki/${entry.group}`}>
              ← All {group.title} topics
            </Link>
          </aside>
        </div>
      </article>
    </>
  );
}
