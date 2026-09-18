export const siteConfig = {
  name: "CONTROL Resonant Guide",
  shortName: "CONTROL Resonant",
  description:
    "A player-focused CONTROL Resonant guide to release timing, combat, characters, known enemies, Manhattan locations and mission types.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://controlresonant.org",
  email: "wyong@controlresonant.org",
  trailerUrl: "https://www.youtube-nocookie.com/embed/JZuJlSGpgQo",
  officialUrl: "https://controlgame.com/en",
  release: {
    digital: "September 24, 2026",
    physical: "October 15, 2026",
    mac: "Later in 2026",
  },
} as const;
