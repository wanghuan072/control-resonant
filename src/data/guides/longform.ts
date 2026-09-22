import type { GuidePillarId } from "@/types/guide-pillar";

export type LongformChapter = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  steps?: { title: string; text: string }[];
  table?: { headers: string[]; rows: string[][] };
  links?: { label: string; href: string }[];
  image?: { src: string; alt: string; caption: string };
};

export type LongformGuide = {
  updatedAt: string;
  readTime: string;
  answer: string;
  route: string[];
  chapters: LongformChapter[];
  related: { label: string; href: string; note: string }[];
};

export const longformGuides: Record<GuidePillarId, LongformGuide> = {
  "getting-started": {
    updatedAt: "2026-09-22",
    readTime: "14 min read",
    answer:
      "CONTROL Resonant is a single-player, melee-led action RPG starring Dylan Faden. We think you can start here without finishing CONTROL because the main menu includes a recap, though knowing Jesse, Dylan and the Federal Bureau makes the opening clearer. We break the Aberrant, Combat Abilities, Talents and Artifacts into separate systems, then show you which side activities or Assist Mode settings can solve the problem blocking you.",
    route: [
      "Understand the sequel",
      "See what changed",
      "Set up your platform",
      "Learn the combat loop",
      "Choose first-session priorities",
    ],
    chapters: [
      {
        id: "what-kind-of-game",
        eyebrow: "01 / Orientation",
        title: "What kind of game is CONTROL Resonant?",
        paragraphs: [
          "This is the direct successor to CONTROL, but Dylan Faden takes the playable role instead of Jesse. The setting expands beyond the Oldest House into a paranaturally transformed Manhattan. Remedy describes an open-ended action RPG built around exploration, melee combat, supernatural abilities and player-shaped loadouts.",
          "The campaign is single-player. Zoe De Vera is Dylan's FBC field contact, not a co-op partner. Remedy's developer FAQ describes the game as playable offline, although a storefront may still require installation, an initial download or account setup. Do not confuse Resonant with FBC: Firebreak, Remedy's separate co-operative game.",
        ],
        links: [
          {
            label: "Check platform and edition details",
            href: "/game-info/release-date",
          },
        ],
      },
      {
        id: "story-context",
        eyebrow: "02 / Story",
        title: "Do you need to play CONTROL first?",
        paragraphs: [
          "No. Remedy has presented Resonant as both a sequel and a new entry point, and a developer interview says the main menu includes a recap of CONTROL. The original game is still the best way to understand why Dylan and Jesse's relationship matters, what the Hiss did to the Bureau, and why the Oldest House is more than a location.",
          "For a short, spoiler-light preparation, we would keep four facts in mind: Jesse became FBC Director; Dylan spent years confined by the Bureau; the Hiss crisis changed both siblings; and Jesse is missing when Dylan's new journey begins. We have not seen a reliable explanation for her absence yet, so we are treating trailer cuts as clues rather than answers.",
        ],
        image: {
          src: "/images/characters/zoe-and-dylan.jpg",
          alt: "Dylan Faden and Zoe De Vera in CONTROL Resonant",
          caption:
            "Dylan leads the playable story while Zoe serves as his field contact. Character files carry the deeper relationship context.",
        },
        table: {
          headers: [
            "Person or place",
            "Why it matters at the start",
            "Further reading",
          ],
          rows: [
            [
              "Dylan Faden",
              "The sole playable lead and Jesse's brother",
              "Characters Wiki",
            ],
            [
              "Jesse Faden",
              "Missing Director whose search drives Dylan",
              "Characters Wiki",
            ],
            [
              "Zoe De Vera",
              "FBC field agent in contact with Dylan",
              "Characters Wiki",
            ],
            [
              "Oldest House",
              "The Bureau's headquarters and the first game's key setting",
              "World Wiki",
            ],
          ],
        },
        links: [
          {
            label: "Dylan's history and present role",
            href: "/wiki/characters/dylan-faden",
          },
          {
            label: "Why Ordinary matters to both siblings",
            href: "/wiki/world/ordinary-awe",
          },
          {
            label: "What Jesse's absence means",
            href: "/wiki/characters/jesse-faden",
          },
        ],
      },
      {
        id: "what-changed",
        eyebrow: "03 / Series transition",
        title: "What changed from CONTROL to Resonant?",
        paragraphs: [
          "The most useful preparation is not a complete retelling of CONTROL. It is knowing which old assumptions to put aside. Jesse's investigation took players through the Oldest House with the Service Weapon and paranatural powers. Resonant follows Dylan into Manhattan, emphasizes the transforming melee Aberrant, and organizes exploration around distinct handcrafted Zones.",
          "From everything Remedy has shown, the direction has changed without throwing away every familiar character, power or location. Dylan's Journey is the main campaign, World Quests are self-contained stories, and Combat Abilities, Aberrant Forms and Talents shape his build. We use the Gap for that build space; it is not an enemy stagger meter.",
          "If you are returning from CONTROL, we would begin with the protagonist and combat rows below. If you are new to the series, start with the sibling and Bureau files, then learn the new systems. Both routes lead to the same first-session checklist without pretending we already have a finished launch-day walkthrough.",
        ],
        table: {
          headers: ["Question", "CONTROL (2019)", "CONTROL Resonant"],
          rows: [
            ["Who do you play?", "Jesse Faden", "Dylan Faden"],
            [
              "Where is the focus?",
              "The Oldest House",
              "Handcrafted Manhattan Zones",
            ],
            [
              "What anchors combat?",
              "Service Weapon gunplay and powers",
              "Aberrant melee Forms and Combat Abilities",
            ],
            [
              "How is the route organized?",
              "Jesse's investigation within the Bureau",
              "Dylan's Journey plus optional World Quests",
            ],
            [
              "How do you shape a build?",
              "Weapon and ability upgrades",
              "Forms, Combat Abilities, Talents and Artifacts in the Gap",
            ],
          ],
        },
        links: [
          {
            label: "Compare the Aberrant's Forms",
            href: "/wiki/combat/aberrant-forms",
          },
          {
            label: "Understand Manhattan's Zones",
            href: "/wiki/world/manhattan",
          },
          {
            label: "See World Quests versus Faults",
            href: "/wiki/missions/world-quests-and-faults",
          },
        ],
      },
      {
        id: "platform-check",
        eyebrow: "04 / Before installing",
        title: "Choose the right version for your setup",
        paragraphs: [
          "The digital and physical console copies have different release dates, and the PS5 Deluxe listing has a separate early-access offer. Check the edition and format you actually intend to buy; a SteelBook order does not grant digital early access.",
          "PC requirements describe published hardware targets rather than measured performance on your machine. Use the PC checker to compare each component, then verify your regional store listing before buying. Steam Deck support is a separate question from final compatibility status or benchmark results.",
        ],
        links: [
          {
            label: "Compare editions, dates and included extras",
            href: "/game-info/release-date#editions",
          },
          {
            label: "Check your setup against published targets",
            href: "/tools/pc-system-checker#system-checker",
          },
          {
            label: "Read the physical-edition timing",
            href: "/game-info/physical-release-steelbook",
          },
        ],
      },
      {
        id: "core-loop",
        eyebrow: "05 / Systems",
        title: "Learn the four parts of a build",
        paragraphs: [
          "The Aberrant changes between melee Forms. Combat Abilities are supernatural actions connected to Resonant encounters. Talents alter Dylan's progression, and Artifacts provide passive effects. Treating all four as interchangeable 'weapons' makes an early build harder to understand.",
          "The combat rhythm is to close distance with the Aberrant, restore Power through melee pressure, use an ability to control a threat, then build Falter until an execution becomes available. Executing an eligible normal enemy starts Dominance, briefly strengthening melee and making enemies defeated during that window a dependable source of health. Command and summon abilities—not Dominance—are the tools that add temporary allies. Learn what each system does before copying a supposed best build.",
        ],
        table: {
          headers: ["System", "Decision it answers", "First check"],
          rows: [
            [
              "Aberrant Forms",
              "How do I attack at this range?",
              "Speed, reach and crowd coverage",
            ],
            [
              "Combat Abilities",
              "How do I spend power?",
              "Control, defense or ranged pressure",
            ],
            [
              "Talents",
              "What changes as I progress?",
              "Requirements and opportunity cost",
            ],
            [
              "Artifacts",
              "Which passive effect supports the plan?",
              "Slot limit and effect conditions",
            ],
          ],
        },
        image: {
          src: "/images/gameplay/manhattan-melee.jpg",
          alt: "Dylan using the Aberrant during close-range combat",
          caption:
            "The build begins with the melee-to-power rhythm; Forms, abilities, Talents and Artifacts modify different parts of it.",
        },
        links: [
          {
            label: "See how the Aberrant works",
            href: "/wiki/combat/aberrant",
          },
          {
            label: "Compare Combat Ability roles",
            href: "/wiki/combat/combat-abilities",
          },
          {
            label: "Continue to Combat & Builds",
            href: "/guides/combat-builds",
          },
        ],
      },
      {
        id: "first-session",
        eyebrow: "06 / Practical route",
        title: "A sensible first-session checklist",
        paragraphs: [
          "This is a learning order, not an invented mission-by-mission walkthrough. Full-game coverage confirms that the opening teaches movement and melee in stages, while optional Jesse Quests add traversal tools and other side activities provide useful practice or progression.",
        ],
        steps: [
          {
            title: "Set your story baseline",
            text: "Use the main-menu recap if you have not played CONTROL; avoid late-game character files until you want spoilers.",
          },
          {
            title: "Test movement before optimizing",
            text: "Practise dodge, double jump and air dash as they become available. Jesse Quests award traversal powers that can reopen routes you could not reach earlier.",
          },
          {
            title: "Compare Forms by role",
            text: "Try a fast close-range Form, a wider crowd option and a heavier attack rather than assuming the first choice must be permanent.",
          },
          {
            title: "Notice what restores power",
            text: "Watch the melee-to-ability rhythm before deciding whether a loadout lacks damage or simply runs out of resources.",
          },
          {
            title: "Record optional routes",
            text: "When a World Quest, Fault or Gravity Anomaly appears, note the region and required traversal instead of following an unverified 100% checklist.",
          },
        ],
        image: {
          src: "/images/gameplay/gap-realm.jpg",
          alt: "The Gap build-management space in CONTROL Resonant",
          caption:
            "The Gap is where unlocked options become a working loadout. Change one layer, then test why it helped or failed.",
        },
        links: [
          {
            label: "See known mission types",
            href: "/guides/story-walkthrough",
          },
        ],
      },
      {
        id: "assist-mode",
        eyebrow: "07 / Accessibility",
        title: "Use Assist Mode for the problem you actually have",
        paragraphs: [
          "Remedy has described separate controls for enemy aggression, projectile speed, dodge timing, incoming and outgoing damage, Falter, power recovery and melee targeting. Options also include high-impact assistance such as immortality and one-hit settings. They can be changed during play and Remedy says Assist Mode does not block trophies or achievements.",
          "If an encounter feels unreadable, lower pressure before changing damage. If timing is the issue, adjust the dodge window. If you understand the pattern but cannot keep a resource cycle going, review power recovery and melee positioning. This is more useful than assuming one difficulty label will solve every type of friction.",
        ],
        links: [
          {
            label: "Review the published Assist Mode controls",
            href: "/game-info/system-requirements#assist-title",
          },
        ],
      },
    ],
    related: [
      {
        label: "Combat & Builds",
        href: "/guides/combat-builds",
        note: "Turn the four systems into a loadout.",
      },
      {
        label: "Characters Wiki",
        href: "/wiki/characters",
        note: "Separate confirmed roles from story theories.",
      },
      {
        label: "Game Info",
        href: "/game-info/release-date",
        note: "Check the edition, platform and PC facts.",
      },
    ],
  },
  "combat-builds": {
    updatedAt: "2026-09-22",
    readTime: "15 min read",
    answer:
      "We build around the problem in front of us, not an unexplained tier list. Pick an Aberrant Form for its range and target pattern, add a Combat Ability for control or defense, then use Talents and Artifacts to reinforce the melee-to-Power loop. Flurry, Slash, Slice, Crush, Drill and Extend are the six named early choices; the reviews we compared support several combinations, not one universal best build.",
    route: [
      "Choose a Form",
      "Add an ability",
      "Spend Talents",
      "Fit Artifacts",
      "Test against threats",
    ],
    chapters: [
      {
        id: "combat-loop",
        eyebrow: "01 / The rule",
        title: "How does the melee-to-power loop work?",
        paragraphs: [
          "The combat footage puts the Aberrant at the center: melee pressure restores the resource for supernatural actions, abilities interrupt or protect at range, and Falter creates the next opening. In our view, a build is incomplete if it names high-damage moves but cannot keep that loop moving.",
          "We judge a loadout with four questions: can it reach the target, recover Power without unsafe hits, break Falter in time, and create an execution window when health is low? Those questions are more useful than pretending the available review builds give us a universal DPS ranking.",
        ],
      },
      {
        id: "aberrant-forms",
        eyebrow: "02 / Weapon",
        title: "Which Aberrant Form fits your fight?",
        paragraphs: [
          "We found three early Primary Forms and three Secondary Forms in the Xbox hands-on. Those labels describe loadout roles, not six separate weapons to collect, and Combo Enders add another layer. The table below is our read of the shown tactical roles, not a final tier list.",
        ],
        table: {
          headers: ["Form", "Preview role", "Use it when"],
          rows: [
            [
              "Flurry",
              "Fast paired blades, close range",
              "You can stay near one target and want short attack windows",
            ],
            [
              "Slash",
              "Wide scythe-like sweeps",
              "Several enemies occupy the same space",
            ],
            [
              "Slice",
              "Heavy axe-like single-target hits",
              "You can create a clear opening against one threat",
            ],
            [
              "Crush",
              "Slow, large mallet",
              "You can trade speed for a heavy impact",
            ],
            [
              "Drill",
              "Sustained directed pressure",
              "You can keep a target lined up",
            ],
            [
              "Extend",
              "Whip-like chain staff with reach",
              "You need more space between Dylan and the target",
            ],
          ],
        },
        links: [
          {
            label: "Compare the Form definitions",
            href: "/wiki/combat/aberrant-forms",
          },
        ],
        image: {
          src: "/images/gameplay/aberrant-scythe.jpg",
          alt: "Dylan uses an Aberrant weapon form in official gameplay imagery",
          caption:
            "Official gameplay imagery illustrates a Form; the comparison is based on published hands-on descriptions, not damage testing.",
        },
      },
      {
        id: "combat-abilities",
        eyebrow: "03 / Power",
        title: "Add a Combat Ability that solves a gap",
        paragraphs: [
          "Major Resonants are tied to Combat Ability rewards, and some first-run choices branch. In the first-party preview, Barrage launches projectiles, Seekers act as mobile summons that can be thrown or detonated, and Shield provides defense that can become an offensive dash. These are observed choices, not a full launch ability list.",
          "We would choose the ability that covers what the Aberrant Form cannot. A close-range setup may need an answer to distant pressure, a slower Form may need protection while closing, and a crowd-focused setup may need to isolate one dangerous target. We are not assuming every ability fits at once, or that a previewed choice stays irreversible in the released game.",
        ],
        image: {
          src: "/images/abilities/seekers-loadout.jpg",
          alt: "Combat Ability selection shown in CONTROL Resonant preview material",
          caption:
            "Ability choices cover different tactical gaps. The visible preview options are not a complete retail ability list.",
        },
        links: [
          {
            label: "See the ability comparison",
            href: "/wiki/combat/combat-abilities",
          },
        ],
      },
      {
        id: "falter-execution-dominance",
        eyebrow: "04 / Vulnerable enemies",
        title: "How do Execution and Dominance work after Falter breaks?",
        paragraphs: [
          "Falter is the opening, not the reward by itself. Against an eligible normal enemy, an execution starts Dominance. That short state raises Dylan's melee damage and makes enemies defeated during the window a dependable source of health, so the next target matters as much as the execution itself.",
          "Bosses use Falter differently: breaking it creates a staggered damage window instead of the normal execution sequence. If crowd pressure is the larger problem, use a Command or summon ability to add an ally; Dominance itself does not convert an enemy.",
        ],
        table: {
          headers: ["Combat state", "Immediate value", "Player check"],
          rows: [
            [
              "Execution",
              "Removes an eligible normal enemy and starts Dominance",
              "Choose the next target before committing to the animation",
            ],
            [
              "Dominance",
              "Temporary melee boost and dependable health drops",
              "Spend the short window on a dangerous target without losing access to weaker enemies",
            ],
            [
              "Boss Falter",
              "Staggered damage window",
              "Use the safe opening; do not expect a normal-enemy execution",
            ],
          ],
        },
        links: [{ label: "Compare combat systems", href: "/wiki/combat" }],
      },
      {
        id: "talents",
        eyebrow: "05 / Progression",
        title: "Spend Talents against a real bottleneck",
        paragraphs: [
          "Zone activities feed progression into Talents. We can see Primary, Secondary and Combo Ender branches plus a Respec All control, but the previews do not give us every launch cost or recovery rule. We would record why we bought a node instead of treating a preview tree as a solved final build.",
          "If you struggle to reach enemies, test movement or a longer Form before spending only on damage. If fights stall after power runs out, examine the melee loop. If one boss move ends every attempt, survivability and Assist Mode may matter more than another attack node.",
        ],
        links: [
          {
            label: "Read the Talent system file",
            href: "/wiki/combat",
          },
        ],
      },
      {
        id: "artifacts",
        eyebrow: "06 / Passive layer",
        title: "Fit Artifacts to the build, not the other way around",
        paragraphs: [
          "Artifacts are passive modifiers made from Untapped Artifacts in the Gap. The published first-run loadout has three equipped slots, with a fourth in New Game Plus. A named pre-order or Deluxe Artifact is not proof that a particular effect is essential to beat the campaign.",
          "Read the condition on each effect. A large bonus you rarely trigger can be worse than a modest effect that supports your normal rhythm. We do not have reliable final rolls, crafting rates, or best-in-slot values yet, so we are comparing decisions rather than inventing an item ranking.",
        ],
        links: [
          {
            label: "Understand Artifact states and slots",
            href: "/wiki/combat/artifacts",
          },
        ],
      },
      {
        id: "enemy-reading",
        eyebrow: "06 / Field test",
        title: "Test the loadout against different threats",
        paragraphs: [
          "The Hiss and Mold are returning threats, while Resonants are major encounters linked to power progression. A summon, a faction and a named boss are different categories; a build that handles one preview arena may not answer another threat. Use a simple test: one target, a group, a ranged attacker and a hazard-heavy encounter.",
          "Watch whether the Form reaches safely, whether your chosen ability controls the most dangerous threat, and whether the setup recovers after a failed dodge. Record what happened and the platform or build version. That evidence is more useful than calling an untested preview combination 'meta.'",
        ],
        image: {
          src: "/images/enemies/hiss-encounter.jpg",
          alt: "Dylan facing hostile forces in a Manhattan encounter",
          caption:
            "A useful field test changes target count, range and arena pressure instead of judging a build against one enemy type.",
        },
        links: [
          { label: "Browse enemy and boss files", href: "/wiki/enemies" },
        ],
      },
      {
        id: "dodge-and-assist",
        eyebrow: "07 / Defense",
        title: "Dodge first; do not plan around a parry",
        paragraphs: [
          "Remedy has said Resonant does not use a conventional parry mechanic. The demonstrated defense rhythm relies on movement, dodge timing, positioning and supernatural tools. A Shield ability is not the same thing as a universal timed parry.",
          "When a fight feels unfair, isolate the cause before changing the whole build. Repeated projectile hits call for spacing or projectile-speed adjustment; missed timing calls for dodge-window practice or Assist Mode; running out of power calls for a safer melee recovery route.",
        ],
        table: {
          headers: [
            "What keeps ending the attempt?",
            "Check in the fight",
            "Adjustment to test",
          ],
          rows: [
            [
              "Projectiles before you close in",
              "Where is the nearest safe approach, and when does the attacker commit?",
              "Change spacing or test Assist Mode projectile speed; do not assume a damage-only build fixes the approach.",
            ],
            [
              "A missed dodge",
              "Is the problem the attack cue or the timing window?",
              "Practise the cue, then adjust the Perfect Dodge Window if timing remains the barrier.",
            ],
            [
              "No power for an ability",
              "Can you safely land melee hits between enemy attacks?",
              "Shorten the attack string and use melee to restore Combat Ability resource rather than waiting for a passive refill.",
            ],
            [
              "Arena floor or moving hazard",
              "Which part of the arena remains usable while the attack resolves?",
              "Preserve an exit path before committing to a Combo Ender; the Central Resonant preview demonstrates why the floor matters.",
            ],
          ],
        },
        links: [
          {
            label: "Check Assist Mode options",
            href: "/game-info/system-requirements#assist-title",
          },
          {
            label: "Read the Central Resonant encounter briefing",
            href: "/wiki/enemies/central-resonant",
          },
        ],
      },
      {
        id: "new-game-plus",
        eyebrow: "08 / Second run",
        title: "What changes for builds in New Game Plus?",
        paragraphs: [
          "Remedy says combat progression carries forward while story-gated traversal resets. New Game Plus adds Talent possibilities and a fourth Artifact slot, and it can open combinations around earlier ability choices. This creates space for a broader build, not a guarantee that every area is immediately reachable.",
          "Before starting a second run, note which parts of your setup came from combat progression and which came from a story unlock. Keep a draft of the Forms, Abilities and Artifacts you want to compare. Wait for retail verification before assuming an exact reset list, reward route or boss drop.",
        ],
        links: [
          {
            label: "Read the NG+ carry-over matrix",
            href: "/wiki/combat/new-game-plus",
          },
        ],
      },
    ],
    related: [
      {
        label: "Combat Wiki",
        href: "/wiki/combat",
        note: "Look up each system and named ability.",
      },
      {
        label: "Story Route",
        href: "/guides/story-walkthrough",
        note: "Find the encounters that shape your build.",
      },
    ],
  },
  "story-walkthrough": {
    updatedAt: "2026-09-21",
    readTime: "12 min read",
    answer:
      "We start by separating Dylan's Journey from Jesse Quests, World Quests, Faults and short Zone activities. Jesse Quests can unlock movement, World Quests carry optional stories, and arcade-style activities help with practice and progression. We use review footage to explain those categories without turning it into a made-up mission order.",
    route: [
      "Read the quest structure",
      "Understand the Zones",
      "Match objectives to routes",
      "Keep spoilers controlled",
    ],
    chapters: [
      {
        id: "coverage",
        eyebrow: "01 / Coverage boundary",
        title: "What can this walkthrough confirm before direct route testing?",
        paragraphs: [
          "Remedy calls the campaign Dylan's Journey and separates it from Jesse Quests, World Quests, Faults, bounties, puzzles, challenges and discoveries. The full-game coverage helped us understand those categories, but it still does not give us a reproducible objective order, every entrance, or a complete reward table.",
          "For now, we use this page as a route map for known activity types and demonstrated landmarks. We are leaving out numbered chapters, exact coordinates, dialogue solutions and guaranteed drops until we can record the platform, patch, entry condition and repeatable steps.",
        ],
      },
      {
        id: "quest-types",
        eyebrow: "02 / Mission structure",
        title: "Dylan's Journey, World Quests and Faults",
        paragraphs: [
          "Dylan's Journey is the narrative campaign. Jesse Quests are optional routes tied to traversal powers. World Quests are self-contained stories, while Faults are distinct spaces or activity routes; Metro Fault is the named example shown publicly. Bounties, arcade challenges and discoveries are shorter Zone activities, not campaign chapters.",
          "This distinction matters when a player is stuck: a story gate, an optional narrative lead and a traversal challenge may each need a different next step. Check the activity label and the Zone before assuming a detour is required for the main campaign.",
        ],
        table: {
          headers: ["Activity", "Known purpose", "What is not yet documented"],
          rows: [
            [
              "Dylan's Journey",
              "Main narrative through Manhattan",
              "Full chapter order and objectives",
            ],
            [
              "Jesse Quests",
              "Optional traversal-power routes",
              "Complete quest list and prerequisites",
            ],
            [
              "World Quests",
              "Optional self-contained stories",
              "Every quest name, trigger and reward",
            ],
            [
              "Faults",
              "Distinct challenge routes",
              "Complete list, entrances and solutions",
            ],
            [
              "Bounties, challenges and discoveries",
              "Short Zone activities, practice and exploration",
              "Retail counts and exact coordinates",
            ],
          ],
        },
        links: [
          {
            label: "Compare mission categories",
            href: "/wiki/missions/world-quests-and-faults",
          },
        ],
      },
      {
        id: "zones",
        eyebrow: "03 / Geography",
        title: "How should you move through Manhattan Zones?",
        paragraphs: [
          "Remedy describes large, visually distinct handcrafted Zones rather than one flat open-world checklist. The FBC field office serves as a connecting hub. Gravity Anomalies and abilities such as Reach and Shift change traversal, so an inaccessible path may be a later return point rather than a missed jump.",
          "When we enter a new Zone, we would note the hub exit, current story marker, optional leads, and any traversal obstacle we cannot solve yet. Come back after a movement unlock. It is a simple way to stay oriented without pretending every alley, secret, and fast-travel point is already mapped.",
        ],
        table: {
          headers: ["If your clue is…", "First identify…", "Then open…"],
          rows: [
            [
              "A different Zone name",
              "The current in-game objective and whether you are leaving a Zone",
              "The locations index and FBC field office file",
            ],
            [
              "Metro or moving trains",
              "Whether the activity is the previewed Metro Fault",
              "The Metro Fault file; Reach is its demonstrated traversal reward",
            ],
            [
              "An unreachable gap",
              "Your current movement tools, not a guessed collectible pin",
              "The Reach file and the first-run return checklist",
            ],
          ],
        },
        image: {
          src: "/images/map/manhattan-overlook.jpg",
          alt: "Official image of a transformed Manhattan area",
          caption:
            "Manhattan is organized into distinct Zones. This image is not an interactive or coordinate-accurate map.",
        },
        links: [
          {
            label: "Understand the FBC field office",
            href: "/wiki/world/fbc-field-office",
          },
          {
            label: "Match an obstacle to a location file",
            href: "/map#confirmed-locations",
          },
        ],
      },
      {
        id: "opening",
        eyebrow: "04 / Previewed opening",
        title: "What happens in the demonstrated opening?",
        paragraphs: [
          "The first-party hands-on describes Dylan leaving confinement, receiving the Aberrant, making contact with Zoe and entering the Manhattan crisis. Early movement tutorials introduce the idea that space can be navigated in unusual directions. This is a preview sequence, not a substitute for the final game's objective text.",
          "A newcomer should focus on learning where the route teaches basic melee, dodge and movement rather than chasing supposed hidden rewards from preview footage. The exact sequence can change between a media build and the retail version.",
        ],
        image: {
          src: "/images/gameplay/paranatural-combat.jpg",
          alt: "Dylan entering the paranatural conflict in CONTROL Resonant",
          caption:
            "Opening footage establishes the learning sequence, but final objective wording and optional paths require the released build.",
        },
      },
      {
        id: "metro-fault",
        eyebrow: "05 / Known activity",
        title: "Metro Fault and the Reach traversal unlock",
        paragraphs: [
          "An IGN First mission preview shows a Metro Fault route with distorted transit spaces, train hazards and Mold threats. Reach appears as a traversal reward that changes how Dylan moves between separated points. It should not be filed as a normal Combat Ability slot or a generic collectible.",
          "Our takeaway is to read the environment before committing to movement: find the safe platform, watch the hazard cycle, and check what the new traversal tool can reach. The preview does not show a complete entrance, every puzzle, or a reliable clear time, so we are not turning a montage into step-by-step directions.",
        ],
        links: [
          {
            label: "Metro Fault details",
            href: "/wiki/missions/metro-fault",
          },
          { label: "How Reach works", href: "/wiki/combat/reach" },
        ],
      },
      {
        id: "central-resonant",
        eyebrow: "06 / Previewed encounter",
        title: "What is known about the Central Resonant fight?",
        paragraphs: [
          "From the boss preview, the Central Resonant clearly turns the arena itself into a problem with fire and magma hazards. We would watch the floor and attack cues first, but we do not yet have reliable health, resistance, safe-spot, or reward data.",
          "Once the final fight can be checked directly, we will want the approach route, attack cues, recovery windows, and version changes. Until then, we are treating this as an encounter briefing and would not build an entire progression plan around an assumed drop.",
        ],
        image: {
          src: "/images/bosses/resonant-fire.jpg",
          alt: "Central Resonant encounter with fire and ground hazards",
          caption:
            "The arena and visible hazards can be described now; exact phases, weaknesses and rewards need final-game testing.",
        },
        links: [
          {
            label: "Central Resonant encounter",
            href: "/wiki/enemies/central-resonant",
          },
          {
            label: "Compare other shown Boss encounters",
            href: "/bosses",
          },
        ],
      },
      {
        id: "playtime",
        eyebrow: "07 / Time budget",
        title: "How long should you allow for the story?",
        paragraphs: [
          "In its September 15 PS5 briefing, Remedy estimated 25–35 hours for the main story, with more for completionists. An earlier developer interview described roughly 30 hours for the core experience and around 50 for completionist play. The two statements describe different scopes, not measured completion times from the retail population.",
          "World Quests, puzzles, optional encounters and exploration can extend a first playthrough. New Game Plus is an additional replay path; do not automatically count a full second run inside a first-run completion estimate.",
        ],
      },
      {
        id: "spoiler-route",
        eyebrow: "08 / Reading method",
        title: "Keep a spoiler-aware route as you play",
        paragraphs: [
          "The campaign can offer more than one priority lead. Follow the objective that advances the system or Zone you need, and use Jesse Quests when a missing traversal power is the obstacle. Write down optional story leads rather than treating every icon as urgent.",
          "Use the in-game objective log for your current step and this site's mission files for the activity type. Reviews confirm that Manhattan remains explorable after the ending, so optional cleanup does not have to interrupt every campaign beat; exact missable exceptions still need direct testing.",
        ],
        links: [{ label: "Compare mission types", href: "/wiki/missions" }],
      },
    ],
    related: [
      {
        label: "Missions Wiki",
        href: "/wiki/missions",
        note: "Identify an activity before following it.",
      },
      {
        label: "Completion Planning",
        href: "/guides/completion",
        note: "Organize optional content and NG+.",
      },
      {
        label: "Manhattan World",
        href: "/wiki/world",
        note: "Understand Zones and traversal.",
      },
    ],
  },
  completion: {
    updatedAt: "2026-09-22",
    readTime: "11 min read",
    answer:
      "We cannot honestly call any route 100% complete without checking the finished game directly. For now, we track World Quests, Jesse Quests, Faults, Zone activities, optional Resonants, Artifacts and New Game Plus. The reviews we checked support post-ending exploration, but exact counts, rewards and missable conditions still need repeatable routes.",
    route: [
      "Define the scope",
      "Log optional activities",
      "Plan NG+",
      "Verify launch counts",
    ],
    chapters: [
      {
        id: "scope",
        eyebrow: "01 / Honest baseline",
        title: "What does completion mean before a verified 100% route exists?",
        paragraphs: [
          "The reviews give us the main activity families and say exploration continues after the ending, but they do not give us an authoritative collectible total, complete mission list, or repeatable trophy route. We would rather separate the activities we know from the totals we do not than publish an impressive-looking fake percentage.",
          "Decide which personal goal you mean: finish Dylan's Journey, see optional narratives, clear discoverable Zones, test every known combat system, or prepare a second run. Those can be useful goals even before a verified 100% definition exists.",
        ],
        table: {
          headers: ["Category", "Known now", "Needs retail verification"],
          rows: [
            [
              "Main story",
              "Dylan's Journey is the campaign",
              "Chapter list and branch outcomes",
            ],
            [
              "Optional stories",
              "World Quests exist",
              "Names, triggers and total",
            ],
            [
              "Faults and Zones",
              "Metro Fault and distinct Zones are shown",
              "Complete entrances and discoveries",
            ],
            [
              "Resonants",
              "Major encounters affect abilities",
              "Full boss list and reward choices",
            ],
            [
              "Artifacts",
              "Crafting and slot rules are described",
              "Final item list and acquisition rates",
            ],
          ],
        },
      },
      {
        id: "optional-content",
        eyebrow: "02 / Field log",
        title: "Track World Quests, Faults and Zone activities",
        paragraphs: [
          "World Quests are optional narrative threads; Faults are distinct activity spaces. Manhattan also contains encounters, puzzles, Gravity Anomalies and discoveries. The first practical task is classification: record where you found an activity, what condition stopped you and whether it appears story-gated or traversal-gated.",
          "We would not mark an area as permanently missed just because it was unreachable the first time. Reach, Shift and other movement changes can turn an old obstacle into a new route. In a completion log, we recommend 'seen', 'blocked', 'ready to revisit' and 'cleared' instead of one simple checkbox.",
          "Near-instant Zone travel and the Gap are confirmed, but Remedy has not published first-run access rules for every side activity. NG+ explicitly resets story-linked traversal abilities. A blocked first-run path is therefore a reason to check your current movement and objective, not proof that the path is permanently missable—or guaranteed to remain open.",
        ],
        table: {
          headers: ["Situation", "What is established", "Next decision"],
          rows: [
            [
              "An optional route is out of reach",
              "Traversal powers can change accessible space; Reach is tied to the Metro Fault preview",
              "Keep following the current objective and recheck after a movement unlock",
            ],
            [
              "You want to return to an earlier Zone",
              "Remedy describes near-instant travel between Zones",
              "Use the in-game travel options; exact markers and all gates require retail verification",
            ],
            [
              "You are starting NG+",
              "Combat progression carries over, story-linked traversal does not",
              "Expect to reopen movement routes through story progress",
            ],
            [
              "You fear a permanently missable pickup",
              "A complete missables list has not been verified",
              "Do not trust a pre-release all-collectibles claim; wait for a tested item-specific route",
            ],
          ],
        },
        image: {
          src: "/images/map/gravity-anomaly-street.jpg",
          alt: "A gravity-altered Manhattan street in CONTROL Resonant",
          caption:
            "Record the Zone, activity and movement gate separately. A blocked route is not automatically a missed collectible.",
        },
        links: [
          {
            label: "Compare quest and activity types",
            href: "/wiki/missions/world-quests-and-faults",
          },
          {
            label: "Check the location return rules",
            href: "/map#confirmed-locations",
          },
        ],
      },
      {
        id: "bosses",
        eyebrow: "03 / Encounters",
        title: "Treat Resonant choices as route decisions",
        paragraphs: [
          "Resonants are major bosses whose defeat affects Dylan's Combat Abilities. Remedy has described first-run choices and wider options in New Game Plus, so we would note the ability we chose and the alternative left behind without assuming every preview boss already has a known reward table.",
          "Completed-review coverage reports that defeating Resonants can advance the world's escalation and strengthen later enemies. We would check whether Aberrant upgrades, health, Power and Talents are keeping pace before clearing every optional fight; exact escalation values still need direct testing on a known game version.",
          "We have seen the Central Resonant and another early entity, but we are keeping them separate instead of padding out a full boss list. When the retail game is available, we will record the encounter name, Zone, prerequisite, ability choice, and whether the second run changes the outcome.",
        ],
        image: {
          src: "/images/bosses/resonant-many-arms.jpg",
          alt: "A multi-limbed Resonant shown in CONTROL Resonant imagery",
          caption:
            "A shown encounter belongs in the verified inventory; it does not establish the complete boss order or reward table.",
        },
        links: [{ label: "Browse named enemy files", href: "/wiki/enemies" }],
      },
      {
        id: "artifacts",
        eyebrow: "04 / Inventory",
        title: "Separate equipped Artifacts from discoveries",
        paragraphs: [
          "An Untapped Artifact is a crafting input, not automatically an equipped passive item. The Gap is the place Remedy has shown for turning discoveries into build changes. Three Artifacts can be equipped in the first run; a fourth slot opens in New Game Plus.",
          "If you are collecting for build options, record the item name, how it was obtained and what effect it produced in your own version. Do not infer a universal drop location or roll rate from a promotional screenshot, a pre-order bonus or a single media demo.",
        ],
        links: [
          {
            label: "Artifact rules and named items",
            href: "/wiki/combat/artifacts",
          },
        ],
      },
      {
        id: "new-game-plus",
        eyebrow: "05 / Second pass",
        title: "Plan New Game Plus without assuming full access",
        paragraphs: [
          "Remedy says combat progression carries over while traversal tied to the story must be earned again. Additional Talent options and a fourth Artifact slot expand the second-run build. Some encounter and choice outcomes can differ, so NG+ may be necessary for a personal 'see both options' goal.",
          "A second run is not just a clean-up sweep across an already open map. Before starting, record unfinished World Quests, the ability choice you made and the build you want to test. After starting, distinguish what carried over from what has to be reopened through the story.",
        ],
        links: [
          {
            label: "Review the NG+ carry-over matrix",
            href: "/wiki/combat/new-game-plus",
          },
        ],
      },
      {
        id: "personal-checklist",
        eyebrow: "06 / Your own record",
        title: "Separate known activities from a complete checklist",
        paragraphs: [
          "We separate named missions and places from broader activity types in the Wiki, but we do not have a complete game-wide count yet. We would treat any 'everything' checklist as provisional unless its route, game version, and completion evidence can be reproduced.",
          "Use the in-game objective log as your personal record and the mission and location indexes to understand each activity type. A useful checklist still needs exact prerequisites, locations, rewards and missable conditions rather than a copied list of names.",
        ],
        links: [
          { label: "Browse missions", href: "/wiki/missions" },
          { label: "Browse locations", href: "/wiki/world" },
        ],
      },
      {
        id: "launch-verification",
        eyebrow: "07 / What comes next",
        title: "What a verified 100% route must prove",
        paragraphs: [
          "Every completion entry needs a reproducible route: game version, prerequisite, area, exact interaction, reward and whether an earlier choice can prevent it. Counts should come from a finished run or a verified in-game counter, not from guesses based on leaked achievements or review footage.",
          "Until that evidence exists, we are keeping this page focused on completion planning. We will not label a partial list 'all collectibles' or calculate a game-wide total from personal goals. The next useful update is a checked activity inventory, followed by route order and missable checks.",
        ],
      },
    ],
    related: [
      {
        label: "Story Route",
        href: "/guides/story-walkthrough",
        note: "Separate main, optional and previewed paths.",
      },
      {
        label: "Combat & Builds",
        href: "/guides/combat-builds",
        note: "Prepare the second-run loadout.",
      },
    ],
  },
};
