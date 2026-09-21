import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import overview from "@/data/gameplay/overview.json";
import styles from "@/style/page/gameplay/gameplay.module.css";

export function GameplayFoundationSections() {
  return (
    <>
      <section id="dylan" className={styles.section}>
        <header>
          <span>01 / The playable lead</span>
          <h2>Who do you play as in CONTROL Resonant?</h2>
          <p>
            Dylan Faden replaces Jesse as the playable lead. His story begins
            with an escape from the Oldest House and moves into a warped
            Manhattan while he searches for his missing sister.
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
              Dylan is the playable lead; Zoe De Vera acts as his FBC field
              contact during the Manhattan crisis.
            </figcaption>
          </figure>
          <div>
            <dl>
              <div>
                <dt>Playable character</dt>
                <dd>
                  <Link href="/wiki/characters/dylan-faden">Dylan Faden</Link>
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
                  <Link href="/wiki/characters/zoe-de-vera">Zoe De Vera</Link>
                </dd>
              </div>
              <div>
                <dt>Central objective</dt>
                <dd>
                  Find <Link href="/wiki/characters/jesse-faden">Jesse</Link>
                </dd>
              </div>
            </dl>
            <p>
              This page only explains what Dylan changes mechanically. His
              history, Bureau captivity and relationship with Jesse belong in
              the character files rather than being repeated in every combat
              section.
            </p>
          </div>
        </div>
      </section>

      <section id="combat-loop" className={styles.intro}>
        <div>
          <span>02 / The foundation</span>
          <h2>
            How CONTROL Resonant combat connects melee, powers and executions
          </h2>
        </div>
        <div>
          <p>
            Unlike Jesse&apos;s Service Weapon-led combat in CONTROL, Dylan
            fights primarily at close range with the shape-shifting Aberrant.
            The announced loop is specific: melee hits refill the resource for
            Combat Abilities; those powers and weapon choices build Falter; and
            an execution starts Dominance, a short window of stronger offense
            and more reliable health recovery. That encourages a return to
            weapon attacks rather than treating powers as a separate, endlessly
            available ranged kit.
          </p>
          <ol className={styles.loop}>
            <li>
              <b>01</b>
              <strong>Close in and land melee hits</strong>
              <span>Rebuild ability power while reading enemy attacks.</span>
            </li>
            <li>
              <b>02</b>
              <strong>Spend a Combat Ability</strong>
              <span>
                Pressure, protect or destabilize enemies with the power your
                build uses.
              </span>
            </li>
            <li>
              <b>03</b>
              <strong>Execute a faltered target</strong>
              <span>
                Start Dominance, push the next target and create a better chance
                of recovering health.
              </span>
            </li>
          </ol>
          <div
            className={styles.tableWrap}
            role="region"
            aria-label="Falter, execution and Dominance combat states"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">Combat state</th>
                  <th scope="col">How it begins</th>
                  <th scope="col">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Falter</th>
                  <td>Build pressure with Forms, abilities and effects</td>
                  <td>
                    Opens normal enemies to execution and creates a damage
                    window against bosses
                  </td>
                </tr>
                <tr>
                  <th scope="row">Execution</th>
                  <td>Use the prompt on an eligible faltered enemy</td>
                  <td>
                    Removes a normal threat and starts the next offensive window
                  </td>
                </tr>
                <tr>
                  <th scope="row">Dominance</th>
                  <td>Triggered after an execution</td>
                  <td>
                    Temporarily strengthens Dylan and makes defeated enemies a
                    dependable source of health
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.caveat}>
            Full-game coverage confirms this relationship, but it does not
            establish one optimal rotation for every Form, difficulty setting or
            encounter.
          </p>
        </div>
      </section>

      <section id="forms" className={styles.section}>
        <header>
          <span>03 / The weapon</span>
          <h2>Six named Aberrant Forms and three loadout positions</h2>
          <p>
            Primary and Secondary are different attack positions, while a
            separate Combo Ender finishes a string. The six named early Forms
            below are reliable starting comparisons, but they are not the
            complete set of variants or upgrades.
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
          Completed reviews disagree sharply about which combinations stay
          interesting over a full run. Choose by reach, speed and Falter
          pressure instead of treating one reviewer&apos;s preference as a
          universal tier list.
        </p>
        <Link className={styles.textLink} href="/wiki/combat/aberrant-forms">
          Read the Aberrant Forms file <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
