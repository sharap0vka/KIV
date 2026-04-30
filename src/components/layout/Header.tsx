"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/concepts", label: "Concepts" },
  { href: "/trends", label: "Trends" },
  { href: "/colophon", label: "Colophon" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="kiv-topbar">
      <div className="kiv-shell kiv-topbar-inner">
        <div className="flex items-center gap-3 text-[13px] tracking-[0.06em]">
          <span className="grid h-[22px] w-[22px] place-items-center border border-[var(--fg-30)] text-[11px]">
            Λ
          </span>
          <b className="font-medium">КИВ</b>
          <span className="text-[var(--fg-30)]">/</span>
          <span className="text-[var(--fg-50)]">костыли &amp; велосипеды</span>
        </div>

        <button
          aria-controls="mobile-primary-nav"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="kiv-btn px-3 py-2 md:hidden"
          onClick={() => setIsMenuOpen((value) => !value)}
          type="button"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>

        <nav className="hidden items-center gap-7 text-[13px] text-[var(--fg-70)] md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={
                item.href === "/"
                  ? "relative py-1 text-fg after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-px after:bg-fg"
                  : "py-1"
              }
              href={item.href}
            >
              {item.href === "/" ? "index" : item.label.toLowerCase()}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-xs">
          <span className="hidden items-center gap-1 border border-[var(--fg-15)] px-2 py-1 uppercase tracking-[0.08em] text-[var(--fg-70)] sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5fd07a] shadow-[0_0_0_2px_rgba(95,208,122,0.18)]" />
            build · ok
          </span>
          <Link className="kiv-btn hidden sm:inline-flex" href="/feed.xml">
            RSS ↗
          </Link>
          <a
            className="kiv-btn kiv-btn-primary"
            href="https://github.com/sharap0vka/KIV"
            rel="noreferrer"
            target="_blank"
          >
            github →
          </a>
        </div>
      </div>

      <div
        className={isMenuOpen ? "border-t border-[var(--fg-10)] md:hidden" : "hidden"}
        data-state={isMenuOpen ? "open" : "closed"}
        id="mobile-primary-nav"
      >
        <nav aria-label="Primary mobile" className="kiv-shell flex flex-col gap-2 py-4">
          {navItems.map((item) => (
            <Link
              key={`mobile-${item.href}`}
              className="font-mono text-sm uppercase tracking-[1.2px] text-fg hover:text-text-muted"
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
