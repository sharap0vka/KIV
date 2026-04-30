import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { buildTagIndex, getTagDisplay, sortTags } from "@/lib/tags";
import type { Metadata } from "next";
import Link from "next/link";
import { articles, concepts } from "#site/content";

export const metadata: Metadata = {
  title: "Tags — site2026",
  description: "Индекс всех тегов по опубликованным материалам MVP-коллекций.",
};

type MvpEntry = {
  slug: string;
  tags: string[];
};

const publishedEntries: MvpEntry[] = [
  ...articles
    .filter((article) => article.draft !== true)
    .map((article) => ({ slug: article.slug, tags: article.tags })),
  ...concepts
    .filter((concept) => concept.draft !== true)
    .map((concept) => ({ slug: concept.slug, tags: concept.tags })),
];

const tagIndex = buildTagIndex(publishedEntries);
const sortedTags = sortTags(
  Array.from(tagIndex.entries()).map(([slug, entries]) => ({
    slug,
    count: entries.length,
  })),
);

export default function TagsPage() {
  return (
    <Container as="section" className="space-y-8">
      <section className="space-y-4">
        <Heading as="h1" variant="section">
          Tags
        </Heading>
        <p className="max-w-2xl text-base text-text-secondary">
          Единый индекс тем по опубликованным статьям и концепциям.
        </p>
      </section>

      <section className="grid gap-4">
        {sortedTags.map((tag) => (
          <Card
            key={tag.slug}
            variant="surface"
            className="flex items-center justify-between gap-4"
          >
            <div className="flex min-w-0 flex-col gap-2">
              <Heading as="h2" variant="bodyTitle">
                <Link className="hover:text-text-muted" href={`/tags/${tag.slug}`}>
                  {getTagDisplay(tag.slug)}
                </Link>
              </Heading>
              <Tag variant="mono">{tag.slug}</Tag>
            </div>
            <span className="shrink-0 text-sm text-text-secondary">{tag.count} материалов</span>
          </Card>
        ))}
      </section>
    </Container>
  );
}
