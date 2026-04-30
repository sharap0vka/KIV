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
    <section className="kiv-section">
      <Container as="div">
        <div className="mb-10 grid items-baseline gap-3 md:grid-cols-[200px_1fr_auto] md:gap-8">
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-30)]">{"// 13"}</div>
          <Heading as="h1" variant="section">
            tags <span className="text-[var(--fg-30)]">/</span> index
          </Heading>
          <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--fg-50)]">
            {sortedTags.length} tags
          </div>
        </div>

        <section className="grid gap-4">
          {sortedTags.map((tag) => (
            <Card
              key={tag.slug}
              variant="surface"
              className="relative flex items-center justify-between gap-4"
            >
              <div className="flex min-w-0 flex-col gap-2">
                <Heading as="h2" variant="bodyTitle">
                  <Link className="hover:text-[var(--fg-50)]" href={`/tags/${tag.slug}`}>
                    {getTagDisplay(tag.slug)}
                  </Link>
                </Heading>
                <Tag variant="mono">{tag.slug}</Tag>
              </div>
              <span className="shrink-0 text-sm text-[var(--fg-70)]">{tag.count} материалов</span>
              <span className="absolute right-4 top-4 text-sm text-[var(--fg-30)]">↗</span>
            </Card>
          ))}
        </section>
      </Container>
    </section>
  );
}
