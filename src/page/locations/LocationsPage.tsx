import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import { getWikiDetail, wikiDetailPath } from "@/lib/data/wiki";
import type { WikiDetail } from "@/types/wiki";
import styles from "@/style/page/locations/locations.module.css";

const places = [
  "manhattan",
  "fbc-field-office",
  "west-incursion-zone",
  "oldest-house",
]
  .map((slug) => getWikiDetail("world", slug))
  .filter((entry): entry is WikiDetail => Boolean(entry));
const placeClues: Record<string, string> = {
  manhattan:
    "Your objective names a Zone or a city activity, but not a building.",
  "fbc-field-office":
    "You are looking for the Bureau hub that connects major Zones.",
  "west-incursion-zone":
    "The objective names the early Zone shown with Gravity Anomalies.",
  "oldest-house":
    "The place name belongs to the Bureau headquarters, not a Manhattan street.",
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "CONTROL Resonant Locations",
          "/locations",
          places.map((entry) => ({
            name: entry.title,
            href: wikiDetailPath(entry),
          })),
        )}
      />
      <HubHero
        eyebrow="Match the clue to a place"
        title="CONTROL Resonant Locations — Find the Place Behind Your Clue"
        description="Recognize a named Zone, a Bureau hub or a movement obstacle, then open the relevant location, mission or ability file. This is a way to orient yourself, not a turn-by-turn map."
        image="/images/map/manhattan-overlook.jpg"
        imageAlt="A view over altered Manhattan in CONTROL Resonant"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]}
        action={<a href="#known-places">Browse known places ↓</a>}
      />

      <div className={`container ${styles.layout}`}>
        <section className={styles.orientation} aria-labelledby="orientation">
          <div>
            <span>01 / Get oriented</span>
            <h2 id="orientation">Start with the name in your objective</h2>
          </div>
          <p>
            Look for a Zone, a hub, a Fault or a movement obstacle in the
            objective. Those clues lead to different files below. If you want
            the history or role of a place rather than a next lead, use the{" "}
            <Link href="/wiki/world">World Wiki</Link>.
          </p>
        </section>

        <section className={styles.placeGuide} aria-labelledby="place-guide">
          <div className={styles.placeGuideHeader}>
            <div>
              <span>02 / Match the clue</span>
              <h2 id="place-guide">Match your location clue</h2>
            </div>
            <p>
              A Zone, a hub, a build space and a Fault are not the same kind of
              destination. Start with what you saw or what you need to do.
            </p>
          </div>
          <div
            className={styles.placeTable}
            role="region"
            aria-label="Known place and activity comparison"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">If you mean…</th>
                  <th scope="col">What it is</th>
                  <th scope="col">What is known</th>
                  <th scope="col">Continue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Manhattan Zones</th>
                  <td>Handcrafted city areas</td>
                  <td>
                    Story, World Quests, encounters and optional discoveries are
                    distributed across visually distinct Zones. Zone boundaries
                    are not yet a verified public map.
                  </td>
                  <td>
                    <Link href="/wiki/world/manhattan">World structure ↗</Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">West Incursion Zone</th>
                  <td>Named early Zone</td>
                  <td>
                    Official gameplay introduces warped streets, Gravity
                    Anomalies and early traversal. It is not the name of the
                    entire city.
                  </td>
                  <td>
                    <Link href="/wiki/world/west-incursion-zone">
                      Zone file ↗
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">FBC field office</th>
                  <td>Central hub</td>
                  <td>
                    The Bureau base links major Zones. Its full internal layout
                    and every service are not documented from the preview.
                  </td>
                  <td>
                    <Link href="/wiki/world/fbc-field-office">Hub file ↗</Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">The Gap</th>
                  <td>Dylan&apos;s build space</td>
                  <td>
                    Access upgrades, test a setup and craft Artifacts. It is not
                    a Manhattan district or the field office.
                  </td>
                  <td>
                    <Link href="/wiki/world/the-gap">Build space ↗</Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Metro Fault</th>
                  <td>Previewed activity route</td>
                  <td>
                    A distorted transit mission showcased movement challenges
                    and Reach. One preview does not establish every Fault or
                    reward.
                  </td>
                  <td>
                    <Link href="/wiki/missions/metro-fault">
                      Mission file ↗
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Evacuation Zone</th>
                  <td>Hands-on combat arena</td>
                  <td>
                    A later-build area used in a first-party playable preview.
                    Its position relative to other Zones has not been published.
                  </td>
                  <td>
                    <Link href="/wiki/world">World index ↗</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section
          className={styles.routeCheck}
          id="route-check"
          aria-labelledby="route-check-title"
        >
          <div className={styles.placeGuideHeader}>
            <div>
              <span>03 / Route check</span>
              <h2 id="route-check-title">Stuck at an obstacle or activity?</h2>
            </div>
            <p>
              Start with the activity name in your objective and the kind of
              obstacle in front of Dylan. These are orientation clues, not
              turn-by-turn directions for the unreleased retail build.
            </p>
          </div>
          <div
            className={styles.placeTable}
            role="region"
            aria-label="Route problem and next step"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">What you see</th>
                  <th scope="col">What it may mean</th>
                  <th scope="col">Check next</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">A named Manhattan Zone</th>
                  <td>
                    Zones are distinct areas. The field office links the larger
                    world, but public footage does not identify every exit or
                    fast-travel point.
                  </td>
                  <td>
                    <Link href="/wiki/world/fbc-field-office">
                      How the hub connects Zones ↗
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Warped transit or moving trains</th>
                  <td>
                    Metro Fault is the named underground preview. It includes
                    Mold opposition and leads to the Reach movement unlock; the
                    final entrance and exact sequence remain untested.
                  </td>
                  <td>
                    <Link href="/wiki/missions/metro-fault">
                      Identify Metro Fault ↗
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">A gap ordinary jumping cannot cross</th>
                  <td>
                    Traversal abilities can change which spaces are reachable.
                    Reach is associated with Metro Fault, but no public route
                    list proves that it opens this particular gap.
                  </td>
                  <td>
                    <Link href="/wiki/combat/reach">Understand Reach ↗</Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">No mission name, only a distant landmark</th>
                  <td>
                    A promotional image cannot establish a quest prerequisite or
                    a map coordinate. Check the in-game objective before
                    treating the landmark as an entrance.
                  </td>
                  <td>
                    <Link href="/guides/story-walkthrough#quest-types">
                      Identify the activity type ↗
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section
          className={styles.returnCheck}
          id="return-check"
          aria-labelledby="return-check-title"
        >
          <div>
            <span>04 / Return later?</span>
            <h2 id="return-check-title">
              Blocked does not automatically mean missed
            </h2>
          </div>
          <div>
            <p>
              Remedy has described near-instant travel between Manhattan Zones
              and the Gap. It has also said story-linked traversal abilities
              must be reacquired in New Game Plus, even when combat upgrades
              carry over. That makes a later return plausible for some movement
              gates; it does <em>not</em> prove that every first-run discovery
              is recoverable or identify any missable reward.
            </p>
            <nav aria-label="Return and progression references">
              <Link href="/guides/completion#optional-content">
                Plan a first-run revisit <ArrowRight size={16} />
              </Link>
              <Link href="/wiki/combat/new-game-plus">
                Check NG+ carry-over <ArrowRight size={16} />
              </Link>
            </nav>
          </div>
        </section>

        <section id="known-places" className={styles.knownPlaces}>
          <header>
            <div>
              <span>05 / Location files</span>
              <h2>Open the file that matches your clue</h2>
            </div>
            <p>
              These are named settings, a hub and an early Zone—not map pins.
            </p>
          </header>
          <ol>
            {places.map((entry, index) => (
              <li key={entry.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{entry.type}</small>
                  <h3>
                    <Link href={wikiDetailPath(entry)}>{entry.title}</Link>
                  </h3>
                  <p>{placeClues[entry.slug]}</p>
                </div>
                <Link
                  href={wikiDetailPath(entry)}
                  aria-label={`Read ${entry.title} location file`}
                >
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.nextSteps} aria-labelledby="next-steps">
          <div>
            <span>06 / Follow the clue</span>
            <h2 id="next-steps">Looking for a route, not a place?</h2>
          </div>
          <nav aria-label="Related route and world files">
            <Link href="/wiki/missions/metro-fault">
              Metro Fault preview route <ArrowRight size={16} />
            </Link>
            <Link href="/wiki/combat/reach">
              Reach traversal ability <ArrowRight size={16} />
            </Link>
            <Link href="/wiki/world">
              Place history and related topics <ArrowRight size={16} />
            </Link>
          </nav>
        </section>

        <section className={styles.mapLimit} aria-labelledby="map-limit">
          <h2 id="map-limit">Where is the interactive map?</h2>
          <p>
            A usable map needs verified Zone boundaries, landmarks and routes.
            Promotional views do not supply those details, so this index does
            not place invented markers on them. We will add a real map only when
            its positions can be checked against the released game.
          </p>
        </section>
      </div>
    </>
  );
}
