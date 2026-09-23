export type SharePlatformId = "x" | "facebook" | "reddit";

export type SharePlatform = {
  id: SharePlatformId;
  label: string;
  buildHref: (url: string, title: string) => string;
};

export const sharePlatforms: readonly SharePlatform[] = [
  {
    id: "x",
    label: "Share on X",
    buildHref: (url, title) =>
      `https://twitter.com/intent/tweet?${new URLSearchParams({ text: title, url })}`,
  },
  {
    id: "facebook",
    label: "Share on Facebook",
    buildHref: (url) =>
      `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({ u: url })}`,
  },
  {
    id: "reddit",
    label: "Share on Reddit",
    buildHref: (url, title) =>
      `https://www.reddit.com/submit?${new URLSearchParams({ url, title })}`,
  },
] as const;
