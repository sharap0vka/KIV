import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colophon — site2026",
  description: "Технические детали сборки и стека проекта site2026.",
};

export default function ColophonPage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <Header />
      <main className="py-12 md:py-16">
        <Container as="section" className="space-y-6">
          <Heading as="h1" variant="section">
            Colophon
          </Heading>
          <ul className="space-y-2 text-base text-text-secondary">
            <li>Framework: Next.js App Router</li>
            <li>Content pipeline: Velite + MDX</li>
            <li>Styling: Tailwind CSS v4</li>
            <li>Quality gates: Vitest, TypeScript, Biome</li>
          </ul>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
