import Link from "next/link";
import { ArrowRight, CalendarClock, MapPinned } from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { JsonLd } from "@/seo/JsonLd";
import { collectionSchema } from "@/seo/schema";
import styles from "@/style/page/map/map.module.css";

const places = [
  {
    name: "Manhattan Zones",
    type: "World structure",
    purpose:
      "Handcrafted areas for story progress, World Quests and encounters.",
    connection: "FBC field office; Zone progression",
    boundary:
      "A flat overview cannot show every vertical route, gravity change or ability gate.",
    href: "/wiki/world/manhattan",
  },
  {
    name: "West Incursion Zone",
    type: "Named early Zone",
    purpose: "Early combat, exploration and Gravity Anomaly context.",
    connection: "Gravity Anomalies; early gameplay",
    boundary: "The complete district boundary and marker list are unknown.",
    href: "/wiki/world/west-incursion-zone",
  },
  {
    name: "FBC field office",
    type: "Bureau hub",
    purpose: "An evolving operational foothold connected to Zone progress.",
    connection: "Characters; Bureau operations; Zone travel",
    boundary: "The room layout and every travel connection are not mapped.",
    href: "/wiki/world/fbc-field-office",
  },
  {
    name: "Metro Fault",
    type: "Fault activity",
    purpose:
      "A demonstrated transit route with Mold pressure and train hazards.",
    connection: "Reach traversal ability; Faults",
    boundary:
      "Preview footage does not prove every retail path or collectible.",
    href: "/wiki/missions/metro-fault",
  },
  {
    name: "The Gap",
    type: "Build space",
    purpose: "Manage Forms, abilities, Talents and Artifact crafting.",
    connection: "Aberrant; Artifacts; Talents",
    boundary:
      "It is not a Manhattan district and should not be plotted as one.",
    href: "/wiki/world/the-gap",
  },
  {
    name: "Oldest House",
    type: "Returning location",
    purpose: "Dylan's confinement and the point from which his story begins.",
    connection: "Dylan Faden; Jesse Faden; the FBC",
    boundary: "The CONTROL (2019) map is not a map of Resonant's Manhattan.",
    href: "/wiki/world/oldest-house",
  },
];

export default function MapPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "CONTROL Resonant Map and Confirmed Locations",
          "/map",
          places.map((place) => ({ name: place.name, href: place.href })),
        )}
      />
      <HubHero
        eyebrow="Map status / locations and navigation"
        title="CONTROL Resonant Map — Zones, Routes and Movement Gates"
        description="The game includes a map, but its vertical streets, interiors and gravity-shifted spaces need more than a flat image. Use the location index now; tested routes and markers will follow after public release."
        image="/images/map/manhattan-overlook.jpg"
        imageAlt="Warped Manhattan shown in CONTROL Resonant promotional imagery"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Map" }]}
        action={<a href="#confirmed-locations">View known locations ↓</a>}
      />
      <div className={`container ${styles.page}`}>
        <section className={styles.status} aria-labelledby="map-status-title">
          <div>
            <CalendarClock aria-hidden="true" />
            <span>Current status / September 21, 2026</span>
            <h2 id="map-status-title">
              The in-game map exists; a verified route map does not
            </h2>
          </div>
          <div>
            <p>
              We checked the full-game coverage: there is a top-down map and
              Manhattan is divided into large, focused Zones. Reviewers also
              agree that elevation, gravity changes, and layered interiors can
              make it hard to read. That&apos;s why we don&apos;t think a single
              screenshot is a trustworthy route guide yet.
            </p>
            <p>
              CONTROL Resonant launches publicly on September 24, 2026. Until a
              public build can be checked directly, we&apos;re separating the
              place names and movement rules we can verify from entrances,
              fast-travel points, boss markers, and collectible coordinates we
              can&apos;t verify yet.
            </p>
          </div>
        </section>

        <section
          className={styles.placeIndex}
          aria-labelledby="navigation-title"
        >
          <header>
            <span>How to read the space</span>
            <h2 id="navigation-title">
              Why the map may not show the route you need
            </h2>
            <p>
              If a marker looks wrong, we&apos;d check the elevation and the
              movement ability blocking the path before blaming the map.
            </p>
            <p>
              Before interpreting a route,{" "}
              <Link href="/wiki/world">explore the world location index</Link>{" "}
              for the place&apos;s role and connections.
            </p>
          </header>
          <div
            className={styles.tableWrap}
            role="region"
            aria-label="CONTROL Resonant navigation problem guide"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th>What you see</th>
                  <th>What may be happening</th>
                  <th>What to check next</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>A nearby marker with no direct street</th>
                  <td>The route may pass through a roof, tunnel or interior</td>
                  <td>
                    Follow the active objective and look for a different
                    elevation
                  </td>
                </tr>
                <tr>
                  <th>A visible ledge that Dylan cannot reach</th>
                  <td>
                    The path may be gated by Reach, Shift or another movement
                    unlock
                  </td>
                  <td>Record the Zone and return after a traversal quest</td>
                </tr>
                <tr>
                  <th>Roads or rooms turned onto another plane</th>
                  <td>
                    Gravity orientation changes which surface is the floor
                  </td>
                  <td>
                    Read the geometry before following the flat-map direction
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.placeIndex} id="confirmed-locations">
          <header>
            <span>Confirmed location data</span>
            <h2>What each known place is used for</h2>
            <p>
              Open a place name for its characters, activities, movement gates,
              and story context. We&apos;re listing what each place is for
              without guessing at coordinates.
            </p>
            <p>
              When a place belongs to an objective,{" "}
              <Link href="/wiki/missions">
                compare mission and activity types
              </Link>{" "}
              before choosing a route.
            </p>
          </header>
          <div
            className={styles.tableWrap}
            role="region"
            aria-label="Confirmed CONTROL Resonant location data"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Type</th>
                  <th>Why a player goes there</th>
                  <th>Connected data</th>
                  <th>Not yet mapped</th>
                </tr>
              </thead>
              <tbody>
                {places.map((place) => (
                  <tr key={place.name}>
                    <th>
                      <Link href={place.href}>
                        {place.name} <ArrowRight size={13} />
                      </Link>
                    </th>
                    <td>{place.type}</td>
                    <td>{place.purpose}</td>
                    <td>{place.connection}</td>
                    <td>{place.boundary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.launchPlan}>
          <div>
            <MapPinned aria-hidden="true" />
            <span>Launch update plan</span>
            <h2>What turns this index into a real map?</h2>
          </div>
          <ol>
            <li>
              <strong>01 / Verify Zone boundaries</strong>
              Record the final names, entrances, exits and travel connections.
            </li>
            <li>
              <strong>02 / Add reproducible markers</strong>
              Link missions, bosses, activities and traversal gates to a place a
              second player can find.
            </li>
            <li>
              <strong>03 / Separate map layers</strong>
              Keep story routes, optional content and collectibles filterable
              instead of flattening them into one crowded image.
            </li>
          </ol>
        </section>
      </div>
    </>
  );
}
