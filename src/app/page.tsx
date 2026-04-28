import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <Header />
      <main className="py-12 md:py-16">
        <Container as="section" className="space-y-12">
          <section className="space-y-6 border-b border-border pb-12">
            <Heading as="h1" variant="display">
              SITE2026
            </Heading>
            <p className="max-w-2xl text-base text-text-secondary">
              Digital-garden про vibe-coding и agentic engineering в строгом brutalist стиле.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Tag>articles</Tag>
              <Tag>concepts</Tag>
              <Tag variant="mono">trends</Tag>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Read latest</Button>
              <Button variant="ghost">Browse trends</Button>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Card variant="surface">
              <Heading as="h2" variant="bodyTitle">
                Brutalist primitives
              </Heading>
              <p className="mt-3 text-sm text-text-secondary">
                All surfaces use tokenized monochrome palette with zero shadows and sharp corners.
              </p>
            </Card>
            <Card variant="flat">
              <Heading as="h2" variant="bodyTitle">
                Tailwind v4 tokens
              </Heading>
              <p className="mt-3 text-sm text-text-secondary">
                Theme is implemented through CSS-first `@theme` and reusable semantic variables.
              </p>
            </Card>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
