import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import Link from "next/link";
import { articles, concepts } from "#site/content";

type FeedItem = {
  collection: "article" | "concept";
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const latestFeed: FeedItem[] = [
  ...articles
    .filter((article) => article.draft !== true)
    .map((article) => ({
      collection: "article" as const,
      slug: article.slug,
      title: article.title,
      description: article.description,
      date: article.date,
      tags: article.tags,
    })),
  ...concepts
    .filter((concept) => concept.draft !== true)
    .map((concept) => ({
      collection: "concept" as const,
      slug: concept.slug,
      title: concept.title,
      description: concept.description,
      date: concept.date,
      tags: concept.tags,
    })),
]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6);

export default function HomePage() {
  return (
    <Container as="section" className="space-y-12">
      <section className="space-y-6 border-b border-border pb-12">
        <Heading as="h1" variant="display">
          SITE2026
        </Heading>
        <p className="max-w-2xl text-base text-text-secondary">
          Персональный digital-garden про vibe-coding и agentic engineering: статьи, концепции и
          практические заметки из ежедневной работы.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Tag variant="mono">articles</Tag>
          <Tag variant="mono">concepts</Tag>
          <Tag variant="mono">trends</Tag>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            className="text-sm uppercase tracking-[1.4px] hover:text-text-muted"
            href="/articles"
          >
            Читать статьи
          </Link>
          <Link
            className="text-sm uppercase tracking-[1.4px] hover:text-text-muted"
            href="/concepts"
          >
            Смотреть концепции
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <Heading as="h2" variant="section">
          Последние материалы
        </Heading>
        <div className="grid gap-4">
          {latestFeed.map((item) => {
            const href =
              item.collection === "article"
                ? `/articles/${item.slug.replace(/^articles\//, "")}`
                : `/concepts/${item.slug.replace(/^concepts\//, "")}`;

            return (
              <Card key={`${item.collection}-${item.slug}`} variant="surface" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag variant="mono">{item.collection}</Tag>
                    <span className="text-xs text-text-muted">
                      {dateFormatter.format(new Date(item.date))}
                    </span>
                  </div>
                  <Heading as="h3" variant="bodyTitle">
                    <Link className="hover:text-text-muted" href={href}>
                      {item.title}
                    </Link>
                  </Heading>
                  {item.description ? (
                    <p className="text-sm text-text-secondary">{item.description}</p>
                  ) : null}
                </div>

                {item.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Tag key={`${item.slug}-${tag}`} variant="mono">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
