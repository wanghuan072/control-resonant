import { HubHero } from "@/components/content/HubHero";
import { gameplayDestinations } from "@/config/gameplay";
import { GameplayToc } from "@/page/gameplay/GameplayToc";
import { GameplayBuildSections } from "@/page/gameplay/components/GameplayBuildSections";
import { GameplayFoundationSections } from "@/page/gameplay/components/GameplayFoundationSections";
import { GameplayMobileContents } from "@/page/gameplay/components/GameplayMobileContents";
import { GameplaySupportSections } from "@/page/gameplay/components/GameplaySupportSections";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import styles from "@/style/page/gameplay/gameplay.module.css";

export default function GameplayPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "CONTROL Resonant Gameplay",
          "/gameplay",
          gameplayDestinations.map(({ title, href }) => ({
            name: title,
            href,
          })),
        )}
      />
      <HubHero
        dark
        eyebrow="How the game plays"
        title="CONTROL Resonant Gameplay — Make Every Move Count"
        description="Meet Dylan, learn the melee-to-power combat loop, compare Forms, abilities, Talents and Artifacts, then prepare for bosses and solve common combat problems."
        image="/images/gameplay/aberrant-hammer.jpg"
        imageAlt="Dylan wielding the Aberrant in CONTROL Resonant"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gameplay" }]}
        action={<a href="#combat-loop">Understand the combat loop ↓</a>}
      />
      <div className={`container ${styles.page}`}>
        <div className={styles.readingLayout}>
          <div className={styles.content}>
            <GameplayMobileContents />
            <GameplayFoundationSections />
            <GameplayBuildSections />
            <GameplaySupportSections />
          </div>
          <GameplayToc />
        </div>
      </div>
    </>
  );
}
