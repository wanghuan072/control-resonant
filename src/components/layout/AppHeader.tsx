"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";

import { BrandLogo } from "@/components/common/BrandLogo";
import { gameInfoNavigation, primaryNavigation } from "@/config/navigation";
import styles from "@/style/layout/app-header.module.css";

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [gameInfoOpen, setGameInfoOpen] = useState(false);
  const [query, setQuery] = useState("");
  const gameInfoTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
    setGameInfoOpen(false);
  }, [pathname]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = String(
      new FormData(event.currentTarget).get("q") ?? "",
    ).trim();
    if (!value) return;
    setQuery(value);
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/wiki")
      return pathname.startsWith("/wiki") || pathname.startsWith("/bosses");
    return pathname.startsWith(href);
  }

  const desktopNav = primaryNavigation.filter((item) => item.href !== "/");

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <BrandLogo priority compact />
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {desktopNav.map((item) =>
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
                  className={`${styles.navItem} ${isActive(item.href) ? styles.active : ""}`}
                  aria-haspopup="true"
                  aria-expanded={gameInfoOpen}
                  onClick={() => setGameInfoOpen((value) => !value)}
                >
                  <span className={styles.navLabel}>
                    {item.label}
                    <ChevronDown size={11} aria-hidden="true" />
                  </span>
                </button>
                <div className={styles.dropdown} aria-label="Game Info pages">
                  {gameInfoNavigation.map((child) => (
                    <Link
                      href={child.href}
                      key={child.href}
                      onClick={() => setGameInfoOpen(false)}
                    >
                      <strong>{child.label}</strong>
                      <small>{child.description}</small>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive(item.href) ? styles.active : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                <span className={styles.navLabel}>{item.label}</span>
              </Link>
            ),
          )}
        </nav>
        <div className={styles.actions}>
          <form
            className={styles.searchForm}
            role="search"
            action="/search"
            method="get"
            onSubmit={submitSearch}
          >
            <div className={styles.searchField}>
              <Search aria-hidden="true" size={15} />
              <input
                type="search"
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                autoComplete="off"
                aria-label="Search CONTROL Resonant guides"
              />
              <button type="submit" className={styles.searchSubmit}>
                Search
              </button>
            </div>
          </form>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? (
              <X aria-hidden="true" size={20} />
            ) : (
              <Menu aria-hidden="true" size={20} />
            )}
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
