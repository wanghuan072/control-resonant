import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "@/style/page/home/home.module.css";

export function HomeWorldSection() {
  return (
    <section className={styles.worldReport}>
      <Image
        src="/images/home/paranatural-manhattan.jpg"
        alt="Altered Manhattan in CONTROL Resonant"
        fill
        sizes="100vw"
      />
      <div className={styles.worldShade} />
      <div className={`container ${styles.worldInner}`}>
        <div>
          <span>World report / Manhattan</span>
          <h2>A city built around vertical routes and altered rules</h2>
          <p>
            CONTROL Resonant is not a seamless open-world checklist. Manhattan
            is divided into focused Zones where gravity, interiors and traversal
            abilities change how a route must be read.
          </p>
          <Link href="/map#confirmed-locations">
            Read the map and location guide <ArrowRight size={16} />
          </Link>
        </div>
        <ol>
          <li>
            <span>01</span>
            <strong>Distinct Zones</strong>
            <small>Large areas with their own activities and routes</small>
          </li>
          <li>
            <span>02</span>
            <strong>Vertical navigation</strong>
            <small>Roofs, tunnels and gravity-shifted interiors</small>
          </li>
          <li>
            <span>03</span>
            <strong>Movement gates</strong>
            <small>Reach, Shift and quest-earned traversal options</small>
          </li>
          <li>
            <span>04</span>
            <strong>Optional activity</strong>
            <small>World Quests, Faults, challenges and discoveries</small>
          </li>
        </ol>
      </div>
    </section>
  );
}
