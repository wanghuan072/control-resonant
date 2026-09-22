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
            From everything we&apos;ve reviewed, Manhattan is built as a set of
            focused Zones rather than one seamless checklist. Gravity,
            interiors, and traversal abilities can all change the route in front
            of you.
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
