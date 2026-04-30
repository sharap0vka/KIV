import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export default function DesignPreviewPage() {
  return (
    <section className="kiv-section">
      <Container as="section" className="space-y-8">
        <header className="space-y-3 border-b border-[var(--fg-10)] pb-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg-30)]">
            Primitive 01
          </p>
          <Heading as="h1" variant="section">
            container <span className="text-[var(--fg-30)]">/</span> cards{" "}
            <span className="text-[var(--fg-30)]">/</span> typography
          </Heading>
          <p className="max-w-3xl font-sans text-base text-[var(--fg-70)]">
            Базовый preview новой дизайн-системы: от контейнера и ритма до карточек и типографики.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Card variant="surface">
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--fg-50)]">
              max-width
            </p>
            <p className="mt-2 font-sans text-sm text-fg">`1280px` через `.kiv-shell`.</p>
          </Card>
          <Card variant="surface">
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--fg-50)]">
              padding x
            </p>
            <p className="mt-2 font-sans text-sm text-fg">
              `32px` desktop / `20px` mobile через `.kiv-shell`.
            </p>
          </Card>
        </section>
      </Container>
    </section>
  );
}
