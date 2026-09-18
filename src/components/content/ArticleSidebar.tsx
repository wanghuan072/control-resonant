import Link from "next/link";
import styles from "@/style/content/article-sidebar.module.css";
import type { Guide, GuideSection } from "@/types/guide";

export function ArticleSidebar({
  guide,
  sections,
}: {
  guide: Guide;
  sections: GuideSection[];
}) {
  return (
    <aside className={styles.sidebar} aria-label="Article navigation">
      <nav className={styles.panel} aria-label="On this page">
        <h2>On this page</h2>
        <ol>
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <section className={styles.panel}>
        <h2>Quick facts</h2>
        <dl className={styles.facts}>
          {guide.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <nav className={styles.panel} aria-label="Related Wiki links">
        <h2>Explore the Wiki</h2>
        <div className={styles.databaseLinks}>
          <Link href="/wiki/combat">
            Combat systems <span>→</span>
          </Link>
          <Link href="/wiki/world">
            World <span>→</span>
          </Link>
          <Link href="/wiki/characters">
            Characters <span>→</span>
          </Link>
          <Link href="/wiki/missions">
            Missions <span>→</span>
          </Link>
        </div>
      </nav>
      <Link className={styles.back} href="/guides">
        ← Browse the four guides
      </Link>
    </aside>
  );
}
