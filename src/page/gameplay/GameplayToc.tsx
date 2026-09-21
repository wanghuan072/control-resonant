"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { gameplayTocGroups, type GameplayTocItem } from "@/config/gameplay";
import styles from "@/style/page/gameplay/gameplay.module.css";

const items = gameplayTocGroups.reduce<GameplayTocItem[]>(
  (all, group) => [...all, ...group.items],
  [],
);

export function GameplayToc() {
  const [active, setActive] = useState(items[0].id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const marker = 150;
      let current = items[0].id;
      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= marker)
          current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const index = items.findIndex((item) => item.id === active);

  return (
    <aside className={styles.sidebar} aria-label="Gameplay navigation">
      <div>
        <header className={styles.sidebarHeader}>
          <span>Gameplay contents</span>
          <strong>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </strong>
        </header>
        <div className={styles.progress} aria-hidden="true">
          <span style={{ width: `${((index + 1) / items.length) * 100}%` }} />
        </div>
        <nav aria-label="Gameplay sections">
          {gameplayTocGroups.map((group) => (
            <div className={styles.tocGroup} key={group.label}>
              <span>{group.label}</span>
              {group.items.map((item) => (
                <a
                  href={`#${item.id}`}
                  key={item.id}
                  className={active === item.id ? styles.current : undefined}
                  aria-current={active === item.id ? "location" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <Link className={styles.sidebarCta} href="/wiki/combat">
          Open the Combat & Skills Wiki <ArrowRight size={14} />
        </Link>
      </div>
    </aside>
  );
}
