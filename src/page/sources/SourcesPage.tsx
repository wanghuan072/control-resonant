import Link from "next/link";
import { HubHero } from "@/components/content/HubHero";
import sources from "@/data/research/sources.json";
import media from "@/data/research/media.json";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import styles from "@/style/page/sources/sources.module.css";

const groups = [
  {
    title: "Official announcements & storefronts",
    kinds: ["Official"],
    note: "Developer-written posts and current store listings establish announced features. Newer specifications take priority over preliminary FAQs.",
  },
  {
    title: "Developer interviews & media previews",
    kinds: ["Developer interview", "Media preview"],
    note: "An interview can confirm a design statement. A hands-on observation describes that preview build, not a reproducible retail result.",
  },
  {
    title: "Video coverage & transcripts",
    kinds: ["Video", "Transcript"],
    note: "Each reference states whether we used a publisher description or a transcript. We do not claim to have watched or independently tested an entire video sequence.",
  },
  {
    title: "Control Wiki references",
    kinds: ["Wiki"],
    note: "Community-maintained lore and character references. We rewrite from a player's perspective, identify the game each fact belongs to, and prefer newer official announcements for current sequel details. Wiki-derived background is linked to its contributors; image rights are checked separately from the site's text notice.",
  },
  {
    title: "Community question research",
    kinds: ["Community"],
    note: "Forums help identify the questions players are asking. Individual reports, speculation and personal preferences are not promoted to official facts.",
  },
];
export default function SourcesPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "CONTROL Resonant sources and editorial policy",
          "/sources",
          sources.map((s) => ({ name: s.title, href: s.url })),
        )}
      />
      <HubHero
        eyebrow="Behind the field notes"
        title="Sources & editorial policy"
        description="Trace the evidence behind the guide. Official facts, media previews and community questions play different roles—and are labeled accordingly."
        image="/images/updates/developer-diaries.jpg"
        imageAlt="CONTROL Resonant official development diary artwork"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sources" }]}
      />
      <div className={`container ${styles.layout}`}>
        <div>
          <section className={styles.policy}>
            <h2>How we verify information</h2>
            <ol>
              <li>
                <h3>Find the original statement</h3>
                <p>
                  We prioritize Remedy, developer-authored platform articles and
                  storefront specifications. A report that links to a developer
                  interview remains identified as reporting.
                </p>
              </li>
              <li>
                <h3>Resolve conflicting dates and numbers</h3>
                <p>
                  Newer, more specific information takes priority. For example,
                  the final September PC requirements supersede the June
                  FAQ&apos;s initial storage figure.
                </p>
              </li>
              <li>
                <h3>Keep interpretation visible</h3>
                <p>
                  Build-planning checklists are editorial advice. Preview
                  observations are not a claim of final-game testing. Unknown
                  rewards, damage values and mission routes remain unknown.
                </p>
              </li>
              <li>
                <h3>Make corrections traceable</h3>
                <p>
                  Articles show a check date and supporting links. Publication
                  dates belong to the article; source announcement dates belong
                  to the source.{" "}
                  <Link href="/contact">
                    Submit a correction with a reference
                  </Link>
                  .
                </p>
              </li>
            </ol>
          </section>
          {groups.map((group) => (
            <section className={styles.group} key={group.title}>
              <h2>{group.title}</h2>
              <p>{group.note}</p>
              <ul>
                {sources
                  .filter((s) => group.kinds.includes(s.kind))
                  .map((s) => (
                    <li key={s.id} id={s.id}>
                      <div className={styles.meta}>
                        <span>{s.publisher}</span>
                        <time dateTime={s.date ?? undefined}>
                          {s.date ?? "Live or undated source"}
                        </time>
                      </div>
                      <h3>
                        <a href={s.url} target="_blank" rel="noreferrer">
                          {s.title} ↗
                        </a>
                      </h3>
                      <p>{s.note}</p>
                      <div className={styles.tags}>
                        {s.topics.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
          <section className={styles.group} id="image-credits">
            <h2>Wiki-sourced character images</h2>
            <p>
              These images identify the characters being discussed. Captions
              distinguish Resonant imagery from original-game pictures. Rights
              remain with the respective owners; an image being hosted on a Wiki
              does not make it public domain or establish a commercial-use
              license.
            </p>
            <ul>
              {media.map((item) => (
                <li key={item.id}>
                  <h3>
                    <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                      {item.title} — image source ↗
                    </a>
                  </h3>
                  <p>
                    {item.caption}. Game imagery © {item.owner}; hosted by
                    Control Wiki.
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside>
          <span className={styles.eyebrow}>Research snapshot</span>
          <h2>{sources.length} source references</h2>
          <p>
            Wiki references added September 16, 2026. This is a selected
            research library, not a claim to have surveyed every page on the
            internet.
          </p>
          <h2>What you will not find</h2>
          <ul>
            <li>Invented missions or completion percentages</li>
            <li>Untested DPS rankings or farming rates</li>
            <li>Forum guesses presented as official facts</li>
            <li>Claims of hands-on play that did not happen</li>
            <li>AI illustrations passed off as game screenshots</li>
          </ul>
          <h2>Images and affiliation</h2>
          <p>
            Game images include promotional media and Wiki-hosted character
            images used for identification and commentary. Older images are
            labeled as CONTROL (2019). They are not evidence of our own
            playthrough. Rights remain with their owners.
          </p>
          <p>
            This is an independent, unofficial fan-made reference, not
            Remedy&apos;s official wiki.
          </p>
          <Link href="/about">About the editorial site →</Link>
          <Link href="/updates">Announcement timeline →</Link>
        </aside>
      </div>
    </>
  );
}
