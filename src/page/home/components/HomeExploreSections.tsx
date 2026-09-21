import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGuidePillars } from "@/lib/data/pillars";
import { getWikiGroups, wikiDetails } from "@/lib/data/wiki";
import styles from "@/style/page/home/home.module.css";

export function HomeExploreSections() {
  const pillars = getGuidePillars();
  const groups = getWikiGroups();

  return (
    <>
      <section className={`container ${styles.guides}`}>
        <header>
          <div>
            <span>Four focused routes</span>
            <h2>CONTROL Resonant guides</h2>
          </div>
          <Link href="/guides">
            View all guides <ArrowRight size={16} />
          </Link>
        </header>
        <div className={styles.guideLayout}>
          {pillars.map((pillar, index) => (
            <article
              key={pillar.id}
              className={index === 0 ? styles.guideFeature : styles.guideRow}
            >
              <Link href={pillar.href} className={styles.guideImage}>
                <Image
                  src={pillar.image}
                  alt=""
                  fill
                  sizes="(max-width:700px) 100vw, 25vw"
                />
                <span>{pillar.number}</span>
              </Link>
              <p>{pillar.eyebrow}</p>
              <h3>
                <Link href={pillar.href}>{pillar.title}</Link>
              </h3>
              <p>{pillar.description}</p>
              <Link href={pillar.href}>
                Open guide <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.combatFlow}>
        <div className="container">
          <header>
            <span>Read the fight</span>
            <h2>The CONTROL Resonant combat flow</h2>
            <p>
              Pressure an enemy at close range, spend the energy you create,
              break their balance, then use the opening. Builds change the route
              through that loop, not its basic logic.
            </p>
          </header>
          <ol>
            {[
              ["01", "Strike", "Build pressure with an Aberrant Form."],
              ["02", "Power", "Spend the resource on a Combat Ability."],
              ["03", "Falter", "Create the opening instead of trading hits."],
              ["04", "Finish", "Use execution or dominance when available."],
            ].map(([number, title, text]) => (
              <li key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <Link href="/gameplay#combat-loop">
            Learn how the full combat system works <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className={styles.wiki}>
        <div className="container">
          <header>
            <div>
              <span>People, powers and places</span>
              <h2>Explore the CONTROL Resonant Wiki</h2>
            </div>
            <p>
              Meet the people driving Dylan&apos;s story, compare his combat
              options, and see how enemies, locations and missions connect.
            </p>
            <Link href="/wiki">
              Open Wiki <ArrowRight size={16} />
            </Link>
          </header>
          <div className={styles.wikiGrid}>
            {groups.map((group, index) => (
              <Link
                href={`/wiki/${group.id}`}
                key={group.id}
                className={index === 0 ? styles.wikiLead : ""}
              >
                <div>
                  <Image
                    src={group.image}
                    alt=""
                    fill
                    sizes="(max-width:650px) 50vw, 20vw"
                  />
                </div>
                <span>{group.number}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <small>
                  {
                    wikiDetails.filter((entry) => entry.group === group.id)
                      .length
                  }{" "}
                  in-depth pages
                </small>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
