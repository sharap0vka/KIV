import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — site2026",
  description: "О проекте site2026 и его фокусе на agentic engineering.",
};

export default function AboutPage() {
  return (
    <section className="kiv-section">
      <Container as="div" className="grid gap-16 md:grid-cols-2">
        <div className="space-y-5">
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-30)]">
            {"// 21 · about"}
          </div>
          <Heading as="h1" variant="section">
            сайт, который сам себя документирует.
          </Heading>
          <p className="max-w-2xl font-sans text-base leading-[1.6] text-[var(--fg-70)]">
            site2026 — персональный digital-garden про vibe-coding и agentic engineering: заметки,
            статьи и концепции из реальной разработки.
          </p>
          <p className="max-w-2xl font-sans text-base leading-[1.6] text-[var(--fg-70)]">
            Цель проекта — собирать практические подходы и короткие playbook-материалы, чтобы
            быстрее переводить идеи в работающие фичи.
          </p>
        </div>
        <div className="grid grid-cols-1 border-l border-t border-[var(--fg-10)]">
          {[
            ["framework", "Next.js 15 · App Router"],
            ["language", "TypeScript strict"],
            ["content", "Velite · Zod · MDX"],
            ["quality", "Biome · Vitest · Typecheck"],
            ["hosting", "standalone · host-agnostic"],
            ["license", "MIT (code) · CC BY 4.0 (content)"],
          ].map(([k, v]) => (
            <div
              className="grid grid-cols-[130px_1fr] gap-4 border-b border-r border-[var(--fg-10)] px-4 py-3 text-xs"
              key={k}
            >
              <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--fg-50)]">
                {k}
              </span>
              <span className="text-fg">{v}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
