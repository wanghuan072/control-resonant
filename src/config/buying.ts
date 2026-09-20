const releaseDates = {
  digitalRelease: "2026-09-24",
  ps5DeluxeEarlyAccess: "2026-09-22",
  physicalRelease: "2026-10-15",
} as const;

export function displayDate(value: string, month: "short" | "long" = "long") {
  return new Intl.DateTimeFormat("en-US", {
    month,
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

export const buyingFacts = {
  ...releaseDates,
  priceCheckedAt: "2026-09-20",
  preorderBonuses: {
    shared: "Pickpocket's Tool Artifact and Hiss Corruption Outfit",
    playStation: "Occult Outfit",
  },
  editions: [
    {
      id: "standard-digital",
      name: "Standard",
      format: "Digital",
      extras: "Base game",
      timing: displayDate(releaseDates.digitalRelease),
      channels: "Steam, Epic Games Store, PS5, Xbox Series X|S",
      usListPrice: "$59.99",
    },
    {
      id: "deluxe-digital",
      name: "Digital Deluxe",
      format: "Digital",
      extras:
        "Digital artbook, soundtrack, AWE Mission Outfit, Wallet Untapped Artifact and starter resources",
      timing: `${displayDate(releaseDates.digitalRelease)}; PS5 listing advertises up to 48-hour early access from ${displayDate(releaseDates.ps5DeluxeEarlyAccess)}`,
      channels: "Steam, Epic Games Store, PS5, Xbox Series X|S",
      usListPrice: "$69.99",
    },
    {
      id: "standard-physical",
      name: "Standard",
      format: "Physical console",
      extras: "Base game",
      timing: displayDate(releaseDates.physicalRelease),
      channels: "PS5 and Xbox Series X|S retailers",
      usListPrice: "$59.99",
    },
    {
      id: "steelbook-physical",
      name: "SteelBook",
      format: "Physical console",
      extras: "SteelBook case, three prints and poster with the base game",
      timing: `${displayDate(releaseDates.physicalRelease)}; check the exact regional retail package`,
      channels: "PS5 and Xbox Series X|S retailers",
      usListPrice: "$69.99",
    },
  ],
  pc: {
    ramGb: 16,
    ssdGb: 120,
    os: "Windows 10 / 11 (64-bit)",
    technology:
      "DLSS 4.5 and FSR 4.1 are announced; ray and path tracing have separate hardware targets. Features depend on GPU support and the selected mode.",
    languages: {
      fullAudio:
        "English, French, Italian, German, Spanish (Spain), Japanese, Portuguese (Brazil), Simplified Chinese",
      textOnly:
        "Korean, Polish, Russian, Spanish (Latin America), Traditional Chinese, Turkish, Ukrainian",
    },
    tiers: [
      {
        id: "minimum",
        name: "Minimum",
        target: "1080p / 30fps",
        graphics: "Low, Quality upscaling; ray tracing off",
        cpus: ["Intel i5-8500", "AMD Ryzen 5 3500"],
        gpus: ["GTX 1070", "RX 5600 XT", "Arc A580"],
      },
      {
        id: "recommended",
        name: "Recommended",
        target: "1440p / 60fps",
        graphics: "Medium, Balanced upscaling; ray tracing off",
        cpus: ["Intel Core i7-10700", "AMD Ryzen 7 3700X"],
        gpus: ["RTX 3060 Ti", "RX 6700 XT", "Arc B580"],
      },
      {
        id: "enthusiast",
        name: "Enthusiast",
        target: "2160p / 60fps",
        graphics: "High, upscaling; ray tracing off",
        cpus: [],
        gpus: ["RTX 3080", "RX 6800 XT"],
      },
    ],
  },
  ps5Modes: [
    {
      console: "PS5",
      mode: "Performance",
      target: "1440p / 60fps",
      feature: "—",
      requires120Hz: false,
    },
    {
      console: "PS5",
      mode: "Quality",
      target: "2160p / 30fps",
      feature: "—",
      requires120Hz: false,
    },
    {
      console: "PS5 Pro",
      mode: "Performance",
      target: "2160p / 60fps",
      feature: "PSSR",
      requires120Hz: false,
    },
    {
      console: "PS5 Pro",
      mode: "Quality",
      target: "2160p / 30fps",
      feature: "Ray tracing + PSSR",
      requires120Hz: false,
    },
    {
      console: "PS5 Pro",
      mode: "Balanced",
      target: "2160p / 40fps",
      feature: "Ray tracing + PSSR; 120Hz display",
      requires120Hz: true,
    },
  ],
  rtxBundle: {
    starts: "2026-08-25",
    ends: "2026-09-29",
    redeemBy: "2026-10-27",
    eligibleFamilies: ["RTX 5070", "RTX 5070 Ti", "RTX 5080", "RTX 5090"],
  },
} as const;
