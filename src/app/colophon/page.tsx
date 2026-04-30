import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colophon — site2026",
  description: "Технические детали сборки и стека проекта site2026.",
};

export default function ColophonPage() {
  return (
    <section className="kiv-section border-b-0">
      <Container as="div" className="space-y-8">
        <div className="mb-2 grid items-baseline gap-3 md:grid-cols-[200px_1fr_auto] md:gap-8">
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-30)]">{"// 22"}</div>
          <Heading as="h1" variant="section">
            colophon <span className="text-[var(--fg-30)]">/</span> stack & process
          </Heading>
          <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--fg-50)]">
            project meta
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card variant="surface">
            <p className="font-sans text-sm text-[var(--fg-70)]">Framework: Next.js App Router</p>
          </Card>
          <Card variant="surface">
            <p className="font-sans text-sm text-[var(--fg-70)]">Content pipeline: Velite + MDX</p>
          </Card>
          <Card variant="surface">
            <p className="font-sans text-sm text-[var(--fg-70)]">Styling: Tailwind CSS v4</p>
          </Card>
          <Card variant="surface">
            <p className="font-sans text-sm text-[var(--fg-70)]">
              Quality gates: Vitest, TypeScript, Biome
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
