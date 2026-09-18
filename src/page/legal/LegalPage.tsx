import Link from "next/link";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import styles from "@/style/page/legal/legal.module.css";

type LegalSection = {
  title: string;
  paragraphs: readonly string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly LegalSection[];
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <div className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.header}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Legal" },
              { label: title },
            ]}
          />
          <p>{eyebrow}</p>
          <h1>{title}</h1>
          <span>{intro}</span>
        </div>
        <div className={styles.content}>
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <Link href="/">Return to Home</Link>
        </div>
      </div>
    </div>
  );
}
