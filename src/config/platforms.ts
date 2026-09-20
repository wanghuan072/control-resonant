export type PlatformStatus = "Launch" | "Later" | "Supported" | "Not announced";

export type PlatformEntry = {
  name: string;
  status: PlatformStatus;
  timing: string;
  access: string;
  playerValue: string;
  openQuestion: string;
};

export const platformEntries: PlatformEntry[] = [
  {
    name: "Windows PC",
    status: "Launch",
    timing: "September 24, 2026",
    access: "Steam or Epic Games Store purchase",
    playerValue: "Full PC graphics options, controller support and cloud saves",
    openQuestion:
      "Measured performance still depends on the final build and drivers.",
  },
  {
    name: "PlayStation 5 / PS5 Pro",
    status: "Launch",
    timing: "September 24, 2026",
    access: "Digital purchase; physical copies follow October 15",
    playerValue: "Published performance modes and DualSense features",
    openQuestion: "Regional unlock times and preload timing are not published.",
  },
  {
    name: "Xbox Series X|S and Xbox on PC",
    status: "Launch",
    timing: "September 24, 2026",
    access: "Digital purchase with Xbox Play Anywhere",
    playerValue:
      "One qualifying purchase, shared saves, add-ons and achievements",
    openQuestion:
      "No Xbox performance-mode chart or Game Pass inclusion is announced.",
  },
  {
    name: "GeForce NOW",
    status: "Launch",
    timing: "Launch support announced",
    access: "Cloud streaming through a supported connected store",
    playerValue:
      "Play a supported PC copy without rendering it on local hardware",
    openQuestion:
      "Store support, service plan and availability can vary by region.",
  },
  {
    name: "Steam Deck",
    status: "Supported",
    timing: "Launch support announced",
    access: "Steam purchase",
    playerValue: "Portable access to the PC version",
    openQuestion:
      "Valve badge, preset, frame rate and battery life need final-build testing.",
  },
  {
    name: "Mac",
    status: "Later",
    timing: "Later in 2026; no exact date",
    access: "Steam and Mac App Store plans announced",
    playerValue: "Native Mac release planned after the September launch",
    openQuestion:
      "Hardware requirements and an exact release date are not published.",
  },
  {
    name: "Nintendo Switch 2",
    status: "Not announced",
    timing: "No release window",
    access: "No official version or store listing",
    playerValue: "No purchase route to recommend",
    openQuestion:
      "PC requirements cannot be used to predict whether a port will happen.",
  },
];

export const platformFacts = {
  checkedAt: "2026-09-20",
  digitalRelease: "September 24, 2026",
  physicalRelease: "October 15, 2026",
  gamePass:
    "No Game Pass inclusion has been announced or shown in the launch information checked for this page.",
  playAnywhere:
    "Xbox Play Anywhere is confirmed at launch for a qualifying digital Xbox purchase, with saves, add-ons and achievements carried between Xbox console and Xbox on PC.",
  steamDeck:
    "Launch support is announced, but a final Valve compatibility badge and measured performance are separate questions.",
  switch2:
    "No Nintendo Switch 2 version has been announced. Hardware comparisons are not evidence that a port is planned.",
} as const;
