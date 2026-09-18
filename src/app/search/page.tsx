import { getSearchEntries } from "@/lib/data/search";
import SearchPage from "@/page/search/SearchPage";
import { createMetadata } from "@/seo/metadata";

export const metadata = {
  ...createMetadata({
    path: "/search",
  }),
  robots: { index: false, follow: true },
};

type SearchRouteProps = { searchParams: Promise<{ q?: string | string[] }> };

export default async function SearchRoute({ searchParams }: SearchRouteProps) {
  const { q } = await searchParams;
  return (
    <SearchPage
      entries={getSearchEntries()}
      initialQuery={Array.isArray(q) ? (q[0] ?? "") : (q ?? "")}
    />
  );
}
