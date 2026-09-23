import Image from "next/image";
import type { ReactNode } from "react";
import {
  Breadcrumb,
  type BreadcrumbItem,
} from "@/components/common/Breadcrumb";
import { EditorialByline } from "@/components/common/EditorialByline";
import styles from "@/style/content/hub-hero.module.css";
type HubHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  breadcrumbs?: BreadcrumbItem[];
  meta?: ReactNode;
  action?: ReactNode;
  editorialDate?: string;
  dark?: boolean;
};
export function HubHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  breadcrumbs,
  meta,
  action,
  editorialDate,
}: HubHeroProps) {
  const fullTitle = /^CONTROL Resonant\b/i.test(title)
    ? title
    : `CONTROL Resonant — ${title}`;
  const titleWithoutBrand = fullTitle
    .replace(/^CONTROL Resonant\s*/i, "")
    .replace(/^[—–-]\s*/, "");
  const [topic, ...qualifierParts] = titleWithoutBrand.split(/\s+[—–-]\s+/);
  const qualifier = qualifierParts.join(" — ");
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.shell}`}>
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <div className={`${styles.inner} ${image ? "" : styles.noImage}`}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 aria-label={fullTitle}>
              <span className={styles.brand}>CONTROL Resonant</span>{" "}
              <span className={styles.topic}>{topic}</span>
              {qualifier && (
                <>
                  {" "}
                  <span className={styles.qualifier}>
                    <b aria-hidden="true">—</b> {qualifier}
                  </span>
                </>
              )}
            </h1>
            <p className={styles.description}>{description}</p>
            {editorialDate && <EditorialByline date={editorialDate} />}
            {(meta || action) && (
              <div className={styles.footer}>
                {meta && <div className={styles.meta}>{meta}</div>}
                {action && <div className={styles.action}>{action}</div>}
              </div>
            )}
          </div>
          {image && (
            <figure className={styles.visual}>
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width:720px) 100vw, (max-width:1100px) 42vw, 560px"
              />
            </figure>
          )}
        </div>
      </div>
    </header>
  );
}
