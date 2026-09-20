"use client";

import { useMemo, useState } from "react";
import { buyingFacts } from "@/config/buying";
import {
  cpuCatalog,
  gpuCatalog,
  hardwareBandOrder,
  type HardwareBand,
  type HardwareEntry,
} from "@/data/tools/hardware";
import styles from "@/style/page/tools/hardware-checker.module.css";

type TargetId = (typeof buyingFacts.pc.tiers)[number]["id"];
type CheckState = {
  target: TargetId;
  cpuId: string;
  gpuId: string;
  ramGb: number;
  ssdGb: number;
  storage: "ssd" | "hdd";
  os: "windows-11" | "windows-10" | "other";
};

type RowStatus = "pass" | "below" | "unknown";

function getEntry(catalog: HardwareEntry[], id: string) {
  return catalog.find((entry) => entry.id === id);
}

function componentResult(
  entry: HardwareEntry | undefined,
  target: TargetId,
  kind: "CPU" | "GPU",
) {
  if (!entry)
    return {
      status: "unknown" as RowStatus,
      result: "Choose a model",
      note: `Select a ${kind} to compare it with the published examples.`,
    };

  if (kind === "CPU" && target === "enthusiast") {
    return {
      status: "unknown" as RowStatus,
      result: "No published 4K CPU target",
      note: "The 4K target names GPUs but does not establish a separate CPU requirement.",
    };
  }

  const targetBand = target as HardwareBand;
  const passes = hardwareBandOrder[entry.band] >= hardwareBandOrder[targetBand];
  const evidence = entry.officialTarget
    ? `Exact model in the published ${entry.officialTarget} specification.`
    : `Conservative ${entry.band}-class estimate; this model is not named in the official table.`;
  return {
    status: passes ? ("pass" as RowStatus) : ("below" as RowStatus),
    result: passes
      ? "Meets this comparison band"
      : "Below this comparison band",
    note: `${evidence}${entry.note ? ` ${entry.note}` : ""}`,
  };
}

function OptionGroups({ catalog }: { catalog: HardwareEntry[] }) {
  return (["NVIDIA", "AMD", "Intel"] as const).map((maker) => {
    const entries = catalog.filter((entry) => entry.maker === maker);
    if (!entries.length) return null;
    return (
      <optgroup label={maker} key={maker}>
        {entries.map((entry) => (
          <option value={entry.id} key={entry.id}>
            {entry.name}
            {entry.officialTarget ? " — official example" : ""}
          </option>
        ))}
      </optgroup>
    );
  });
}

export function HardwareChecker() {
  const [state, setState] = useState<CheckState>({
    target: "recommended",
    cpuId: "",
    gpuId: "",
    ramGb: 16,
    ssdGb: 120,
    storage: "ssd",
    os: "windows-11",
  });

  const result = useMemo(() => {
    const tier = buyingFacts.pc.tiers.find((item) => item.id === state.target)!;
    const cpu = getEntry(cpuCatalog, state.cpuId);
    const gpu = getEntry(gpuCatalog, state.gpuId);
    const rows = [
      {
        label: "CPU",
        value: cpu?.name ?? "Not selected",
        official:
          state.target === "enthusiast"
            ? "No separate CPU published"
            : tier.cpus.join(" / "),
        ...componentResult(cpu, state.target, "CPU"),
      },
      {
        label: "GPU",
        value: gpu?.name ?? "Not selected",
        official: tier.gpus.join(" / "),
        ...componentResult(gpu, state.target, "GPU"),
      },
      {
        label: "Memory",
        value: `${state.ramGb || 0} GB RAM`,
        official: `${buyingFacts.pc.ramGb} GB RAM`,
        status: state.ramGb >= buyingFacts.pc.ramGb ? "pass" : "below",
        result:
          state.ramGb >= buyingFacts.pc.ramGb
            ? "Meets requirement"
            : "Below requirement",
        note: "The same 16 GB baseline is published for minimum and recommended.",
      },
      {
        label: "Storage",
        value: `${state.ssdGb || 0} GB available ${state.storage.toUpperCase()}`,
        official: `${buyingFacts.pc.ssdGb} GB available on SSD`,
        status:
          state.storage === "ssd" && state.ssdGb >= buyingFacts.pc.ssdGb
            ? "pass"
            : "below",
        result:
          state.storage !== "ssd"
            ? "SSD required"
            : state.ssdGb >= buyingFacts.pc.ssdGb
              ? "Meets requirement"
              : "Not enough free space",
        note: "The published requirements explicitly require an SSD.",
      },
      {
        label: "Operating system",
        value:
          state.os === "windows-11"
            ? "Windows 11 64-bit"
            : state.os === "windows-10"
              ? "Windows 10 64-bit"
              : "Another operating system",
        official: buyingFacts.pc.os,
        status: state.os === "other" ? "below" : "pass",
        result:
          state.os === "other"
            ? "Not in the PC requirement"
            : "Meets requirement",
        note: "A later Mac release is separate from these Windows requirements.",
      },
    ];

    const hasBelow = rows.some((row) => row.status === "below");
    const hasUnknown = rows.some((row) => row.status === "unknown");
    const exactCpu = cpu?.officialTarget === state.target;
    const exactGpu = gpu?.officialTarget === state.target;

    let status = "Choose your CPU and GPU";
    let summary =
      "The checker needs both processors before it can compare your setup.";
    if (cpu && gpu && hasBelow) {
      status = "Below the selected target";
      summary =
        "At least one selected component or capacity falls below this comparison target.";
    } else if (cpu && gpu && hasUnknown) {
      status = "Only part of this target can be checked";
      summary =
        "One part of the selected target has no published comparison, so a complete pass cannot be claimed.";
    } else if (cpu && gpu && exactCpu && exactGpu) {
      status = "Exact official component match";
      summary =
        "The CPU and GPU are the exact examples named for this published target; this is still not a frame-rate guarantee.";
    } else if (cpu && gpu) {
      status = "Estimated to meet this hardware class";
      summary =
        "The selected parts are in a conservative comparison band, but they are not an official tested CONTROL Resonant configuration.";
    }

    return { tier, rows, status, summary };
  }, [state]);

  return (
    <section
      className={styles.checker}
      id="system-checker"
      aria-labelledby="checker-title"
    >
      <header className={styles.heading}>
        <div>
          <span>PC compatibility checker</span>
          <h2 id="checker-title">
            Can your PC meet a CONTROL Resonant target?
          </h2>
        </div>
        <p>
          Select a common desktop or laptop configuration. Exact official models
          are identified separately from conservative hardware-class estimates.
        </p>
      </header>

      <div className={styles.workspace}>
        <form
          className={styles.fields}
          onSubmit={(event) => event.preventDefault()}
        >
          <label>
            Performance target
            <select
              value={state.target}
              onChange={(event) =>
                setState({ ...state, target: event.target.value as TargetId })
              }
            >
              {buyingFacts.pc.tiers.map((tier) => (
                <option value={tier.id} key={tier.id}>
                  {tier.name}: {tier.target} — {tier.graphics}
                </option>
              ))}
            </select>
          </label>
          <label>
            CPU
            <select
              value={state.cpuId}
              onChange={(event) =>
                setState({ ...state, cpuId: event.target.value })
              }
            >
              <option value="">Select your CPU</option>
              <OptionGroups catalog={cpuCatalog} />
            </select>
          </label>
          <label>
            GPU
            <select
              value={state.gpuId}
              onChange={(event) =>
                setState({ ...state, gpuId: event.target.value })
              }
            >
              <option value="">Select your GPU</option>
              <OptionGroups catalog={gpuCatalog} />
            </select>
          </label>
          <div className={styles.fieldPair}>
            <label>
              Installed RAM
              <select
                value={state.ramGb}
                onChange={(event) =>
                  setState({ ...state, ramGb: Number(event.target.value) })
                }
              >
                {[8, 12, 16, 24, 32, 48, 64].map((value) => (
                  <option value={value} key={value}>
                    {value} GB
                  </option>
                ))}
              </select>
            </label>
            <label>
              Available storage
              <input
                type="number"
                min="0"
                max="10000"
                value={state.ssdGb}
                onChange={(event) =>
                  setState({ ...state, ssdGb: Number(event.target.value) })
                }
              />
            </label>
          </div>
          <div className={styles.fieldPair}>
            <label>
              Storage type
              <select
                value={state.storage}
                onChange={(event) =>
                  setState({
                    ...state,
                    storage: event.target.value as CheckState["storage"],
                  })
                }
              >
                <option value="ssd">SSD / NVMe SSD</option>
                <option value="hdd">Hard disk drive</option>
              </select>
            </label>
            <label>
              Operating system
              <select
                value={state.os}
                onChange={(event) =>
                  setState({
                    ...state,
                    os: event.target.value as CheckState["os"],
                  })
                }
              >
                <option value="windows-11">Windows 11 64-bit</option>
                <option value="windows-10">Windows 10 64-bit</option>
                <option value="other">Another operating system</option>
              </select>
            </label>
          </div>
        </form>

        <div className={styles.summary} aria-live="polite" aria-atomic="true">
          <span>Result for {result.tier.name}</span>
          <h3>{result.status}</h3>
          <strong>{result.tier.target}</strong>
          <p>{result.summary}</p>
          <small>{result.tier.graphics}</small>
        </div>
      </div>

      <div
        className={styles.tableWrap}
        role="region"
        aria-label="PC component comparison"
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Your selection</th>
              <th>Published target</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row) => (
              <tr key={row.label}>
                <th>{row.label}</th>
                <td>{row.value}</td>
                <td>{row.official}</td>
                <td>
                  <strong className={styles[row.status]}>{row.result}</strong>
                  <small>{row.note}</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.disclaimer}>
        Hardware-class results are editorial estimates, not official
        compatibility certification or release-build benchmarks. Laptop GPU
        power limits, drivers, cooling and background software can change actual
        performance.
      </p>
    </section>
  );
}
