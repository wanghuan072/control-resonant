import Link from "next/link";
import Image from "next/image";

import styles from "@/style/common/brand-logo.module.css";

type BrandLogoProps = {
  onDark?: boolean;
  priority?: boolean;
};

export function BrandLogo({
  onDark = false,
  priority = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`${styles.logo} ${onDark ? styles.onDark : ""}`}
      aria-label="CONTROL Resonant Guide home"
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={64}
        height={64}
        priority={priority}
        sizes="64px"
      />
      <span className={styles.wordmark} aria-hidden="true">
        <span className={styles.control}>CONTROL</span>
        <span className={styles.resonant}>RESONANT</span>
      </span>
    </Link>
  );
}
