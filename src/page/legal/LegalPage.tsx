import { ArrowUpRight, Mail } from "lucide-react";
import { Fragment } from "react";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { legalNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type {
  LegalHighlight,
  LegalPageKind,
  LegalSection,
  LegalSlug,
} from "@/data/legal/pages";
import styles from "@/style/page/legal/legal.module.css";

type LegalPageProps = {
  slug?: LegalSlug;
  kind?: LegalPageKind;
  eyebrow: string;
  categoryLabel?: string;
  title: string;
  intro: string;
  effectiveAt?: string;
  updatedAt?: string;
  highlights?: readonly LegalHighlight[];
  sections: readonly LegalSection[];
};

function InlineEmail({ text }: { text: string }) {
  const email = siteConfig.email;
  const parts = text.split(email);

  if (parts.length === 1) return text;

  return parts.map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? (
        <a href={`mailto:${email}`}>{email}</a>
      ) : null}
    </Fragment>
  ));
}

export default function LegalPage({
  slug,
  kind = "policy",
  eyebrow,
  categoryLabel = "Legal",
  title,
  intro,
  effectiveAt,
  updatedAt,
  highlights = [],
  sections,
}: LegalPageProps) {
  const isDocument = Boolean(slug && effectiveAt && updatedAt);
  const relatedPages = slug
    ? legalNavigation.filter((item) => item.href !== `/legal/${slug}`)
    : [];

  return (
    <div className={`${styles.page} ${styles[kind]}`}>
      <div className="container">
        <header className={styles.hero}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: categoryLabel },
              { label: title },
            ]}
          />
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p className={styles.intro}>{intro}</p>
          {isDocument ? (
            <div className={styles.documentMeta} aria-label="Document details">
              <span>
                Published by <strong>{siteConfig.editorialTeam.name}</strong>
              </span>
              <span>
                Effective <time>{effectiveAt}</time>
              </span>
              <span>
                Last updated <time>{updatedAt}</time>
              </span>
            </div>
          ) : null}
        </header>

        {isDocument && highlights.length ? (
          <dl className={styles.highlights} aria-label="At a glance">
            {highlights.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className={styles.documentLayout}>
          {isDocument ? (
            <aside className={styles.toc}>
              <nav aria-label={`${title} contents`}>
                <strong>On this page</strong>
                <ol>
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          ) : null}

          <article className={styles.content}>
            {sections.map((section, index) => (
              <section id={section.id} key={section.id}>
                <div className={styles.sectionHeading}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{section.title}</h2>
                </div>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    <InlineEmail text={paragraph} />
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>
                        <InlineEmail text={item} />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.note ? (
                  <p className={styles.note}>
                    <strong>Keep in mind</strong>
                    <InlineEmail text={section.note} />
                  </p>
                ) : null}
              </section>
            ))}

            {isDocument ? (
              <section
                className={styles.contactCard}
                aria-labelledby="contact-team"
              >
                <div>
                  <span>Need to flag something?</span>
                  <h2 id="contact-team">Contact the editorial team</h2>
                  <p>
                    Include the page URL and enough detail for us to reproduce
                    or review the issue. Please do not send passwords or payment
                    information.
                  </p>
                </div>
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail aria-hidden="true" size={18} />
                  Email Frontline Pathfinder
                </a>
              </section>
            ) : (
              // A full document navigation is intentional for standalone pages.
              // eslint-disable-next-line @next/next/no-html-link-for-pages
              <a className={styles.homeLink} href="/">
                Return to Home
              </a>
            )}
          </article>
        </div>

        {isDocument ? (
          <nav className={styles.related} aria-label="Related legal pages">
            <div>
              <span>Legal and editorial</span>
              <h2>Related documents</h2>
            </div>
            <ul>
              {relatedPages.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>
                    {item.label}
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </div>
  );
}
