export type GameplayTocItem = { id: string; label: string };
export type GameplayTocGroup = {
  label: string;
  items: readonly GameplayTocItem[];
};

export const gameplayTocGroups: readonly GameplayTocGroup[] = [
  {
    label: "Start here",
    items: [
      { id: "dylan", label: "Play as Dylan" },
      { id: "combat-loop", label: "Combat loop" },
    ],
  },
  {
    label: "Build systems",
    items: [
      { id: "forms", label: "Aberrant Forms" },
      { id: "abilities", label: "Combat Abilities" },
      { id: "progression", label: "Talents & Artifacts" },
    ],
  },
  {
    label: "Fight and explore",
    items: [
      { id: "boss-encounters", label: "Boss encounters" },
      { id: "combat-problems", label: "Combat problems" },
      { id: "traversal", label: "Traversal" },
      { id: "assist-mode", label: "Assist Mode" },
    ],
  },
];

export const gameplayDestinations = [
  {
    title: "Aberrant Forms",
    href: "/wiki/combat/aberrant-forms",
    detail: "Primary, Secondary and Combo Ender roles",
  },
  {
    title: "Combat Abilities",
    href: "/wiki/combat/combat-abilities",
    detail: "Boss-earned powers and the shown opening choice",
  },
  {
    title: "Artifacts",
    href: "/wiki/combat/artifacts",
    detail: "Passive modifiers, crafting and NG+ slots",
  },
  {
    title: "Combat & Builds guide",
    href: "/guides/combat-builds",
    detail: "A decision route for putting the systems together",
  },
] as const;
