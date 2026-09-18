import data from "@/data/database/categories.json";
import wikiData from "@/data/database/wiki-categories.json";
import type { DatabaseCategory } from "@/types/database";
export function getDatabaseCategories() {
  return [...data, ...wikiData] as DatabaseCategory[];
}
export function getDatabaseCategory(id: string) {
  return getDatabaseCategories().find((c) => c.id === id)!;
}
