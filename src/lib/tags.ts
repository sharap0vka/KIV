export type EntryWithTags = {
  tags: readonly string[];
};

export function normalizeTag(raw: string): string {
  throw new Error("Not implemented");
}

export function getTagSlug(raw: string): string {
  return normalizeTag(raw);
}

export function getTagDisplay(slug: string): string {
  throw new Error("Not implemented");
}

export function buildTagIndex<Entry extends EntryWithTags>(
  entries: readonly Entry[],
): Map<string, Entry[]> {
  throw new Error("Not implemented");
}

export type TagCount = {
  slug: string;
  count: number;
};

export function sortTags(tags: readonly TagCount[]): TagCount[] {
  throw new Error("Not implemented");
}
