"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/concepts", label: "Concepts" },
  { href: "/about", label: "About" },
  { href: "/trends", label: "Trends" },
  { href: "/colophon", label: "Colophon" },
  { href: "/design-preview", label: "Design Preview" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b border-border bg-bg">
      <Container as="div" className="flex min-h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link className="font-mono text-sm uppercase tracking-[1.4px] text-fg" href="/">
            SITE2026
          </Link>
          <Button
            variant="ghost"
            className="px-3 py-2 md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-primary-nav"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </Button>
        </div>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="text-sm text-fg hover:text-text-muted"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button variant="ghost" className="hidden md:inline-flex">
          Read Feed
        </Button>
      </Container>

      <div
        id="mobile-primary-nav"
        className={isMenuOpen ? "border-t border-border md:hidden" : "hidden"}
        data-state={isMenuOpen ? "open" : "closed"}
      >
        <Container as="nav" className="flex flex-col gap-2 py-4" aria-label="Primary mobile">
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
          <Button variant="ghost" className="mt-2 justify-start px-3" onClick={closeMenu}>
            Read Feed
          </Button>
        </Container>
      </div>
    </header>
  );
}
