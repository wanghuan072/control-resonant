import type { Metadata } from "next";
import {
  Archivo_Black,
  IBM_Plex_Sans,
  Roboto_Condensed,
} from "next/font/google";

import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { siteConfig } from "@/config/site";
import "@/style/globals.css";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

const headingFont = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "CONTROL Resonant Guide",
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [
    {
      name: siteConfig.editorialTeam.name,
      url: `${siteConfig.url}${siteConfig.editorialTeam.url}`,
    },
  ],
  creator: siteConfig.editorialTeam.name,
  publisher: siteConfig.editorialTeam.name,
  category: "video games",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        id="top"
        className={`${bodyFont.variable} ${displayFont.variable} ${headingFont.variable}`}
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <AppHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <AppFooter />
      </body>
    </html>
  );
}
