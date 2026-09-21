import { HomeClosingSection } from "@/page/home/components/HomeClosingSection";
import { HomeExploreSections } from "@/page/home/components/HomeExploreSections";
import { HomeHeroSection } from "@/page/home/components/HomeHeroSection";
import { HomeIntentSection } from "@/page/home/components/HomeIntentSection";
import { HomeUpdatesSection } from "@/page/home/components/HomeUpdatesSection";
import { HomeWorldSection } from "@/page/home/components/HomeWorldSection";
import { JsonLd } from "@/seo/JsonLd";
import { homeSchema } from "@/seo/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeSchema()} />
      <HomeHeroSection />
      <HomeIntentSection />
      <HomeWorldSection />
      <HomeExploreSections />
      <HomeUpdatesSection />
      <HomeClosingSection />
    </>
  );
}
