import {
  articleFrontmatterSchema,
  conceptFrontmatterSchema,
  mcpFrontmatterSchema,
  skillFrontmatterSchema,
  trendMetaSchema,
} from "@/content/schemas";
import { describe, expect, it } from "vitest";

describe("content schemas", () => {
  it("validates article frontmatter", () => {
    const result = articleFrontmatterSchema.parse({
      title: "Article title",
      slug: "articles/article-title",
      date: "2026-04-28",
      tags: ["agentic", "cursor"],
    });

    expect(result.draft).toBe(false);
  });

  it("validates concept frontmatter", () => {
    const result = conceptFrontmatterSchema.parse({
      title: "MCP",
      slug: "concepts/mcp",
      date: "2026-04-28",
      tags: ["mcp"],
      aliases: ["Model Context Protocol"],
    });

    expect(result.aliases).toContain("Model Context Protocol");
  });

  it("validates skill frontmatter", () => {
    const result = skillFrontmatterSchema.parse({
      title: "Setup Husky",
      slug: "skills/setup-husky",
      date: "2026-04-28",
      tags: ["workflow"],
      trigger: "setup pre-commit",
    });

    expect(result.trigger).toBe("setup pre-commit");
  });

  it("validates mcp frontmatter", () => {
    const result = mcpFrontmatterSchema.parse({
      title: "cursor-app-control",
      slug: "mcp/cursor-app-control",
      date: "2026-04-28",
      tags: ["mcp"],
      tools: ["move_agent_to_root", "open_resource"],
      repo: "https://github.com/getcursor/cursor",
      language: "typescript",
    });

    expect(result.tools.length).toBe(2);
  });

  it("validates trend metadata", () => {
    const result = trendMetaSchema.parse({
      date: "2026-04-28",
      generatedAt: "2026-04-28T08:00:00.000Z",
      items: [
        {
          owner: "anthropics",
          repo: "claude-code",
          description: "Code agent",
          language: "TypeScript",
          starsTotal: 1000,
          starsDeltaWeek: 140,
        },
      ],
    });

    expect(result.items[0]?.repo).toBe("claude-code");
  });

  it("throws readable error for missing required field", () => {
    expect(() =>
      articleFrontmatterSchema.parse({
        slug: "articles/missing-title",
        date: "2026-04-28",
        tags: [],
      }),
    ).toThrowError(/title/i);
  });

  it("rejects unknown fields via strict mode", () => {
    expect(() =>
      conceptFrontmatterSchema.parse({
        title: "Unknown field",
        slug: "concepts/unknown-field",
        date: "2026-04-28",
        tags: [],
        unknownKey: "nope",
      }),
    ).toThrowError(/unrecognized|unknown/i);
  });
});
