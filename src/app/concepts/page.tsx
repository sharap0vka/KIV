import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import type { Metadata } from "next";
import Link from "next/link";
import { concepts } from "#site/content";

export const metadata: Metadata = {
  title: "Concepts — site2026",
  description: "Короткие определения и пояснения ключевых концепций.",
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const publishedConcepts = concepts
  .filter((concept) => concept.draft !== true)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function ConceptsPage() {
  return (
    <Container as="section" className="space-y-8">
      <section className="space-y-4">
        <Heading as="h1" variant="section">
          Concepts
        </Heading>
        <p className="max-w-2xl text-base text-text-secondary">
          Короткий глоссарий терминов по agentic engineering и смежным темам.
        </p>
      </section>

      <section className="grid gap-4">
        {publishedConcepts.map((concept) => {
          const conceptPath = `/${concept.slug.replace(/^concepts\//, "")}`;

          return (
            <Card key={concept.slug} variant="surface" className="space-y-4">
              <div className="space-y-2">
                <Heading as="h2" variant="bodyTitle">
                  <Link className="hover:text-text-muted" href={`/concepts${conceptPath}`}>
                    {concept.title}
                  </Link>
                </Heading>
                {concept.description ? (
                  <p className="text-sm text-text-secondary">{concept.description}</p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
                <span>{dateFormatter.format(new Date(concept.date))}</span>
              </div>

              {concept.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {concept.tags.map((tag) => (
                    <Tag key={`${concept.slug}-${tag}`} variant="mono">
                      {tag}
                    </Tag>
                  ))}
                </div>
              ) : null}
            </Card>
          );
        })}
      </section>
    </Container>
  );
}
