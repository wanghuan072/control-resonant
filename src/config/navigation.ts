export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "Game Info", href: "/game-info", menuOnly: true },
  { label: "Gameplay", href: "/gameplay" },
  { label: "Guides", href: "/guides" },
  { label: "Wiki", href: "/wiki" },
  { label: "Map", href: "/map" },
  { label: "Tools", href: "/tools" },
  { label: "Updates", href: "/updates" },
] as const;

export const gameInfoNavigation = [
  {
    label: "Release Date",
    href: "/game-info/release-date",
    description: "Dates, platforms and edition timing",
  },
  {
    label: "System Requirements",
    href: "/game-info/system-requirements",
    description: "PC specs and PlayStation modes",
  },
] as const;

export const databaseNavigation = [
  { label: "Characters", href: "/wiki/characters" },
  { label: "Combat & Skills", href: "/wiki/combat" },
  { label: "Enemies & Bosses", href: "/wiki/enemies" },
  { label: "World & Locations", href: "/wiki/world" },
  { label: "Missions & Activities", href: "/wiki/missions" },
] as const;

export const legalNavigation = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Copyright", href: "/legal/copyright" },
  { label: "About Us", href: "/legal/about-us" },
  { label: "Contact Us", href: "/legal/contact-us" },
] as const;
