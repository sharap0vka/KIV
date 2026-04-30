import { buildFeedXml } from "@/lib/seo/feed";
// @vitest-environment node
import { describe, expect, it } from "vitest";

type TestDoc = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  draft?: boolean;
};

describe("buildFeedXml", () => {
  it("excludes drafts and includes key RSS metadata", () => {
    const docs: TestDoc[] = [
      {
        slug: "articles/published-post",
        title: "Published Post",
        description: "Public description",
        date: "2026-04-29",
      },
      {
        slug: "articles/draft-post",
        title: "Draft Post",
        description: "Should not appear",
        date: "2026-04-30",
        draft: true,
      },
    ];

    const xml = buildFeedXml(docs, {
      siteUrl: "https://site2026.dev",
      title: "site2026",
      description: "Digital garden",
    });

    expect(xml).toContain("<rss");
    expect(xml).toContain("<title>site2026</title>");
    expect(xml).toContain("<link>https://site2026.dev/</link>");
    expect(xml).toContain("<title>Published Post</title>");
    expect(xml).toContain("<link>https://site2026.dev/articles/published-post</link>");
    expect(xml).not.toContain("Draft Post");
  });
});
