import { TerminalPreview } from "@/components/home/TerminalPreview";
import { TrendTicker } from "@/components/home/TrendTicker";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { getLatestTrendsSnapshotView } from "@/lib/trends/snapshots";
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

const conceptsPreview = concepts
  .filter((concept) => concept.draft !== true)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6);

export default async function HomePage() {
  const trends = await getLatestTrendsSnapshotView();
  const tickerItems = trends.snapshot.items
    .slice(0, 8)
    .map(
      (item) =>
        [
          `${item.owner}/${item.repo}`,
          `${item.starsDeltaWeek >= 0 ? "+" : ""}${new Intl.NumberFormat("ru-RU").format(item.starsDeltaWeek)}`,
          item.starsDeltaWeek >= 0 ? "up" : "down",
        ] as const,
    );

  return (
    <section className="space-y-0">
      <Container
        as="section"
        className="grid gap-10 border-b border-border pb-12 md:grid-cols-[1fr_320px]"
      >
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Tag variant="mono">v0.1.0</Tag>
            <span className="text-xs uppercase tracking-[1px] text-text-muted">digital garden</span>
          </div>
          <Heading as="h1" variant="display">
            SITE2026
          </Heading>
          <p className="max-w-3xl text-base text-text-secondary">
            Каталог знаний про vibe-coding и agentic engineering: статьи, концепции, data-first
            trends и рабочие заметки из ежедневной разработки.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              className="border border-border px-4 py-2 text-xs uppercase tracking-[1px]"
              href="/articles"
            >
              Читать ленту
            </Link>
            <Link
              className="border border-border px-4 py-2 text-xs uppercase tracking-[1px]"
              href="/trends"
            >
              Trends дня
            </Link>
            <Link
              className="border border-border px-4 py-2 text-xs uppercase tracking-[1px]"
              href="/colophon"
            >
              Colophon
            </Link>
          </div>
        </div>
        <TerminalPreview />
      </Container>
      <TrendTicker items={tickerItems} />

      <Container as="section" className="space-y-14 py-12">
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
                <Card
                  key={`${item.collection}-${item.slug}`}
                  variant="surface"
                  className="space-y-4"
                >
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

        <section className="space-y-4">
          <Heading as="h2" variant="section">
            Trends Preview
          </Heading>
          <div className="grid gap-4">
            {trends.snapshot.items.slice(0, 6).map((item) => (
              <Card key={`${item.owner}-${item.repo}`} variant="surface" className="space-y-2">
                <Heading as="h3" variant="bodyTitle">
                  <a
                    href={`https://github.com/${item.owner}/${item.repo}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {item.owner}/{item.repo}
                  </a>
                </Heading>
                <p className="text-sm text-text-secondary">
                  {item.description ?? "Описание отсутствует."}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {item.language ? <Tag variant="mono">{item.language}</Tag> : null}
                  <Tag variant="mono">+{item.starsDeltaWeek} / week</Tag>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <Heading as="h2" variant="section">
            Concepts Preview
          </Heading>
          <div className="grid gap-4 md:grid-cols-2">
            {conceptsPreview.map((concept) => (
              <Card key={concept.slug} variant="surface" className="space-y-2">
                <Heading as="h3" variant="bodyTitle">
                  <Link href={`/concepts/${concept.slug.replace(/^concepts\//, "")}`}>
                    {concept.title}
                  </Link>
                </Heading>
                {concept.description ? (
                  <p className="text-sm text-text-secondary">{concept.description}</p>
                ) : null}
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4 border-t border-border pt-8">
          <Heading as="h2" variant="section">
            Colophon
          </Heading>
          <div className="grid gap-3 md:grid-cols-2">
            <Card variant="surface">
              <p className="text-sm text-text-secondary">Framework: Next.js 15 App Router</p>
            </Card>
            <Card variant="surface">
              <p className="text-sm text-text-secondary">Content: Velite + MDX + JSON snapshots</p>
            </Card>
            <Card variant="surface">
              <p className="text-sm text-text-secondary">Quality: Vitest, TypeScript, Biome</p>
            </Card>
            <Card variant="surface">
              <p className="text-sm text-text-secondary">
                License: MIT (code) / CC BY 4.0 (content)
              </p>
            </Card>
          </div>
        </section>
      </Container>
    </section>
  );
}
