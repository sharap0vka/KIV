import { buildTagIndex } from "@/lib/tags";
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
});
