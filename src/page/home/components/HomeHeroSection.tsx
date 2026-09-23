import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialByline } from "@/components/common/EditorialByline";
import { ReleaseInfoPanel } from "@/page/home/components/ReleaseInfoPanel";
import styles from "@/style/page/home/home-hero.module.css";

export function HomeHeroSection() {
  return (
    <section className={styles.hero}>
      <Image
        data-home-hero
        className={styles.heroImage}
        src="/images/home/control-resonant-hero.jpg"
        alt="Dylan Faden entering altered Manhattan"
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
      />
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Your way into altered Manhattan</p>
          <h1 aria-label="CONTROL Resonant — Guides, Wiki & Player Tools">
            <span>CONTROL Resonant</span>
            <strong>Guides, Wiki &amp; Player Tools</strong>
          </h1>
          <p className={styles.lead}>
            We track the release details, break down the combat, and connect the
            people, places, and missions behind Dylan Faden&apos;s journey
            beyond the Oldest House.
          </p>
          <EditorialByline date="2026-09-23" />
          <div className={styles.heroActions}>
            <Link href="/gameplay">
              Explore the gameplay <ArrowRight size={17} />
            </Link>
            <Link href="/game-info/platforms">Compare platforms</Link>
          </div>
        </div>
        <ReleaseInfoPanel />
      </div>
    </section>
  );
}
