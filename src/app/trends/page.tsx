import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { getLatestTrendsSnapshotView } from "@/lib/trends/snapshots";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trends — site2026",
  description: "Актуальный снимок GitHub-трендов по vibe-coding и agentic engineering.",
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatNumber(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M8 .9l2.1 4.2 4.6.7-3.3 3.2.8 4.6L8 11.8l-4.2 2.2.8-4.6L1.3 5.8l4.6-.7L8 .9z" />
    </svg>
  );
}

export default async function TrendsPage() {
  const { snapshot, freshnessLabel } = await getLatestTrendsSnapshotView();

  return (
    <Container as="section" className="space-y-8">
      <section className="space-y-4">
        <Heading as="h1" variant="section">
          Trends
        </Heading>
        <p className="max-w-3xl text-base text-text-secondary">
          Последний weekly-снимок из общего списка GitHub Trending без фильтров.
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
          <Tag variant="mono">snapshot {snapshot.date}</Tag>
          <span>{freshnessLabel}</span>
        </div>
        <div className="text-xs text-text-muted">
          Порядок карточек: как в GitHub Trending weekly.
        </div>
      </section>

      <section className="grid gap-4">
        {snapshot.items.map((item) => {
          const repoPath = `${item.owner}/${item.repo}`;
          const githubUrl = `https://github.com/${repoPath}`;

          return (
            <Card key={repoPath} variant="surface" className="space-y-4">
              <div className="space-y-2">
                <Heading as="h2" variant="bodyTitle">
                  <a
                    className="hover:text-text-muted"
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repoPath}
                  </a>
                </Heading>
                {item.description ? (
                  <p className="text-sm text-text-secondary">{item.description}</p>
                ) : (
                  <p className="text-sm text-text-muted">Описание отсутствует.</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {item.language ? <Tag variant="mono">{item.language}</Tag> : null}
                <Tag variant="mono" className="gap-1">
                  <StarIcon />+{formatNumber(item.starsDeltaWeek)} за 7д
                </Tag>
                <Tag variant="mono" className="gap-1">
                  <StarIcon />
                  {formatNumber(item.starsTotal)} всего
                </Tag>
              </div>
            </Card>
          );
        })}
      </section>

      <section className="border-t border-border pt-4 text-xs text-text-muted">
        <p>Дата снимка: {dateFormatter.format(new Date(snapshot.date))}.</p>
        <p>Сгенерировано: {dateTimeFormatter.format(new Date(snapshot.generatedAt))}.</p>
      </section>
    </Container>
  );
}
