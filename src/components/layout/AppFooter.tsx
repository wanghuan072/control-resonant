import Link from "next/link";
import { ArrowUp } from "lucide-react";

import { BrandLogo } from "@/components/common/BrandLogo";
import { legalNavigation, primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import styles from "@/style/layout/app-footer.module.css";

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandBlock}>
          <BrandLogo />
          <p>
            Release details, practical guides, people, powers and places—find
            what you need for your next step in Manhattan.
          </p>
        </div>
        <nav aria-label="Footer navigation" className={styles.links}>
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="#top" className={styles.backToTop} aria-label="Back to top">
          <ArrowUp aria-hidden="true" size={19} />
        </Link>
      </div>
      <div className={`container ${styles.bottom}`}>
        <div className={styles.legalLinks}>
          <strong>Legal</strong>
          <nav aria-label="Legal navigation">
            {legalNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                rel="noopener noreferrer nofollow"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className={`container ${styles.copyright}`}>
        <p>
          Copyright © {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
        <p>
          This is an independent fan site. It is not affiliated with, endorsed
          by, or operated by Remedy Entertainment or the official CONTROL
          website.
        </p>
      </div>
    </footer>
  );
}
