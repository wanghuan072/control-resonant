import Link from "next/link";
import GameInfoArticle from "@/page/game-info/GameInfoArticle";
import { gameInfoTopics } from "@/config/game-info-topics";
import { createMetadata } from "@/seo/metadata";
import { buyingFacts, displayDate } from "@/config/buying";
import styles from "@/style/page/game-info/game-info-article.module.css";

const topic = gameInfoTopics.find(
  (item) => item.href === "/game-info/nvidia-rtx-bundle",
)!;
export const metadata = createMetadata({
  ...topic,
  path: topic.href,
  type: "article",
  publishedAt: topic.updatedAt,
  image: "/images/guides/pc-system-requirements.jpg",
});

export default function NvidiaBundlePage() {
  return (
    <GameInfoArticle
      topic={topic}
      image="/images/guides/pc-system-requirements.jpg"
      lead="The RTX 50 Series promotion is a hardware-purchase offer for a Steam copy of the game—not a bonus attached to every PC pre-order. The dates and eligibility rules matter more than the bundle headline."
    >
      <section id="answer">
        <h2>Does an RTX 50 purchase include CONTROL Resonant?</h2>
        <p>
          Only a qualifying GeForce RTX 50 Series GPU, desktop PC, or laptop
          bought through a participating partner during the promotion window can
          qualify. The game code is for <strong>Steam on PC</strong>. Merely
          owning an RTX 50 GPU, buying one before the offer began, or buying
          from a non-participating seller does not establish eligibility.
        </p>
        <div className={styles.callout}>
          <p>
            <strong>Key dates:</strong> qualifying purchases run from{" "}
            {displayDate(buyingFacts.rtxBundle.starts)} through{" "}
            {displayDate(buyingFacts.rtxBundle.ends)}. The code redemption
            period ends {displayDate(buyingFacts.rtxBundle.redeemBy)}. Codes are
            limited to one per customer and are subject to availability.
          </p>
        </div>
      </section>
      <section id="hardware">
        <h2>Eligible desktop GPUs and laptop GPUs</h2>
        <div
          className={styles.tableWrap}
          role="region"
          aria-label="RTX bundle hardware eligibility"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Purchase type</th>
                <th scope="col">Eligible GPU families named in the terms</th>
                <th scope="col">Important condition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Graphics card or desktop PC</th>
                <td>
                  GeForce {buyingFacts.rtxBundle.eligibleFamilies.join(", ")}
                </td>
                <td>Specific participating products and partners only</td>
              </tr>
              <tr>
                <th scope="row">Laptop</th>
                <td>
                  {buyingFacts.rtxBundle.eligibleFamilies.join(", ")} Laptop
                  GPUs
                </td>
                <td>The laptop must be a participating promotional model</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          GPU family alone is not a guarantee: partner product lists and local
          availability determine whether a specific purchase is included. This
          is a hardware promotion, separate from the game&apos;s Digital Deluxe
          and pre-order bonuses.
        </p>
      </section>
      <section id="redeem">
        <h2>How do you redeem the Steam game code?</h2>
        <ol>
          <li>
            Confirm that the exact product and seller advertise the CONTROL
            Resonant bundle for your region before paying.
          </li>
          <li>
            Keep the participating retailer&apos;s code or claim instructions
            and use the NVIDIA App on a PC with the qualifying GPU installed.
          </li>
          <li>
            Complete redemption by {displayDate(buyingFacts.rtxBundle.redeemBy)}
            . The promotion supplies a Steam game entitlement, not a PS5 or Xbox
            copy.
          </li>
        </ol>
        <p>
          NVIDIA&apos;s regional terms exclude some territories, including
          mainland China, Hong Kong, Macau, Russia, and several sanctioned
          regions. A local partner may have a narrower eligible product list. If
          you cannot confirm both the seller and your location, treat the bundle
          as unavailable for that purchase.
        </p>
      </section>
      <section id="decision">
        <h2>Bundle or regular PC edition: what changes?</h2>
        <p>
          The bundle is useful only if you were already buying eligible
          hardware. It is not a discount on every edition and does not include
          the Digital Deluxe extras by default. Compare those extras in the
          <Link href="/game-info/release-date#editions"> editions guide</Link>,
          and check whether your PC meets the game&apos;s
          <Link href="/game-info/system-requirements">
            {" "}
            published performance tiers
          </Link>
          before making a hardware decision.
        </p>
      </section>
    </GameInfoArticle>
  );
}
