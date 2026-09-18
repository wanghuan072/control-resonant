import { buyingFacts, displayDate } from "@/config/buying";

export type Platform = "ps5" | "ps5-pro" | "xbox" | "pc";
export type PurchaseChoices = {
  platform: Platform;
  format: "digital" | "physical";
  edition: "standard" | "deluxe";
  physicalPackage: "standard" | "steelbook";
  earlyAccess: boolean;
  regionChecked: boolean;
  rtxPurchase: "no" | "model-only" | "partner-confirmed";
};

export function localDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function purchaseDecision(choices: PurchaseChoices, today: string) {
  const notes: string[] = [];
  const links: { label: string; href: string }[] = [];
  let title: string;
  let timing: string;

  if (choices.format === "physical" && choices.platform === "pc") {
    title = "Choose a PC digital edition";
    timing = displayDate(buyingFacts.digitalRelease);
    notes.push(
      "The announced physical editions are for PS5 and Xbox Series, not PC.",
    );
  } else if (choices.format === "physical") {
    title =
      choices.physicalPackage === "steelbook"
        ? "Check the SteelBook retail package"
        : "Consider the physical Standard edition";
    timing = displayDate(buyingFacts.physicalRelease);
    notes.push(
      choices.physicalPackage === "steelbook"
        ? "The SteelBook includes a case and printed extras in participating listings; verify your exact regional SKU, contents and stock. It is not Digital Deluxe."
        : "A standard disc provides the base game. If you want the SteelBook packaging and prints, check the exact regional retail SKU instead.",
    );
    if (
      choices.earlyAccess &&
      (choices.platform === "ps5" || choices.platform === "ps5-pro")
    ) {
      notes.push(
        "A physical copy will not provide the PS5 Digital Deluxe early-access window.",
      );
    }
    links.push({
      label: "Physical editions and SteelBook",
      href: "/game-info/physical-release-steelbook",
    });
  } else if (
    (choices.platform === "ps5" || choices.platform === "ps5-pro") &&
    choices.earlyAccess &&
    today < buyingFacts.digitalRelease
  ) {
    title = "Consider PS5 Digital Deluxe";
    timing = `PS5 listing: up to 48 hours early access from ${displayDate(buyingFacts.ps5DeluxeEarlyAccess)}`;
    notes.push(
      "Early access is a PS5 store-listing benefit, not a promised benefit of the PC or Xbox Deluxe editions.",
    );
  } else if (choices.edition === "deluxe") {
    title = "Consider Digital Deluxe for its extras";
    timing = `Digital launch: ${displayDate(buyingFacts.digitalRelease)}`;
    notes.push(
      "The extra content is art, soundtrack, outfit, Artifact and starter resources; it is not a separate story expansion.",
    );
  } else {
    title = "Start with the digital Standard edition";
    timing = `Digital launch: ${displayDate(buyingFacts.digitalRelease)}`;
    notes.push(
      "Choose Deluxe only if its listed digital extras matter to you. Do not assume early access outside the PS5 listing.",
    );
  }

  if (!choices.regionChecked) {
    notes.push(
      "Store availability, price and bonuses can differ by region. Verify the listing for your account and country.",
    );
  }
  if (choices.platform === "pc" && choices.rtxPurchase !== "no") {
    if (today > buyingFacts.rtxBundle.ends) {
      notes.push(
        `The published RTX bundle purchase window ended ${displayDate(buyingFacts.rtxBundle.ends)}; a qualifying earlier purchase may still have a separate redemption deadline (${displayDate(buyingFacts.rtxBundle.redeemBy)}).`,
      );
    } else {
      notes.push(
        choices.rtxPurchase === "model-only"
          ? "A matching GPU family alone does not establish bundle eligibility. Check the participating product, seller, country and purchase date."
          : "Even with a participating product, check your receipt, regional terms and code availability; this is not an automatic entitlement.",
      );
    }
    links.push({
      label: "RTX bundle eligibility and deadlines",
      href: "/game-info/nvidia-rtx-bundle",
    });
  }
  if (choices.platform === "pc")
    links.push({
      label: "Check PC requirements",
      href: "/game-info#device-check",
    });
  links.push({
    label: "Compare published editions",
    href: "/game-info#editions",
  });
  return { title, timing, notes, links };
}

export type PcChoices = {
  cpu: string;
  gpu: string;
  ramGb: number | "";
  ssdGb: number | "";
  target: (typeof buyingFacts.pc.tiers)[number]["id"];
};

export function pcDecision(choices: PcChoices) {
  const tier = buyingFacts.pc.tiers.find((item) => item.id === choices.target)!;
  const blockers: string[] = [];
  if (choices.ramGb !== "" && choices.ramGb < buyingFacts.pc.ramGb)
    blockers.push("RAM is below the published 16 GB baseline.");
  if (choices.ssdGb !== "" && choices.ssdGb < buyingFacts.pc.ssdGb)
    blockers.push(
      "Available SSD space is below the published 120 GB baseline.",
    );
  const cpuTier = buyingFacts.pc.tiers.find((item) =>
    item.cpus.some(
      (cpu) => cpu.toLowerCase() === choices.cpu.trim().toLowerCase(),
    ),
  );
  const gpuTier = buyingFacts.pc.tiers.find((item) =>
    item.gpus.some(
      (gpu) => gpu.toLowerCase() === choices.gpu.trim().toLowerCase(),
    ),
  );
  const notes = [
    `Published ${tier.name.toLowerCase()} target: ${tier.target}; ${tier.graphics}. This is a developer target with upscaling, not a measured result on your PC.`,
  ];
  if (choices.ramGb === "" || choices.ssdGb === "")
    notes.push(
      "Enter RAM and available SSD space to check the shared baseline.",
    );
  if (!cpuTier)
    notes.push(
      "Your CPU is not one of the exact models in the published minimum/recommended examples; no equivalence can be inferred here.",
    );
  else if (
    choices.target !== "enthusiast" &&
    buyingFacts.pc.tiers.indexOf(cpuTier) < buyingFacts.pc.tiers.indexOf(tier)
  )
    notes.push(
      `Your CPU appears only in the published ${cpuTier.name.toLowerCase()} example, not the selected target.`,
    );
  if (choices.target === "enthusiast")
    notes.push(
      "This comparison does not evaluate an enthusiast-tier CPU; consult the complete official target chart.",
    );
  if (!gpuTier)
    notes.push(
      "Your GPU is not one of the exact models in these published non-ray-traced examples; performance cannot be inferred from its name.",
    );
  else if (
    buyingFacts.pc.tiers.indexOf(gpuTier) < buyingFacts.pc.tiers.indexOf(tier)
  )
    notes.push(
      `Your GPU appears only in the published ${gpuTier.name.toLowerCase()} example, not the selected target.`,
    );
  if (blockers.length)
    return { status: "Baseline not met", notes: [...blockers, ...notes] };
  if (
    choices.ramGb === "" ||
    choices.ssdGb === "" ||
    !cpuTier ||
    !gpuTier ||
    choices.target === "enthusiast" ||
    buyingFacts.pc.tiers.indexOf(cpuTier) <
      buyingFacts.pc.tiers.indexOf(tier) ||
    buyingFacts.pc.tiers.indexOf(gpuTier) < buyingFacts.pc.tiers.indexOf(tier)
  ) {
    return { status: "Cannot confirm this target", notes };
  }
  return {
    status: "Matches the listed component examples",
    notes: [
      ...notes,
      "This is a specification match, not a guarantee of frame rate, stability or ray-tracing performance.",
    ],
  };
}
