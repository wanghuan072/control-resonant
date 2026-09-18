import LegalPage from "@/page/legal/LegalPage";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  title: "About CONTROL Resonant Guide",
  description:
    "Learn about this independent CONTROL Resonant guide, its player-first scope, use of official media and approach to changing game information.",
  path: "/about",
});

export default function AboutRoute() {
  return (
    <LegalPage
      eyebrow="Site file / 01"
      title="About this guide"
      intro="An independent, player-first field guide for CONTROL Resonant."
      sections={[
        {
          title: "What this site is",
          paragraphs: [
            "CONTROL Resonant Guide is an unofficial fan-made site for players. It is not affiliated with, endorsed by, or operated by Remedy Entertainment, Epic Games, Sony, Microsoft, or their partners.",
          ],
        },
        {
          title: "Editorial approach",
          paragraphs: [
            "Named missions, bosses, abilities, statistics, rewards and map coordinates are not invented to fill a template. Guides and Wiki files show when they were updated; preview material is not presented as a complete launch-day index.",
          ],
        },
        {
          title: "Images and marks",
          paragraphs: [
            "CONTROL, CONTROL Resonant, related names, screenshots, and promotional artwork belong to their respective rights holders. Official promotional media is used here for identification, commentary, and guide context; this site claims no ownership of those assets.",
          ],
        },
        {
          title: "Corrections",
          paragraphs: [
            "Announcements can change. When a release date, feature or requirement changes, we update the page that helps you make that decision.",
          ],
        },
      ]}
    />
  );
}
