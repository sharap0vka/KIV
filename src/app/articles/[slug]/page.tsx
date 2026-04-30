import { mdxComponents } from "@/components/content/mdx-components";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { buildCollectionOgMetadata } from "@/lib/seo/og";
import { getTagSlug } from "@/lib/tags";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import type { Article } from "#site/content";
import { articles } from "#site/content";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const publishedArticles = articles.filter((article) => article.draft !== true);

function toRouteSlug(slug: string): string {
  return slug.replace(/^articles\//, "");
}

function toFullSlug(routeSlug: string): string {
  return `articles/${routeSlug}`;
}

function getArticleByRouteSlug(routeSlug: string): Article | undefined {
  return publishedArticles.find((article) => article.slug === toFullSlug(routeSlug));
}

function renderArticleBody(code: string) {
  const evaluated = new Function(code) as (runtime: {
    jsx: typeof jsx;
    jsxs: typeof jsxs;
    Fragment: typeof Fragment;
  }) => { default: (props?: Record<string, unknown>) => ReactElement };

  const module = evaluated({ jsx, jsxs, Fragment });
  const Content = module.default;

  return <Content components={mdxComponents} />;
}

export function generateStaticParams() {
  return publishedArticles.map((article) => ({
    slug: toRouteSlug(article.slug),
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleByRouteSlug(slug);

  if (!article) {
    return {
      title: "Статья не найдена — site2026",
      description: "Запрошенная статья не найдена.",
    };
  }

  return {
    ...buildCollectionOgMetadata({
      title: article.title,
      description: article.description ?? "Материал из раздела articles.",
      collectionLabel: "articles",
      path: `/articles/${slug}`,
    }),
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleByRouteSlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <section className="kiv-section">
      <Container as="article" className="space-y-8">
        <section className="space-y-4 border-b border-[var(--fg-10)] pb-8">
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-30)]">article</div>
          <Heading as="h1" variant="section">
            {article.title}
          </Heading>
          {article.description ? (
            <p className="max-w-3xl font-sans text-base text-[var(--fg-70)]">
              {article.description}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-[var(--fg-50)]">
            <span>{dateFormatter.format(new Date(article.date))}</span>
          </div>

          {article.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link key={`${article.slug}-${tag}`} href={`/tags/${getTagSlug(tag)}`}>
                  <Tag variant="mono">{tag}</Tag>
                </Link>
              ))}
            </div>
          ) : null}
        </section>

        <Card
          variant="surface"
          className="max-w-none space-y-4 font-sans text-[15px] leading-[1.7] text-[var(--fg-70)]"
        >
          {renderArticleBody(article.body)}
        </Card>
      </Container>
    </section>
  );
}
