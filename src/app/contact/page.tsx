import LegalPage from "@/page/legal/LegalPage";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  title: "Contact CONTROL Resonant Guide",
  description:
    "Contact the CONTROL Resonant Guide team about factual corrections, accessibility problems or rights concerns.",
  path: "/contact",
});

export default function ContactRoute() {
  return (
    <LegalPage
      eyebrow="Site file / 02"
      title="Contact"
      intro="Let us know about an incorrect detail, an accessibility problem or a rights concern."
      sections={[
        {
          title: "Editorial contact",
          paragraphs: [
            siteConfig.email
              ? `Email ${siteConfig.email}. Include the page URL, the detail that needs review, and enough information for us to check it.`
              : "A public contact address has not been configured for this preview site. Please do not send personal information to an assumed address. A verified correction channel will be displayed here when provided by the site operator.",
          ],
        },
        {
          title: "Correction requests",
          paragraphs: [
            "We prioritize incorrect release details, platform claims, system requirements, accessibility information, and guide steps that cannot be reproduced.",
          ],
        },
        {
          title: "Rights concerns",
          paragraphs: [
            "A useful rights notice identifies the page, the exact asset, the rights holder and the requested change. Use only the contact channel explicitly published above.",
          ],
        },
      ]}
    />
  );
}
