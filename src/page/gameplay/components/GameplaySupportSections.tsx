import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gameplayDestinations } from "@/config/gameplay";
import overview from "@/data/gameplay/overview.json";
import styles from "@/style/page/gameplay/gameplay.module.css";

export function GameplaySupportSections() {
  return (
    <>
      <section id="combat-problems" className={styles.section}>
        <header>
          <span>07 / Put the systems to work</span>
          <h2>Fix common combat problems before changing your whole build</h2>
          <p>
            We start with the problem we can see, then look for a tool with the
            right role. Across the completed reviews, slow Falter, crowded
            arenas, targeting, and late-game durability keep coming up, even
            though the reviewers prefer different solutions.
          </p>
        </header>
        <div className={styles.problemList}>
          <article>
            <h3>I cannot reach a target safely</h3>
            <p>
              Extend gives a melee setup more reach; Barrage provides ranged
              pressure. They solve distance in different ways, and only the
              latter spends Combat Ability resource.
            </p>
            <Link href="/wiki/combat/aberrant-forms">
              Compare weapon reach <ArrowRight size={15} />
            </Link>
          </article>
          <article>
            <h3>I run out of ability power</h3>
            <p>
              The announced loop restores that resource through melee hits.
              Check whether your Form lets you return to safe weapon attacks
              instead of relying on powers alone.
            </p>
            <Link href="/guides/combat-builds">
              Plan the combat loop <ArrowRight size={15} />
            </Link>
          </article>
          <article>
            <h3>A group keeps breaking my attack</h3>
            <p>
              Slash covers a wider area, while Seekers add independent pressure.
              If the difficulty is the speed of incoming attacks, inspect the
              separate Assist Mode settings below.
            </p>
            <Link href="/wiki/combat/combat-abilities">
              Compare power roles <ArrowRight size={15} />
            </Link>
          </article>
          <article>
            <h3>Enemies feel too durable and I rarely recover health</h3>
            <p>
              Check the health bar before judging raw damage: later armored
              layers can prevent Falter from building normally until the armor
              breaks. Execute an eligible normal enemy to enter Dominance, then
              use its melee boost and dependable health drops against the
              heavier target. If the rhythm is still exhausting, adjust Outgoing
              Falter or Outgoing Damage separately.
            </p>
            <Link href="/guides/combat-builds#combat-loop">
              Diagnose Falter and Dominance <ArrowRight size={15} />
            </Link>
          </article>
          <article>
            <h3>A status build is not finishing durable enemies</h3>
            <p>
              Completed-review coverage identifies one practical interaction:
              applying Mold poison and then fire can trigger an explosion. We
              would use that combination against a durable target or a packed
              group, while leaving exact damage and best-in-slot claims open
              until they can be tested on a known game version.
            </p>
            <Link href="/wiki/combat/combat-abilities">
              Compare ability roles <ArrowRight size={15} />
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
            Reach and Shift are movement tools used to navigate distorted spaces
            and gravity anomalies. We saw Reach tied to a traversal challenge in
            the Metro Fault preview, so we keep it separate from a
            Resonant-earned Combat Ability. Manhattan is organized into distinct
            handcrafted Zones with story quests, World Quests, and optional
            activities rather than one uninterrupted map of markers.
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
            separate problems rather than forcing one global easy/hard choice.
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
          Remedy also describes independent incoming/outgoing damage and falter
          controls, presets, Immortality and one-hit options. Settings can make
          the game harder as well as easier, and using Assist Mode does not gate
          trophies or achievements. We would change the setting that targets
          your specific problem instead of enabling everything at once.
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
            Use the Wiki for a specific system; use a guide when you need a
            sequence of decisions.
          </p>
        </div>
        <div>
          {gameplayDestinations.map((item) => (
            <Link href={item.href} key={item.href}>
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
