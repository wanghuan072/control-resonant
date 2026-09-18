import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/database", destination: "/wiki", permanent: true },
      { source: "/map", destination: "/locations", permanent: true },
      { source: "/tracker", destination: "/wiki", permanent: true },
      {
        source: "/builds",
        destination: "/guides/combat-builds",
        permanent: true,
      },
      {
        source: "/walkthrough",
        destination: "/guides/story-walkthrough",
        permanent: true,
      },
      { source: "/sources", destination: "/legal/about-us", permanent: true },
      { source: "/about", destination: "/legal/about-us", permanent: true },
      { source: "/contact", destination: "/legal/contact-us", permanent: true },
      {
        source: "/privacy-policy",
        destination: "/legal/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/legal/terms-of-service",
        permanent: true,
      },
      {
        source: "/characters",
        destination: "/wiki/characters",
        permanent: true,
      },
      { source: "/lore", destination: "/wiki/world", permanent: true },
      { source: "/abilities", destination: "/wiki/combat", permanent: true },
      {
        source: "/aberrant-forms",
        destination: "/wiki/combat",
        permanent: true,
      },
      { source: "/talents", destination: "/wiki/combat", permanent: true },
      { source: "/artifacts", destination: "/wiki/combat", permanent: true },
      { source: "/items", destination: "/wiki/combat", permanent: true },
      { source: "/enemies", destination: "/wiki/enemies", permanent: true },
      { source: "/missions", destination: "/wiki/missions", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
