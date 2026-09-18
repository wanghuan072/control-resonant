import Link from "next/link";
import GameInfoArticle from "@/page/game-info/GameInfoArticle";
import { TrailerPoster } from "@/page/game-info/TrailerPoster";
import { gameInfoTopics } from "@/config/game-info-topics";
import { createMetadata } from "@/seo/metadata";
import { JsonLd } from "@/seo/JsonLd";
import { siteConfig } from "@/config/site";
import styles from "@/style/page/game-info/game-info-article.module.css";

const topic = gameInfoTopics[2];
const videos = [
  {
    id: "SqvAvOAd1VA",
    title: "CONTROL Resonant – Launch Trailer",
    date: "2026-09-17",
    poster: "/images/home/control-resonant-hero.jpg",
    summary:
      "Remedy's launch trailer brings Dylan, the Aberrant and the crisis across Manhattan together ahead of the September 24 digital release.",
    lookFor:
      "Watch for the tone, setting and range of on-screen encounters. Edited footage cannot establish a complete boss list, final Form balance or a mission route.",
    kind: "Official trailer",
    bestFor: "A short view of the game's premise and combat direction",
    limit: "Boss roster, encounter rewards or final balance",
  },
  {
    id: "jXvfZyfT7Ko",
    title: "CONTROL Resonant – PC Gaming Show Developer Documentary",
    date: "2026-09-16",
    poster: "/images/updates/developer-diaries.jpg",
    summary:
      "Remedy's extended PC Gaming Show documentary lets its developers explain the creative thinking behind Manhattan, the threats and the game's direction.",
    lookFor:
      "Use the interview to understand design intent. Developer commentary is not a finished-game map, boss strategy or confirmation of every encounter shown in the edit.",
    kind: "Developer documentary",
    bestFor: "World and encounter design context",
    limit: "Retail routes, exact boss mechanics or rewards",
  },
  {
    id: "RJTBoQhWaC0",
    title: "CONTROL Resonant – Official Gameplay Reveal",
    date: "2026-02-12",
    poster: "/images/gameplay/aberrant-hammer.jpg",
    summary:
      "Remedy's early gameplay reveal introduces Dylan's Aberrant, supernatural movement and gravity-altered Manhattan.",
    lookFor:
      "Start here for the combat and traversal direction. The edited reveal is not a final form list or a measured performance test.",
    kind: "Official trailer",
    bestFor: "Core combat and movement direction",
    limit: "Final Forms, damage or complete Zones",
  },
  {
    id: "JZuJlSGpgQo",
    title: "CONTROL Resonant – Story Trailer",
    date: "2026-06-02",
    poster: "/images/home/control-resonant-hero.jpg",
    summary:
      "The release-date reveal focuses on Dylan Faden, his missing sister Jesse and the paranatural crisis remaking Manhattan.",
    lookFor:
      "Use this for the story premise and confirmed launch date, not for a frame-by-frame demonstration of every playable system.",
    kind: "Official trailer",
    bestFor: "Dylan, Jesse, setting and release date",
    limit: "A complete walkthrough or combat balance",
  },
  {
    id: "lTHTfqPTQ1k",
    title: "CONTROL Resonant – Take CONTROL Trailer",
    date: "2026-06-07",
    poster: "/images/home/paranatural-manhattan.jpg",
    summary:
      "Remedy's PC Gaming Show trailer emphasizes Dylan using the Aberrant against the Hiss across a transformed Manhattan.",
    lookFor:
      "Use this for the game's combat direction and setting; a trailer cut does not establish final damage values or a complete mission route.",
    kind: "Official trailer",
    bestFor: "Aberrant action and Manhattan's threat",
    limit: "Final weapon damage, loot or mission order",
  },
  {
    id: "JfuY-NhK_tQ",
    title: "Metro Fault Mission Gameplay – IGN First",
    date: "2026-08-07",
    poster: "/images/gameplay/manhattan-melee.jpg",
    summary:
      "IGN's extended preview shows a specific distorted transit route and movement challenges connected with Reach.",
    lookFor:
      "Use this to recognize Metro Fault and the kind of traversal problem it presents. A media preview does not establish the full retail route, reward list or all Fault locations.",
    kind: "Media gameplay preview",
    bestFor: "One named activity and traversal context",
    limit: "All Faults, final rewards or full map",
  },
  {
    id: "M-vbbp4CzoA",
    title: "Central Resonant Boss Gameplay – IGN First",
    date: "2026-08-14",
    poster: "/images/bosses/resonant-fire.jpg",
    summary:
      "IGN's preview identifies the Central Resonant and shows a fiery encounter with lava-floor and magma hazards.",
    lookFor:
      "Use this to recognize the named encounter and its displayed hazards. Do not treat edited preview footage as every phase, a final weakness table or a guaranteed reward.",
    kind: "Media gameplay preview",
    bestFor: "One named boss and shown hazards",
    limit: "All phases, weaknesses or final reward",
  },
] as const;

export const metadata = createMetadata({
  ...topic,
  path: topic.href,
  type: "article",
  publishedAt: topic.updatedAt,
  image: "/images/home/control-resonant-hero.jpg",
});

export default function TrailersPage() {
  return (
    <GameInfoArticle
      topic={topic}
      image="/images/home/control-resonant-hero.jpg"
      lead="Choose a video by the question you have: the launch trailer for a quick look at the game, the developer documentary for design context, or longer previews for one named activity or boss. Playback loads only after you press play."
    >
      <JsonLd
        data={videos.map((video) => ({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: video.title,
          description: video.summary,
          uploadDate: video.date,
          thumbnailUrl: `${siteConfig.url}${video.poster}`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
        }))}
      />
      <section id="choose">
        <h2>Which CONTROL Resonant video answers your question?</h2>
        <div
          className={styles.tableWrap}
          role="region"
          aria-label="Official trailer comparison"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Video and type</th>
                <th scope="col">Best for</th>
                <th scope="col">Does not establish</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id}>
                  <th scope="row">
                    {video.title}
                    <small>{video.kind}</small>
                  </th>
                  <td>{video.bestFor}</td>
                  <td>{video.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {videos.map((video) => (
        <section id={video.id} key={video.id}>
          <h2>{video.title}</h2>
          <p>
            <strong>Published {video.date}.</strong> {video.summary}
          </p>
          <TrailerPoster
            id={video.id}
            title={video.title}
            poster={video.poster}
          />
          <p>{video.lookFor}</p>
        </section>
      ))}
      <section id="after-watching">
        <h2>What can you learn beyond the footage?</h2>
        <p>
          Edited trailers show direction, the documentary explains design
          intent, and the IGN footage shows specific preview encounters—not the
          whole game. For how the published weapon Forms and abilities fit
          together, read the{" "}
          <Link href="/gameplay">gameplay systems overview</Link>. For platforms
          and unlock timing, use the{" "}
          <Link href="/game-info#release-date">release guide</Link>. We will not
          turn unshown mission rewards or precise boss mechanics into trailer
          “facts.”
        </p>
      </section>
    </GameInfoArticle>
  );
}
