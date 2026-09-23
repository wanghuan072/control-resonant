import Link from "next/link";
import Image from "next/image";

import styles from "@/style/common/brand-logo.module.css";

type BrandLogoProps = {
  onDark?: boolean;
  compact?: boolean;
};

export function BrandLogo({ onDark = false, compact = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`${styles.logo} ${onDark ? styles.onDark : ""} ${compact ? styles.compact : ""}`}
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={64}
        height={64}
        sizes="64px"
      />
      <span className={styles.wordmark}>
        <span className={styles.control}>CONTROL</span>
        <span className={styles.resonant}>RESONANT</span>
      </span>
      <span className="sr-only">home</span>
    </Link>
  );
}
