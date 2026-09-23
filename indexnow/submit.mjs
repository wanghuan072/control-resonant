import { createHash } from "node:crypto";

import { indexNowConfig, indexNowKeyPath } from "./config.mjs";

const args = parseArguments(process.argv.slice(2));
const currentOrigin = normalizeOrigin(
  args.get("current-origin") ?? indexNowConfig.canonicalOrigin,
);
const previousOrigin = args.has("previous-origin")
  ? normalizeOrigin(args.get("previous-origin"))
  : undefined;
const canonicalOrigin = normalizeOrigin(
  args.get("canonical-origin") ?? indexNowConfig.canonicalOrigin,
);
const shouldSubmit = args.has("submit");
const explicitUrls = splitUrls(args.get("urls"));

assertProductionOrigin(canonicalOrigin);

const keyUrl = new URL(indexNowKeyPath, canonicalOrigin).href;
const keyResponse = await fetchWithRetry(
  new URL(indexNowKeyPath, currentOrigin),
);
if (
  !keyResponse.ok ||
  (await keyResponse.text()).trim() !== indexNowConfig.key
) {
  throw new Error(
    `IndexNow verification failed at ${new URL(indexNowKeyPath, currentOrigin)}.`,
  );
}

let candidates;
if (explicitUrls.length > 0) {
  candidates = await validateExplicitUrls(explicitUrls);
} else {
  if (!previousOrigin) {
    throw new Error(
      "Provide --previous-origin for deployment comparison or --urls for an explicit submission.",
    );
  }
  candidates = await compareDeployments(previousOrigin, currentOrigin);
}

const canonicalUrls = candidates.map(
  ({ pathname }) => new URL(pathname, canonicalOrigin).href,
);

console.log(
  JSON.stringify(
    {
      mode: shouldSubmit ? "submit" : "dry-run",
      currentOrigin,
      previousOrigin: previousOrigin ?? null,
      canonicalOrigin,
      keyLocation: keyUrl,
      changes: candidates,
    },
    null,
    2,
  ),
);

if (canonicalUrls.length === 0) {
  console.log("No indexable URL changes detected; nothing was submitted.");
  process.exit(0);
}

if (!shouldSubmit) {
  console.log(
    `Dry run complete; ${canonicalUrls.length} URL(s) would be submitted.`,
  );
  process.exit(0);
}

await waitForCanonicalDeployment(candidates, currentOrigin, canonicalOrigin);
await submitUrls(canonicalUrls, keyUrl);
console.log(`IndexNow accepted ${canonicalUrls.length} URL(s).`);

async function compareDeployments(previous, current) {
  const [previousPaths, currentPaths] = await Promise.all([
    readSitemap(previous),
    readSitemap(current),
  ]);
  const previousSet = new Set(previousPaths);
  const currentSet = new Set(currentPaths);
  const changes = [];

  for (const pathname of currentPaths) {
    if (!previousSet.has(pathname)) {
      const page = await readPage(current, pathname);
      if (!page.noindex) changes.push({ pathname, change: "added" });
    }
  }

  for (const pathname of previousPaths) {
    if (!currentSet.has(pathname)) {
      changes.push({ pathname, change: "deleted" });
    }
  }

  const sharedPaths = currentPaths.filter((pathname) =>
    previousSet.has(pathname),
  );
  const comparisons = await mapConcurrent(sharedPaths, 6, async (pathname) => {
    const [before, after] = await Promise.all([
      readPage(previous, pathname),
      readPage(current, pathname),
    ]);
    if (after.noindex || before.fingerprint === after.fingerprint) return null;
    return { pathname, change: "updated" };
  });

  changes.push(...comparisons.filter(Boolean));
  return changes.sort((a, b) => a.pathname.localeCompare(b.pathname));
}

async function readSitemap(origin) {
  const response = await fetchWithRetry(new URL("/sitemap.xml", origin));
  if (!response.ok) {
    throw new Error(
      `Could not read ${origin}/sitemap.xml (${response.status}).`,
    );
  }

  const xml = await response.text();
  const paths = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => {
    const url = new URL(decodeEntities(match[1].trim()));
    assertCanonicalUrl(url);
    return url.pathname;
  });

  if (paths.length === 0) {
    throw new Error(`No URLs were found in ${origin}/sitemap.xml.`);
  }

  return [...new Set(paths)].sort();
}

async function readPage(origin, pathname) {
  const response = await fetchWithRetry(new URL(pathname, origin));
  if (!response.ok) {
    throw new Error(
      `Expected 200 for ${origin}${pathname}, received ${response.status}.`,
    );
  }
  const html = await response.text();
  return {
    fingerprint: fingerprintHtml(html),
    noindex: hasNoindex(html),
  };
}

function fingerprintHtml(html) {
  const jsonLd = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => normalizeWhitespace(match[1]));
  const metadata = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => {
      const attributes = readAttributes(match[0]);
      const key = attributes.name ?? attributes.property;
      return key && attributes.content ? `${key}:${attributes.content}` : null;
    })
    .filter(Boolean)
    .sort();
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => normalizeInternalReference(match[1]))
    .filter(Boolean)
    .sort();
  const imageText = [...html.matchAll(/<img\b[^>]*>/gi)]
    .map((match) => {
      const attributes = readAttributes(match[0]);
      return `${attributes.alt ?? ""}|${normalizeAssetReference(attributes.src ?? "")}`;
    })
    .sort();
  const title = normalizeWhitespace(
    html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "",
  );
  const canonical =
    [...html.matchAll(/<link\b[^>]*>/gi)]
      .map((match) => readAttributes(match[0]))
      .find((attributes) => attributes.rel?.toLowerCase() === "canonical")
      ?.href ?? "";
  const visibleText = normalizeWhitespace(
    decodeEntities(
      html
        .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
        .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
        .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
        .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
        .replace(/<[^>]+>/g, " "),
    ),
  );

  return createHash("sha256")
    .update(
      JSON.stringify({
        canonical,
        imageText,
        jsonLd,
        links,
        metadata,
        title,
        visibleText,
      }),
    )
    .digest("hex");
}

function hasNoindex(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].some((match) => {
    const attributes = readAttributes(match[0]);
    return (
      ["robots", "bingbot"].includes(attributes.name?.toLowerCase()) &&
      attributes.content
        ?.toLowerCase()
        .split(/[\s,]+/)
        .includes("noindex")
    );
  });
}

async function validateExplicitUrls(urls) {
  const results = [];
  for (const value of urls) {
    const url = new URL(value, canonicalOrigin);
    assertCanonicalUrl(url);
    const response = await fetchWithRetry(new URL(url.pathname, currentOrigin));
    if (response.status === 404 || response.status === 410) {
      results.push({ pathname: url.pathname, change: "deleted" });
      continue;
    }
    if (!response.ok) {
      throw new Error(`${url.pathname} returned ${response.status}.`);
    }
    const html = await response.text();
    if (hasNoindex(html)) {
      throw new Error(`${url.pathname} is noindex and cannot be submitted.`);
    }
    results.push({ pathname: url.pathname, change: "explicit" });
  }
  return results;
}

async function waitForCanonicalDeployment(changes, sourceOrigin, publicOrigin) {
  if (sourceOrigin === publicOrigin) return;

  const expected = new Map();
  for (const item of changes) {
    if (item.change !== "deleted") {
      expected.set(
        item.pathname,
        (await readPage(sourceOrigin, item.pathname)).fingerprint,
      );
    }
  }

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const ready = await mapConcurrent(changes, 6, async (item) => {
      const response = await fetchWithRetry(
        new URL(item.pathname, publicOrigin),
        1,
      );
      if (item.change === "deleted") {
        return response.status === 404 || response.status === 410;
      }
      if (!response.ok) return false;
      return (
        fingerprintHtml(await response.text()) === expected.get(item.pathname)
      );
    });
    if (ready.every(Boolean)) return;
    if (attempt < 6) await delay(5_000);
  }

  throw new Error(
    "The canonical domain did not match the completed deployment; IndexNow was not called.",
  );
}

async function submitUrls(urlList, keyLocation) {
  for (let offset = 0; offset < urlList.length; offset += 10_000) {
    const response = await fetchWithRetry(indexNowConfig.endpoint, 4, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(canonicalOrigin).hostname,
        key: indexNowConfig.key,
        keyLocation,
        urlList: urlList.slice(offset, offset + 10_000),
      }),
    });
    if (![200, 202].includes(response.status)) {
      throw new Error(
        `IndexNow rejected the request (${response.status}): ${await response.text()}`,
      );
    }
  }
}

async function fetchWithRetry(url, attempts = 3, init) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...init,
        headers: {
          "user-agent": "controlresonant.org IndexNow deployment notifier",
          ...init?.headers,
        },
        redirect: "follow",
        signal: AbortSignal.timeout(15_000),
      });
      if (response.status !== 429 || attempt === attempts) return response;
    } catch (error) {
      lastError = error;
      if (attempt === attempts) throw error;
    }
    await delay(1_000 * 2 ** (attempt - 1));
  }
  throw lastError;
}

async function mapConcurrent(items, concurrency, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}

function parseArguments(values) {
  const parsed = new Map();
  for (let index = 0; index < values.length; index += 1) {
    const argument = values[index];
    if (!argument.startsWith("--")) {
      throw new Error(`Unexpected argument: ${argument}`);
    }
    const key = argument.slice(2);
    const next = values[index + 1];
    if (!next || next.startsWith("--")) {
      parsed.set(key, true);
    } else {
      parsed.set(key, next);
      index += 1;
    }
  }
  return parsed;
}

function splitUrls(value) {
  if (typeof value !== "string") return [];
  return [...new Set(value.split(/[\s,]+/).filter(Boolean))];
}

function normalizeOrigin(value) {
  if (typeof value !== "string")
    throw new Error("A deployment origin is required.");
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error(`Unsupported origin protocol: ${url.protocol}`);
  }
  return url.origin;
}

function assertProductionOrigin(origin) {
  const url = new URL(origin);
  if (url.protocol !== "https:" || url.hostname !== "controlresonant.org") {
    throw new Error(`Refusing to submit non-production origin: ${origin}`);
  }
}

function assertCanonicalUrl(url) {
  const canonical = new URL(canonicalOrigin);
  if (
    url.protocol !== "https:" ||
    url.hostname !== canonical.hostname ||
    url.search ||
    url.hash
  ) {
    throw new Error(`Invalid canonical URL: ${url.href}`);
  }
}

function readAttributes(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gs)) {
    attributes[match[1].toLowerCase()] = decodeEntities(match[3]);
  }
  return attributes;
}

function normalizeInternalReference(value) {
  try {
    const url = new URL(value, canonicalOrigin);
    if (url.hostname !== new URL(canonicalOrigin).hostname) return "";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "";
  }
}

function normalizeAssetReference(value) {
  if (!value) return "";
  try {
    const url = new URL(value, canonicalOrigin);
    if (url.pathname === "/_next/image") {
      return url.searchParams.get("url") ?? url.pathname;
    }
    return url.pathname;
  } catch {
    return value;
  }
}

function normalizeWhitespace(value) {
  return decodeEntities(value).replace(/\s+/g, " ").trim();
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    );
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
