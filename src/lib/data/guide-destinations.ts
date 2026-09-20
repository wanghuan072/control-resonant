/** Permanent destinations for the former short-form guide URLs. */
export const legacyGuideDestinations: Record<string, string> = {
  "control-resonant-release-date-and-platforms": "/game-info/release-date",
  "control-resonant-gameplay-explained": "/guides/getting-started#core-loop",
  "is-control-resonant-single-player-or-multiplayer":
    "/guides/getting-started#what-kind-of-game",
  "control-resonant-steam-deck-support":
    "/game-info/system-requirements#compatibility",
  "control-resonant-assist-mode-and-accessibility":
    "/guides/getting-started#assist-mode",
  "control-resonant-new-game-plus": "/guides/combat-builds#new-game-plus",
  "control-resonant-combat-abilities-and-aberrant-forms":
    "/guides/combat-builds#aberrant-forms",
  "how-long-is-control-resonant": "/guides/story-walkthrough#playtime",
  "control-resonant-characters-and-story":
    "/guides/getting-started#story-context",
  "control-resonant-pc-features-languages-and-controls":
    "/game-info/system-requirements",
  "control-resonant-beginners-guide": "/guides/getting-started#first-session",
  "control-resonant-metro-fault-and-reach":
    "/guides/story-walkthrough#metro-fault",
  "control-resonant-central-resonant-boss":
    "/guides/story-walkthrough#central-resonant",
  "control-resonant-difficulty-and-parry":
    "/guides/combat-builds#dodge-and-assist",
  "control-resonant-enemy-factions": "/guides/combat-builds#enemy-reading",
  "is-control-resonant-a-sequel": "/guides/getting-started#what-kind-of-game",
  "should-you-play-control-first": "/guides/getting-started#story-context",
  "control-resonant-editions-and-pre-order-bonuses":
    "/game-info/release-date#editions",
  "control-resonant-pc-system-requirements": "/game-info/system-requirements",
  "is-control-resonant-on-game-pass": "/game-info/release-date#platforms",
  "does-control-resonant-use-denuvo":
    "/game-info/system-requirements#compatibility",
  "is-control-resonant-coming-to-switch-2": "/game-info/release-date#platforms",
  "control-resonant-artifacts-guide": "/guides/combat-builds#artifacts",
  "control-resonant-talents-and-progression-guide":
    "/guides/combat-builds#talents",
  "control-resonant-world-quests-and-exploration":
    "/guides/story-walkthrough#quest-types",
};

export function guideDestination(slug: string): string {
  return legacyGuideDestinations[slug] ?? "/guides";
}
