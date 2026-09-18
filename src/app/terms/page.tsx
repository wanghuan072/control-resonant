import LegalPage from "@/page/legal/LegalPage";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  title: "Terms of Use | CONTROL Resonant Guide",
  description:
    "Read the terms for using the unofficial CONTROL Resonant Guide, including accuracy limits, external links, trademarks, and permitted personal use.",
  path: "/terms",
});

export default function TermsRoute() {
  return (
    <LegalPage
      eyebrow="Policy / 04"
      title="Terms of use"
      intro="Conditions for using this independent informational website."
      sections={[
        {
          title: "Informational use",
          paragraphs: [
            "The site is provided for personal, informational use. Guides aim to be accurate but game updates, regional storefront changes, and individual play conditions can make information incomplete or outdated.",
          ],
        },
        {
          title: "No affiliation",
          paragraphs: [
            "This is an unofficial fan project. All game names, trademarks, promotional art, and screenshots remain the property of their respective owners.",
          ],
        },
        {
          title: "External sources",
          paragraphs: [
            "Links are supplied for verification and convenience. Their content, availability, security, and policies are controlled by the destination operator.",
          ],
        },
        {
          title: "Reuse",
          paragraphs: [
            "Do not republish the site’s original written guides or design as your own. Short quotations with attribution and ordinary sharing links are welcome where permitted by law.",
          ],
        },
      ]}
    />
  );
}
