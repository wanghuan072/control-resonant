import styles from "@/style/common/section-heading.module.css";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  inverted?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div className={`${styles.heading} ${inverted ? styles.inverted : ""}`}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
