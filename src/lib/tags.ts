export type EntryWithTags = {
  tags: readonly string[];
};

export function normalizeTag(raw: string): string {
  return raw
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export function getTagSlug(raw: string): string {
  return normalizeTag(raw);
}

export function getTagDisplay(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

export function buildTagIndex<Entry extends EntryWithTags>(
  entries: readonly Entry[],
): Map<string, Entry[]> {
  const index = new Map<string, Entry[]>();

  for (const entry of entries) {
    const uniqueTags = new Set(
      entry.tags.map((tag) => normalizeTag(tag)).filter((tag) => tag.length > 0),
    );

    for (const tag of uniqueTags) {
      const bucket = index.get(tag);

      if (bucket) {
        bucket.push(entry);
      } else {
        index.set(tag, [entry]);
      }
    }
  }

  return index;
}

export type TagCount = {
  slug: string;
  count: number;
};

export function sortTags(tags: readonly TagCount[]): TagCount[] {
  return [...tags].sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }

    return left.slug.localeCompare(right.slug);
  });
}
