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
            Start with the problem you can see, then compare a tool with the
            right role. Completed reviews repeatedly identify slow Falter,
            crowded arenas, targeting and late-game durability as common
            pressure points, but their preferred solutions differ.
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
              Check Falter generation before judging raw damage. Use a
              vulnerable normal enemy to trigger an execution and enter
              Dominance, then spend that window on the heavier target. If the
              rhythm is still exhausting, adjust Outgoing Falter or Outgoing
              Damage separately instead of changing every setting.
            </p>
            <Link href="/guides/combat-builds#combat-loop">
              Diagnose Falter and Dominance <ArrowRight size={15} />
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
            and gravity anomalies. The previewed Metro Fault connects a
            traversal challenge with Reach; that does not make Reach a
            substitute for a Resonant-earned Combat Ability. Manhattan is
            organized into distinct handcrafted Zones with story quests, World
            Quests and optional activities, not one uninterrupted map to clear
            marker by marker.
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
          trophies or achievements. These are announced controls, not advice
          that every player should enable them.
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
