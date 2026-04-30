import { Container } from "@/components/ui/Container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <Container
        as="div"
        className="flex flex-col gap-3 text-sm text-text-secondary md:flex-row md:justify-between"
      >
        <p>site2026 · brutalist digital garden</p>
        <div className="flex items-center gap-4">
          <Link className="hover:text-text-muted" href="/about">
            About
          </Link>
          <Link className="hover:text-text-muted" href="/colophon">
            Colophon
          </Link>
          <Link className="hover:text-text-muted" href="/feed.xml">
            RSS
          </Link>
        </div>
      </Container>
    </footer>
  );
}
