"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { useState } from "react";
import styles from "@/style/page/game-info/trailer-poster.module.css";

export function TrailerPoster({
  id,
  title,
  poster,
}: {
  id: string;
  title: string;
  poster: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={styles.stage}>
      {playing ? (
        <>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
          <button
            className={styles.close}
            onClick={() => setPlaying(false)}
            aria-label={`Close ${title}`}
            type="button"
          >
            <X size={18} />
          </button>
        </>
      ) : (
        <>
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width:820px) 100vw, 60vw"
          />
          <button
            className={styles.play}
            onClick={() => setPlaying(true)}
            type="button"
            aria-label={`Play ${title}`}
          >
            <Play size={22} fill="currentColor" /> Play trailer
          </button>
        </>
      )}
    </div>
  );
}
