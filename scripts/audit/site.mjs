import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const index = args.indexOf(name);
  return index < 0 ? fallback : args[index + 1];
};
const base = arg("--base", process.env.SITE_URL);
if (!base)
  throw new Error("Pass --base <running-url> or set SITE_URL before auditing.");
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
const retiredPaths = [
  "/guides/control-resonant-release-date-and-platforms",
  "/guides/control-resonant-gameplay-explained",
  "/guides/is-control-resonant-single-player-or-multiplayer",
  "/guides/control-resonant-steam-deck-support",
  "/guides/control-resonant-assist-mode-and-accessibility",
  "/guides/control-resonant-new-game-plus",
  "/guides/control-resonant-combat-abilities-and-aberrant-forms",
  "/guides/how-long-is-control-resonant",
  "/guides/control-resonant-characters-and-story",
  "/guides/control-resonant-pc-features-languages-and-controls",
  "/guides/control-resonant-beginners-guide",
  "/guides/control-resonant-metro-fault-and-reach",
  "/guides/control-resonant-central-resonant-boss",
  "/guides/control-resonant-difficulty-and-parry",
  "/guides/control-resonant-enemy-factions",
  "/guides/is-control-resonant-a-sequel",
  "/guides/should-you-play-control-first",
  "/guides/control-resonant-editions-and-pre-order-bonuses",
  "/guides/control-resonant-pc-system-requirements",
  "/guides/is-control-resonant-on-game-pass",
  "/guides/does-control-resonant-use-denuvo",
  "/guides/is-control-resonant-coming-to-switch-2",
  "/guides/control-resonant-artifacts-guide",
  "/guides/control-resonant-talents-and-progression-guide",
  "/guides/control-resonant-world-quests-and-exploration",
  "/game-info",
  "/database",
  "/locations",
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

try {
  const sitemap = await context.request.get(base + "/sitemap.xml");
  check(sitemap.ok(), "Sitemap unavailable");
  const xml = await sitemap.text();
  check(!xml.includes("sitemapindex"), "Sitemap must be a single sitemap.xml");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1]),
  );
  const paths = [...new Set(urls.map((url) => url.pathname))];
  check(
    paths.length === 55,
    `Sitemap must contain 55 routes, found ${paths.length}`,
  );
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
  const expectedOrigin = urls[0]?.origin;
  for (const route of retiredPaths)
    check(
      !paths.includes(route),
      `${route}: retired route must not appear in sitemap`,
    );
  for (const route of retiredPaths) {
    const response = await context.request.get(base + route, {
      maxRedirects: 0,
    });
    check(
      response.status() === 404,
      `${route}: retired route must return 404, received ${response.status()}`,
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
        homeHero: (() => {
          const image = document.querySelector("img[data-home-hero]");
          return image
            ? {
                src: image.getAttribute("src"),
                srcset: image.getAttribute("srcset"),
                fetchPriority: image.getAttribute("fetchpriority"),
                sizes: image.getAttribute("sizes"),
              }
            : null;
        })(),
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
    if (route === "/") {
      check(Boolean(result.homeHero), "Homepage: optimized hero image missing");
      check(
        result.homeHero?.src?.startsWith("/_next/image") &&
          Boolean(result.homeHero.srcset) &&
          result.homeHero.sizes === "100vw",
        "Homepage: hero must use the responsive Next image pipeline",
      );
      check(
        result.homeHero?.fetchPriority === "high",
        "Homepage: hero must have high fetch priority",
      );
    }
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
    const externalLinks = result.links.filter((href) =>
      /^https?:\/\//i.test(href ?? ""),
    );
    check(
      route === "/updates"
        ? externalLinks.length === 17
        : externalLinks.length === 0,
      route + ": unexpected external anchor count " + externalLinks.length,
    );
    for (const raw of result.schema) {
      try {
        const parsed = JSON.parse(raw);
        const nodes = Array.isArray(parsed) ? parsed : [parsed];
        for (const node of nodes) {
          if (node["@type"] === "Article") {
            check(
              node.headline === result.h1[0] ||
                result.h1[0]?.includes(node.headline) ||
                node.headline?.includes(result.h1[0]),
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
      if (url.pathname === "/search") continue;
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

  const search = await context.request.get(base + "/search?q=Reach");
  check(
    (await search.text()).includes('content="noindex, follow"'),
    "Search must be noindex, follow",
  );
  const missing = await context.request.get(base + "/guides/not-a-real-guide");
  check(missing.status() === 404, "Unknown guide must return 404");

  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  const missingPageResponse = await page.goto(
    base + "/guides/not-a-real-guide",
    { waitUntil: "networkidle" },
  );
  check(
    missingPageResponse?.status() === 404 &&
      (await page.getByLabel("Document details").count()) === 0 &&
      (await page
        .getByRole("navigation", { name: "Related legal pages" })
        .count()) === 0,
    "404 page stays in compact mode without legal document chrome",
  );
  await page.goto(base + "/", { waitUntil: "networkidle" });
  check(
    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Home", exact: true })
      .isVisible(),
    "Home is in the main navigation",
  );
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("button", { name: /Game Info/ })
    .hover();
  check(
    (await page
      .getByRole("navigation", { name: "Primary navigation" })
      .locator('a[href="/game-info/release-date"]')
      .count()) === 1 &&
      (await page
        .getByRole("navigation", { name: "Primary navigation" })
        .locator('a[href="/game-info/system-requirements"]')
        .count()) === 1,
    "Game Info dropdown exposes release date and system requirements",
  );
  for (const name of ["Map", "Tools"])
    check(
      await page
        .getByRole("navigation", { name: "Primary navigation" })
        .getByRole("link", { name, exact: true })
        .isVisible(),
      `${name} is in the main navigation`,
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
        name: /CONTROL Resonant.*Guides, Wiki.*Player Tools/i,
      })
      .isVisible(),
    "Homepage introduces the game and the player's next step",
  );
  check(
    (await page.getByLabel("Editorial byline").first().textContent())
      ?.replace(/\s+/g, " ")
      .trim() === "By Frontline Pathfinder · Updated September 2026",
    "Homepage shows the editorial author and month",
  );
  const authorLink = page
    .locator('a[href="/legal/about-us"]')
    .filter({ hasText: "Frontline Pathfinder" })
    .first();
  check(await authorLink.isVisible(), "Homepage author links to About Us");
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle" }),
    authorLink.click(),
  ]);
  check(
    await page
      .getByRole("heading", { name: "About Frontline Pathfinder" })
      .isVisible(),
    "Author link performs a document navigation to the editorial page",
  );
  check(
    await page.getByRole("heading", { name: "How we work" }).isVisible(),
    "About page explains the editorial method",
  );
  await page.goto(base + "/guides/getting-started", {
    waitUntil: "networkidle",
  });
  check(
    (await page.getByLabel("Editorial byline").first().textContent())
      ?.replace(/\s+/g, " ")
      .trim() === "By Frontline Pathfinder · Updated September 2026",
    "Guide detail shows the editorial author and month",
  );
  await page.goto(base + "/", { waitUntil: "networkidle" });
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
  check(
    await page
      .getByRole("heading", { name: "Is CONTROL Resonant Control 2?" })
      .isVisible(),
    "Homepage answers whether Resonant is the sequel",
  );
  await page
    .getByRole("link", { name: "Compare editions and platforms" })
    .click();
  await page.waitForURL("**/game-info/release-date");
  check(
    await page
      .getByRole("heading", {
        name: /CONTROL Resonant Release Date/i,
        level: 1,
      })
      .isVisible(),
    "Homepage release entry reaches the direct answer",
  );
  check(
    (await page
      .getByRole("region", { name: "CONTROL Resonant platform release dates" })
      .getByRole("row")
      .count()) === 6 &&
      (await page
        .getByRole("heading", { name: "Release date FAQ" })
        .isVisible()),
    "Release page includes the five-platform schedule",
  );
  check(
    (await page
      .getByRole("region", { name: "CONTROL Resonant edition comparison" })
      .getByRole("row")
      .count()) === 5 && (await page.locator("#edition-picker").count()) === 0,
    "Release page includes four editions without a duplicate selector",
  );
  await page.goto(base + "/game-info/system-requirements", {
    waitUntil: "networkidle",
  });
  check(
    (await page
      .getByRole("region", {
        name: "CONTROL Resonant minimum and recommended system requirements",
      })
      .getByRole("row")
      .count()) === 8 &&
      (await page.getByText("120 GB available / SSD required").count()) === 2,
    "System requirements page includes complete minimum and recommended rows",
  );
  check(
    (await page
      .getByRole("link", { name: /Open the system checker/ })
      .count()) === 1 &&
      (await page
        .getByRole("region", { name: "CONTROL Resonant Assist Mode settings" })
        .getByRole("row")
        .count()) === 6,
    "System requirements links the checker and includes Assist Mode controls",
  );
  await page.goto(base + "/updates", { waitUntil: "networkidle" });
  check(
    (await page
      .getByRole("link", { name: /Watch the launch trailer/ })
      .count()) === 1 &&
      (await page
        .getByRole("link", { name: /Watch the developer documentary/ })
        .count()) === 1,
    "Recent updates lead to the corresponding videos",
  );
  check(
    (await page.getByRole("link", { name: "Original source ↗" }).count()) ===
      17,
    "Every update exposes its original source",
  );
  const expectedUpdateLinks = [
    [
      "Inspect PS5 and PS5 Pro modes",
      "/game-info/system-requirements#console-modes",
    ],
    ["Review returning cast context", "/guides/getting-started#story-context"],
    ["Browse CONTROL Resonant characters", "/wiki/characters"],
    ["Plan Talent progression", "/guides/combat-builds#talents"],
    [
      "Compare physical release timing",
      "/game-info/physical-release-steelbook",
    ],
    [
      "Prepare for Central Resonant",
      "/guides/story-walkthrough#central-resonant",
    ],
    ["Open named Boss encounters", "/bosses"],
    ["Follow the Metro Fault route", "/guides/story-walkthrough#metro-fault"],
    ["Study the Metro Fault mission", "/wiki/missions/metro-fault"],
    ["Understand the Reach ability", "/wiki/combat/reach"],
    ["Confirm digital release timing", "/game-info/release-date"],
    ["Check New Game Plus rules", "/wiki/combat/new-game-plus"],
    ["Build around combat systems", "/guides/combat-builds"],
    ["Review launch platforms and dates", "/game-info/release-date"],
  ];
  for (const [name, href] of expectedUpdateLinks) {
    const link = page.getByRole("link", { name, exact: true });
    check(
      (await link.count()) === 1 && (await link.getAttribute("href")) === href,
      `Updates includes descriptive link "${name}" to ${href}`,
    );
  }
  for (const name of ["Updated guide →", "Read more →", "See more →"]) {
    check(
      (await page.getByRole("link", { name, exact: true }).count()) === 0,
      `Updates does not use generic anchor "${name}"`,
    );
  }

  const expectedBodyLinks = [
    ["/map", "explore the world location index", "/wiki/world"],
    ["/map", "compare mission and activity types", "/wiki/missions"],
    ["/bosses", "browse enemy factions and bosses", "/wiki/enemies"],
    ["/wiki/missions/metro-fault", "check the confirmed map index", "/map"],
  ];
  for (const [route, name, href] of expectedBodyLinks) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const link = page
      .getByRole("main")
      .getByRole("link", { name, exact: true });
    check(
      (await link.count()) === 1 && (await link.getAttribute("href")) === href,
      `${route} includes body link "${name}" to ${href}`,
    );
  }
  await page.goto(base + "/game-info/trailers", { waitUntil: "networkidle" });
  check((await page.locator("iframe").count()) === 0, "Video loads on demand");
  check(
    (await page.locator("#trailer-music li").count()) === 3 &&
      (await page.locator("#VwOJuJRCLGk").count()) === 1 &&
      (await page.locator("#NvncU_SQO5Y").count()) === 1,
    "Trailer music identifies three videos and their corresponding songs",
  );
  await page
    .getByRole("button", { name: "Play CONTROL Resonant – Launch Trailer" })
    .click();
  check(
    (await page.locator("iframe").count()) === 1,
    "Launch trailer can play",
  );
  await page.goto(base + "/wiki/enemies", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "known Boss encounters" }).click();
  await page.waitForURL("**/bosses");
  for (const label of [
    "Compare Combat Abilities",
    "Read about Zone progression",
    "Check New Game Plus carryover",
  ])
    check(
      await page.getByRole("link", { name: label }).isVisible(),
      `Bosses link missing: ${label}`,
    );
  await page.goto(base + "/map", { waitUntil: "networkidle" });
  check(
    (await page.locator("#confirmed-locations").count()) === 1 &&
      (await page
        .getByText("The in-game map exists; a verified route map does not")
        .count()) === 1,
    "Map clearly states its pre-release boundary and lists confirmed locations",
  );
  await page.goto(base + "/tools", { waitUntil: "networkidle" });
  check(
    (await page.locator("#system-checker").count()) === 0 &&
      (await page
        .getByRole("link", { name: "Open PC System Checker", exact: true })
        .count()) === 1,
    "Tools exposes a directory entry for the PC hardware checker",
  );
  await page.goto(base + "/tools/pc-system-checker", {
    waitUntil: "networkidle",
  });
  check(
    (await page.locator("#system-checker").count()) === 1 &&
      (await page
        .getByRole("region", { name: "PC component comparison" })
        .count()) === 1,
    "PC system checker detail exposes the complete hardware checker",
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
        .getByRole("heading", { name: new RegExp(`^${name}`) })
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
      .getByRole("heading", { name: /Dylan Faden/, level: 1 })
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
      .or(
        page.getByRole("region", {
          name: "Which choices change how a build plays?",
        }),
      )
      .getByText("Flurry")
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

  const legalPagesToAudit = [
    ["/legal/privacy-policy", "legal-privacy", "Privacy Policy"],
    ["/legal/terms-of-service", "legal-terms", "Terms of Service"],
    ["/legal/copyright", "legal-copyright", "Copyright"],
    ["/legal/about-us", "legal-about", "About Frontline Pathfinder"],
    ["/legal/contact-us", "legal-contact", "Contact Us"],
  ];
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const [route, , title] of legalPagesToAudit) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    check(
      await page.getByRole("heading", { name: title, level: 1 }).isVisible(),
      `${route}: legal H1 is visible`,
    );
    const legalState = await page.evaluate(() => {
      const articleSections = [
        ...document.querySelectorAll("main article > section[id]"),
      ];
      const ids = [...document.querySelectorAll("[id]")].map(
        (element) => element.id,
      );
      const tocTargets = [
        ...document.querySelectorAll('aside nav a[href^="#"]'),
      ].map((link) => link.getAttribute("href")?.slice(1));
      const bodySizes = [
        ...document.querySelectorAll("main article p, main article li"),
      ].map((element) => Number.parseFloat(getComputedStyle(element).fontSize));
      const auxiliarySizes = [
        ...document.querySelectorAll(
          "main aside a, main aside strong, main dt, main [aria-label='Document details']",
        ),
      ].map((element) => Number.parseFloat(getComputedStyle(element).fontSize));
      return {
        articleSections: articleSections.length,
        duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
        tocTargets,
        missingTocTargets: tocTargets.filter(
          (id) => !id || !document.getElementById(id),
        ),
        minBodySize: Math.min(...bodySizes),
        minAuxiliarySize: Math.min(...auxiliarySizes),
        relatedLinks: document.querySelectorAll(
          'nav[aria-label="Related legal pages"] a',
        ).length,
        meta: document
          .querySelector('[aria-label="Document details"]')
          ?.textContent?.replace(/\s+/g, " ")
          .trim(),
      };
    });
    check(
      legalState.articleSections >= 6,
      `${route}: legal page needs at least six substantive sections`,
    );
    check(
      !legalState.duplicateIds.length,
      `${route}: duplicate IDs ${legalState.duplicateIds.join(", ")}`,
    );
    check(
      legalState.tocTargets.length === legalState.articleSections &&
        !legalState.missingTocTargets.length,
      `${route}: contents links must match document sections`,
    );
    check(
      legalState.minBodySize >= 14,
      `${route}: body text is smaller than 14px`,
    );
    check(
      legalState.minAuxiliarySize >= 12,
      `${route}: auxiliary text is smaller than 12px`,
    );
    check(
      legalState.relatedLinks === 4,
      `${route}: related documents must link the other four pages`,
    );
    check(
      legalState.meta?.includes("Published by Frontline Pathfinder") &&
        legalState.meta?.includes("Effective September 2026") &&
        legalState.meta?.includes("Last updated September 2026"),
      `${route}: document author and dates are incomplete`,
    );
  }

  await page.goto(base + "/legal/privacy-policy", {
    waitUntil: "networkidle",
  });
  const firstContentsLink = page
    .getByRole("navigation", { name: "Privacy Policy contents" })
    .getByRole("link")
    .first();
  const firstContentsHref = await firstContentsLink.getAttribute("href");
  await firstContentsLink.click();
  check(
    page.url().endsWith(firstContentsHref),
    "Privacy contents link updates the URL fragment",
  );
  const navigationTimeOrigin = await page.evaluate(
    () => performance.timeOrigin,
  );
  const contactDocumentLink = page
    .getByRole("navigation", { name: "Related legal pages" })
    .getByRole("link", { name: "Contact Us" });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle" }),
    contactDocumentLink.click(),
  ]);
  check(
    page.url().endsWith("/legal/contact-us") &&
      (await page.evaluate(() => performance.timeOrigin)) !==
        navigationTimeOrigin,
    "Related legal link performs a full document navigation",
  );

  for (const [route, name] of [
    ["/", "home"],
    ["/guides", "guides"],
    ["/wiki", "wiki"],
    ["/wiki/combat", "wiki-combat"],
    ["/wiki/combat/aberrant-forms", "wiki-detail"],
    ["/game-info/release-date", "release-date"],
    ["/game-info/system-requirements", "system-requirements"],
    ["/tools", "tools"],
    ["/tools/pc-system-checker", "tool-detail"],
    ["/guides/combat-builds", "article"],
    ...legalPagesToAudit.map(([route, name]) => [route, name]),
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
      [
        "home",
        "guides",
        "wiki-combat",
        "wiki-detail",
        "release-date",
        "system-requirements",
        "tools",
        "tool-detail",
      ].includes(name) ||
      name.startsWith("legal-")
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
    ["/game-info/release-date", "release-date"],
    ["/game-info/system-requirements", "system-requirements"],
    ["/tools", "tools"],
    ["/tools/pc-system-checker", "tool-detail"],
    ["/guides/combat-builds", "article"],
    ...legalPagesToAudit.map(([route, name]) => [route, name]),
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
    if (
      [
        "home",
        "wiki-combat",
        "wiki-detail",
        "release-date",
        "system-requirements",
        "tools",
        "tool-detail",
      ].includes(name) ||
      name.startsWith("legal-")
    )
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
