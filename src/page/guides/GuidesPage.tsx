import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { longformGuides } from "@/data/guides/longform";
import { getGuidePillars } from "@/lib/data/pillars";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import { HubHero } from "@/components/content/HubHero";
import styles from "@/style/page/guides/guides-v2.module.css";

export default function GuidesPage() {
  const pillars = getGuidePillars();

  return (
    <>
      <JsonLd
        data={collectionSchema(
          "CONTROL Resonant guides",
          "/guides",
          pillars.map((pillar) => ({ name: pillar.title, href: pillar.href })),
        )}
      />
      <HubHero
        eyebrow="Four ways to move forward"
        title="CONTROL Resonant Guides — From First Steps to Your Next Fight"
        description="New to Dylan's story? Stuck on a fight or trying to understand a mission? Choose the guide that fits the problem in front of you, from first-hour basics to builds and exploration."
        image="/images/home/dylan-manhattan.jpg"
        imageAlt="CONTROL Resonant official guide artwork"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
        action={<a href="#guide-list">Choose a field manual ↓</a>}
      />

      <section
        className={`container ${styles.problemIndex}`}
        aria-labelledby="problem-index-title"
      >
        <div className={styles.problemHeading}>
          <span>Field triage / start from the obstacle</span>
          <h2 id="problem-index-title">
            Choose a guide for the problem blocking your progress
          </h2>
          <p>
            Follow the problem first, then open the relevant manual. Preview
            coverage can identify a system or encounter, but it cannot supply a
            tested retail route before launch.
          </p>
        </div>
        <ol>
          <li>
            <span>01 / Navigation</span>
            <strong>I cannot find the way forward</strong>
            <p>
              Separate a Zone, a Fault and a movement gate before looking for a
              map pin.
            </p>
            <Link href="/map#confirmed-locations">
              Check the route clues <ArrowRight size={15} />
            </Link>
          </li>
          <li>
            <span>02 / Combat</span>
            <strong>I keep losing an encounter</strong>
            <p>
              Identify whether the problem is spacing, power recovery, dodge
              timing or an arena hazard.
            </p>
            <Link href="/guides/combat-builds#dodge-and-assist">
              Diagnose the fight <ArrowRight size={15} />
            </Link>
          </li>
          <li>
            <span>03 / Exploration</span>
            <strong>Did I miss a route for good?</strong>
            <p>
              Check which traversal tools reset in NG+ and what remains unknown
              about first-run backtracking.
            </p>
            <Link href="/guides/completion#optional-content">
              Plan a return <ArrowRight size={15} />
            </Link>
          </li>
        </ol>
      </section>

      <div className={`container ${styles.list}`} id="guide-list">
        {pillars.map((pillar, index) => {
          const guide = longformGuides[pillar.id];
          return (
            <article className={styles.guide} key={pillar.id}>
              <Link
                href={pillar.href}
                className={styles.imageLink}
                aria-label={`Read ${pillar.listingTitle}`}
              >
                <Image
                  src={pillar.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 42vw, 500px"
                />
                <span className={styles.imageIndex}>{pillar.number}</span>
              </Link>
              <div className={styles.copy}>
                <div className={styles.meta}>
                  <span>{pillar.eyebrow}</span>
                  <span>
                    {guide.readTime} · {guide.chapters.length} chapters
                  </span>
                </div>
                <h2>
                  <Link href={pillar.href}>{pillar.listingTitle}</Link>
                </h2>
                <p className={styles.description}>{pillar.description}</p>
                <div className={styles.chapters} aria-label="Topics covered">
                  {guide.chapters.slice(0, 3).map((chapter) => (
                    <span key={chapter.id}>{chapter.title}</span>
                  ))}
                </div>
                <Link href={pillar.href} className={styles.action}>
                  Open the guide <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
        <p className={styles.scope}>
          These guides cover published information. Complete retail routes,
          exact loot, and collectible totals will be added only after they can
          be verified in the released game.
        </p>
      </div>
    </>
  );
}
