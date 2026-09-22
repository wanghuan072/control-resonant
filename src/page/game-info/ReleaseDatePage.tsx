import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Gamepad2,
  Package,
} from "lucide-react";
import { HubHero } from "@/components/content/HubHero";
import { buyingFacts, displayDate } from "@/config/buying";
import { siteConfig } from "@/config/site";
import { ReleaseCountdown } from "@/page/home/components/ReleaseCountdown";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/game-info/game-info-detail.module.css";

const faq = [
  {
    question: "When is the CONTROL Resonant release date?",
    answer: `The announced worldwide digital release is ${displayDate(buyingFacts.digitalRelease)} for Windows PC, PlayStation 5 and Xbox Series X|S. The official FAQ lists September 25 in New Zealand, so check your regional storefront for the local calendar date and unlock time.`,
  },
  {
    question: "Does CONTROL Resonant have early access?",
    answer: `The PS5 Digital Deluxe listing includes up to 48 hours of early access from ${displayDate(buyingFacts.ps5DeluxeEarlyAccess)}. Check the exact regional listing and unlock time before buying.`,
  },
  {
    question: "When is the physical release?",
    answer: `Physical PS5 and Xbox Series X|S copies are scheduled for ${displayDate(buyingFacts.physicalRelease)}, after the digital launch.`,
  },
  {
    question: "Is CONTROL Resonant coming to Mac?",
    answer:
      "Yes. Remedy says the Mac version will follow later in 2026, but no exact date has been announced.",
  },
];

export default function ReleaseDatePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "CONTROL Resonant Release Date",
            url: `${siteConfig.url}/game-info/release-date`,
            dateModified: "2026-09-20",
            about: { "@type": "VideoGame", name: "CONTROL Resonant" },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Release Date", href: "/game-info/release-date" },
          ]),
        ]}
      />
      <HubHero
        eyebrow="Game info / launch schedule"
        title="CONTROL Resonant Release Date — Digital, Physical and Early Access"
        description="Find the digital launch date, PS5 Deluxe early access window, physical edition date and later Mac timing in one clear schedule."
        image="/images/guides/editions.jpg"
        imageAlt="CONTROL Resonant edition artwork"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Release Date" }]}
        action={<a href="#release-schedule">View the release schedule ↓</a>}
      />

      <div className={`container ${styles.page}`}>
        <section className={styles.directAnswer} id="release-schedule">
          <div>
            <span>Direct answer</span>
            <h2>CONTROL Resonant launches digitally on September 24, 2026</h2>
            <p>
              The date covers Windows PC through Steam and Epic Games Store,
              PlayStation 5 and Xbox Series X|S. GeForce NOW support is planned
              for launch. The official FAQ lists September 25 in New Zealand;
              regional storefront dates and unlock hours can differ. A Mac
              version follows later in 2026.
            </p>
          </div>
          <aside className={styles.countdownCard}>
            <ReleaseCountdown releaseDate={buyingFacts.digitalRelease} />
          </aside>
        </section>

        <section className={styles.timeline} aria-labelledby="timeline-title">
          <header className={styles.sectionHeading}>
            <div>
              <span>01 / Dates that matter</span>
              <h2 id="timeline-title">
                Digital, early access and physical release
              </h2>
            </div>
            <p>
              These dates apply to different products. We recommend matching the
              date to your exact platform and edition before planning time off
              or placing an order.
            </p>
          </header>
          <ol>
            <li>
              <Clock3 aria-hidden="true" />
              <time dateTime={buyingFacts.ps5DeluxeEarlyAccess}>Sep 22</time>
              <div>
                <strong>PS5 Digital Deluxe early access</strong>
                <p>
                  Up to 48 hours early. Availability and the exact unlock hour
                  depend on the regional PlayStation Store listing.
                </p>
              </div>
            </li>
            <li>
              <CalendarDays aria-hidden="true" />
              <time dateTime={buyingFacts.digitalRelease}>Sep 24</time>
              <div>
                <strong>Worldwide digital release</strong>
                <p>
                  Windows PC, PS5, Xbox Series X|S and GeForce NOW support. New
                  Zealand is listed as September 25.
                </p>
              </div>
            </li>
            <li>
              <Package aria-hidden="true" />
              <time dateTime={buyingFacts.physicalRelease}>Oct 15</time>
              <div>
                <strong>Physical console release</strong>
                <p>
                  Standard and SteelBook packages for PS5 and Xbox Series X|S
                  retailers; stock and package contents vary by listing.
                </p>
              </div>
            </li>
            <li>
              <Gamepad2 aria-hidden="true" />
              <time dateTime="2026">Later 2026</time>
              <div>
                <strong>Mac release</strong>
                <p>
                  Announced for Steam and the App Store without an exact day.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section
          className={styles.section}
          id="platforms"
          aria-labelledby="platform-title"
        >
          <header className={styles.sectionHeading}>
            <div>
              <span>02 / Platform check</span>
              <h2 id="platform-title">
                Which platforms launch on September 24?
              </h2>
            </div>
            <p>
              We treat “worldwide” as the announced calendar date, not a promise
              that every storefront uses the same local date or unlock hour. The
              official FAQ lists September 25 in New Zealand.
            </p>
          </header>
          <div
            className={styles.tableWrap}
            role="region"
            aria-label="CONTROL Resonant platform release dates"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Release</th>
                  <th>Format</th>
                  <th>What to check</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Windows PC</th>
                  <td>September 24, 2026</td>
                  <td>Steam / Epic digital</td>
                  <td>Regional date, store unlock time and PC requirements</td>
                </tr>
                <tr>
                  <th>PlayStation 5</th>
                  <td>September 24, 2026</td>
                  <td>Digital; physical October 15</td>
                  <td>September 25 in New Zealand; check regional listing</td>
                </tr>
                <tr>
                  <th>Xbox Series X|S</th>
                  <td>September 24, 2026</td>
                  <td>Digital; physical October 15</td>
                  <td>September 25 in New Zealand; check regional listing</td>
                </tr>
                <tr>
                  <th>GeForce NOW</th>
                  <td>Launch support announced</td>
                  <td>Cloud streaming</td>
                  <td>
                    A supported store entitlement and service availability
                  </td>
                </tr>
                <tr>
                  <th>Mac</th>
                  <td>Later in 2026</td>
                  <td>Steam / App Store</td>
                  <td>Exact date and Mac requirements are not published</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section
          className={styles.section}
          id="editions"
          aria-labelledby="editions-title"
        >
          <header className={styles.sectionHeading}>
            <div>
              <span>03 / Edition comparison</span>
              <h2 id="editions-title">
                Standard, Digital Deluxe and SteelBook compared
              </h2>
            </div>
            <p>
              We checked these published US list prices on September 20, 2026.
              Regional pricing, retailer stock, and physical contents can
              differ, so use the table to compare editions and confirm the final
              details with your store.
            </p>
          </header>
          <div
            className={styles.tableWrap}
            role="region"
            aria-label="CONTROL Resonant edition comparison"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th>Edition</th>
                  <th>What is included</th>
                  <th>Pre-order bonus</th>
                  <th>Where to buy / US list price</th>
                </tr>
              </thead>
              <tbody>
                {buyingFacts.editions.map((edition) => (
                  <tr key={edition.id}>
                    <th>
                      {edition.name}
                      <br />
                      <small>{edition.format}</small>
                    </th>
                    <td>
                      {edition.extras}
                      <br />
                      <small>Available: {edition.timing}</small>
                    </td>
                    <td>
                      {buyingFacts.preorderBonuses.shared}
                      {edition.format === "Digital" && (
                        <>
                          <br />
                          <small>
                            PlayStation pre-orders also list the Occult Outfit.
                          </small>
                        </>
                      )}
                    </td>
                    <td>
                      {edition.channels}
                      <br />
                      <strong>{edition.usListPrice}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.tableNote}>
            Digital Deluxe adds digital extras; it is not a story expansion. The
            SteelBook is a later physical package and is not the physical
            version of Digital Deluxe. Pre-order eligibility depends on the
            exact storefront or retailer listing.
          </p>
        </section>

        <section className={styles.splitSection}>
          <div>
            <span>04 / Earliest access</span>
            <h2>
              PS5 Digital Deluxe is the only announced early-access option
            </h2>
            <p>
              For most players, Standard and Digital Deluxe share the September
              24 digital date. The announced exception is the PS5 Digital Deluxe
              early-access benefit. Physical buyers wait until October 15.
            </p>
            <Link href="/game-info/physical-release-steelbook">
              Check the physical packages <ArrowRight size={16} />
            </Link>
          </div>
          <div>
            <span>05 / Timing still unknown</span>
            <h2>Preload and regional unlock times are not announced</h2>
            <p>
              We have not found one verified preload schedule or universal
              unlock hour. We would trust the local time shown by your platform
              rather than converting the calendar date ourselves.
            </p>
            <Link href="/updates">
              Check the latest updates <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className={styles.toolCta} id="platform-access">
          <div>
            <span>06 / Where to play</span>
            <h2>Match the release date to the right platform</h2>
            <p>
              A release date does not answer every access question. In the
              platform guide, we separate Xbox Play Anywhere from Game Pass and
              track Steam Deck, GeForce NOW, Mac, and Nintendo Switch 2 without
              guessing at unannounced versions.
            </p>
          </div>
          <Link href="/game-info/platforms">
            Compare every platform <ArrowRight size={16} />
          </Link>
        </section>

        <section className={styles.faq} aria-labelledby="release-faq">
          <header className={styles.sectionHeading}>
            <div>
              <span>Quick answers</span>
              <h2 id="release-faq">Release date FAQ</h2>
            </div>
          </header>
          <div>
            {faq.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <nav className={styles.nextPage} aria-label="Continue in Game Info">
          <div>
            <span>Next check</span>
            <strong>Where can you play, and how does access work?</strong>
          </div>
          <Link href="/game-info/platforms">
            Open the platform guide <ArrowRight size={18} />
          </Link>
        </nav>
      </div>
    </>
  );
}
