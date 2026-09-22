import Link from "next/link";
import { HubHero } from "@/components/content/HubHero";
import updates from "@/data/updates/timeline.json";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import styles from "@/style/page/updates/updates.module.css";

function updateAnchor(date: string, index: number) {
  return `update-${date}-${index + 1}`;
}

export default function UpdatesPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "CONTROL Resonant announcements and updates",
          "/updates",
          updates.map((u, index) => ({
            name: u.title,
            href: `/updates#${updateAnchor(u.date, index)}`,
          })),
        )}
      />
      <HubHero
        dark
        eyebrow="What changed for your playthrough"
        title="CONTROL Resonant Updates — Dates, Features and New Details"
        description="Catch up on release timing, PC requirements, PlayStation modes, Assist Mode and gameplay reveals—and see which changes affect the way you plan to play."
        image="/images/updates/developer-diaries.jpg"
        imageAlt="CONTROL Resonant official developer diary artwork"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Updates" }]}
      />
      <section className={`container ${styles.section}`}>
        <div className={styles.actionable}>
          <div>
            <span>What changed for players</span>
            <h2>
              See which announcements change your platform, build or settings
            </h2>
            <p>
              We follow the announcements that can change what you buy, how you
              set up the game, or how you plan a build. These are the updates we
              think deserve a practical next step.
            </p>
          </div>
          <div className={styles.actionGrid}>
            <article>
              <time dateTime="2026-09-15">15 SEP</time>
              <h3>Choosing a PS5 mode?</h3>
              <p>
                Remedy published separate PS5 and PS5 Pro targets. The Pro
                Balanced mode depends on a 120Hz-compatible display; targets are
                not the same as an independent frame-rate test, so we&apos;d
                check your display before choosing it.
              </p>
              <Link href="/game-info/system-requirements#console-modes">
                Compare modes →
              </Link>
            </article>
            <article>
              <time dateTime="2026-09-10">10 SEP</time>
              <h3>Worried about combat difficulty?</h3>
              <p>
                Assist Mode adjusts aggression, dodge timing, damage and other
                controls individually, and it can be changed during play.
              </p>
              <Link href="/gameplay#assist-mode">
                Find the relevant setting →
              </Link>
            </article>
            <article>
              <time dateTime="2026-09-08">08 SEP</time>
              <h3>Checking a PC build?</h3>
              <p>
                The final requirement tiers supersede earlier previews. Check
                CPU, GPU, memory and SSD space together; the published target
                gives us a baseline, not a measured FPS result for your exact
                machine.
              </p>
              <Link href="/game-info/system-requirements">
                Check system requirements →
              </Link>
            </article>
          </div>
        </div>
        <header>
          <h2>Announcement timeline</h2>
          <p>
            Release, system, accessibility and gameplay changes in chronological
            order.
          </p>
        </header>
        <ol className={styles.timeline}>
          {updates.map((u, index) => (
            <li id={updateAnchor(u.date, index)} key={u.title}>
              <div className={styles.meta}>
                <time dateTime={u.date}>{u.date}</time>
                <span>{u.type}</span>
              </div>
              <article>
                <h3>
                  <a href={`#${updateAnchor(u.date, index)}`}>{u.title}</a>
                </h3>
                <p>{u.text}</p>
                <div>
                  <a href={u.href} target="_blank" rel="noreferrer">
                    Original source ↗
                  </a>
                  {u.guideHref && (
                    <Link href={u.guideHref}>
                      {u.guideLabel} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                  {"detailPath" in u && u.detailPath && (
                    <Link href={u.detailPath}>
                      {u.detailLabel} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                  {"internalLinks" in u &&
                    u.internalLinks?.map((link) => (
                      <Link href={link.href} key={link.href}>
                        {link.label} <span aria-hidden="true">→</span>
                      </Link>
                    ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
