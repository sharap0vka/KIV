import { mdxComponents } from "@/components/content/mdx-components";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
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
import type { Concept } from "#site/content";
import { concepts } from "#site/content";

type ConceptPageProps = {
  params: Promise<{ slug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const publishedConcepts = concepts.filter((concept) => concept.draft !== true);

function toRouteSlug(slug: string): string {
  return slug.replace(/^concepts\//, "");
}

function toFullSlug(routeSlug: string): string {
  return `concepts/${routeSlug}`;
}

function getConceptByRouteSlug(routeSlug: string): Concept | undefined {
  return publishedConcepts.find((concept) => concept.slug === toFullSlug(routeSlug));
}

function renderConceptBody(code: string) {
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
  return publishedConcepts.map((concept) => ({
    slug: toRouteSlug(concept.slug),
  }));
}

export async function generateMetadata({ params }: ConceptPageProps): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConceptByRouteSlug(slug);

  if (!concept) {
    return {
      title: "Concept не найден — site2026",
      description: "Запрошенный concept не найден.",
    };
  }

  return {
    ...buildCollectionOgMetadata({
      title: concept.title,
      description: concept.description ?? "Материал из раздела concepts.",
      collectionLabel: "concepts",
      path: `/concepts/${slug}`,
    }),
  };
}

export default async function ConceptDetailPage({ params }: ConceptPageProps) {
  const { slug } = await params;
  const concept = getConceptByRouteSlug(slug);

  if (!concept) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Header />
      <main className="py-12 md:py-16">
        <Container as="article" className="space-y-8">
          <section className="space-y-4 border-b border-border pb-8">
            <Heading as="h1" variant="section">
              {concept.title}
            </Heading>
            {concept.description ? (
              <p className="max-w-3xl text-base text-text-secondary">{concept.description}</p>
            ) : null}

            <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
              <span>{dateFormatter.format(new Date(concept.date))}</span>
            </div>

            {concept.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {concept.tags.map((tag) => (
                  <Link key={`${concept.slug}-${tag}`} href={`/tags/${getTagSlug(tag)}`}>
                    <Tag variant="mono">{tag}</Tag>
                  </Link>
                ))}
              </div>
            ) : null}
          </section>

          {concept.aliases && concept.aliases.length > 0 ? (
            <Card variant="surface" className="space-y-3">
              <p className="text-xs uppercase tracking-[1px] text-text-muted">Aliases</p>
              <div className="flex flex-wrap gap-2">
                {concept.aliases.map((alias) => (
                  <Tag key={`${concept.slug}-${alias}`}>{alias}</Tag>
                ))}
              </div>
            </Card>
          ) : null}

          {concept.seeAlso && concept.seeAlso.length > 0 ? (
            <Card variant="surface" className="space-y-3">
              <p className="text-xs uppercase tracking-[1px] text-text-muted">See also</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                {concept.seeAlso.map((relatedSlug) => (
                  <li key={`${concept.slug}-${relatedSlug}`}>
                    <Link className="hover:text-text-muted" href={`/concepts/${relatedSlug}`}>
                      {relatedSlug}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}

          <Card variant="surface" className="prose prose-invert max-w-none prose-a:text-fg">
            {renderConceptBody(concept.body)}
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
