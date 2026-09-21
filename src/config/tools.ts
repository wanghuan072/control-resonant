export const tools = [
  {
    id: "pc-system-checker",
    title: "PC System Requirements Checker",
    listingTitle: "Can Your PC Run CONTROL Resonant?",
    description:
      "Compare your CPU, GPU, memory, storage and Windows version with the published minimum, recommended and 4K PC targets.",
    href: "/tools/pc-system-checker",
    image: "/images/guides/pc-system-requirements.jpg",
    imageAlt: "PC hardware used to check CONTROL Resonant system requirements",
    status: "Available now",
    updatedAt: "2026-09-21",
  },
] as const;

export type ToolEntry = (typeof tools)[number];
