import LegalPage from "@/page/legal/LegalPage";

export default function NotFound() {
  return (
    <LegalPage
      eyebrow="Page not found / 404"
      title="Record not found"
      intro="That page may have moved, or we may not have a page for that topic yet."
      sections={[
        {
          id: "return-to-confirmed-ground",
          title: "Return to confirmed ground",
          paragraphs: [
            "Use the guide index to browse current release information, systems, platform answers, and launch coverage.",
          ],
        },
      ]}
    />
  );
}
