"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import topics from "@/data/site/topics.json";
import { GuideList, type GuideListItem } from "@/components/content/GuideList";
import styles from "@/style/page/guides/guides.module.css";

const categories = [
  { id: "all", title: "All guides", slugs: [] as string[] },
  ...topics,
];
export function GuideDirectory({ guides }: { guides: GuideListItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [coverage, setCoverage] = useState("all");
  const [sort, setSort] = useState("editorial");
  const filtered = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const result = guides.filter(
      (g) =>
        (category === "all" ||
          categories.find((t) => t.id === category)?.slugs.includes(g.slug)) &&
        (coverage === "all" || g.coverage === coverage) &&
        words.every((word) =>
          `${g.title} ${g.excerpt}`.toLowerCase().includes(word),
        ),
    );
    return sort === "title"
      ? result.sort((a, b) => a.title.localeCompare(b.title))
      : sort === "updated"
        ? result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        : result;
  }, [guides, query, category, coverage, sort]);
  return (
    <div>
      <div className={styles.controls}>
        <label className={styles.search}>
          <Search size={19} aria-hidden="true" />
          <span className="sr-only">Filter guides by keyword</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a topic, system or question…"
          />
        </label>
        <label className={styles.sort}>
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="editorial">Suggested order</option>
            <option value="updated">Last updated</option>
            <option value="title">Title A–Z</option>
          </select>
        </label>
      </div>
      <div
        className={styles.filters}
        role="group"
        aria-label="Filter by category"
      >
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category === item.id}
            onClick={() => setCategory(item.id)}
          >
            {item.title}
            <span>
              {item.id === "all"
                ? guides.length
                : guides.filter((g) => item.slugs.includes(g.slug)).length}
            </span>
          </button>
        ))}
      </div>
      <label className={styles.coverageFilter}>
        Information type
        <select value={coverage} onChange={(e) => setCoverage(e.target.value)}>
          <option value="all">All information types</option>
          <option value="Official information">Official information</option>
          <option value="Preview analysis">Preview analysis</option>
          <option value="Planning guide">Planning guides</option>
        </select>
      </label>
      <p className={styles.resultCount} role="status">
        {filtered.length} {filtered.length === 1 ? "guide" : "guides"}
        {query ? ` matching “${query}”` : ""}
      </p>
      {filtered.length ? (
        <GuideList guides={filtered} />
      ) : (
        <div className={styles.empty}>
          <h3>No matching guides</h3>
          <p>Try “PC”, “Mold”, “Talents” or choose a different category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setCoverage("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
