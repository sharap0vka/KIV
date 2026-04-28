import { buildTagIndex, normalizeTag, sortTags } from "@/lib/tags";
import { describe, expect, it } from "vitest";

type TestEntry = {
  id: string;
  collection: "articles" | "concepts";
  tags: string[];
};

describe("tags index", () => {
  it("groups entries by normalized tag and collapses duplicates inside one entry", () => {
    const entries: TestEntry[] = [
      { id: "a1", collection: "articles", tags: ["Agentic AI", "agentic-ai"] },
      { id: "c1", collection: "concepts", tags: [" agentic ai "] },
      { id: "c2", collection: "concepts", tags: ["MCP"] },
    ];

    const index = buildTagIndex(entries);

    expect(index.size).toBe(2);
    expect(index.get("agentic-ai")?.map((entry) => entry.id)).toEqual(["a1", "c1"]);
    expect(index.get("mcp")?.map((entry) => entry.id)).toEqual(["c2"]);
  });

  it("normalizes case, whitespace, unicode separators and collapses duplicates", () => {
    const entries: TestEntry[] = [
      {
        id: "a2",
        collection: "articles",
        tags: ["  MCP  ", "mcp", "MCP", "Model\u00A0Context\u00A0Protocol"],
      },
      {
        id: "c3",
        collection: "concepts",
        tags: ["Agentic \u2014 AI", "agentic-ai", "AGENTIC   AI"],
      },
    ];

    const index = buildTagIndex(entries);

    expect(normalizeTag("  MCP  ")).toBe("mcp");
    expect(normalizeTag("Agentic \u2014 AI")).toBe("agentic-ai");
    expect(normalizeTag("Model\u00A0Context\u00A0Protocol")).toBe("model-context-protocol");
    expect(index.get("mcp")?.map((entry) => entry.id)).toEqual(["a2"]);
    expect(index.get("agentic-ai")?.map((entry) => entry.id)).toEqual(["c3"]);
  });

  it("sorts tags by count desc, then alphabetically and keeps stable order for equal keys", () => {
    const sameA1 = { slug: "agentic-ai", count: 3 };
    const sameA2 = { slug: "agentic-ai", count: 3 };

    const sorted = sortTags([
      { slug: "zeta", count: 1 },
      sameA1,
      { slug: "mcp", count: 3 },
      sameA2,
      { slug: "alpha", count: 2 },
    ]);

    expect(sorted.map((item) => `${item.count}:${item.slug}`)).toEqual([
      "3:agentic-ai",
      "3:agentic-ai",
      "3:mcp",
      "2:alpha",
      "1:zeta",
    ]);
    expect(sorted[0]).toBe(sameA1);
    expect(sorted[1]).toBe(sameA2);
  });
});
