import Image from "next/image";
import type { ReactNode } from "react";
import {
  Breadcrumb,
  type BreadcrumbItem,
} from "@/components/common/Breadcrumb";
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
}: HubHeroProps) {
  const hasGameName = /^CONTROL Resonant /i.test(title);
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.shell}`}>
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <div className={`${styles.inner} ${image ? "" : styles.noImage}`}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1>
              {hasGameName && <small>CONTROL Resonant </small>}
              {hasGameName ? title.replace(/^CONTROL Resonant /i, "") : title}
            </h1>
            <p className={styles.description}>{description}</p>
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
