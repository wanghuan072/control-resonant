import GuidePillarPage from "@/page/guides/GuidePillarPage";
import { getGuidePillar } from "@/lib/data/pillars";
import { createMetadata } from "@/seo/metadata";
const pillar = getGuidePillar("story-walkthrough");
export const metadata = createMetadata({
  ...pillar.seo,
  path: pillar.href,
  image: pillar.image,
});
export default function Page() {
  return <GuidePillarPage id="story-walkthrough" />;
}
