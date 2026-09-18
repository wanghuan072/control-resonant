import fs from "node:fs";
import path from "node:path";

const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const guides = fs
  .readdirSync("src/data/guides")
  .filter((file) => file.endsWith(".json") && file !== "pillars.json")
  .flatMap((file) => read(path.join("src/data/guides", file)));
const categories = [
  ...read("src/data/database/categories.json"),
  ...read("src/data/database/wiki-categories.json"),
];
const sources = read("src/data/research/sources.json");
const gameInfoClaims = read("src/data/research/game-info-claims.json");
const hubs = read("src/data/site/hubs.json");
const topics = read("src/data/site/topics.json");
const home = read("src/data/site/home.json");
const pillars = read("src/data/guides/pillars.json");
const wikiGroups = read("src/data/site/wiki-groups.json");
const wikiDetails = [
  ...read("src/data/wiki/details.json"),
  ...read("src/data/wiki/expanded-details.json"),
  ...read("src/data/wiki/legacy-context-details.json"),
];
const fieldMatrices = read("src/data/wiki/field-matrices.json");
const gameplay = read("src/data/gameplay/overview.json");
const detailAdditions = read("src/data/wiki/detail-additions.json");
const dossierAdditions = read("src/data/wiki/dossier-additions.json");
const errors = [];
const check = (ok, message) => {
  if (!ok) errors.push(message);
};
const unique = (values, label) =>
  check(new Set(values).size === values.length, `${label}: duplicates`);
const slugs = new Set(guides.map((g) => g.slug));
const destinationSource = fs.readFileSync(
  "src/lib/data/guide-destinations.ts",
  "utf8",
);
const redirectedGuideSlugs = new Set(
  [
    ...destinationSource.matchAll(/^\s*"([^"]+)":\s*"\/(?:guides|game-info)/gm),
  ].map((match) => match[1]),
);
const sourceIds = new Set(sources.map((s) => s.id));
const pillarHrefs = new Set(pillars.map((pillar) => pillar.href));
const image = (file) =>
  check(
    file?.startsWith("/") && fs.existsSync(path.join("public", file)),
    `Missing local image: ${file}`,
  );

check(/^\d{4}-\d{2}-\d{2}$/.test(gameplay.reviewedAt), "Gameplay: review date");
check(gameplay.sourceIds?.length >= 3, "Gameplay: internal source trail");
for (const id of gameplay.sourceIds ?? [])
  check(sourceIds.has(id), `Gameplay: unknown source ${id}`);
unique(
  gameplay.forms.map((form) => form.name),
  "Gameplay form names",
);
unique(
  gameplay.abilities.map((ability) => ability.name),
  "Gameplay ability names",
);
unique(
  gameplay.assist.map((option) => option.setting),
  "Assist Mode settings",
);
check(gameplay.forms.length === 6, "Gameplay: previewed form comparison");
check(gameplay.abilities.length === 3, "Gameplay: previewed ability choice");
for (const form of gameplay.forms)
  check(
    ["Primary", "Secondary"].includes(form.slot) &&
      form.shape &&
      form.knownUse &&
      form.decision,
    `Gameplay: incomplete form ${form.name}`,
  );
for (const ability of gameplay.abilities)
  check(
    ability.role && ability.previewedEffect && ability.playerQuestion,
    `Gameplay: incomplete ability ${ability.name}`,
  );

unique([...guides.map((g) => g.slug)], "Guide slugs");
check(pillars.length === 4, "Exactly four published guides required");
check(
  guides.every((guide) => redirectedGuideSlugs.has(guide.slug)) &&
    redirectedGuideSlugs.size === guides.length,
  "Every archived guide needs one permanent destination",
);
unique(
  guides.map((g) => g.seo.title),
  "Guide titles",
);
unique(
  guides.map((g) => g.seo.description),
  "Guide descriptions",
);
unique(
  sources.map((s) => s.id),
  "Source IDs",
);
unique(
  gameInfoClaims.map((claim) => claim.id),
  "Game Info claim IDs",
);
for (const claim of gameInfoClaims) {
  check(claim.claim?.length >= 35, `${claim.id}: thin claim`);
  check(
    /^\d{4}-\d{2}-\d{2}$/.test(claim.checkedAt),
    `${claim.id}: invalid check date`,
  );
  check(Boolean(claim.appliesTo), `${claim.id}: missing applicability`);
  check(
    claim.sourceIds?.length > 0,
    `${claim.id}: missing internal source trail`,
  );
  for (const id of claim.sourceIds ?? [])
    check(sourceIds.has(id), `${claim.id}: unknown source ${id}`);
}
for (const guide of guides) {
  image(guide.image);
  check(Boolean(guide.imageAlt), `${guide.slug}: missing image description`);
  check(guide.sources.length > 0, `${guide.slug}: no sources`);
  unique(
    guide.sections.map((s) => s.id),
    guide.slug,
  );
  check(Boolean(guide.quickAnswer?.trim()), `${guide.slug}: no quick answer`);
  for (const slug of guide.relatedSlugs)
    check(slugs.has(slug), `${guide.slug}: missing related guide ${slug}`);
  for (const section of guide.sections) {
    for (const ref of section.sourceRefs ?? [])
      check(
        Number.isInteger(ref) && ref >= 1 && ref <= guide.sources.length,
        `${guide.slug}#${section.id}: invalid source reference ${ref}`,
      );
    if (section.image) image(section.image.src);
    if (section.table)
      for (const row of section.table.rows)
        check(
          row.length === section.table.headers.length,
          `${guide.slug}#${section.id}: table dimensions`,
        );
  }
}
for (const category of categories) {
  image(category.heroImage);
  unique(
    category.items.map((i) => i.id),
    category.id,
  );
  for (const id of category.sourceIds)
    check(sourceIds.has(id), `${category.id}: missing category source ${id}`);
  for (const item of category.items) {
    if (item.image) {
      image(item.image.src);
      check(
        Boolean(item.image.alt && item.image.caption && item.image.sourceUrl),
        `${category.id}#${item.id}: incomplete image attribution`,
      );
    }
    for (const id of item.sourceIds ?? [])
      check(
        sourceIds.has(id),
        `${category.id}#${item.id}: missing source ${id}`,
      );
    if (item.href?.startsWith("/guides/"))
      check(
        slugs.has(item.href.split("/")[2].split("#")[0]) ||
          pillarHrefs.has(item.href),
        `${category.id}: missing record guide ${item.href}`,
      );
    const [route, anchor] = item.href.split("#");
    const target = categories.find((c) => `/${c.id}` === route);
    if (target && anchor)
      check(
        target.items.some((i) => i.id === anchor),
        `${category.id}#${item.id}: missing target ${item.href}`,
      );
  }
}
for (const group of [...hubs, ...topics]) {
  for (const slug of group.guideSlugs ?? group.slugs ?? [])
    check(slugs.has(slug), `${group.id}: missing guide ${slug}`);
  for (const id of group.sourceIds ?? [])
    check(sourceIds.has(id), `${group.id}: missing source ${id}`);
}
const assignedGuides = topics.flatMap((t) => t.slugs);
unique(assignedGuides, "Primary topic assignment");
for (const slug of slugs)
  check(assignedGuides.includes(slug), `Guide without player topic: ${slug}`);
for (const entry of home.featuredGuides)
  check(slugs.has(entry.slug), `Missing home guide: ${entry.slug}`);
for (const entry of home.categories) image(entry.image);
check(
  pillars.length === 4,
  `Expected four guide pillars, found ${pillars.length}`,
);
unique(
  pillars.map((pillar) => pillar.id),
  "Guide pillar IDs",
);
unique(
  pillars.map((pillar) => pillar.href),
  "Guide pillar routes",
);
for (const pillar of pillars) {
  image(pillar.image);
  for (const slug of pillar.slugs)
    check(slugs.has(slug), `${pillar.id}: missing guide ${slug}`);
}
check(
  wikiGroups.length === 5,
  `Expected five Wiki groups, found ${wikiGroups.length}`,
);
unique(
  wikiGroups.map((group) => group.id),
  "Wiki group IDs",
);
for (const group of wikiGroups) {
  image(group.image);
  const matrix = fieldMatrices[group.id];
  check(Boolean(matrix), `${group.id}: missing field comparison`);
  if (matrix) {
    check(matrix.columns?.length >= 3, `${group.id}: comparison columns`);
    check(matrix.rows?.length >= 4, `${group.id}: comparison rows`);
    check(
      /^\d{4}-\d{2}-\d{2}$/.test(matrix.verifiedAt),
      `${group.id}: comparison review date`,
    );
    check(Boolean(matrix.appliesTo), `${group.id}: missing evidence scope`);
    for (const id of matrix.sourceIds ?? [])
      check(sourceIds.has(id), `${group.id}: unknown comparison source ${id}`);
    for (const row of matrix.rows ?? [])
      check(
        row.length === matrix.columns.length,
        `${group.id}: comparison dimensions`,
      );
  }
  for (const id of group.categoryIds)
    check(
      categories.some((category) => category.id === id),
      `${group.id}: missing Wiki category ${id}`,
    );
}
const categoryGroup = new Map(
  wikiGroups.flatMap((group) =>
    group.categoryIds.map((categoryId) => [categoryId, group.id]),
  ),
);
const seenNames = new Map();
for (const category of categories)
  for (const item of category.items) {
    const group = categoryGroup.get(category.id);
    check(Boolean(group), `${category.id}: unassigned Wiki category`);
    const key = `${group}:${item.name.toLowerCase()}`;
    if (seenNames.has(key))
      console.warn(`Wiki duplicate merged in listing: ${item.name} (${group})`);
    seenNames.set(key, true);
  }
unique(
  wikiDetails.map((entry) => `${entry.group}/${entry.slug}`),
  "Wiki detail routes",
);
unique(
  wikiDetails.map((entry) => entry.title.toLowerCase()),
  "Wiki detail titles",
);
for (const entry of wikiDetails) {
  const route = `${entry.group}/${entry.slug}`;
  check(
    wikiGroups.some((group) => group.id === entry.group),
    `${route}: unknown group`,
  );
  check(entry.type?.trim(), `${route}: missing entity type`);
  check(entry.summary?.length >= 70, `${route}: summary is too thin`);
  check(entry.facts?.length >= 4, `${route}: fewer than four facts`);
  if (entry.comparison) {
    check(entry.comparison.columns.length >= 2, `${route}: comparison headers`);
    check(entry.comparison.rows.length >= 3, `${route}: comparison rows`);
    for (const row of entry.comparison.rows)
      check(
        row.length === entry.comparison.columns.length,
        `${route}: comparison dimensions`,
      );
  }
  check(
    entry.sections?.length >= 2,
    `${route}: missing independent content sections`,
  );
  check(
    entry.sections?.every(
      (section) => section.heading && section.paragraphs?.length >= 2,
    ),
    `${route}: incomplete detail section`,
  );
  check(entry.playerTakeaway?.length >= 40, `${route}: missing player use`);
  check(
    /^\d{4}-\d{2}-\d{2}$/.test(entry.updatedAt),
    `${route}: invalid update date`,
  );
  check(entry.sourceIds?.length > 0, `${route}: no internal source trail`);
  for (const id of entry.sourceIds ?? [])
    check(sourceIds.has(id), `${route}: missing internal source ${id}`);
  for (const related of entry.related ?? [])
    check(
      wikiDetails.some(
        (candidate) => `${candidate.group}/${candidate.slug}` === related,
      ),
      `${route}: broken related Wiki file ${related}`,
    );
  if (entry.image) {
    image(entry.image);
    check(entry.imageAlt?.trim(), `${route}: missing image alt`);
  } else {
    check(
      entry.type.includes("CONTROL (2019)"),
      `${route}: image omitted without an earlier-game context reason`,
    );
  }
  const entireEntry = JSON.stringify(entry);
  check(
    !/\b(?:guaranteed drop|exact coordinates|all \d+ collectibles|100% complete)\b/i.test(
      entireEntry,
    ),
    `${route}: unverified completion or reward claim`,
  );
}
for (const [route, section] of Object.entries(detailAdditions)) {
  check(
    wikiDetails.some((entry) => `${entry.group}/${entry.slug}` === route),
    `${route}: addition has no detail`,
  );
  check(
    Boolean(section.heading) && section.paragraphs?.length >= 2,
    `${route}: incomplete detail addition`,
  );
}
for (const entry of wikiDetails) {
  const route = `${entry.group}/${entry.slug}`;
  const dossier = dossierAdditions[route];
  check(Boolean(dossier), `${route}: missing expanded dossier`);
  check(dossier?.sections?.length >= 1, `${route}: empty expanded dossier`);
  for (const section of dossier?.sections ?? []) {
    check(
      Boolean(section.heading) && section.paragraphs?.length >= 2,
      `${route}: incomplete dossier section`,
    );
    check(
      section.connections?.length >= 2,
      `${route}: fewer than two contextual links`,
    );
    for (const connection of section.connections ?? [])
      check(
        wikiDetails.some(
          (candidate) =>
            `${candidate.group}/${candidate.slug}` === connection.path,
        ) && connection.reason?.length >= 20,
        `${route}: broken or unexplained link ${connection.path}`,
      );
  }
}
for (const route of Object.keys(dossierAdditions))
  check(
    wikiDetails.some((entry) => `${entry.group}/${entry.slug}` === route),
    `${route}: orphaned dossier`,
  );
console.log(
  JSON.stringify(
    {
      publishedGuides: pillars.length,
      archivedGuides: guides.length,
      records: categories.reduce((n, c) => n + c.items.length, 0),
      sources: sources.length,
      pillars: pillars.length,
      wikiDetails: wikiDetails.length,
      errors,
    },
    null,
    2,
  ),
);
process.exitCode = errors.length ? 1 : 0;
