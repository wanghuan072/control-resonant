"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { WikiTopic } from "@/lib/data/wiki";
import type { WikiGroupId } from "@/types/wiki";
import styles from "@/style/page/wiki/wiki-group.module.css";

function fact(topic: WikiTopic, label: string) {
  return topic.facts.find((item) => item.label === label)?.value;
}

function knownDetail(group: WikiGroupId, topic: WikiTopic) {
  switch (group) {
    case "characters":
      return (
        fact(topic, "Family") ??
        fact(topic, "Primary connection") ??
        topic.description
      );
    case "world":
      return (
        fact(topic, "World role") ??
        fact(topic, "Function") ??
        fact(topic, "Setting") ??
        topic.description
      );
    case "combat":
      return (
        fact(topic, "Combat role") ??
        fact(topic, "Use") ??
        fact(topic, "Purpose") ??
        topic.description
      );
    case "enemies":
      return fact(topic, "Shown hazards") ?? topic.description;
    case "missions":
      return (
        fact(topic, "Previewed reward") ??
        fact(topic, "Reward") ??
        topic.description
      );
  }
}

const labels: Record<WikiGroupId, [string, string]> = {
  characters: ["Role", "Relationship / story context"],
  world: ["Place or concept", "Known player use"],
  combat: ["System or equipment", "Known combat use"],
  enemies: ["Threat class", "Shown behavior"],
  missions: ["Quest or activity", "Known objective / context"],
};

export function WikiIndexTable({
  group,
  topics,
}: {
  group: WikiGroupId;
  topics: WikiTopic[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = [...new Set(topics.map((topic) => topic.category))];
  const filtered = useMemo(
    () =>
      topics.filter(
        (topic) =>
          (category === "all" || topic.category === category) &&
          `${topic.name} ${topic.description} ${topic.type}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [topics, category, query],
  );
  return (
    <>
      <div className={styles.filters}>
        <label>
          Find a topic
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${group}…`}
          />
        </label>
        <label>
          Filter by type
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">All topics</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll("-", " ")}
              </option>
            ))}
          </select>
        </label>
        <span aria-live="polite">
          {filtered.length} of {topics.length} topics
        </span>
      </div>
      <div
        className={styles.tableScroll}
        role="region"
        aria-label={`${group} topics`}
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">{labels[group][0]}</th>
              <th scope="col">{labels[group][1]}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((topic) => (
              <tr key={`${topic.category}:${topic.id}`}>
                <th scope="row">
                  {topic.href ? (
                    <Link href={topic.href}>{topic.name} ↗</Link>
                  ) : (
                    topic.name
                  )}
                  {(topic.scope?.startsWith("CONTROL (2019)") ||
                    topic.scope === "Series background") && (
                    <small className={styles.legacyTag}>
                      Series background
                    </small>
                  )}
                </th>
                <td>
                  {group === "characters"
                    ? (fact(topic, "Role") ?? topic.type)
                    : topic.type}
                </td>
                <td>
                  {knownDetail(group, topic)}
                  {topic.playerNote && (
                    <span className={styles.playerNote}>
                      {topic.playerNote}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!filtered.length && (
        <p className={styles.empty}>
          No matching topics. Try another name or type.
        </p>
      )}
    </>
  );
}
