"use client";

import { useEffect, useState } from "react";
import styles from "@/style/page/home/home.module.css";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(releaseDate: string): TimeLeft {
  // This is a local calendar countdown, not a platform unlock-time claim.
  const remaining = Math.max(
    0,
    new Date(`${releaseDate}T00:00:00`).getTime() - Date.now(),
  );
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  };
}

export function ReleaseCountdown({ releaseDate }: { releaseDate: string }) {
  const [remaining, setRemaining] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getTimeLeft(releaseDate));
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, [releaseDate]);

  const reached =
    remaining?.days === 0 &&
    remaining.hours === 0 &&
    remaining.minutes === 0 &&
    remaining.seconds === 0;

  return (
    <div
      className={styles.countdown}
      aria-label="Calendar countdown to the announced digital release date"
    >
      <div className={styles.countdownHeader}>
        <span>Local calendar countdown</span>
        <strong>{reached ? "Release date reached" : "Until Sep 24"}</strong>
      </div>
      <div className={styles.countdownDigits} role="timer" aria-live="off">
        {(
          [
            ["Days", remaining?.days],
            ["Hours", remaining?.hours],
            ["Minutes", remaining?.minutes],
            ["Seconds", remaining?.seconds],
          ] as const
        ).map(([label, value]) => (
          <div key={label}>
            <strong>
              {value === undefined ? "--" : String(value).padStart(2, "0")}
            </strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p>
        Counts to the start of September 24 in your time zone—not to a confirmed
        store unlock time. Check your platform and region for availability.
      </p>
    </div>
  );
}
