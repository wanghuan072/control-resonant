import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import overview from "@/data/gameplay/overview.json";
import { GameplayToc } from "@/page/gameplay/GameplayToc";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import styles from "@/style/page/gameplay/gameplay.module.css";

const destinations = [
  {
    title: "Aberrant Forms",
    href: "/wiki/combat/aberrant-forms",
    detail: "Weapon slots, speed, reach and previewed form roles",
  },
  {
    title: "Combat Abilities",
    href: "/wiki/combat/combat-abilities",
    detail: "Boss-earned powers and the shown opening choice",
  },
  {
    title: "Artifacts",
    href: "/wiki/combat/artifacts",
    detail: "Passive modifiers, crafting and NG+ slots",
  },
  {
    title: "Combat & Builds guide",
    href: "/guides/combat-builds",
    detail: "A decision route for putting the systems together",
  },
];

export default function GameplayPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "CONTROL Resonant Gameplay",
          "/gameplay",
          destinations.map(({ title, href }) => ({ name: title, href })),
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
          <main className={styles.content}>
            <details className={styles.mobileContents}>
              <summary>On this page</summary>
              <nav aria-label="Mobile gameplay sections">
                <a href="#dylan">Play as Dylan</a>
                <a href="#combat-loop">Combat loop</a>
                <a href="#forms">Aberrant Forms</a>
                <a href="#abilities">Combat Abilities</a>
                <a href="#progression">Talents & Artifacts</a>
                <a href="#boss-encounters">Boss encounters</a>
                <a href="#combat-problems">Combat problems</a>
                <a href="#traversal">Traversal</a>
                <a href="#assist-mode">Assist Mode</a>
              </nav>
            </details>

            <section id="dylan" className={styles.section}>
              <header>
                <span>01 / The playable lead</span>
                <h2>Who do you play as in CONTROL Resonant?</h2>
                <p>
                  Dylan Faden replaces Jesse as the playable lead. His story
                  begins with an escape from the Oldest House and moves into a
                  warped Manhattan while he searches for his missing sister.
                </p>
              </header>
              <div className={styles.characterGrid}>
                <figure>
                  <Image
                    src="/images/characters/zoe-and-dylan.jpg"
                    alt="Dylan Faden with FBC field agent Zoe De Vera"
                    width={1200}
                    height={675}
                    sizes="(max-width:1024px) 100vw, 44vw"
                  />
                  <figcaption>
                    Dylan is the playable lead; Zoe De Vera acts as his FBC
                    field contact during the Manhattan crisis.
                  </figcaption>
                </figure>
                <div>
                  <dl>
                    <div>
                      <dt>Playable character</dt>
                      <dd>
                        <Link href="/wiki/characters/dylan-faden">
                          Dylan Faden
                        </Link>
                      </dd>
                    </div>
                    <div>
                      <dt>Primary weapon</dt>
                      <dd>
                        <Link href="/wiki/combat/aberrant">The Aberrant</Link>
                      </dd>
                    </div>
                    <div>
                      <dt>Field contact</dt>
                      <dd>
                        <Link href="/wiki/characters/zoe-de-vera">
                          Zoe De Vera
                        </Link>
                      </dd>
                    </div>
                    <div>
                      <dt>Central objective</dt>
                      <dd>
                        Find{" "}
                        <Link href="/wiki/characters/jesse-faden">Jesse</Link>
                      </dd>
                    </div>
                  </dl>
                  <p>
                    This page only explains what Dylan changes mechanically. His
                    history, Bureau captivity and relationship with Jesse belong
                    in the character files rather than being repeated in every
                    combat section.
                  </p>
                </div>
              </div>
            </section>

            <section id="combat-loop" className={styles.intro}>
              <div>
                <span>02 / The foundation</span>
                <h2>
                  How CONTROL Resonant combat connects melee, powers and
                  executions
                </h2>
              </div>
              <div>
                <p>
                  Unlike Jesse&apos;s Service Weapon-led combat in CONTROL,
                  Dylan fights primarily at close range with the shape-shifting
                  Aberrant. The announced loop is specific: melee hits refill
                  the resource for Combat Abilities; those powers can falter
                  enemies; an execution then gives a temporary melee-damage
                  boost. That encourages a return to weapon attacks rather than
                  treating powers as a separate, endlessly available ranged kit.
                </p>
                <ol className={styles.loop}>
                  <li>
                    <b>01</b>
                    <strong>Close in and land melee hits</strong>
                    <span>
                      Rebuild ability power while reading enemy attacks.
                    </span>
                  </li>
                  <li>
                    <b>02</b>
                    <strong>Spend a Combat Ability</strong>
                    <span>
                      Pressure, protect or destabilize enemies with the power
                      your build uses.
                    </span>
                  </li>
                  <li>
                    <b>03</b>
                    <strong>Execute a faltered target</strong>
                    <span>
                      Use the opening and temporary damage boost to sustain
                      momentum.
                    </span>
                  </li>
                </ol>
                <p className={styles.caveat}>
                  This describes Remedy&apos;s intended system, not a measured
                  optimal combo, damage rotation or guaranteed strategy for
                  every encounter.
                </p>
              </div>
            </section>

            <section id="forms" className={styles.section}>
              <header>
                <span>03 / The weapon</span>
                <h2>Six Aberrant Forms shown in the opening preview</h2>
                <p>
                  Primary and Secondary are different weapon slots. A separate
                  Combo Ender pool supplies finishing attacks; its full retail
                  list has not been established by the preview.
                </p>
              </header>
              <div
                className={styles.tableWrap}
                role="region"
                aria-label="Previewed Aberrant Forms"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Form</th>
                      <th scope="col">Slot and shape</th>
                      <th scope="col">Shown role</th>
                      <th scope="col">Player decision</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overview.forms.map((form) => (
                      <tr key={form.name}>
                        <th scope="row">{form.name}</th>
                        <td>
                          {form.slot}
                          <small>{form.shape}</small>
                        </td>
                        <td>{form.knownUse}</td>
                        <td>{form.decision}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.caveat}>
                These are roles observed in a pre-release hands-on build, not a
                final tier list. Xbox&apos;s preview says later experimentation
                can unlock other initial choices.
              </p>
              <Link
                className={styles.textLink}
                href="/wiki/combat/aberrant-forms"
              >
                Read the Aberrant Forms file <ArrowRight size={16} />
              </Link>
            </section>

            <section id="abilities" className={styles.section}>
              <header>
                <span>04 / Boss-earned powers</span>
                <h2>Which Combat Abilities were shown after a Resonant?</h2>
                <p>
                  One first-party hands-on showed Barrage, Seekers and Shield
                  after an early Resonant encounter. Remedy says some boss
                  rewards branch, so a first run is not a promise that every
                  option can be taken at once.
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
                The hands-on build allowed three Combat Abilities to be equipped
                at a time. That capacity should not be confused with the number
                of abilities in the complete game.{" "}
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
                    exclusive, and New Game Plus broadens the combinations
                    available from the same boss.
                  </p>
                </article>
                <article>
                  <b>Talents</b>
                  <p>
                    Progression choices that strengthen interactions between
                    weapon attacks and powers. New talent nodes become available
                    in New Game Plus.
                  </p>
                </article>
                <article>
                  <b>Artifacts</b>
                  <p>
                    Crafted in the Gap from Untapped Artifacts found in the
                    world. Passive effects may support survival, combat,
                    exploration or resources, sometimes with a trade-off. Three
                    can be equipped on a first run; New Game Plus adds a fourth
                    slot.
                  </p>
                </article>
                <article>
                  <b>The Gap</b>
                  <p>
                    Dylan&apos;s build-management space lets players upgrade the
                    Aberrant, work on abilities, craft Artifacts and test a
                    setup. It is distinct from the FBC field office that
                    connects Manhattan Zones.
                  </p>
                </article>
              </div>
              <p className={styles.caveat}>
                A useful pre-launch question is not “what is the best build?”
                but “which gap in my current setup should the next choice
                cover?” Final damage, material costs and respec rules require
                the released build.
              </p>
            </section>

            <section id="boss-encounters" className={styles.section}>
              <header>
                <span>06 / Read the encounter</span>
                <h2>Four rules for surviving a Resonant boss fight</h2>
                <p>
                  A reliable boss plan starts with the arena, attack cue and
                  reason an attempt failed. It should not begin with an assumed
                  elemental weakness or reward taken from edited preview
                  footage.
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
                    The Central Resonant footage shows fire, projectiles and
                    unsafe ground; it does not establish final health or a
                    guaranteed reward.
                  </figcaption>
                </figure>
                <ol>
                  <li>
                    <strong>Read the arena first.</strong>
                    Keep an exit route before committing to a long melee
                    sequence.
                  </li>
                  <li>
                    <strong>
                      Separate health damage from Falter pressure.
                    </strong>
                    A longer fight does not automatically mean the chosen Form
                    is weak.
                  </li>
                  <li>
                    <strong>Return to melee deliberately.</strong>
                    Safe weapon hits restore the resource used by Combat
                    Abilities.
                  </li>
                  <li>
                    <strong>Adjust only the failed mechanic.</strong>
                    Perfect Dodge Window, projectile speed and Falter controls
                    solve different problems.
                  </li>
                </ol>
              </div>
              <p>
                Open the <Link href="/bosses">known Boss encounters</Link> for
                the currently named fights, or read the{" "}
                <Link href="/wiki/enemies/central-resonant">
                  Central Resonant file
                </Link>{" "}
                for its documented hazards. Exact phases and winning routes
                belong in a tested Guide after release.
              </p>
            </section>

            <section id="combat-problems" className={styles.section}>
              <header>
                <span>07 / Put the systems to work</span>
                <h2>
                  Fix common combat problems before changing your whole build
                </h2>
                <p>
                  Start with the problem you can see, then compare a tool with
                  the right role. These are starting points drawn from shown
                  mechanics, not tested answers to every encounter.
                </p>
              </header>
              <div className={styles.problemList}>
                <article>
                  <h3>I cannot reach a target safely</h3>
                  <p>
                    Extend gives a melee setup more reach; Barrage provides
                    ranged pressure. They solve distance in different ways, and
                    only the latter spends Combat Ability resource.
                  </p>
                  <Link href="/wiki/combat/aberrant-forms">
                    Compare weapon reach <ArrowRight size={15} />
                  </Link>
                </article>
                <article>
                  <h3>I run out of ability power</h3>
                  <p>
                    The announced loop restores that resource through melee
                    hits. Check whether your Form lets you return to safe weapon
                    attacks instead of relying on powers alone.
                  </p>
                  <Link href="/guides/combat-builds">
                    Plan the combat loop <ArrowRight size={15} />
                  </Link>
                </article>
                <article>
                  <h3>A group keeps breaking my attack</h3>
                  <p>
                    Slash covers a wider area, while Seekers add independent
                    pressure. If the difficulty is the speed of incoming
                    attacks, inspect the separate Assist Mode settings below.
                  </p>
                  <Link href="/wiki/combat/combat-abilities">
                    Compare power roles <ArrowRight size={15} />
                  </Link>
                </article>
              </div>
            </section>

            <section id="traversal" className={styles.intro}>
              <div>
                <span>08 / Moving through Zones</span>
                <h2>How do Reach and Shift change traversal?</h2>
              </div>
              <div>
                <p>
                  Reach and Shift are movement tools used to navigate distorted
                  spaces and gravity anomalies. The previewed Metro Fault
                  connects a traversal challenge with Reach; that does not make
                  Reach a substitute for a Resonant-earned Combat Ability.
                  Manhattan is organized into distinct handcrafted Zones with
                  story quests, World Quests and optional activities, not one
                  uninterrupted map to clear marker by marker.
                </p>
                <nav className={styles.inlineLinks}>
                  <Link href="/map">
                    Known places <ArrowRight size={15} />
                  </Link>
                  <Link href="/wiki/missions/metro-fault">
                    Metro Fault preview <ArrowRight size={15} />
                  </Link>
                  <Link href="/wiki/combat/reach">
                    Reach file <ArrowRight size={15} />
                  </Link>
                </nav>
              </div>
            </section>

            <section id="assist-mode" className={styles.section}>
              <header>
                <span>09 / Tune the friction</span>
                <h2>Assist Mode targets specific difficulties</h2>
                <p>
                  Assist Mode can be changed during play. These options address
                  separate problems rather than forcing one global easy/hard
                  choice.
                </p>
              </header>
              <div
                className={styles.tableWrap}
                role="region"
                aria-label="Assist Mode problem and setting comparison"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">If this is the problem</th>
                      <th scope="col">Setting to inspect</th>
                      <th scope="col">What it changes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overview.assist.map((item) => (
                      <tr key={item.setting}>
                        <th scope="row">{item.problem}</th>
                        <td>{item.setting}</td>
                        <td>{item.effect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Remedy also describes independent incoming/outgoing damage and
                falter controls, presets, Immortality and one-hit options.
                Settings can make the game harder as well as easier, and using
                Assist Mode does not gate trophies or achievements. These are
                announced controls, not advice that every player should enable
                them.
              </p>
              <Link className={styles.textLink} href="/guides/getting-started">
                Accessibility and first-hour guide <ArrowRight size={16} />
              </Link>
            </section>

            <section className={styles.next} aria-labelledby="next-heading">
              <div>
                <span>Continue your route</span>
                <h2 id="next-heading">
                  Continue with a combat file or step-by-step guide
                </h2>
                <p>
                  Use the Wiki for a specific system; use a guide when you need
                  a sequence of decisions.
                </p>
              </div>
              <div>
                {destinations.map((item) => (
                  <Link href={item.href} key={item.href}>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                    <ArrowRight size={17} />
                  </Link>
                ))}
              </div>
            </section>
          </main>
          <GameplayToc />
        </div>
      </div>
    </>
  );
}
