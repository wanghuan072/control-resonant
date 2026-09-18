"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { buyingFacts } from "@/config/buying";
import {
  localDate,
  pcDecision,
  purchaseDecision,
  type PcChoices,
  type Platform,
  type PurchaseChoices,
} from "@/lib/buying/decision";
import styles from "@/style/page/game-info/buying-decision.module.css";

const cpuOptions = buyingFacts.pc.tiers.flatMap((tier) => tier.cpus);
const gpuOptions = buyingFacts.pc.tiers.flatMap((tier) => tier.gpus);
const subscribeToDate = (onChange: () => void) => {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
};
const serverDate = () => buyingFacts.digitalRelease;

export function BuyingDecision() {
  const today = useSyncExternalStore(subscribeToDate, localDate, serverDate);
  const [purchase, setPurchase] = useState<PurchaseChoices>({
    platform: "ps5",
    format: "digital",
    edition: "standard",
    physicalPackage: "standard",
    earlyAccess: false,
    regionChecked: false,
    rtxPurchase: "no",
  });
  const [device, setDevice] = useState<Platform>("pc");
  const [display120Hz, setDisplay120Hz] = useState(false);
  const [pc, setPc] = useState<PcChoices>({
    cpu: "",
    gpu: "",
    ramGb: "",
    ssdGb: "",
    target: "minimum",
  });
  const recommendation = purchaseDecision(purchase, today);
  const pcResult = pcDecision(pc);
  const modes = buyingFacts.ps5Modes.filter(
    (mode) => mode.console === (device === "ps5-pro" ? "PS5 Pro" : "PS5"),
  );

  return (
    <section
      className={`container ${styles.section}`}
      id="decision"
      aria-labelledby="decision-heading"
    >
      <div className={styles.heading}>
        <div>
          <span>Decision desk / 01</span>
          <h2 id="decision-heading">
            Which CONTROL Resonant edition fits you?
          </h2>
        </div>
        <p>
          Choose your situation. This compares published dates and contents—not
          regional prices, stock or guaranteed promotional eligibility.
        </p>
      </div>
      <div className={styles.grid}>
        <div className={styles.fields}>
          <label>
            Platform
            <select
              value={purchase.platform}
              onChange={(event) =>
                setPurchase({
                  ...purchase,
                  platform: event.target.value as Platform,
                })
              }
            >
              <option value="ps5">PS5</option>
              <option value="ps5-pro">PS5 Pro</option>
              <option value="xbox">Xbox Series X|S</option>
              <option value="pc">Windows PC</option>
            </select>
          </label>
          <label>
            Preferred format
            <select
              value={purchase.format}
              onChange={(event) =>
                setPurchase({
                  ...purchase,
                  format: event.target.value as PurchaseChoices["format"],
                })
              }
            >
              <option value="digital">Digital</option>
              <option value="physical">Physical</option>
            </select>
          </label>
          {purchase.format === "digital" ? (
            <label>
              Digital extras
              <select
                value={purchase.edition}
                onChange={(event) =>
                  setPurchase({
                    ...purchase,
                    edition: event.target.value as PurchaseChoices["edition"],
                  })
                }
              >
                <option value="standard">Base game is enough</option>
                <option value="deluxe">I want Deluxe extras</option>
              </select>
            </label>
          ) : purchase.platform !== "pc" ? (
            <label>
              Physical package
              <select
                value={purchase.physicalPackage}
                onChange={(event) =>
                  setPurchase({
                    ...purchase,
                    physicalPackage: event.target
                      .value as PurchaseChoices["physicalPackage"],
                  })
                }
              >
                <option value="standard">Standard disc</option>
                <option value="steelbook">SteelBook package</option>
              </select>
            </label>
          ) : null}
          {(purchase.platform === "ps5" || purchase.platform === "ps5-pro") &&
            today < buyingFacts.digitalRelease && (
              <label className={styles.check}>
                <input
                  type="checkbox"
                  checked={purchase.earlyAccess}
                  onChange={(event) =>
                    setPurchase({
                      ...purchase,
                      earlyAccess: event.target.checked,
                    })
                  }
                />{" "}
                Earlier PS5 access matters to me
              </label>
            )}
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={purchase.regionChecked}
              onChange={(event) =>
                setPurchase({
                  ...purchase,
                  regionChecked: event.target.checked,
                })
              }
            />{" "}
            I checked my local store listing
          </label>
          {purchase.platform === "pc" && (
            <label>
              RTX bundle situation
              <select
                value={purchase.rtxPurchase}
                onChange={(event) =>
                  setPurchase({
                    ...purchase,
                    rtxPurchase: event.target
                      .value as PurchaseChoices["rtxPurchase"],
                  })
                }
              >
                <option value="no">
                  Not applicable / no qualifying purchase
                </option>
                <option value="model-only">
                  I have a listed GPU family, but have not checked the seller
                </option>
                <option value="partner-confirmed">
                  I bought a participating partner product
                </option>
              </select>
            </label>
          )}
        </div>
        <div className={styles.result} aria-live="polite" aria-atomic="true">
          <span>Based on your selections</span>
          <h3>{recommendation.title}</h3>
          <strong>{recommendation.timing}</strong>
          <ul>
            {recommendation.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <nav aria-label="Related buying details">
            {recommendation.links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label} →
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className={styles.heading} id="device-check">
        <div>
          <span>Decision desk / 02</span>
          <h2>Can your setup meet a published target?</h2>
        </div>
        <p>
          Match exact listed hardware examples or view console modes. A
          specification target is not a release-build benchmark.
        </p>
      </div>
      <div className={styles.grid}>
        <div className={styles.fields}>
          <label>
            Your platform
            <select
              value={device}
              onChange={(event) => setDevice(event.target.value as Platform)}
            >
              <option value="pc">Windows PC</option>
              <option value="ps5">PS5</option>
              <option value="ps5-pro">PS5 Pro</option>
              <option value="xbox">Xbox Series X|S</option>
            </select>
          </label>
          {device === "pc" && (
            <>
              <label>
                Desired published target
                <select
                  value={pc.target}
                  onChange={(event) =>
                    setPc({
                      ...pc,
                      target: event.target.value as PcChoices["target"],
                    })
                  }
                >
                  {buyingFacts.pc.tiers.map((tier) => (
                    <option value={tier.id} key={tier.id}>
                      {tier.name} — {tier.target}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                CPU (exact published model or type your own)
                <input
                  list="listed-cpus"
                  value={pc.cpu}
                  onChange={(event) =>
                    setPc({ ...pc, cpu: event.target.value })
                  }
                  placeholder="e.g. Intel i5-8500"
                />
                <datalist id="listed-cpus">
                  {cpuOptions.map((cpu) => (
                    <option value={cpu} key={cpu} />
                  ))}
                </datalist>
              </label>
              <label>
                GPU (exact published model or type your own)
                <input
                  list="listed-gpus"
                  value={pc.gpu}
                  onChange={(event) =>
                    setPc({ ...pc, gpu: event.target.value })
                  }
                  placeholder="e.g. GTX 1070"
                />
                <datalist id="listed-gpus">
                  {gpuOptions.map((gpu) => (
                    <option value={gpu} key={gpu} />
                  ))}
                </datalist>
              </label>
              <label>
                Installed RAM (GB)
                <input
                  type="number"
                  min="0"
                  max="1024"
                  value={pc.ramGb}
                  onChange={(event) =>
                    setPc({
                      ...pc,
                      ramGb:
                        event.target.value === ""
                          ? ""
                          : Number(event.target.value),
                    })
                  }
                />
              </label>
              <label>
                Available SSD space (GB)
                <input
                  type="number"
                  min="0"
                  max="100000"
                  value={pc.ssdGb}
                  onChange={(event) =>
                    setPc({
                      ...pc,
                      ssdGb:
                        event.target.value === ""
                          ? ""
                          : Number(event.target.value),
                    })
                  }
                />
              </label>
            </>
          )}
          {device === "ps5-pro" && (
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={display120Hz}
                onChange={(event) => setDisplay120Hz(event.target.checked)}
              />{" "}
              I have a 120Hz-compatible display
            </label>
          )}
        </div>
        <div className={styles.result} aria-live="polite" aria-atomic="true">
          <span>Published targets / not measured performance</span>
          {device === "pc" ? (
            <>
              <h3>{pcResult.status}</h3>
              <ul>
                {pcResult.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              <Link href="#pc-requirements">
                View the PC requirements table →
              </Link>
            </>
          ) : device === "xbox" ? (
            <>
              <h3>Xbox Series X|S</h3>
              <p>
                No comparable Xbox performance-mode table is available here. Do
                not infer a frame-rate target from PC or PS5 specifications.
              </p>
              <Link href="#platform-access">Check platform answers →</Link>
            </>
          ) : (
            <>
              <h3>{device === "ps5-pro" ? "PS5 Pro" : "PS5"} modes</h3>
              <ul>
                {modes.map((mode) => (
                  <li key={mode.mode}>
                    <strong>
                      {mode.mode}: {mode.target}
                    </strong>{" "}
                    — {mode.feature}
                    {mode.requires120Hz && !display120Hz
                      ? "; requires a 120Hz-compatible display, so it is not available for your selection"
                      : ""}
                  </li>
                ))}
              </ul>
              <Link href="#ps5-modes">View all PS5 mode details →</Link>
            </>
          )}
        </div>
      </div>
      <p className={styles.footnote}>
        The comparison runs in your browser; no selections are saved or sent to
        a server. Verify the final store listing and, for PC, wait for
        independent release-build testing before treating any target as a
        guarantee.
      </p>
    </section>
  );
}
