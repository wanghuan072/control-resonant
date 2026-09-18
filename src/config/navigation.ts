export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "Game Info", href: "/game-info" },
  { label: "Gameplay", href: "/gameplay" },
  { label: "Guides", href: "/guides" },
  { label: "Wiki", href: "/wiki" },
  { label: "Locations", href: "/locations" },
  { label: "Updates", href: "/updates" },
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
