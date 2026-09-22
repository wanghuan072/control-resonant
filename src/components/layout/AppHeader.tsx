"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useRef, useState } from "react";

import { BrandLogo } from "@/components/common/BrandLogo";
import { gameInfoNavigation, primaryNavigation } from "@/config/navigation";
import styles from "@/style/layout/app-header.module.css";

export function AppHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [gameInfoOpen, setGameInfoOpen] = useState(false);
  const gameInfoTrigger = useRef<HTMLButtonElement>(null);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/wiki")
      return pathname.startsWith("/wiki") || pathname.startsWith("/bosses");
    return pathname.startsWith(href);
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <BrandLogo priority />
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {primaryNavigation.map((item) =>
            item.href === "/game-info" ? (
              <div
                className={`${styles.navGroup} ${gameInfoOpen ? styles.navGroupOpen : ""}`}
                key={item.href}
                onMouseEnter={() => setGameInfoOpen(true)}
                onMouseLeave={() => setGameInfoOpen(false)}
                onFocus={() => setGameInfoOpen(true)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget))
                    setGameInfoOpen(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setGameInfoOpen(false);
                    gameInfoTrigger.current?.focus();
                  }
                }}
              >
                <button
                  ref={gameInfoTrigger}
                  type="button"
                  className={`${styles.navTrigger} ${isActive(item.href) ? styles.active : ""}`}
                  aria-haspopup="true"
                  aria-expanded={gameInfoOpen}
                  onClick={() => setGameInfoOpen((value) => !value)}
                >
                  {item.label} <ChevronDown size={14} aria-hidden="true" />
                </button>
                <div className={styles.dropdown} aria-label="Game Info pages">
                  {gameInfoNavigation.map((child) => (
                    <Link
                      href={child.href}
                      key={child.href}
                      onClick={() => setGameInfoOpen(false)}
                    >
                      <strong>{child.label}</strong>
                      <span>{child.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? styles.active : ""}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className={styles.actions}>
          <Link
            href="/search"
            className={styles.iconButton}
            aria-label="Search CONTROL Resonant guides"
          >
            <Search aria-hidden="true" size={20} />
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        inert={!open}
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="container">
          {primaryNavigation.map((item) =>
            item.href === "/game-info" ? (
              <div className={styles.mobileGroup} key={item.href}>
                <span
                  className={`${styles.mobileGroupLabel} ${isActive(item.href) ? styles.active : ""}`}
                >
                  {item.label}
                </span>
                <div aria-label="Game Info pages">
                  {gameInfoNavigation.map((child) => (
                    <Link
                      href={child.href}
                      key={child.href}
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? styles.active : ""}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </nav>
    </header>
  );
}
