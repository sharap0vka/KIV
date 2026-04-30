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
    <Container as="section" className="space-y-8">
      <section className="space-y-4">
        <Heading as="h1" variant="section">
          Articles
        </Heading>
        <p className="max-w-2xl text-base text-text-secondary">
          Публикации про vibe-coding, agentic engineering и рабочие AI-практики.
        </p>
      </section>

      <section className="grid gap-4">
        {publishedArticles.map((article) => {
          const articlePath = `/${article.slug.replace(/^articles\//, "")}`;

          return (
            <Card key={article.slug} variant="surface" className="space-y-4">
              <div className="space-y-2">
                <Heading as="h2" variant="bodyTitle">
                  <Link className="hover:text-text-muted" href={`/articles${articlePath}`}>
                    {article.title}
                  </Link>
                </Heading>
                {article.description ? (
                  <p className="text-sm text-text-secondary">{article.description}</p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
                <span>{dateFormatter.format(new Date(article.date))}</span>
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
            </Card>
          );
        })}
      </section>
    </Container>
  );
}
