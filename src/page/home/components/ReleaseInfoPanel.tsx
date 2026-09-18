import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buyingFacts, displayDate } from "@/config/buying";
import { ReleaseCountdown } from "@/page/home/components/ReleaseCountdown";
import styles from "@/style/page/home/home.module.css";

export function ReleaseInfoPanel() {
  return (
    <aside
      className={styles.releasePanel}
      aria-label="CONTROL Resonant release information"
    >
      <div className={styles.releasePanelTop}>
        <span>Launch briefing / 001</span>
        <span>2026</span>
      </div>
      <div className={styles.releasePanelDate}>
        <span>Digital release · PC / PS5 / Xbox Series X|S</span>
        <time dateTime={buyingFacts.digitalRelease}>
          <strong>24</strong>
          <span>SEP / 2026</span>
        </time>
      </div>
      <ReleaseCountdown releaseDate={buyingFacts.digitalRelease} />
      <dl className={styles.releasePanelFacts}>
        <div>
          <dt>PS5 Deluxe early access</dt>
          <dd>{displayDate(buyingFacts.ps5DeluxeEarlyAccess, "short")}</dd>
        </div>
        <div>
          <dt>Physical console copies</dt>
          <dd>{displayDate(buyingFacts.physicalRelease, "short")}</dd>
        </div>
      </dl>
      <Link href="/game-info" className={styles.releasePanelLink}>
        Compare editions and platforms{" "}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </aside>
  );
}
