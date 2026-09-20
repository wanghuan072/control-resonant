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
    boundary: "No complete Zone map or connection graph is public yet.",
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
        eyebrow="Pre-release map status / confirmed locations"
        title="CONTROL Resonant Map — What Is Known Before Launch"
        description="The complete in-game map is not available yet. Use the confirmed location index now; interactive Zones, routes and markers will be added after the released game can be checked."
        image="/images/map/manhattan-overlook.jpg"
        imageAlt="Warped Manhattan shown in CONTROL Resonant promotional imagery"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Map" }]}
        action={<a href="#confirmed-locations">View known locations ↓</a>}
      />
      <div className={`container ${styles.page}`}>
        <section className={styles.status} aria-labelledby="map-status-title">
          <div>
            <CalendarClock aria-hidden="true" />
            <span>Current status / September 20, 2026</span>
            <h2 id="map-status-title">There is no verified full map yet</h2>
          </div>
          <div>
            <p>
              CONTROL Resonant launches digitally on September 24, 2026. The
              published material names places and demonstrates traversal, but it
              does not expose the final Zone boundaries, entrances, fast travel
              points, boss markers or collectible coordinates.
            </p>
            <p>
              A promotional street image is not a usable map. Until the release
              build can be inspected, this page separates confirmed place names
              from the details that still need to be mapped.
            </p>
          </div>
        </section>

        <section className={styles.placeIndex} id="confirmed-locations">
          <header>
            <span>Confirmed location data</span>
            <h2>What each known place is used for</h2>
            <p>
              Open a place name for its characters, activities, movement gates
              and story context. These rows describe function, not fabricated
              coordinates.
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
