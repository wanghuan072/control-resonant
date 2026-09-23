"use client";

import { ArrowRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { HubHero } from "@/components/content/HubHero";
import styles from "@/style/page/search/search.module.css";
import type { SearchEntry } from "@/types/content";

export default function SearchPage({
  entries,
  initialQuery = "",
}: {
  entries: SearchEntry[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const normalized = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalized) return entries;
    return entries.filter((entry) =>
      normalized
        .split(/\s+/)
        .every((word) =>
          `${entry.title} ${entry.description} ${entry.type}`
            .toLowerCase()
            .includes(word),
        ),
    );
  }, [entries, normalized]);

  return (
    <div className={styles.page}>
      <HubHero
        eyebrow="Find a specific answer"
        title="CONTROL Resonant Search — Get to the Right Page"
        description="Search for a character, skill, enemy, mission, place or buying question and go straight to the relevant guide or Wiki entry."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />
      <div className="container">
        <label className={styles.searchBox}>
          <span className="sr-only">Search guides and Wiki</span>
          <Search aria-hidden="true" size={24} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “PC requirements” or “Artifacts”"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <X aria-hidden="true" size={20} />
            </button>
          ) : null}
        </label>

        <div className={styles.resultMeta} aria-live="polite">
          <span>{String(results.length).padStart(2, "0")}</span>
          <p>
            {normalized ? `results for “${query.trim()}”` : "available records"}
          </p>
        </div>

        {results.length ? (
          <ul className={styles.results}>
            {results.map((entry, index) => (
              <li key={`${entry.href}-${entry.title}`}>
                <a href={entry.href}>
                  <span className={styles.index}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.type}>{entry.type}</span>
                  <span className={styles.copy}>
                    <strong>{entry.title}</strong>
                    <small>{entry.description}</small>
                  </span>
                  <ArrowRight aria-hidden="true" size={20} />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <h2>No matching pages</h2>
            <p>
              Try a broader phrase such as “release,” “builds,” “bosses,” or
              “Manhattan.” If a name has not been announced yet, we may not have
              a page for it.
            </p>
            <button type="button" onClick={() => setQuery("")}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
