import Image from "next/image";
import Link from "next/link";
import overview from "@/data/gameplay/overview.json";
import styles from "@/style/page/gameplay/gameplay.module.css";

export function GameplayBuildSections() {
  return (
    <>
      <section id="abilities" className={styles.section}>
        <header>
          <span>04 / Boss-earned powers</span>
          <h2>Which Combat Abilities were shown after a Resonant?</h2>
          <p>
            One first-party hands-on showed Barrage, Seekers and Shield after an
            early Resonant encounter. Remedy says some boss rewards branch, so a
            first run is not a promise that every option can be taken at once.
          </p>
        </header>
        <div className={styles.abilityGrid}>
          {overview.abilities.map((ability) => (
            <article key={ability.name}>
              <small>{ability.role}</small>
              <h3>{ability.name}</h3>
              <p>{ability.previewedEffect}</p>
              <strong>{ability.playerQuestion}</strong>
            </article>
          ))}
        </div>
        <p>
          The hands-on build allowed three Combat Abilities to be equipped at a
          time. That capacity should not be confused with the number of
          abilities in the complete game.{" "}
          <Link href="/wiki/enemies/central-resonant">
            The Central Resonant
          </Link>{" "}
          is a different, named preview encounter; its final reward is not
          inferred here. For other shown threats, browse the{" "}
          <Link href="/bosses">known Boss encounters</Link>.
        </p>
      </section>

      <section id="progression" className={styles.section}>
        <header>
          <span>05 / Build decisions</span>
          <h2>How do Talents and Artifacts change a build?</h2>
        </header>
        <div className={styles.layers}>
          <article>
            <b>Combat Abilities</b>
            <p>
              Boss-earned supernatural tools. Some first-run choices are
              exclusive, and New Game Plus broadens the combinations available
              from the same boss.
            </p>
          </article>
          <article>
            <b>Talents</b>
            <p>
              Progression choices that strengthen interactions between weapon
              attacks and powers. New talent nodes become available in New Game
              Plus.
            </p>
          </article>
          <article>
            <b>Artifacts</b>
            <p>
              Crafted in the Gap from Untapped Artifacts found in the world.
              Passive effects may support survival, combat, exploration or
              resources, sometimes with a trade-off. Three can be equipped on a
              first run; New Game Plus adds a fourth slot.
            </p>
          </article>
          <article>
            <b>The Gap</b>
            <p>
              Dylan&apos;s build-management space lets players upgrade the
              Aberrant, work on abilities, craft Artifacts and test a setup. It
              is distinct from the FBC field office that connects Manhattan
              Zones.
            </p>
          </article>
        </div>
        <p className={styles.caveat}>
          Ask “which gap in my current setup should the next choice cover?”
          Full-game reviews report that early Form choice and limited reset
          opportunities can materially change the opening hours, so test speed
          and reach before spending deeply. Exact material costs and optimal
          damage still require versioned testing.
        </p>
      </section>

      <section id="boss-encounters" className={styles.section}>
        <header>
          <span>06 / Read the encounter</span>
          <h2>Four rules for surviving a Resonant boss fight</h2>
          <p>
            A reliable boss plan starts with the arena, attack cue and reason an
            attempt failed. Resonants are often optional, so an underprepared
            player can explore, improve a build and return rather than forcing
            every fight immediately.
          </p>
        </header>
        <div className={styles.bossGrid}>
          <figure>
            <Image
              src="/images/bosses/resonant-fire.jpg"
              alt="The Central Resonant encounter with fire and ground hazards"
              width={1200}
              height={675}
              sizes="(max-width:1024px) 100vw, 44vw"
            />
            <figcaption>
              The Central Resonant footage shows fire, projectiles and unsafe
              ground; it does not establish final health or a guaranteed reward.
            </figcaption>
          </figure>
          <ol>
            <li>
              <strong>Read the arena first.</strong> Keep an exit route before
              committing to a long melee sequence.
            </li>
            <li>
              <strong>Separate health damage from Falter pressure.</strong> A
              longer fight does not automatically mean the chosen Form is weak.
            </li>
            <li>
              <strong>Return to melee deliberately.</strong> Safe weapon hits
              restore the resource used by Combat Abilities.
            </li>
            <li>
              <strong>Use the health checkpoints.</strong> Boss health markers
              can return health at specific damage thresholds; survival and
              Falter pressure are connected.
            </li>
          </ol>
        </div>
        <p>
          Open the <Link href="/bosses">known Boss encounters</Link> for the
          currently named fights, or read the{" "}
          <Link href="/wiki/enemies/central-resonant">
            Central Resonant file
          </Link>{" "}
          for its documented hazards. Exact phases and winning routes belong in
          a tested Guide after release.
        </p>
      </section>
    </>
  );
}
