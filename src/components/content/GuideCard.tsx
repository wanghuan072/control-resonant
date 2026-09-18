import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "@/style/content/guide-card.module.css";
import type { Guide } from "@/types/guide";

type GuideCardProps = {
  guide: Guide;
  compact?: boolean;
};

export function GuideCard({ guide, compact = false }: GuideCardProps) {
  return (
    <article className={`${styles.card} ${compact ? styles.compact : ""}`}>
      <Link
        href={`/guides/${guide.slug}`}
        className={styles.imageLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={guide.image}
          alt=""
          fill
          sizes={
            compact
              ? "(max-width: 768px) 100vw, 25vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className={styles.image}
        />
        <span className={styles.tag}>Guide</span>
      </Link>
      <div className={styles.body}>
        <p className={styles.meta}>{guide.category}</p>
        <h3>
          <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
        </h3>
        {!compact ? <p>{guide.excerpt}</p> : null}
        <Link
          href={`/guides/${guide.slug}`}
          className={styles.readMore}
          aria-label={`Read ${guide.title}`}
        >
          Read guide <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </article>
  );
}
