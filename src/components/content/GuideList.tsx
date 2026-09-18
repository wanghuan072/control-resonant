import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Guide } from "@/types/guide";
import styles from "@/style/content/guide-list.module.css";

export type GuideListItem = Pick<
  Guide,
  | "slug"
  | "title"
  | "excerpt"
  | "category"
  | "image"
  | "readTime"
  | "updatedAt"
  | "coverage"
>;

export function GuideList({
  guides,
  compact = false,
}: {
  guides: GuideListItem[];
  compact?: boolean;
}) {
  return (
    <ul className={`${styles.list} ${compact ? styles.compact : ""}`}>
      {guides.map((guide) => (
        <li key={guide.slug}>
          <article>
            {!compact && (
              <Link
                href={`/guides/${guide.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className={styles.image}
              >
                <Image src={guide.image} alt="" fill sizes="160px" />
              </Link>
            )}
            <div className={styles.copy}>
              {!compact && (
                <p className={styles.meta}>
                  {guide.category}{" "}
                  <span>
                    {" "}
                    /{" "}
                    {guide.coverage === "Preview analysis"
                      ? "Preview"
                      : guide.readTime}
                  </span>
                </p>
              )}
              <h3>
                <Link href={`/guides/${guide.slug}`}>
                  {guide.title.replace(/^CONTROL Resonant /, "")}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </h3>
              {!compact && <p>{guide.excerpt}</p>}
            </div>
            {!compact && (
              <time className={styles.date} dateTime={guide.updatedAt}>
                {guide.updatedAt}
              </time>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
}
