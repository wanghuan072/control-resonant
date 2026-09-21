# Architecture

## Directory model

The project follows the repository-wide Next.js structure rules:

- `src/app`: App Router entry files, metadata, sitemap, robots, and icon only.
- `src/page`: full page implementations grouped by content area.
- `src/components`: reusable layout, content, and common UI components.
- `src/style`: global styles plus CSS Modules mirroring components and page groups.
- `src/data`: JSON-only content records.
- `src/lib`: data selectors and search-index assembly.
- `src/config`: site-wide navigation and stable configuration.
- `src/seo`: metadata helpers and structured-data builders.
- `src/types`: shared content types.

## Rendering and routes

Hub pages and four long-form field manuals are statically rendered. The published guide routes are `/guides/getting-started`, `/guides/combat-builds`, `/guides/story-walkthrough` and `/guides/completion`; there is no generic `/guides/[slug]` route or archived short-form guide collection. `/wiki` is a five-field directory, `/wiki/[group]` supplies searchable index tables, and `/wiki/[group]/[slug]` renders fact-rich detail records. Search is the only request-time rendered page and filters a server-built index in the client.

The sitemap currently contains 55 public content routes. `/game-info` is a navigation group rather than a page. `/tools` is a directory whose utilities live at dedicated detail routes, beginning with `/tools/pc-system-checker`. Retired guide URLs and the former `/database`, `/builds`, `/walkthrough`, `/sources`, `/tracker` and category aliases deliberately return 404 and never appear in navigation, search or the sitemap. `scripts/audit/site.mjs` owns the explicit retirement contract.

The site has no account, tracker, CMS, database or runtime content API. Interactive JavaScript is limited to navigation, search and directory filters, the release countdown, deferred video playback, the gameplay table of contents and the hardware checker.

## SEO model

Every indexable page provides a unique title, description, keyword metadata, canonical URL, Open Graph data, and one visible H1. The home page emits `WebSite`, `Organization` and `VideoObject` JSON-LD. Guide pages emit `Article` and `BreadcrumbList`; directories emit `CollectionPage` with an `ItemList` matching visible links. The trailer poster is local and the privacy-enhanced YouTube iframe is created only after a player click. FAQs remain readable page content without a rich-result promise. `robots.ts` and `sitemap.ts` use the configured production origin. Search is `noindex, follow` and is excluded from the sitemap.

Set `NEXT_PUBLIC_SITE_URL` for preview or production environments so canonical URLs, sitemap entries, and structured data use the deployed host.

## Content rules

Pre-launch content must distinguish an explicit announcement from an unknown. A missing announcement is not evidence that a feature will never exist. Internal research records should retain primary references and a checked date. Public articles avoid source-status furniture, fictional walkthrough steps and invented Wiki records; the Updates timeline is the single exception for outbound research links, exposing one original source for every dated item.

When expanding a guide, update the corresponding entry in `src/data/guides/longform.ts` and its presentation record in `src/data/guides/pillars.json`. Preserve the four published routes unless the information architecture is intentionally changed. New Wiki records use stable category IDs plus an optional explicit `detailSlug`; title matching is not used to establish relationships.

## Visual system and verification

See `design-direction.md` for the altered-field-archive composition, typography and palette. Home, directory and article layouts have different content roles, sharing the same navigation and visual language.

- `npm run audit:data`: source-trail, detail depth, image, stable relationship and duplicate checks.
- `npm run audit:site -- --base <running-url>`: rendered route metadata, retired-route responses, internal links, structured data, deferred video and responsive checks. Pass the URL of the Next.js process you started; the project does not reserve a port. The audit uses the installed Chrome channel by default; `--chrome` can override its executable.
- `npm run lint`, `npm run format:check` and `npm run build`: code, formatting and production compilation checks. `.github/workflows/quality.yml` runs the complete sequence for pull requests and pushes to `main`.
