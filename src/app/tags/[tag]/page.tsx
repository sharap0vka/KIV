import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { buildTagIndex, getTagDisplay } from "@/lib/tags";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, concepts } from "#site/content";

type TagsBySlugPageProps = {
  params: Promise<{ tag: string }>;
};

type TaggedEntry = {
  collection: "articles" | "concepts";
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

const publishedEntries: TaggedEntry[] = [
  ...articles
    .filter((article) => article.draft !== true)
    .map((article) => ({
      collection: "articles" as const,
      slug: article.slug,
      title: article.title,
      description: article.description,
      date: article.date,
      tags: article.tags,
    })),
  ...concepts
    .filter((concept) => concept.draft !== true)
    .map((concept) => ({
      collection: "concepts" as const,
      slug: concept.slug,
      title: concept.title,
      description: concept.description,
      date: concept.date,
      tags: concept.tags,
    })),
];

const tagIndex = buildTagIndex(publishedEntries);

function toEntryHref(entry: TaggedEntry): string {
  if (entry.collection === "articles") {
    return `/articles/${entry.slug.replace(/^articles\//, "")}`;
  }

  return `/concepts/${entry.slug.replace(/^concepts\//, "")}`;
}

function getCollectionLabel(collection: TaggedEntry["collection"]): string {
  if (collection === "articles") {
    return "Articles";
  }

  return "Concepts";
}

function getEntriesByTag(tagSlug: string): TaggedEntry[] {
  const entries = tagIndex.get(tagSlug);

  if (!entries) {
    return [];
  }

  return [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function generateStaticParams() {
  return Array.from(tagIndex.keys()).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagsBySlugPageProps): Promise<Metadata> {
  const { tag } = await params;
  const entries = getEntriesByTag(tag);

  if (entries.length === 0) {
    return {
      title: "Тег не найден — site2026",
      description: "Запрошенный тег не найден в опубликованных MVP-коллекциях.",
    };
  }

  const displayTag = getTagDisplay(tag);

  return {
    title: `${displayTag} — Tags — site2026`,
    description: `Материалы по тегу ${displayTag} из разделов articles и concepts.`,
  };
}

export default async function TagDetailsPage({ params }: TagsBySlugPageProps) {
  const { tag } = await params;
  const entries = getEntriesByTag(tag);

  if (entries.length === 0) {
    notFound();
  }

  const displayTag = getTagDisplay(tag);
  const articleEntries = entries.filter((entry) => entry.collection === "articles");
  const conceptEntries = entries.filter((entry) => entry.collection === "concepts");
  const groupedEntries = [
    { collection: "articles" as const, entries: articleEntries },
    { collection: "concepts" as const, entries: conceptEntries },
  ].filter((group) => group.entries.length > 0);

  return (
    <Container as="section" className="space-y-8">
      <section className="space-y-4 border-b border-border pb-8">
        <Heading as="h1" variant="section">
          {displayTag}
        </Heading>
        <div className="flex flex-wrap items-center gap-3">
          <Tag variant="mono">{tag}</Tag>
          <span className="text-sm text-text-secondary">{entries.length} материалов</span>
        </div>
      </section>

      {groupedEntries.map((group) => (
        <section key={group.collection} className="space-y-4">
          <Heading as="h2" variant="bodyTitle">
            {getCollectionLabel(group.collection)}
          </Heading>
          <div className="grid gap-4">
            {group.entries.map((entry) => (
              <Card key={entry.slug} variant="surface" className="space-y-3">
                <div className="space-y-2">
                  <Heading as="h3" variant="bodyTitle">
                    <Link className="hover:text-text-muted" href={toEntryHref(entry)}>
                      {entry.title}
                    </Link>
                  </Heading>
                  {entry.description ? (
                    <p className="text-sm text-text-secondary">{entry.description}</p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
                  <span>{dateFormatter.format(new Date(entry.date))}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </Container>
  );
}
