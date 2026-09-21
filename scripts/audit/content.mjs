import fs from "node:fs";
import path from "node:path";

const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const categories = [
  ...read("src/data/database/categories.json"),
  ...read("src/data/database/wiki-categories.json"),
];
const sources = read("src/data/research/sources.json");
const gameInfoClaims = read("src/data/research/game-info-claims.json");
const updates = read("src/data/updates/timeline.json");
const hubs = read("src/data/site/hubs.json");
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
const sourceIds = new Set(sources.map((s) => s.id));
const pillarHrefs = new Set(pillars.map((pillar) => pillar.href));
const image = (file) =>
  check(
    file?.startsWith("/") && fs.existsSync(path.join("public", file)),
    `Missing local image: ${file}`,
  );

unique(
  updates.map((update) => update.title),
  "Update titles",
);
for (const update of updates) {
  check(/^\d{4}-\d{2}-\d{2}$/.test(update.date), `${update.title}: date`);
  check(
    /^https:\/\//.test(update.href),
    `${update.title}: missing original source URL`,
  );
}
check(
  updates.every(
    (update, index) => index === 0 || updates[index - 1].date >= update.date,
  ),
  "Updates are not in reverse chronological order",
);

if (Date.now() >= Date.parse("2026-09-24T00:00:00Z")) {
  const releaseRolloverMarkers = [
    ["README.md", "Before release, information"],
    ["README.md", "still needs release-build verification"],
    ["src/lib/data/search.ts", "Pre-release map status"],
    ["src/data/wiki/dossier-additions.json", "this pre-launch guide"],
    ["src/data/wiki/legacy-context-details.json", "before release testing"],
    [
      "src/page/gameplay/components/GameplayBuildSections.tsx",
      "a tested Guide after release",
    ],
    ["src/data/database/categories.json", "The launch database will"],
    ["src/data/guides/longform.ts", "After launch, a walkthrough should"],
    [
      "src/page/game-info/SystemRequirementsPage.tsx",
      "absence of a pre-release storefront notice",
    ],
  ];
  for (const [file, marker] of releaseRolloverMarkers)
    check(
      !fs.readFileSync(file, "utf8").includes(marker),
      `${file}: release-day content review required for “${marker}”`,
    );
}

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

check(pillars.length === 4, "Exactly four published guides required");
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
    if (item.href?.startsWith("/guides/")) {
      const guidePath = item.href.split("#")[0];
      check(
        pillarHrefs.has(guidePath),
        `${category.id}: missing record guide ${item.href}`,
      );
    }
    if (item.detailSlug) {
      const group = wikiGroups.find((entry) =>
        entry.categoryIds.includes(category.id),
      )?.id;
      check(
        wikiDetails.some(
          (entry) => entry.group === group && entry.slug === item.detailSlug,
        ),
        `${category.id}#${item.id}: missing detail ${item.detailSlug}`,
      );
    }
    const [route, anchor] = item.href.split("#");
    const target = categories.find((c) => `/${c.id}` === route);
    if (target && anchor)
      check(
        target.items.some((i) => i.id === anchor),
        `${category.id}#${item.id}: missing target ${item.href}`,
      );
  }
  check(
    pillarHrefs.has(category.guideHref.split("#")[0]),
    `${category.id}: invalid guide destination ${category.guideHref}`,
  );
}
for (const group of hubs) {
  for (const href of group.guideHrefs ?? [])
    check(pillarHrefs.has(href), `${group.id}: missing guide ${href}`);
  for (const id of group.sourceIds ?? [])
    check(sourceIds.has(id), `${group.id}: missing source ${id}`);
}
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
    check(!seenNames.has(key), `Wiki topic duplicate: ${item.name} (${group})`);
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
