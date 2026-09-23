import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "@/style/page/home/home.module.css";

const playerQuestions = [
  {
    number: "01",
    kicker: "Before you play",
    title: "When and where can I play?",
    text: "Compare release dates, editions, platforms and published PC targets.",
    links: [
      { label: "Release timing", href: "/game-info/release-date" },
      { label: "Platform access", href: "/game-info/platforms" },
      {
        label: "System requirements",
        href: "/game-info/system-requirements",
      },
    ],
  },
  {
    number: "02",
    kicker: "Learn the game",
    title: "How does combat work?",
    text: "Start with the melee-and-ability loop, then compare Forms, Talents and Artifacts.",
    links: [
      { label: "Gameplay systems", href: "/gameplay" },
      { label: "Skills and equipment", href: "/wiki/combat" },
      { label: "Combat and build guide", href: "/guides/combat-builds" },
    ],
  },
  {
    number: "03",
    kicker: "Meet the cast and threats",
    title: "Who is involved?",
    text: "Follow Dylan, Jesse and Zoe, or look up enemy factions and known Resonant encounters.",
    links: [
      { label: "Characters", href: "/wiki/characters" },
      { label: "Enemies and Bosses", href: "/wiki/enemies" },
    ],
  },
  {
    number: "04",
    kicker: "Explore Manhattan",
    title: "Where do I go?",
    text: "Understand Zones, traversal gates, mission types and why the map can be difficult to read.",
    links: [
      { label: "Map and known locations", href: "/map#confirmed-locations" },
      { label: "Missions and Activities", href: "/wiki/missions" },
    ],
  },
];

export function HomeIntentSection() {
  return (
    <section className={styles.intentSection}>
      <div className={`container ${styles.intentLayout}`}>
        <div className={styles.intentCopy}>
          <header>
            <span>Start with your question</span>
            <h2>Find the answer that moves your game forward</h2>
            <p>
              We built the site around the questions we had as players. Pick
              what you need now and we&apos;ll take you straight to the useful
              guide, comparison, or Wiki entry.
            </p>
          </header>
          <div className={styles.intentGrid}>
            {playerQuestions.map((question) => (
              <article key={question.number}>
                <span className={styles.intentNumber}>{question.number}</span>
                <div>
                  <small>{question.kicker}</small>
                  <h3>{question.title}</h3>
                  <p>{question.text}</p>
                  <nav aria-label={question.title}>
                    {question.links.map((link) => (
                      <Link href={link.href} key={link.href}>
                        {link.label} <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    ))}
                  </nav>
                </div>
              </article>
            ))}
          </div>
        </div>
        <figure className={styles.intentVisual}>
          <Image
            src="/images/home/dylan-manhattan.jpg"
            alt="Dylan Faden looking across altered Manhattan"
            fill
            sizes="(max-width: 768px) 100vw, 46vw"
            quality={60}
          />
          <figcaption>
            <span>Field file / Manhattan</span>
            <strong>We start with the question, not the menu.</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
