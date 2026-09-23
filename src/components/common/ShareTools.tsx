"use client";

import { Check, Copy, Link2Off } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { sharePlatforms, type SharePlatformId } from "@/config/share";
import { siteConfig } from "@/config/site";
import styles from "@/style/common/share-tools.module.css";

type ShareToolsProps = {
  variant: "floating" | "footer";
};

type CopyState = "idle" | "copied" | "error";

const subscribeToDocument = () => () => {};

function getDocumentTitle() {
  const title = document
    .querySelector('meta[property="og:title"]')
    ?.getAttribute("content");
  return title?.trim() || document.title || siteConfig.shortName;
}

function isShareablePath(pathname: string) {
  return pathname !== "/search" && !pathname.startsWith("/legal/");
}

function SocialIcon({ platform }: { platform: SharePlatformId }) {
  if (platform === "x") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.51 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
      </svg>
    );
  }

  if (platform === "facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.5 4.6 13.7 8c2.1.2 4 .8 5.3 1.8a2.4 2.4 0 1 1 1.4 4.3v.4c0 3.6-3.8 6.5-8.4 6.5s-8.4-2.9-8.4-6.5v-.4A2.4 2.4 0 1 1 5 9.8c1.7-1.2 4.2-1.9 6.8-1.9l1.1-4.8 4.3 1a2 2 0 1 1-.4 1.7l-2.3-.5v-.7ZM6 12.7a1.4 1.4 0 1 0 2.8 0 1.4 1.4 0 0 0-2.8 0Zm9.2 0a1.4 1.4 0 1 0 2.8 0 1.4 1.4 0 0 0-2.8 0Zm-7.3 3.7c1 .8 2.4 1.2 4.1 1.2s3.1-.4 4.1-1.2l-.9-1.1c-.7.6-1.9.9-3.2.9s-2.5-.3-3.2-.9l-.9 1.1Z" />
    </svg>
  );
}

function fallbackCopy(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Copy command was rejected");
}

export function ShareTools({ variant }: ShareToolsProps) {
  const pathname = usePathname();
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const pageTitle = useSyncExternalStore(
    subscribeToDocument,
    getDocumentTitle,
    () => siteConfig.shortName,
  );
  const shareUrl = useMemo(
    () => (pathname === "/" ? siteConfig.url : `${siteConfig.url}${pathname}`),
    [pathname],
  );

  useEffect(() => {
    if (copyState === "idle") return;
    const timeout = window.setTimeout(() => setCopyState("idle"), 2400);
    return () => window.clearTimeout(timeout);
  }, [copyState]);

  if (!isShareablePath(pathname)) return null;

  async function copyShareUrl() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        fallbackCopy(shareUrl);
      }
      setCopyState("copied");
    } catch {
      try {
        fallbackCopy(shareUrl);
        setCopyState("copied");
      } catch {
        setCopyState("error");
      }
    }
  }

  const copyLabel =
    copyState === "copied"
      ? "Link copied"
      : copyState === "error"
        ? "Copy failed"
        : "Copy page link";

  return (
    <div
      className={`${styles.tools} ${styles[variant]}`}
      data-share-tools
      data-share-variant={variant}
    >
      <span className={styles.label}>
        {variant === "floating" ? "Share" : "Share this page"}
      </span>
      <div
        className={styles.controls}
        role="group"
        aria-label="Share this page"
      >
        {sharePlatforms.map((platform) => (
          <a
            className={styles.control}
            data-share-platform={platform.id}
            data-tooltip={platform.label}
            href={platform.buildHref(shareUrl, pageTitle)}
            key={platform.id}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform.label}
          >
            <SocialIcon platform={platform.id} />
          </a>
        ))}
        <button
          className={`${styles.control} ${copyState === "copied" ? styles.copied : ""} ${copyState === "error" ? styles.copyError : ""}`}
          data-share-platform="copy"
          data-tooltip={copyLabel}
          type="button"
          aria-label={copyLabel}
          onClick={copyShareUrl}
        >
          {copyState === "copied" ? (
            <Check aria-hidden="true" />
          ) : copyState === "error" ? (
            <Link2Off aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
        </button>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {copyState === "idle" ? "" : copyLabel}
      </span>
    </div>
  );
}
