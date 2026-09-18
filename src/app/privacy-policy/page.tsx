import LegalPage from "@/page/legal/LegalPage";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy | CONTROL Resonant Guide",
  description:
    "Read the privacy policy for CONTROL Resonant Guide, including current data collection, local search behavior, external links, and future policy changes.",
  path: "/privacy-policy",
});

export default function PrivacyRoute() {
  return (
    <LegalPage
      eyebrow="Policy / 03"
      title="Privacy policy"
      intro="A plain-language account of how this static guide currently handles data."
      sections={[
        {
          title: "Data collection",
          paragraphs: [
            "This version of the site does not provide accounts, comments, purchases, or a newsletter, and does not intentionally collect personal information through those features.",
          ],
        },
        {
          title: "Site search",
          paragraphs: [
            "Search runs in your browser against a bundled index. The query can appear in the page URL, but this site does not send it to a dedicated search service.",
          ],
        },
        {
          title: "External links",
          paragraphs: [
            "Links to other websites lead to third-party services whose privacy practices are controlled by their own operators.",
          ],
        },
        {
          title: "Video playback",
          paragraphs: [
            "Videos are not embedded until you choose to play them. Loading a player connects your browser to YouTube through its privacy-enhanced youtube-nocookie.com embed. The third-party player may process connection and playback data under its own policies. You can instead open the video on YouTube.",
          ],
        },
        {
          title: "Future changes",
          paragraphs: [
            "If analytics, forms, advertising, or accounts are introduced, this policy must be revised before those tools are activated.",
          ],
        },
      ]}
    />
  );
}
