import Link from "next/link";
import { ArrowRight, Gamepad2 } from "lucide-react";
import updates from "@/data/updates/timeline.json";
import styles from "@/style/page/home/home.module.css";

export function HomeUpdatesSection() {
  return (
    <section className={styles.latestBand}>
      <div className={`container ${styles.latest}`}>
        <header>
          <div>
            <span>What has changed</span>
            <h2>Latest CONTROL Resonant updates</h2>
          </div>
          <Link href="/updates">
            All updates <ArrowRight size={16} />
          </Link>
        </header>
        <ol>
          {updates.slice(0, 4).map((item) => (
            <li key={`${item.date}-${item.title}`}>
              <time dateTime={item.date}>{item.date}</time>
              <span>{item.type}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.guideHref && (
                  <Link href={item.guideHref}>
                    Related guide <ArrowRight size={14} />
                  </Link>
                )}
                {"detailPath" in item && item.detailPath && (
                  <Link href={item.detailPath}>
                    {"detailLabel" in item
                      ? item.detailLabel
                      : "View the details"}{" "}
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
        <aside>
          <Gamepad2 size={21} />
          <strong>Getting started?</strong>
          <span>Learn Dylan&apos;s combat rhythm and what to do first.</span>
          <Link href="/guides/getting-started">
            Read the guide <ArrowRight size={15} />
          </Link>
        </aside>
      </div>
    </section>
  );
}
