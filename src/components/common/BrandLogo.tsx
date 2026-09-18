import Link from "next/link";
import Image from "next/image";

import styles from "@/style/common/brand-logo.module.css";

type BrandLogoProps = {
  onDark?: boolean;
};

export function BrandLogo({ onDark = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`${styles.logo} ${onDark ? styles.onDark : ""}`}
      aria-label="CONTROL Resonant Guide home"
    >
      <Image
        src="/images/logo.svg"
        alt="CONTROL Resonant Guide"
        width={222}
        height={58}
        priority
      />
    </Link>
  );
}
