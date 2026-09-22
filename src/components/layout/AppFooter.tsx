import Link from "next/link";
import { ArrowUp } from "lucide-react";

import { BrandLogo } from "@/components/common/BrandLogo";
import {
  gameInfoNavigation,
  legalNavigation,
  primaryNavigation,
} from "@/config/navigation";
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
        <div className={styles.navColumns}>
          <nav aria-label="Explore" className={styles.navGroup}>
            <strong>Explore</strong>
            <div>
              {primaryNavigation
                .filter((item) => item.href !== "/game-info")
                .map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
            </div>
          </nav>
          <nav aria-label="Game information" className={styles.navGroup}>
            <strong>Game info</strong>
            <div>
              {gameInfoNavigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
      <div className={`container ${styles.utility}`}>
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
        <Link href="#top" className={styles.backToTop} aria-label="Back to top">
          <span>Back to top</span>
          <ArrowUp aria-hidden="true" size={17} />
        </Link>
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
