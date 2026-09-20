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

Hub pages are statically rendered. The 25 answer-focused articles are assembled from four JSON collections in `src/data/guides` through `/guides/[slug]` and `generateStaticParams`; `/guides` exposes exactly four player routes instead of presenting every article at the same level. `/wiki` is a five-field directory, `/wiki/[group]` supplies searchable, fielded index tables, and `/wiki/[group]/[slug]` renders only records with enough facts and player context for a useful independent article. Named entities, system concepts, quest types and older-game background are classified rather than counted as interchangeable equipment. Search is client-filtered against the guide, hub, Wiki group and detail index.

The public top-level architecture is `/`, `/game-info`, `/guides`, `/wiki` and `/tracker` (shown as My Case). Legacy `/database`, `/builds`, `/walkthrough`, `/sources` and the ten former Wiki-category routes are permanent redirects and are omitted from the sitemap. Bosses, map and updates remain indexable secondary destinations without competing for primary navigation space.

The My Case route keeps its indexable introduction server-rendered and isolates interactivity in client components. `TrackerStateV2` is sanitized in `src/lib/tracker/state.ts`, then persisted under `control-resonant:case-board:v2`. V1 profile, bookmarks and build selections migrate; V1 checkboxes are visible only as archived selections and never count as game completion. Personal goal counts refer only to user-created goals. Artifact slots are constrained to three on the first run and four in New Game+.

## SEO model

Every indexable page provides a unique title, description, keyword metadata, canonical URL, Open Graph data, and one visible H1. The home page emits `WebSite`, `Organization` and `VideoObject` JSON-LD. Guide pages emit `Article` and `BreadcrumbList`; directories emit `CollectionPage` with an `ItemList` matching visible links. The trailer poster is local and the privacy-enhanced YouTube iframe is created only after a player click. FAQs remain readable page content without a rich-result promise. `robots.ts` and `sitemap.ts` use the configured production origin. Search is `noindex, follow` and is excluded from the sitemap.

Set `NEXT_PUBLIC_SITE_URL` for preview or production environments so canonical URLs, sitemap entries, and structured data use the deployed host.

## Content rules

Pre-launch content must distinguish an explicit announcement from an unknown. A missing announcement is not evidence that a feature will never exist. Internal research records should retain primary references and a checked date, while public articles avoid source-status furniture, outbound research links, fictional walkthrough steps and invented Wiki records.

When adding a guide, append a valid record to the appropriate collection in `src/data/guides`, use a relevant local promotional image, include sources and section references, and connect related slugs. Add the slug to the relevant topic or hub collection where appropriate. The route, sitemap entry, search result and structured data are generated automatically. Reading time is calculated from content, not a fixed editorial claim.

## Visual system and verification

See `design-direction.md` for the altered-field-archive composition, typography and palette. Home, directory and article layouts have different content roles, sharing the same navigation and visual language.

- `npm run audit:data`: collection, source-trail, detail depth, image and relationship checks.
- `npm run audit:site -- --base <running-url>`: rendered route metadata, retired-route responses, internal links, structured data, deferred video and responsive checks. Pass the URL of the Next.js process you started; the project does not reserve a port. The audit uses the installed Chrome channel by default; `--chrome` can override its executable.
- `npm run lint` and `npm run build`: code and production compilation checks.
