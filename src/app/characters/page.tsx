import DatabaseCategoryPage from "@/page/database/DatabaseCategoryPage";
import { getDatabaseCategory } from "@/lib/data/database";
import { createMetadata } from "@/seo/metadata";
const category = getDatabaseCategory("characters");
export const metadata = createMetadata({
  ...category.seo,
  path: "/characters",
  image: category.heroImage,
  imageAlt: category.heroAlt,
});
export default function CategoryRoute() {
  return <DatabaseCategoryPage id="characters" />;
}
