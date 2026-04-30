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
    <section className="kiv-section">
      <Container as="article" className="space-y-8">
        <section className="space-y-4 border-b border-[var(--fg-10)] pb-8">
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-30)]">concept</div>
          <Heading as="h1" variant="section">
            {concept.title}
          </Heading>
          {concept.description ? (
            <p className="max-w-3xl font-sans text-base text-[var(--fg-70)]">
              {concept.description}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-[var(--fg-50)]">
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
            <p className="text-xs uppercase tracking-[0.1em] text-[var(--fg-50)]">Aliases</p>
            <div className="flex flex-wrap gap-2">
              {concept.aliases.map((alias) => (
                <Tag key={`${concept.slug}-${alias}`}>{alias}</Tag>
              ))}
            </div>
          </Card>
        ) : null}

        {concept.seeAlso && concept.seeAlso.length > 0 ? (
          <Card variant="surface" className="space-y-3">
            <p className="text-xs uppercase tracking-[0.1em] text-[var(--fg-50)]">See also</p>
            <ul className="space-y-2 font-sans text-sm text-[var(--fg-70)]">
              {concept.seeAlso.map((relatedSlug) => (
                <li key={`${concept.slug}-${relatedSlug}`}>
                  <Link className="hover:text-[var(--fg-50)]" href={`/concepts/${relatedSlug}`}>
                    {relatedSlug}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}

        <Card
          variant="surface"
          className="max-w-none space-y-4 font-sans text-[15px] leading-[1.7] text-[var(--fg-70)]"
        >
          {renderConceptBody(concept.body)}
        </Card>
      </Container>
    </section>
  );
}
