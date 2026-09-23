import { siteConfig } from "@/config/site";

const contactEmail = siteConfig.email;

export type LegalPageKind = "policy" | "editorial" | "contact";

export type LegalHighlight = {
  label: string;
  value: string;
};

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  note?: string;
};

export type LegalPageContent = {
  kind: LegalPageKind;
  eyebrow: string;
  categoryLabel: string;
  title: string;
  intro: string;
  effectiveAt: string;
  updatedAt: string;
  highlights: readonly LegalHighlight[];
  sections: readonly LegalSection[];
};

export const legalPages = {
  "privacy-policy": {
    kind: "policy",
    eyebrow: "Privacy / CONTROL Resonant Guide",
    categoryLabel: "Legal",
    title: "Privacy Policy",
    intro:
      "A plain-English account of what information reaches us when you browse the guide, use search, play an embedded video, or contact the team.",
    effectiveAt: "September 2026",
    updatedAt: "September 2026",
    highlights: [
      { label: "Accounts", value: "None required" },
      { label: "First-party ads", value: "Not currently used" },
      { label: "Contact", value: "Email only" },
    ],
    sections: [
      {
        id: "scope-and-operator",
        title: "Scope and operator",
        paragraphs: [
          `This policy applies to CONTROL Resonant Guide, an independent fan site operated under the Frontline Pathfinder editorial name. It covers the information handled through this website and through messages sent to ${contactEmail}. It does not control Remedy Entertainment, YouTube, retailers, platform holders, hosting providers, or any other third-party service.`,
          "You can read the site without creating an account. We do not provide public comments, community profiles, newsletter registration, checkout, payment processing, or a customer account system. The site is written for a general gaming audience and is not designed as a service for children.",
        ],
      },
      {
        id: "information-you-provide",
        title: "Information you choose to provide",
        paragraphs: [
          "If you email us, we receive the information you include, such as your email address, message, page links, screenshots, device details, or other attachments. We use that information to answer the message, investigate a correction, diagnose a site problem, consider accessibility feedback, or review a privacy or rights concern.",
          "Please do not send passwords, payment-card information, government identifiers, game-account credentials, or personal information that is not needed for the request. We do not use correspondence to build advertising profiles or add people to a marketing list.",
        ],
      },
      {
        id: "browsing-search-and-logs",
        title: "Browsing, search, and technical logs",
        paragraphs: [
          "Site search filters a bundled index in your browser. We do not run a separate search-account service or store a personal search history. A search term can appear in the page URL, however, so it may be retained by your browser, included in a bookmark, or shared if you copy that URL.",
          "Normal website delivery can create technical records at the hosting or network-provider level. Those records may include an IP address, request time, browser or device information, referring page, requested URL, and error or security events. They are used to deliver the site, prevent abuse, investigate faults, and maintain service security. Provider-level retention and access are governed by the relevant provider's systems and policies.",
        ],
      },
      {
        id: "cookies-storage-and-measurement",
        title: "Cookies, storage, and measurement",
        paragraphs: [
          "We do not currently operate a first-party advertising network or a dedicated analytics dashboard, and the site does not intentionally set advertising cookies for Frontline Pathfinder. Basic browser storage or network controls may still be used by the browser, hosting platform, or security infrastructure as part of delivering the site.",
          "If we add analytics, advertising, accounts, forms, or another feature that materially changes data collection, we will revise this policy before or when that feature is introduced and provide any choices required by the feature and applicable law.",
        ],
      },
      {
        id: "videos-and-external-services",
        title: "Videos and external services",
        paragraphs: [
          "A YouTube player is not loaded merely because you open a page. When you choose to play a video, your browser connects to a youtube-nocookie.com embed. YouTube or its service providers may then process connection, device, security, and playback information under their own policies. You can avoid that connection by not starting the player.",
          "Links to stores, official game pages, videos, source material, and other websites take you outside this site. The destination controls its own collection, cookies, accounts, and privacy choices. Review that service's policy before providing it with personal information.",
        ],
      },
      {
        id: "use-and-disclosure",
        title: "How information is used and disclosed",
        paragraphs: [
          "We use the limited information available to operate and secure the site, respond to messages, correct content, enforce our terms, and comply with a valid legal obligation. We do not sell personal information, and we do not share email correspondence for cross-context behavioral advertising.",
          "Information may be accessible to service providers that support hosting, email, security, or technical troubleshooting, subject to their role in providing those services. We may also disclose information when reasonably necessary to protect the site or another person, investigate misuse, or respond to lawful process. If the site changes operator, relevant records may transfer with the site subject to this policy or a replacement notice.",
        ],
      },
      {
        id: "retention-and-security",
        title: "Retention and security",
        paragraphs: [
          "We keep correspondence only for as long as reasonably needed to handle the request, document a correction or rights decision, protect the site, or meet a legal obligation. Routine technical records are retained according to the hosting or service provider's operational and security practices. We do not promise a single fixed retention period for every record because the purpose and provider differ.",
          "We use reasonable organizational and technical precautions appropriate to this small informational site, including limiting access to correspondence. No transmission, email system, or storage platform can be guaranteed completely secure, so please limit messages to information necessary for the issue.",
        ],
      },
      {
        id: "your-choices-and-requests",
        title: "Your choices and requests",
        paragraphs: [
          `You may ask what information you sent us, request a correction, or ask us to delete it by emailing ${contactEmail}. Include enough context to identify the correspondence, but do not send additional sensitive information. We may need to verify that the request relates to you and may retain limited records where reasonably necessary for security, legal compliance, or dispute documentation.`,
          "You can avoid optional video connections, clear browser data through your browser settings, remove search terms before sharing a search URL, and choose not to email us. These choices are available regardless of whether a particular state privacy law applies to the site.",
        ],
      },
      {
        id: "children-privacy",
        title: "Children's privacy",
        paragraphs: [
          "CONTROL Resonant Guide is a general-audience game information site. We do not knowingly ask children under 13 to create an account or submit personal information, and the site has no feature intended for children to publish information publicly.",
          `If you are a parent or guardian and believe a child sent personal information to us, contact ${contactEmail} with enough detail to locate the message. We will review the request and take appropriate deletion steps.`,
        ],
      },
      {
        id: "changes-and-contact",
        title: "Policy changes and contact",
        paragraphs: [
          "We may update this policy when site features, providers, or legal requirements change. The effective and last-updated labels at the top identify the published version. Material changes will be reflected here rather than silently described as an existing practice.",
          `For a privacy question or request, email ${contactEmail} with the subject “Privacy request” and identify the page or correspondence involved. This page explains our current practices; it is not a claim that every privacy statute applies to this site in every jurisdiction.`,
        ],
      },
    ],
  },
  "terms-of-service": {
    kind: "policy",
    eyebrow: "Terms / CONTROL Resonant Guide",
    categoryLabel: "Legal",
    title: "Terms of Service",
    intro:
      "The ground rules for using our player-written guides, Wiki pages, tools, images, and other material on this independent fan site.",
    effectiveAt: "September 2026",
    updatedAt: "September 2026",
    highlights: [
      { label: "Purpose", value: "Player information" },
      { label: "Official status", value: "Independent fan site" },
      { label: "Transactions", value: "No game sales" },
    ],
    sections: [
      {
        id: "acceptance-and-scope",
        title: "Acceptance and scope",
        paragraphs: [
          "By using CONTROL Resonant Guide, you agree to these terms as they apply to your visit and use of the site's content. If you do not agree, do not use the site. These terms apply to the website and its original material; third-party stores, platforms, videos, and official game services apply their own terms.",
          "The site is operated under the Frontline Pathfinder editorial name as an independent fan resource. It is not operated by, affiliated with, or endorsed by Remedy Entertainment, the game's publisher, a platform holder, or an official CONTROL channel.",
        ],
      },
      {
        id: "permitted-use",
        title: "Permitted use",
        paragraphs: [
          "You may browse the site, save links, print a reasonable portion for personal reference, and quote short passages with clear attribution and a link to the original page. Ordinary search-engine indexing and accessibility tools are welcome when they do not impair service or misrepresent the content.",
          "Any permission in these terms applies only to material owned by this site. It does not grant rights in CONTROL, CONTROL Resonant, screenshots, trailers, music, characters, logos, promotional art, or other material owned by a third party.",
        ],
      },
      {
        id: "prohibited-use",
        title: "Prohibited use",
        paragraphs: [
          "Do not disrupt the site, probe or bypass security controls, introduce malicious code, overload infrastructure, evade access restrictions, or use automation in a way that materially harms availability. Do not impersonate Frontline Pathfinder, present this site as an official game service, or use its material to mislead players.",
          "Do not republish entire guides, systematically extract the site into a competing content product, rehost site graphics without permission, remove notices or attribution, or sell access to copies of our original material. A request for broader editorial or commercial reuse can be sent by email.",
        ],
      },
      {
        id: "editorial-information",
        title: "Editorial information, not an official promise",
        paragraphs: [
          "The site provides fan-written reporting, research, comparisons, and gameplay guidance. We work to distinguish confirmed facts, preview observations, tests, and unresolved details, but we do not guarantee that every route, value, requirement, release detail, or compatibility statement is complete or current at all times.",
          "Games change through patches, regional releases, store updates, and hardware or driver changes. A trailer, preview build, review copy, or external test may not match the version you play. Check the page date, your game version, and the relevant official or store information before relying on a time-sensitive detail.",
        ],
      },
      {
        id: "purchases-and-compatibility",
        title: "Purchases, editions, and compatibility",
        paragraphs: [
          "CONTROL Resonant Guide does not sell the game, process orders, issue keys, manage entitlements, or approve refunds. Prices, release timing, physical inventory, edition contents, promotions, regional availability, and subscription access can differ by retailer and platform.",
          "You are responsible for checking the seller's current listing, refund rules, regional restrictions, account requirements, storage space, hardware specifications, operating system, drivers, and accessibility needs before purchasing or installing the game. Our comparison tools are informational and are not a guarantee of performance.",
        ],
      },
      {
        id: "external-services",
        title: "External links and services",
        paragraphs: [
          "Links to official pages, stores, publications, source material, and optional video embeds are provided for context and convenience. We do not control their content, availability, security, pricing, data practices, or changes, and a link does not mean that the destination endorses us or that we endorse every statement it publishes.",
          "When you leave this site or start an embedded service, the third party's terms and privacy practices apply. Resolve orders, accounts, refunds, platform access, and official technical support directly with the responsible store, platform, or publisher.",
        ],
      },
      {
        id: "intellectual-property",
        title: "Intellectual property and fan-site status",
        paragraphs: [
          "Frontline Pathfinder retains rights in the site's original prose, original graphics, organization, and page design, subject to any third-party material they incorporate. CONTROL, CONTROL Resonant, associated characters, game imagery, videos, music, and trademarks remain the property of their respective rights holders.",
          "Use of a title, screenshot, or promotional asset identifies the subject of commentary and does not claim ownership, official status, sponsorship, or endorsement. The Copyright page explains reuse and rights-reporting in more detail.",
        ],
      },
      {
        id: "feedback-and-corrections",
        title: "Feedback and correction material",
        paragraphs: [
          "You retain ownership of original material you send in an email. By submitting a factual correction, route observation, screenshot, or technical detail for editorial review, you allow us to review it and use the factual information needed to investigate or correct the site. We will not intentionally publish your email address as attribution without permission.",
          "Only send material you have the right to share. Do not send confidential information, leaked builds, stolen credentials, unlawful content, or files that create a security risk. We may decline, delete, or stop responding to material that is abusive, irrelevant, deceptive, or unsafe.",
        ],
      },
      {
        id: "availability-and-disclaimers",
        title: "Availability and disclaimers",
        paragraphs: [
          "The site and its content are provided on an “as available” basis. We may correct, reorganize, suspend, or remove material for editorial, maintenance, security, or legal reasons. We do not promise uninterrupted access or that every error will be corrected immediately.",
          "To the extent permitted by applicable law, the site is provided without warranties of accuracy, availability, fitness for a particular purpose, or non-infringement. Nothing in these terms excludes a warranty, right, or remedy that applicable law does not allow to be excluded.",
        ],
      },
      {
        id: "limitation-and-severability",
        title: "Limitation and severability",
        paragraphs: [
          "To the extent permitted by applicable law, Frontline Pathfinder is not responsible for indirect, incidental, or consequential loss arising solely from reliance on fan-written content, site interruption, a third-party service, or a purchase made through another business. You remain responsible for your purchases, device configuration, saves, accounts, and in-game decisions.",
          "If a provision of these terms is found unenforceable, it should be limited to the minimum extent necessary and the remaining provisions continue to apply. A delay in enforcing a provision does not waive it.",
        ],
      },
      {
        id: "updates-and-contact",
        title: "Updates and contact",
        paragraphs: [
          `We may update these terms as the site changes. The effective and last-updated labels identify the current published version. Questions about these terms can be sent to ${contactEmail}; include the relevant page and a concise explanation of the issue.`,
        ],
      },
    ],
  },
  copyright: {
    kind: "policy",
    eyebrow: "Rights / CONTROL Resonant Guide",
    categoryLabel: "Legal",
    title: "Copyright",
    intro:
      "How ownership is divided between our original editorial work and third-party game material, plus the information we need to review a rights concern.",
    effectiveAt: "September 2026",
    updatedAt: "September 2026",
    highlights: [
      { label: "Original writing", value: "Frontline Pathfinder" },
      { label: "Game material", value: "Respective rights holders" },
      { label: "Rights reports", value: "Reviewed by email" },
    ],
    sections: [
      {
        id: "original-site-material",
        title: "Original site material",
        paragraphs: [
          "Unless otherwise identified, the site's original articles, guide text, research summaries, original diagrams, interface design, and site-specific graphics are created for CONTROL Resonant Guide by Frontline Pathfinder. Copyright protection and reuse permissions apply separately from the rights in game material discussed or shown within that work.",
          "A page being publicly accessible does not place its original text or graphics in the public domain. Automated generation of substantially similar copies, wholesale republication, or removal of authorship and rights notices is not permitted merely because the source page can be viewed without an account.",
        ],
      },
      {
        id: "third-party-games-and-marks",
        title: "Games, imagery, and trademarks",
        paragraphs: [
          "CONTROL, CONTROL Resonant, the CONTROL logo, characters, locations, screenshots, trailers, music, promotional artwork, and related trademarks or copyrighted assets belong to Remedy Entertainment and any other applicable rights holders. We do not claim ownership of those assets.",
          "Names and limited game or promotional material are used to identify the subject of independent reporting, commentary, comparison, and player guidance. Their appearance does not imply sponsorship, endorsement, partnership, or official status, and this site cannot grant permission to reuse third-party material.",
        ],
      },
      {
        id: "linking-and-short-quotation",
        title: "Linking and short quotation",
        paragraphs: [
          "You may link to public pages on this site. You may also quote a short, reasonable portion of our original text for commentary, reference, or discussion when you clearly name CONTROL Resonant Guide or Frontline Pathfinder and link to the source page where practical.",
          "That permission does not cover copying a complete guide, reproducing a substantial part across several posts, rehosting our images, selling a copied database, stripping notices, or presenting our work as your own or as official game documentation. Contact us before broader reuse, syndication, translation, or commercial publication.",
        ],
      },
      {
        id: "rights-report-requirements",
        title: "What to include in a rights report",
        paragraphs: [
          `If you believe material on this site infringes a right you own or are authorized to represent, email ${contactEmail}. A specific report helps us locate the material and understand the claim.`,
        ],
        bullets: [
          "Your name, role, and a reliable way to contact you.",
          "Identification of the protected work or right involved.",
          "The exact URL and a clear description of the material at issue.",
          "An explanation of why you believe the use is unauthorized.",
          "A statement describing your relationship to the rights holder.",
          "Any supporting reference that helps verify ownership or authority.",
        ],
        note: "Do not send passwords, payment details, or unrelated identity documents. We may request limited additional information if it is necessary to understand the report.",
      },
      {
        id: "review-and-response",
        title: "How we review a report",
        paragraphs: [
          "We review sufficiently specific, good-faith reports against the page, available source information, and the rights asserted. Depending on the circumstances, we may ask questions, correct attribution, replace or remove material, restrict access while reviewing it, or conclude that no change is warranted.",
          "We do not promise a particular outcome or response time, and we may preserve limited records of the report and decision for security, repeat-issue, or legal purposes. Knowingly false or materially misleading claims can harm both creators and lawful commentary, so reports should be accurate and made in good faith.",
        ],
      },
      {
        id: "dmca-status",
        title: "DMCA status and formal notices",
        paragraphs: [
          "The email on this page is a general rights-contact channel. It is not a statement that Frontline Pathfinder or CONTROL Resonant Guide has registered a designated agent with the U.S. Copyright Office, and it should not be described as a registered DMCA agent address.",
          "Formal notice requirements and available procedures depend on the service, activity, and jurisdiction involved. A party seeking to preserve specific legal rights should use the process required by applicable law and obtain qualified advice where necessary. This page is intended to make good-faith reports easier to evaluate, not to replace a statutory procedure.",
        ],
      },
      {
        id: "contact-and-permission",
        title: "Permission and contact",
        paragraphs: [
          `For a reuse request, attribution question, trademark concern, or rights report, contact ${contactEmail}. Identify the exact site material, proposed use, audience, format, and whether the use is commercial. Permission from this site can cover only rights that Frontline Pathfinder controls.`,
        ],
      },
    ],
  },
  "about-us": {
    kind: "editorial",
    eyebrow: "Editorial team / Frontline Pathfinder",
    categoryLabel: "Editorial team",
    title: "About Frontline Pathfinder",
    intro:
      "The independent players and researchers behind CONTROL Resonant Guide—and the standards we use before calling something tested, confirmed, or ready to follow.",
    effectiveAt: "September 2026",
    updatedAt: "September 2026",
    highlights: [
      { label: "Founded", value: "Early 2026" },
      { label: "Focus", value: "Player-tested guidance" },
      { label: "Status", value: "Independent team" },
    ],
    sections: [
      {
        id: "how-we-started",
        title: "How Frontline Pathfinder started",
        paragraphs: [
          "Frontline Pathfinder began in early 2026 as a small independent team of players, guide writers, and technically minded researchers. We gravitated toward games that reward careful exploration, system knowledge, route planning, and the patience to test an assumption twice before publishing it.",
          "The idea grew out of a problem we repeatedly met as players: broad gaming sites can be useful for headlines, but difficult routes, missable decisions, version-specific behavior, and unclear mechanics often need more than a quick summary. We wanted a cleaner place where a direct answer could lead into the evidence, the route, and the limits of what is actually known.",
        ],
      },
      {
        id: "why-control-resonant",
        title: "Why we built this guide",
        paragraphs: [
          "CONTROL Resonant combines close-range combat, build choices, altered traversal, and a Manhattan that does not behave like a conventional flat open world. Those systems are easy to reduce to a feature list. We focus on the questions that appear when someone actually plays: why a build stalls, which activity unlocks movement, what a preview proves, and what still needs a retail-game check.",
          "Game Info covers release details, editions, platforms, and hardware. Gameplay and Guides turn mechanics into decisions and routes. The Wiki connects people, powers, enemies, missions, and locations without pretending that every named topic already has a complete walkthrough.",
        ],
      },
      {
        id: "research-priorities",
        title: "Our research priorities",
        paragraphs: [
          "We begin with first-party announcements, official store listings, developer explanations, patch information, and clearly identified gameplay footage. We then compare those claims with completed reviews, reproducible hands-on observations, and player evidence that can be tied to a version or platform.",
          "A primary source can still become outdated, and a reviewer can still describe a preview build. We record publication timing, distinguish direct statements from our interpretation, and prefer the most current evidence that actually supports the claim being made.",
        ],
      },
      {
        id: "how-we-test",
        title: "What tested means here",
        paragraphs: [
          "We do not use “tested” as decoration. It should mean that our team reproduced the result on an identified game version, or that the page clearly attributes the observation to a named hands-on source. Before release, exact collectible totals, boss rewards, damage values, hidden conditions, and room-by-room routes remain open unless the available evidence genuinely supports them.",
          "After release, our strongest guides record the platform or version, prerequisite, route, interaction, and result. We repeat a check when an outcome could depend on difficulty, progression state, patch level, or a prior choice. If we have only compared footage or external testing, we say so instead of writing as though we performed the test ourselves.",
        ],
      },
      {
        id: "how-we-write",
        title: "How we work",
        paragraphs: [
          "We favor useful structure over padded copy: direct answers for time-sensitive facts, route checks for navigation, comparison tables for loadout decisions, and explicit boundaries where exact values or steps have not been reproduced. The goal is to help a player act, not to make every page look longer than the evidence allows.",
          "Every published page remains the responsibility of the Frontline Pathfinder editorial team. Research and production tools can help organize material, but they do not replace source checking, player judgment, or human review. We reject unsupported certainty, invented testing, and mechanically reworded claims that cannot be traced back to evidence.",
        ],
      },
      {
        id: "versions-and-corrections",
        title: "Versions, corrections, and open questions",
        paragraphs: [
          "Game systems change. Where a patch, platform, or pre-release build matters, we aim to name it. When better evidence changes an answer, we update the page rather than defend the older wording. Material corrections take priority when an error could affect a purchase, accessibility setting, build decision, missable objective, or route.",
          `To report a problem, email ${contactEmail} with the page URL, the statement at issue, and the game version or source that supports the correction. We may leave a point explicitly unresolved when available evidence conflicts or a repeatable test is still missing.`,
        ],
      },
      {
        id: "independence-and-funding",
        title: "Independent and player-first",
        paragraphs: [
          "Frontline Pathfinder and CONTROL Resonant Guide are not affiliated with, endorsed by, or operated by Remedy Entertainment or an official CONTROL channel. Product names and game imagery identify the subject of our reporting; ownership remains with the respective rights holders.",
          "The site currently does not run a first-party advertising network or an affiliate sales program. External store and source links are included because they help verify a claim or complete a player task, not because the team can manage the destination. If the site's funding or commercial relationships materially change, we will update the relevant disclosure.",
        ],
      },
      {
        id: "what-we-cannot-do",
        title: "What the team cannot do",
        paragraphs: [
          "We can research content errors, explain what our sources support, and investigate problems with this website. We cannot access a player's game account, issue a refund or key, change a platform entitlement, restore a save, confirm an unannounced feature on behalf of the developer, or provide official customer support.",
          "For an order, account, platform, or game-service problem, contact the responsible retailer, platform holder, publisher, or developer. Our role is to make the path through the available information clearer, not to stand in for the companies operating those services.",
        ],
      },
    ],
  },
  "contact-us": {
    kind: "contact",
    eyebrow: "Contact / Frontline Pathfinder",
    categoryLabel: "Contact",
    title: "Contact Us",
    intro:
      "One direct email for corrections, accessibility feedback, site problems, privacy requests, and rights concerns—without an account or web form.",
    effectiveAt: "September 2026",
    updatedAt: "September 2026",
    highlights: [
      { label: "Channel", value: "Email" },
      { label: "Account needed", value: "No" },
      { label: "Best first step", value: "Include the page URL" },
    ],
    sections: [
      {
        id: "email-the-team",
        title: "Email the team",
        paragraphs: [
          `Write to ${contactEmail}. There is no contact form or support account to create. A useful first message includes the page URL, a concise description of the issue, what you expected to find, and any evidence that helps us reproduce or verify it.`,
          "Messages are reviewed by the Frontline Pathfinder editorial team as capacity allows. We cannot guarantee an individual reply or a fixed response time. When a report results in a public content correction, the updated page is the primary record of that change.",
        ],
        note: "Please use a clear subject such as “Content correction,” “Accessibility issue,” “Privacy request,” or “Copyright concern.”",
      },
      {
        id: "content-corrections",
        title: "Content corrections",
        paragraphs: [
          "For an incorrect release fact, route, mechanic, name, requirement, or link, identify the exact sentence or section. Include the game version, platform, region, difficulty, progression state, or source when one of those details could explain a different result.",
          "We give priority to errors that can affect purchases, accessibility, missable progress, builds, or navigation. A disagreement without reproducible detail may remain open while we look for better evidence, especially before launch or immediately after a patch.",
        ],
      },
      {
        id: "technical-and-accessibility",
        title: "Technical and accessibility reports",
        paragraphs: [
          "For a broken link, image, layout, search result, or interactive tool, tell us what you were trying to do and what happened instead. Browser, device type, screen size, and operating system are helpful when you are comfortable sharing them. A screenshot can help, but it should not expose account names, private tabs, notifications, or other personal information.",
          "For an accessibility barrier, describe the page, control, reading order, contrast, keyboard step, screen-reader output, motion, or zoom level involved. We welcome practical descriptions of the blocked task even when you do not know the technical term for the issue.",
        ],
      },
      {
        id: "privacy-requests",
        title: "Privacy requests",
        paragraphs: [
          `Use the subject “Privacy request” and email ${contactEmail}. Identify the correspondence you want us to locate and whether you are asking for access, correction, or deletion. We may need enough information to verify that the message belongs to you, but we will not ask for unrelated identity documents by default.`,
          "The Privacy Policy explains the site's current collection, search, hosting-log, and optional video behavior. Requests may be limited where retaining a small record is reasonably necessary for security, legal compliance, or documentation of the request itself.",
        ],
      },
      {
        id: "rights-and-permissions",
        title: "Rights concerns and permissions",
        paragraphs: [
          "For a copyright, trademark, attribution, or reuse issue, identify the protected work, the exact URL, the material involved, your relationship to the rights holder, and a reliable contact method. For a permission request, describe the material, format, audience, and whether the proposed use is commercial.",
          "The Copyright page contains the complete reporting checklist and explains the status of this general rights mailbox. Please do not describe the address as a registered DMCA agent contact unless that status is separately confirmed through the required public process.",
        ],
      },
      {
        id: "attachments-and-personal-data",
        title: "Attachments and personal information",
        paragraphs: [
          "Send only files needed to explain the issue. Avoid executable files, unusually large archives, leaked builds, confidential documents, passwords, payment data, government identifiers, account recovery information, or unrelated personal records. Unsafe or irrelevant attachments may be deleted without review.",
          "If a screenshot contains personal information, crop or redact it before sending. Email is not a secure channel for highly sensitive material. The Privacy Policy explains how ordinary correspondence is used and retained.",
        ],
      },
      {
        id: "support-boundaries",
        title: "What we cannot resolve",
        paragraphs: [
          "We cannot access game or platform accounts, replace keys, issue refunds, change orders, restore saves, grant promotional items, modify entitlements, overturn store decisions, or provide official technical support for CONTROL Resonant. We also cannot confirm rumors or speak for the developer or publisher.",
          "Contact the seller for an order or refund, the platform holder for an account or entitlement, and the official game support channel for game-service or account issues. You are welcome to report a broken or misleading support link on this site so we can correct the route we provide.",
        ],
      },
    ],
  },
} as const satisfies Record<string, LegalPageContent>;

export type LegalSlug = keyof typeof legalPages;
