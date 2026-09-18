# Wiki-informed player reference — 2026-09-16

## Scope and findings

The user-supplied Control Wiki overview and 18 linked reference pages were read. The browser was used where the web reader could not access Fandom. This was a selected review, not a full-Wiki scrape.

- The Wiki's `Missions` page is the original CONTROL campaign plus its expansions. Its ten base-game main missions are not Resonant missions.
- The Resonant overview still uses a broad 2026 release field and TBA mode field. Remedy's newer release announcement is more specific; these older fields did not overwrite current sourced data.
- Aberrant and Zoe pages are short reference stubs, not detailed retail-game guides. No stats or quests were extrapolated from them.
- Character pages combine original-game history with sequel information. Actor return announcements do not establish a sequel NPC location, quest reward, screen time or ending.
- Objects of Power, Altered Items, passive Artifacts, apparel and collectible documents must remain distinguishable.

## Implementation

- Seven character files now include real character imagery, relationships, actor credits, player takeaways and separately expandable background.
- Four new categories: Items & Equipment (8 entries), Missions & Quest Types (4), Locations (4), Lore & Terminology (6).
- The mission page includes an explicitly labeled, collapsible original-game campaign list. It does not manufacture a complete Resonant quest inventory.
- Database entries retain source IDs; citations render beside rewritten material. Original-game equipment and places carry an explicit scope label.
- Search, category navigation, home entry points, metadata and sitemap include the new reference categories.

## Writing and image policy

Facts retain their meaning. The wording and structure answer player questions: what a name refers to, why it matters, which system it belongs to, and what not to confuse it with. Advice is labeled as a player takeaway rather than attributed as a Wiki statement or hands-on result.

The seven imported character images are listed in `src/data/research/media.json`, linked to their Wiki file pages. They are displayed as supplied, without AI substitution. Original-game images are labeled rather than represented as Resonant screenshots. Rights remain with the game-image owners; the Wiki's community-text license is not treated as blanket image permission. Commercial reuse clearance has not been established.

## Design decision

Keep the existing altered-field-archive tokens (concrete paper, dark green-black and signal red; Archivo Black / IBM Plex Sans). New imagery supports identification, not decoration.

```text
category cover / reference navigation
entry index and clear role labels | source and reading notes
character portrait | identity / role / relationships
                   | expandable older-game background
                   | player takeaway / citations
```

Critique: expanding every record into an identical large card would hide the factual distinctions. The revised implementation uses unboxed files, individual source links, and explicit background disclosures instead. The existing page layout is preserved, with mobile-safe tables and touch targets.
