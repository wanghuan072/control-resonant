import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { GuideList } from "@/components/content/GuideList";
import { ArticleSidebar } from "@/components/content/ArticleSidebar";
import { getRelatedGuides } from "@/lib/data/guides";
import { getPillarForGuide } from "@/lib/data/pillars";
import { JsonLd } from "@/seo/JsonLd";
import { guideSchema } from "@/seo/schema";
import styles from "@/style/page/guides/guide-detail.module.css";
import type { Guide } from "@/types/guide";

const wikiReferences: Record<string, { label: string; href: string }[]> = {
  "control-resonant-beginners-guide": [
    { label: "Dylan, Jesse and Zoe", href: "/wiki/characters" },
    { label: "The Gap and Manhattan Zones", href: "/wiki/world" },
  ],
  "control-resonant-combat-abilities-and-aberrant-forms": [
    {
      label: "Compare six Aberrant Forms",
      href: "/wiki/combat/aberrant-forms",
    },
    {
      label: "Compare early Combat Abilities",
      href: "/wiki/combat/combat-abilities",
    },
  ],
  "control-resonant-artifacts-guide": [
    {
      label: "Artifact states and slot limits",
      href: "/wiki/combat/artifacts",
    },
    { label: "The Gap", href: "/wiki/world/the-gap" },
  ],
  "control-resonant-new-game-plus": [
    { label: "NG+ carry-over matrix", href: "/wiki/combat/new-game-plus" },
  ],
  "control-resonant-world-quests-and-exploration": [
    {
      label: "World Quests versus Faults",
      href: "/wiki/missions/world-quests-and-faults",
    },
    {
      label: "FBC field office and Zones",
      href: "/wiki/world/fbc-field-office",
    },
  ],
  "control-resonant-central-resonant-boss": [
    { label: "Central Resonant facts", href: "/wiki/enemies/central-resonant" },
    {
      label: "Separate opening Resonant encounter",
      href: "/wiki/enemies/first-resonant-entity",
    },
  ],
};
const purchaseReferences: Record<string, { label: string; href: string }[]> = {
  "control-resonant-editions-and-pre-order-bonuses": [
    {
      label: "Physical release and SteelBook package",
      href: "/game-info/physical-release-steelbook",
    },
    {
      label: "RTX 50 hardware bundle conditions",
      href: "/game-info/nvidia-rtx-bundle",
    },
  ],
  "control-resonant-release-date-and-platforms": [
    {
      label: "Physical release and SteelBook package",
      href: "/game-info/physical-release-steelbook",
    },
    { label: "Watch the official trailers", href: "/game-info/trailers" },
  ],
  "control-resonant-pc-system-requirements": [
    {
      label: "RTX 50 bundle eligibility and redemption",
      href: "/game-info/nvidia-rtx-bundle",
    },
  ],
};

export default function GuideDetailPage({ guide }: { guide: Guide }) {
  const pillar = getPillarForGuide(guide.slug);
  const sections = [
    ...guide.sections,
    ...(guide.faq?.length
      ? [{ id: "faq", title: "Frequently asked questions" }]
      : []),
  ];
  return (
    <>
      <JsonLd data={guideSchema(guide)} />
      <article className={styles.article}>
        <HubHero
          eyebrow={`Guide / ${pillar?.title ?? guide.category}`}
          title={guide.title}
          description={guide.introduction}
          image={guide.image}
          imageAlt={guide.imageAlt}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Guides", href: "/guides" },
            { label: guide.title },
          ]}
          meta={
            <>
              <span>
                Updated{" "}
                <time dateTime={guide.updatedAt}>{guide.updatedAt}</time>
              </span>
              <span>{guide.readTime}</span>
            </>
          }
        />
        <div className={styles.facts}>
          <dl className="container">
            {guide.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={`container ${styles.articleGrid}`}>
          <div className={styles.content}>
            <details className={styles.mobileToc}>
              <summary>
                On this page <span aria-hidden="true">+</span>
              </summary>
              <nav aria-label="Mobile article contents">
                <ol>
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>{s.title}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
            {guide.sections.map((s) => (
              <section
                id={s.id}
                key={s.id}
                className={`${styles.section} ${s.id === "quick-answer" ? styles.quickAnswer : ""}`}
              >
                <div className={styles.sectionTitle}>
                  <h2>{s.title}</h2>
                </div>
                {s.id === "quick-answer" && (
                  <p className={styles.answer}>{guide.quickAnswer}</p>
                )}
                {s.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.table && (
                  <div
                    className={styles.tableWrap}
                    role="region"
                    aria-label={s.table.caption ?? s.title}
                    tabIndex={0}
                  >
                    <table>
                      <caption>{s.table.caption ?? s.title}</caption>
                      <thead>
                        <tr>
                          {s.table.headers.map((h) => (
                            <th key={h} scope="col">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) =>
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
                )}
                {s.subsections?.map((sub) => (
                  <section className={styles.subsection} key={sub.title}>
                    <h3>{sub.title}</h3>
                    {sub.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {sub.bullets && (
                      <ul>
                        {sub.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
                {s.steps && (
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
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {s.image && (
                  <figure className={styles.figure}>
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      width={1600}
                      height={900}
                      sizes="(max-width:1000px) 100vw, 65vw"
                    />
                    {s.image.caption && (
                      <figcaption>{s.image.caption}</figcaption>
                    )}
                  </figure>
                )}
                {s.links?.length ? (
                  <nav
                    className={styles.contextLinks}
                    aria-label={`Related reading for ${s.title}`}
                  >
                    <span>Continue reading</span>
                    <ul>
                      {s.links
                        .filter(
                          (link) =>
                            link.href.startsWith("/") ||
                            link.href.startsWith("#"),
                        )
                        .map((link) => (
                          <li key={link.href}>
                            <Link href={link.href}>
                              {link.label}
                              <ArrowRight size={15} aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </nav>
                ) : null}
              </section>
            ))}
            {guide.faq?.length ? (
              <section className={styles.section} id="faq">
                <h2>Frequently asked questions</h2>
                {guide.faq.map((q) => (
                  <section className={styles.faq} key={q.question}>
                    <h3>{q.question}</h3>
                    <p>{q.answer}</p>
                  </section>
                ))}
              </section>
            ) : null}
            {wikiReferences[guide.slug]?.length ? (
              <section className={styles.referenceFiles}>
                <h2>Check the underlying Wiki files</h2>
                <p>
                  The guide handles the player decision; these files keep the
                  definitions and known data together.
                </p>
                <ul>
                  {wikiReferences[guide.slug].map((file) => (
                    <li key={file.href}>
                      <Link href={file.href}>
                        {file.label}
                        <ArrowRight size={15} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {purchaseReferences[guide.slug]?.length ? (
              <section className={styles.referenceFiles}>
                <h2>Focused purchase answers</h2>
                <p>
                  These files cover conditions that do not fit into the broader
                  guide.
                </p>
                <ul>
                  {purchaseReferences[guide.slug].map((file) => (
                    <li key={file.href}>
                      <Link href={file.href}>
                        {file.label}
                        <ArrowRight size={15} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <section className={styles.related}>
              <h2>Related guides</h2>
              <GuideList guides={getRelatedGuides(guide)} compact />
            </section>
          </div>
          <ArticleSidebar guide={guide} sections={sections} />
        </div>
      </article>
    </>
  );
}
