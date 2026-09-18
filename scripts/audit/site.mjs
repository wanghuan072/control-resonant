import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const index = args.indexOf(name);
  return index < 0 ? fallback : args[index + 1];
};
const base = arg("--base", "http://localhost:3001");
const playwright = require(arg("--playwright", "playwright"));
const output = path.resolve(".next/seo-audit");
fs.mkdirSync(output, { recursive: true });

const chromePath = arg("--chrome", undefined);
const browser = await playwright.chromium.launch({
  headless: true,
  ...(chromePath ? { executablePath: chromePath } : { channel: "chrome" }),
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
const warnings = [];
const reports = [];
const check = (ok, message) => {
  if (!ok) errors.push(message);
};

try {
  const sitemap = await context.request.get(base + "/sitemap.xml");
  check(sitemap.ok(), "Sitemap unavailable");
  const xml = await sitemap.text();
  check(!xml.includes("sitemapindex"), "Sitemap must be a single sitemap.xml");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1]),
  );
  const paths = [...new Set(urls.map((url) => url.pathname))];
  const publishedGuides = [
    "/guides/getting-started",
    "/guides/combat-builds",
    "/guides/story-walkthrough",
    "/guides/completion",
  ];
  check(
    paths.filter((route) => route.startsWith("/guides/")).length === 4 &&
      publishedGuides.every((route) => paths.includes(route)),
    "Sitemap must contain exactly the four long-form guides",
  );
  const legacyGuides = [
    "guides.json",
    "expanded-guides.json",
    "field-guides.json",
    "system-guides.json",
  ].flatMap((file) =>
    JSON.parse(fs.readFileSync(path.resolve("src/data/guides", file), "utf8")),
  );
  const expectedOrigin = urls[0]?.origin;
  const redirectedPaths = [
    ...legacyGuides.map((guide) => `/guides/${guide.slug}`),
    "/database",
    "/map",
    "/tracker",
    "/builds",
    "/walkthrough",
    "/sources",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/characters",
    "/lore",
    "/abilities",
    "/aberrant-forms",
    "/talents",
    "/artifacts",
    "/items",
    "/enemies",
    "/missions",
  ];
  for (const route of redirectedPaths)
    check(
      !paths.includes(route),
      `${route}: redirect must not appear in sitemap`,
    );
  for (const guide of legacyGuides) {
    const response = await context.request.get(base + `/guides/${guide.slug}`, {
      maxRedirects: 0,
    });
    check(
      response.status() === 308,
      `${guide.slug}: expected permanent redirect`,
    );
    const target = response.headers().location?.split("#")[0];
    check(
      target === "/game-info" || publishedGuides.includes(target),
      `${guide.slug}: redirect target must be a consolidated page`,
    );
  }

  const docs = new Map();
  for (const route of paths) {
    const response = await context.request.get(base + route);
    check(response.status() === 200, route + ": HTTP " + response.status());
    const html = await response.text();
    const result = await page.evaluate((markup) => {
      const document = new DOMParser().parseFromString(markup, "text/html");
      const attr = (selector, name) =>
        document.querySelector(selector)?.getAttribute(name);
      return {
        title: document.querySelector("title")?.textContent,
        description: attr('meta[name="description"]', "content"),
        keywords: attr('meta[name="keywords"]', "content"),
        canonical: attr('link[rel="canonical"]', "href"),
        ogImage: attr('meta[property="og:image"]', "content"),
        twitterImage: attr('meta[name="twitter:image"]', "content"),
        robots: attr('meta[name="robots"]', "content"),
        h1: [...document.querySelectorAll("h1")].map(
          (element) => element.textContent,
        ),
        headings: [
          ...document.querySelectorAll("main h1,main h2,main h3,main h4"),
        ].map((element) => ({
          level: Number(element.tagName.slice(1)),
          text: element.textContent,
        })),
        main: document.querySelectorAll("main").length,
        links: [...document.querySelectorAll("a[href]")].map((element) =>
          element.getAttribute("href"),
        ),
        images: [...document.querySelectorAll("img")].map((element) => ({
          src: element.getAttribute("src"),
          alt: element.getAttribute("alt"),
        })),
        ids: [...document.querySelectorAll("[id]")].map(
          (element) => element.id,
        ),
        schema: [
          ...document.querySelectorAll('script[type="application/ld+json"]'),
        ].map((element) => element.textContent),
      };
    }, html);
    docs.set(route, result);
    check(
      result.h1.length === 1,
      route + ": expected one H1, found " + result.h1.length,
    );
    check(result.main === 1, route + ": expected one main landmark");
    check(Boolean(result.title?.trim()), route + ": missing title");
    check(Boolean(result.description?.trim()), route + ": missing description");
    check(
      result.title?.length >= 40 && result.title.length <= 60,
      route + ": title must be 40–60 characters",
    );
    check(
      result.description?.length >= 140 && result.description.length <= 160,
      route + ": description must be 140–160 characters",
    );
    check(Boolean(result.keywords), route + ": missing keyword metadata");
    check(
      result.canonical === expectedOrigin + (route === "/" ? "" : route),
      route + ": canonical mismatch " + result.canonical,
    );
    check(
      result.ogImage === expectedOrigin + "/images/og-image.png" &&
        result.twitterImage === expectedOrigin + "/images/og-image.png",
      route + ": social image mismatch",
    );
    check(
      !result.robots?.includes("noindex"),
      route + ": indexable route marked noindex",
    );
    let level = 0;
    for (const heading of result.headings) {
      check(
        heading.level <= level + 1,
        route + ": heading level skipped before " + heading.text,
      );
      level = heading.level;
    }
    check(
      new Set(result.ids).size === result.ids.length,
      route + ": duplicate IDs",
    );
    check(
      result.images.every((image) => image.alt !== null),
      route + ": image missing alt attribute",
    );
    check(
      result.links.every((href) => !href || !/^https?:\/\//i.test(href)),
      route + ": public page contains an external anchor",
    );
    for (const raw of result.schema) {
      try {
        const parsed = JSON.parse(raw);
        const nodes = Array.isArray(parsed) ? parsed : [parsed];
        for (const node of nodes) {
          if (node["@type"] === "Article") {
            check(
              node.headline === result.h1[0],
              route + ": Article headline mismatch",
            );
            check(
              node.mainEntityOfPage?.["@id"] === result.canonical,
              route + ": Article canonical mismatch",
            );
          }
          if (node["@type"] === "CollectionPage")
            for (const item of node.mainEntity.itemListElement) {
              const url = new URL(item.url);
              const href =
                url.origin === expectedOrigin
                  ? url.pathname + url.hash
                  : item.url;
              check(
                result.links.some((link) => {
                  const target = new URL(link, base + route);
                  return target.origin === base
                    ? target.pathname + target.hash === href
                    : target.href === item.url;
                }),
                route + ": structured list item not visibly linked " + href,
              );
            }
        }
      } catch (error) {
        errors.push(route + ": malformed JSON-LD " + error.message);
      }
    }
    if (result.title.length > 70)
      warnings.push(route + ": title longer than 70 characters");
    reports.push({
      route,
      title: result.title,
      description: result.description,
      h1: result.h1[0],
      headingCount: result.headings.length,
      images: result.images.length,
      schema: result.schema.length,
    });
  }

  const titles = new Map();
  const descriptions = new Map();
  for (const [route, document] of docs) {
    check(
      !titles.has(document.title),
      "Duplicate title: " + route + " and " + titles.get(document.title),
    );
    titles.set(document.title, route);
    check(
      !descriptions.has(document.description),
      "Duplicate description: " +
        route +
        " and " +
        descriptions.get(document.description),
    );
    descriptions.set(document.description, route);
    for (const href of document.links) {
      if (!href?.startsWith("/") && !href?.startsWith("#")) continue;
      const url = new URL(href, base + route);
      check(
        url.pathname !== "/map",
        route + ": link promises a map that is not published",
      );
      if (url.pathname === "/search" || redirectedPaths.includes(url.pathname))
        continue;
      const target = docs.get(url.pathname);
      check(
        Boolean(target),
        route + ": link absent from route inventory " + href,
      );
      if (target && url.hash)
        check(
          target.ids.includes(decodeURIComponent(url.hash.slice(1))),
          route + ": missing target anchor " + href,
        );
    }
  }

  for (const [source, destination] of [
    ["/database", "/wiki"],
    ["/map", "/locations"],
    ["/tracker", "/wiki"],
    ["/builds", "/guides/combat-builds"],
    ["/walkthrough", "/guides/story-walkthrough"],
    ["/sources", "/legal/about-us"],
    ["/about", "/legal/about-us"],
    ["/contact", "/legal/contact-us"],
    ["/privacy-policy", "/legal/privacy-policy"],
    ["/terms", "/legal/terms-of-service"],
    ["/characters", "/wiki/characters"],
    ["/lore", "/wiki/world"],
    ["/abilities", "/wiki/combat"],
    ["/aberrant-forms", "/wiki/combat"],
    ["/talents", "/wiki/combat"],
    ["/artifacts", "/wiki/combat"],
    ["/items", "/wiki/combat"],
    ["/enemies", "/wiki/enemies"],
    ["/missions", "/wiki/missions"],
  ]) {
    const response = await context.request.get(base + source, {
      maxRedirects: 0,
    });
    check(
      [307, 308].includes(response.status()),
      `${source}: expected permanent redirect`,
    );
    check(
      response.headers().location?.endsWith(destination),
      `${source}: redirect destination`,
    );
  }

  const search = await context.request.get(base + "/search?q=Reach");
  check(
    (await search.text()).includes('content="noindex, follow"'),
    "Search must be noindex, follow",
  );
  const missing = await context.request.get(base + "/guides/not-a-real-guide");
  check(missing.status() === 404, "Unknown guide must return 404");

  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await page.goto(base + "/", { waitUntil: "networkidle" });
  check(
    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Home", exact: true })
      .isVisible(),
    "Home is in the main navigation",
  );
  check(
    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Locations", exact: true })
      .isVisible(),
    "Locations is in the main navigation",
  );
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Locations", exact: true })
    .click();
  await page.waitForURL("**/locations");
  check(
    new URL(page.url()).pathname === "/locations",
    "Locations navigation keeps its own URL",
  );
  await page.goto(base + "/", { waitUntil: "networkidle" });
  check(
    (await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "My Case" })
      .count()) === 0,
    "Retired notebook is absent from main navigation",
  );
  check(
    await page
      .getByRole("heading", {
        name: /CONTROL Resonant.*Know the game.*Find your way/i,
      })
      .isVisible(),
    "Homepage introduces the game and the player's next step",
  );
  check(
    (await page
      .locator('nav[aria-label="When and where can I play?"]')
      .count()) === 1 &&
      (await page
        .locator('nav[aria-label="How does combat work?"]')
        .count()) === 1 &&
      (await page.locator('nav[aria-label="Who is involved?"]').count()) ===
        1 &&
      (await page.locator('nav[aria-label="Where do I go?"]').count()) === 1,
    "Homepage has four distinct player-question routes",
  );
  check(
    (await page.getByText("Keep notes in My Case").count()) === 0,
    "Homepage does not promote the retired notebook",
  );
  check(
    (await page.locator("iframe").count()) === 0 &&
      (await page
        .getByRole("button", { name: "Watch official story trailer" })
        .count()) === 0,
    "Homepage hero does not contain a video",
  );
  check(
    (await page
      .getByRole("complementary", {
        name: "CONTROL Resonant release information",
      })
      .isVisible()) && (await page.getByRole("timer").isVisible()),
    "Homepage displays release facts and calendar countdown",
  );
  check(
    (await page.getByRole("timer").textContent())?.includes("--") === false,
    "Countdown hydrates into a current value",
  );

  await page.goto(base + "/guides", { waitUntil: "networkidle" });
  for (const name of [
    "Getting Started",
    "Combat & Builds",
    "Story & Missions",
    "Completion Planning",
  ])
    check(
      await page
        .getByRole("heading", { name, exact: true })
        .first()
        .isVisible(),
      `Guide pillar missing: ${name}`,
    );

  await page.goto(base + "/wiki", { waitUntil: "networkidle" });
  for (const name of [
    "Characters",
    "Combat & Skills",
    "Enemies & Bosses",
    "World & Locations",
    "Missions & Activities",
  ])
    check(
      await page.getByRole("heading", { name, exact: true }).isVisible(),
      `Wiki field missing: ${name}`,
    );

  await page.goto(base + "/wiki/characters", { waitUntil: "networkidle" });
  await page.getByPlaceholder("Search characters…").fill("Dylan");
  const dylanResult = page
    .getByRole("region", { name: "characters topics" })
    .getByRole("link", { name: /Dylan Faden/ });
  check(
    await dylanResult.isVisible(),
    "Wiki group search reveals Dylan detail",
  );
  await dylanResult.click();
  await page.waitForURL("**/wiki/characters/dylan-faden");
  check(
    await page
      .getByRole("heading", { name: "Dylan Faden", exact: true })
      .isVisible(),
    "Wiki detail opens from fielded list",
  );
  await page.goto(base + "/wiki/combat", { waitUntil: "networkidle" });
  check(
    await page
      .getByRole("link", { name: /Aberrant Forms/ })
      .first()
      .isVisible(),
    "Wiki comparison links to a substantive file",
  );
  check(
    await page
      .getByRole("region", { name: "What actually changes a build?" })
      .getByText("Aberrant Forms")
      .isVisible(),
    "Combat list includes differentiated system comparison",
  );
  await page.getByPlaceholder("Search combat…").fill("Artifacts and Crafting");
  await page
    .getByRole("region", { name: "combat topics" })
    .getByRole("link", { name: /Artifacts and Crafting/ })
    .click();
  await page.waitForURL("**/wiki/combat/artifacts");
  check(
    await page
      .getByRole("region", { name: "Do not confuse these states" })
      .getByText("Untapped Artifact", { exact: true })
      .isVisible(),
    "New Wiki detail provides a field comparison",
  );

  for (const [route, name] of [
    ["/", "home"],
    ["/guides", "guides"],
    ["/wiki", "wiki"],
    ["/wiki/combat", "wiki-combat"],
    ["/wiki/combat/aberrant-forms", "wiki-detail"],
    ["/game-info", "game-info"],
    ["/guides/combat-builds", "article"],
  ]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        [...document.images].map(async (image) => {
          image.loading = "eager";
          try {
            await image.decode();
          } catch {}
        }),
      );
    });
    const dimensions = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      broken: [...document.images]
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.currentSrc),
    }));
    check(dimensions.scroll <= dimensions.width, route + ": desktop overflow");
    check(
      !dimensions.broken.length,
      route + ": broken images " + dimensions.broken.join(", "),
    );
    if (
      ["home", "guides", "wiki-combat", "wiki-detail", "game-info"].includes(
        name,
      )
    )
      await page.screenshot({
        path: path.join(output, name + "-desktop.png"),
        fullPage: true,
      });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route, name] of [
    ["/", "home"],
    ["/guides", "guides"],
    ["/wiki", "wiki"],
    ["/wiki/combat", "wiki-combat"],
    ["/wiki/combat/aberrant-forms", "wiki-detail"],
    ["/game-info", "game-info"],
    ["/guides/combat-builds", "article"],
  ]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await Promise.all(
        [...document.images].map(async (image) => {
          image.loading = "eager";
          try {
            await image.decode();
          } catch {}
        }),
      );
    });
    const dimensions = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      broken: [...document.images].filter((image) => image.naturalWidth === 0)
        .length,
    }));
    check(
      dimensions.scroll <= dimensions.width,
      route + ": mobile horizontal overflow " + dimensions.scroll,
    );
    check(!dimensions.broken, route + ": mobile image load");
    if (["home", "wiki-combat", "wiki-detail", "game-info"].includes(name))
      await page.screenshot({
        path: path.join(output, name + "-mobile.png"),
        fullPage: true,
      });
  }
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  check(
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Wiki", exact: true })
      .isVisible(),
    "Mobile menu opens with Wiki",
  );
  check(
    !runtimeErrors.length,
    "Browser runtime errors: " + runtimeErrors.join(" | "),
  );

  const report = {
    checkedAt: new Date().toISOString(),
    base,
    routes: reports.length,
    errors,
    warnings,
    pages: reports,
  };
  fs.writeFileSync(
    path.join(output, "report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify(
      { routes: reports.length, errors, warnings, output },
      null,
      2,
    ),
  );
  process.exitCode = errors.length ? 1 : 0;
} finally {
  await browser.close();
}
