import { buildSitemapEntries } from "@/lib/seo/sitemap";
// @vitest-environment node
import { describe, expect, it } from "vitest";

type TestDoc = {
  slug: string;
  date: string;
  draft?: boolean;
};

describe("buildSitemapEntries", () => {
  it("excludes drafts and returns canonical URLs with lastModified", () => {
    const docs: TestDoc[] = [
      { slug: "articles/live-post", date: "2026-04-20" },
      { slug: "concepts/draft-concept", date: "2026-04-30", draft: true },
    ];

    const entries = buildSitemapEntries(docs, { siteUrl: "https://site2026.dev" });

    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      url: "https://site2026.dev/articles/live-post",
      lastModified: "2026-04-20",
    });
  });
});
