import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — site2026",
  description: "О проекте site2026 и его фокусе на agentic engineering.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <Header />
      <main className="py-12 md:py-16">
        <Container as="section" className="space-y-6">
          <Heading as="h1" variant="section">
            About
          </Heading>
          <p className="max-w-3xl text-base text-text-secondary">
            site2026 - персональный digital-garden про vibe-coding и agentic engineering: заметки,
            статьи и концепции из реальной разработки.
          </p>
          <p className="max-w-3xl text-base text-text-secondary">
            Цель проекта - собирать практические подходы и короткие playbook-материалы, чтобы
            быстрее переводить идеи в работающие фичи.
          </p>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
