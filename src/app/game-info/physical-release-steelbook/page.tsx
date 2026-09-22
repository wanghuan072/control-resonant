import Link from "next/link";
import GameInfoArticle from "@/page/game-info/GameInfoArticle";
import { gameInfoTopics } from "@/config/game-info-topics";
import { createMetadata } from "@/seo/metadata";
import { buyingFacts, displayDate } from "@/config/buying";
import styles from "@/style/page/game-info/game-info-article.module.css";

const topic = gameInfoTopics.find(
  (item) => item.href === "/game-info/physical-release-steelbook",
)!;
export const metadata = createMetadata({
  ...topic,
  path: topic.href,
  type: "article",
  publishedAt: topic.updatedAt,
  image: "/images/guides/editions.jpg",
});

export default function PhysicalReleasePage() {
  return (
    <GameInfoArticle
      topic={topic}
      image="/images/guides/editions.jpg"
      lead="We checked the physical schedule and package listings: the disc and SteelBook editions do not arrive with the September digital launch. Here is what matters if you want a physical copy."
    >
      <section id="dates">
        <h2>When does the physical edition release?</h2>
        <p>
          CONTROL Resonant launches digitally on{" "}
          <strong>{displayDate(buyingFacts.digitalRelease)}</strong>. Remedy
          subsequently moved the PS5 and Xbox console physical release to{" "}
          <strong>{displayDate(buyingFacts.physicalRelease)}</strong>. That date
          applies to the announced Standard disc and SteelBook packages, not to
          the digital editions. Store delivery can occur after the street date.
        </p>
        <div
          className={styles.tableWrap}
          role="region"
          aria-label="Digital and physical release dates"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Version</th>
                <th scope="col">Format</th>
                <th scope="col">Published date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Standard and Digital Deluxe</th>
                <td>Digital</td>
                <td>{displayDate(buyingFacts.digitalRelease)}</td>
              </tr>
              <tr>
                <th scope="row">PS5 Digital Deluxe early access</th>
                <td>Digital</td>
                <td>From {displayDate(buyingFacts.ps5DeluxeEarlyAccess)}</td>
              </tr>
              <tr>
                <th scope="row">Standard and SteelBook on console</th>
                <td>Physical</td>
                <td>{displayDate(buyingFacts.physicalRelease)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="contents">
        <h2>What is inside the SteelBook Edition?</h2>
        <p>
          The physical distributor listings we checked include the game, an
          illustrated SteelBook case, three art prints, a key-art poster and an
          outer collector-style package. Check the exact regional retail listing
          before ordering: packaging descriptions and stock can differ.
        </p>
        <p>
          The SteelBook is a <strong>physical presentation package</strong>. It
          is not the same SKU as Digital Deluxe, so do not assume it grants the
          digital artbook, soundtrack, Wallet Artifact or PlayStation
          early-access entitlement. The SteelBook&apos;s October date also means
          it cannot provide September 22 early access through the disc.
        </p>
      </section>
      <section id="choose">
        <h2>Should you wait for the disc or buy digitally?</h2>
        <ul>
          <li>
            <strong>Play at launch:</strong> choose a September digital edition;
            PS5 Digital Deluxe is the specifically advertised early-access
            route.
          </li>
          <li>
            <strong>Keep a physical game copy:</strong> plan around October 15
            and check your console has a disc drive.
          </li>
          <li>
            <strong>Want the display case and prints:</strong> compare the
            SteelBook listing in your region; a Standard physical copy does not
            promise those extras.
          </li>
        </ul>
        <p>
          If we were choosing between them, we would first decide whether launch
          access or the physical package matters more. For digital pre-order
          bonuses and a complete edition comparison, use the{" "}
          <Link href="/game-info/release-date#editions">
            editions and pre-order guide
          </Link>
          . For regional unlock-time caveats, see the{" "}
          <Link href="/game-info/release-date">release schedule</Link>.
        </p>
      </section>
    </GameInfoArticle>
  );
}
