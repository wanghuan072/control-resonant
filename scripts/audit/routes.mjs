import fs from "node:fs";

const base = process.argv[2] ?? "http://localhost:3001";
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => new URL(m[1]),
);
const paths = [...new Set(urls.map((u) => u.pathname))];
const origin = urls[0]?.origin;
const errors = [];
const pages = new Map();
const check = (ok, message) => {
  if (!ok) errors.push(message);
};
const attribute = (tag, name) =>
  tag?.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const decode = (text) =>
  text
    ?.replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
for (const path of paths) {
  const response = await fetch(base + path);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = attribute(
    html.match(/<meta\b[^>]*name="description"[^>]*>/)?.[0],
    "content",
  );
  const canonical = attribute(
    html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0],
    "href",
  );
  const h1 = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)];
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((m) =>
    decode(m[1]),
  );
  check(response.status === 200, `${path}: HTTP ${response.status}`);
  check(Boolean(title && description), `${path}: missing title/description`);
  check(h1.length === 1, `${path}: H1 count ${h1.length}`);
  check(
    canonical === origin + (path === "/" ? "" : path),
    `${path}: canonical`,
  );
  check(new Set(ids).size === ids.length, `${path}: duplicate IDs`);
  let previous = 0;
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] ?? "";
  for (const heading of main.matchAll(/<h([1-6])\b[^>]*>/g)) {
    const level = Number(heading[1]);
    check(
      level <= previous + 1,
      `${path}: skipped heading level ${previous} to ${level}`,
    );
    previous = level;
  }
  for (const schema of html.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
  )) {
    const data = JSON.parse(schema[1]);
    if (data["@type"] === "CollectionPage")
      for (const item of data.mainEntity.itemListElement) {
        const u = new URL(item.url);
        const href = u.origin === origin ? u.pathname + u.hash : u.href;
        check(
          links.some((link) => {
            const target = new URL(link, base + path);
            return target.origin === base
              ? target.pathname + target.hash === href
              : target.href === href;
          }),
          `${path}: schema item missing visible link ${href}`,
        );
      }
  }
  pages.set(path, { title, description, ids, links });
}
check(
  new Set([...pages.values()].map((p) => p.title)).size === pages.size,
  "Duplicate titles",
);
check(
  new Set([...pages.values()].map((p) => p.description)).size === pages.size,
  "Duplicate descriptions",
);
for (const [path, page] of pages)
  for (const link of page.links) {
    if (!link.startsWith("/") && !link.startsWith("#")) continue;
    const target = new URL(link, base + path);
    if (target.pathname === "/search") continue;
    const record = pages.get(target.pathname);
    check(Boolean(record), `${path}: missing internal route ${link}`);
    if (record && target.hash)
      check(
        record.ids.includes(decodeURIComponent(target.hash.slice(1))),
        `${path}: broken anchor ${link}`,
      );
  }
const report = {
  checkedAt: new Date().toISOString(),
  routes: pages.size,
  errors,
};
fs.mkdirSync(".next/wiki-review", { recursive: true });
fs.writeFileSync(
  ".next/wiki-review/routes.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
process.exitCode = errors.length ? 1 : 0;
