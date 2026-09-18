"use client";
import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import type { Guide } from "@/types/guide";
import styles from "@/style/content/video-reference.module.css";

export function VideoReference({
  video,
}: {
  video: NonNullable<Guide["video"]>;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={styles.video}>
      {loaded ? (
        <iframe
          title={video.title}
          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setLoaded(true)}>
          <Play size={30} aria-hidden="true" />
          <span>
            Play video
            <small>
              {video.publisher} · {video.date}
            </small>
          </span>
        </button>
      )}
      <p>{video.note}</p>
      <div>
        <span>
          Loading connects to YouTube. Playback may be region-restricted.
        </span>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noreferrer"
        >
          Open original video <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
