import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "#site/content";

export const metadata: Metadata = {
  title: "Articles — site2026",
  description: "Список статей про vibe-coding и agentic engineering.",
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const publishedArticles = articles
  .filter((article) => article.draft !== true)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function ArticlesPage() {
  return (
    <section className="kiv-section">
      <Container as="div">
        <div className="mb-10 grid items-baseline gap-3 md:grid-cols-[200px_1fr_auto] md:gap-8">
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-30)]">{"// 11"}</div>
          <Heading as="h1" variant="section">
            latest <span className="text-[var(--fg-30)]">/</span> articles
          </Heading>
          <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--fg-50)]">
            {publishedArticles.length} entries
          </div>
        </div>

        <section className="grid gap-4">
          {publishedArticles.map((article) => {
            const articlePath = `/${article.slug.replace(/^articles\//, "")}`;

            return (
              <Card key={article.slug} variant="surface" className="relative space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.1em] text-[var(--fg-50)]">
                  <span className="border border-[var(--fg-15)] px-2 py-1">article</span>
                  <span>{dateFormatter.format(new Date(article.date))}</span>
                </div>
                <div className="space-y-2">
                  <Heading as="h2" variant="bodyTitle">
                    <Link className="hover:text-[var(--fg-50)]" href={`/articles${articlePath}`}>
                      {article.title}
                    </Link>
                  </Heading>
                  {article.description ? (
                    <p className="font-sans text-sm text-[var(--fg-70)]">{article.description}</p>
                  ) : null}
                </div>
                {article.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Tag key={`${article.slug}-${tag}`} variant="mono">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                ) : null}
                <span className="absolute right-4 top-4 text-sm text-[var(--fg-30)]">↗</span>
              </Card>
            );
          })}
        </section>
      </Container>
    </section>
  );
}
