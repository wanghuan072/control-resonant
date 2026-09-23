import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { indexNowConfig, indexNowKeyPath } from "./config.mjs";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const keyFile = new URL(`../public${indexNowKeyPath}`, import.meta.url);
const keyFileContents = (await readFile(keyFile, "utf8")).trim();
const canonicalUrl = new URL(indexNowConfig.canonicalOrigin);

assert.equal(canonicalUrl.protocol, "https:", "IndexNow must use HTTPS.");
assert.equal(
  canonicalUrl.hostname,
  "controlresonant.org",
  "IndexNow must only submit the production hostname.",
);
assert.match(
  indexNowConfig.key,
  /^[A-Za-z0-9-]{8,128}$/,
  "The IndexNow key does not satisfy the protocol format.",
);
assert.equal(
  keyFileContents,
  indexNowConfig.key,
  "The public verification file must contain exactly the configured key.",
);
assert.equal(
  indexNowKeyPath,
  `/${indexNowConfig.key}.txt`,
  "The root verification filename must match the key.",
);

console.log(`IndexNow configuration audit passed for ${projectRoot}`);
