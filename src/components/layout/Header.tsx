import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

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
  return (
    <header className="border-b border-border">
      <Container as="div" className="flex min-h-16 items-center justify-between gap-6">
        <Link className="font-mono text-sm uppercase tracking-[1.4px] text-fg" href="/">
          SITE2026
        </Link>
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
        <Button variant="ghost">Read Feed</Button>
      </Container>
    </header>
  );
}
