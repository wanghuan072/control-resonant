import DatabaseCategoryPage from "@/page/database/DatabaseCategoryPage";
import { getDatabaseCategory } from "@/lib/data/database";
import { createMetadata } from "@/seo/metadata";
const category = getDatabaseCategory("enemies");
export const metadata = createMetadata({
  ...category.seo,
  path: "/enemies",
  image: category.heroImage,
  imageAlt: category.heroAlt,
});
export default function CategoryRoute() {
  return <DatabaseCategoryPage id="enemies" />;
}
