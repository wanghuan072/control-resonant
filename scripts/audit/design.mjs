import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] ?? "playwright");
const browser = await chromium.launch({
  headless: true,
  ...(process.argv[3]
    ? { executablePath: process.argv[3] }
    : { channel: "chrome" }),
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
fs.mkdirSync(".next/design-review", { recursive: true });
for (const [route, name] of [
  ["/", "home"],
  ["/guides/control-resonant-talents-and-progression-guide", "article"],
  ["/guides", "guides"],
  ["/game-info", "game-info"],
  ["/wiki", "wiki"],
]) {
  await page.goto("http://localhost:3001" + route, {
    waitUntil: "networkidle",
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map(async (i) => {
        i.loading = "eager";
        try {
          await i.decode();
        } catch {}
      }),
    );
  });
  await page.screenshot({
    path: ".next/design-review/" + name + "-desktop.png",
    fullPage: true,
  });
  await page.screenshot({ path: ".next/design-review/" + name + "-cover.png" });
  console.log(
    name,
    await page.evaluate(() => ({
      viewport: innerWidth,
      width: document.documentElement.scrollWidth,
      h1: document.querySelector("h1").innerText,
    })),
  );
}
await page.setViewportSize({ width: 390, height: 844 });
for (const [route, name] of [
  ["/", "home"],
  ["/guides/control-resonant-talents-and-progression-guide", "article"],
  ["/guides", "guides"],
  ["/game-info", "game-info"],
  ["/wiki", "wiki"],
]) {
  await page.goto("http://localhost:3001" + route, {
    waitUntil: "networkidle",
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map(async (i) => {
        i.loading = "eager";
        try {
          await i.decode();
        } catch {}
      }),
    );
  });
  await page.screenshot({
    path: ".next/design-review/" + name + "-mobile.png",
    fullPage: true,
  });
  await page.screenshot({
    path: ".next/design-review/" + name + "-mobile-cover.png",
  });
  console.log(
    name,
    await page.evaluate(() => ({
      viewport: innerWidth,
      width: document.documentElement.scrollWidth,
    })),
  );
}
for (const width of [320, 768, 1024]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const route of [
    "/",
    "/guides",
    "/wiki",
    "/game-info",
    "/guides/control-resonant-talents-and-progression-guide",
  ]) {
    await page.goto("http://localhost:3001" + route, {
      waitUntil: "networkidle",
    });
    const clipped = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      headings: [...document.querySelectorAll("h1,h2,h3")]
        .filter((h) => {
          const r = h.getBoundingClientRect();
          return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1);
        })
        .map((h) => h.textContent),
    }));
    if (clipped.overflow || clipped.headings.length)
      throw new Error(JSON.stringify({ width, route, ...clipped }));
  }
  console.log("Responsive layout checks passed:", width);
}
await browser.close();
