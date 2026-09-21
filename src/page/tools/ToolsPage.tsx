import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MonitorCog } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { tools } from "@/config/tools";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import styles from "@/style/page/tools/tools.module.css";

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "CONTROL Resonant player tools",
          "/tools",
          tools.map((tool) => ({ name: tool.title, href: tool.href })),
        )}
      />
      <HubHero
        eyebrow="Player utilities / practical answers"
        title="CONTROL Resonant Tools — Check Your Setup"
        description="Open practical player utilities for CONTROL Resonant. Start with the PC system requirements checker, with every tool kept in its own focused workspace."
        image="/images/guides/pc-system-requirements.jpg"
        imageAlt="Published CONTROL Resonant PC requirements chart"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools" }]}
        action={<a href="#tool-list">Browse the tools ↓</a>}
      />

      <div className={`container ${styles.directory}`} id="tool-list">
        <header className={styles.directoryHeader}>
          <div>
            <span>Tool directory / choose a task</span>
            <h2>Player tools built around a specific question</h2>
          </div>
          <p>
            Each utility has a dedicated page, so you can bookmark the answer
            you need and return without working through an unrelated guide.
          </p>
        </header>

        <div className={styles.toolList}>
          {tools.map((tool, index) => (
            <article className={styles.toolCard} key={tool.id}>
              <Link
                className={styles.toolImage}
                href={tool.href}
                aria-label={`Open ${tool.title}`}
              >
                <Image
                  src={tool.image}
                  alt={tool.imageAlt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </Link>
              <div className={styles.toolCopy}>
                <div className={styles.toolMeta}>
                  <span>
                    <MonitorCog size={15} aria-hidden="true" /> PC utility
                  </span>
                  <span>{tool.status}</span>
                </div>
                <h2>
                  <Link href={tool.href}>{tool.listingTitle}</Link>
                </h2>
                <p>{tool.description}</p>
                <Link className={styles.toolAction} href={tool.href}>
                  Open PC System Checker <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
