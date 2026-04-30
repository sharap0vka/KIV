// @vitest-environment node
import {
  type GitHubTrendsClient,
  type TrendsSeed,
  fetchTrendsSnapshot,
} from "@/lib/trends/fetch-trends";
import { describe, expect, it } from "vitest";

describe("fetchTrendsSnapshot", () => {
  it("builds deterministic snapshot from topics and watchlist", async () => {
    const seed: TrendsSeed = {
      topics: ["ai"],
      watchlist: [{ owner: "anthropics", repo: "claude-code" }],
    };

    const client: GitHubTrendsClient = {
      searchByTopic: async () => [
        {
          owner: "openai",
          repo: "openai-agents",
          description: "Agents SDK",
          language: "TypeScript",
          starsTotal: 3200,
          starsDeltaWeek: 400,
        },
        {
          owner: "anthropics",
          repo: "claude-code",
          description: "Code agent",
          language: "TypeScript",
          starsTotal: 1000,
          starsDeltaWeek: 140,
        },
      ],
      getRepository: async () => ({
        owner: "anthropics",
        repo: "claude-code",
        description: "CLI coding agent",
        language: "TypeScript",
        starsTotal: 1000,
        starsDeltaWeek: 140,
      }),
    };

    const now = new Date("2026-04-30T10:15:00.000Z");
    const snapshot = await fetchTrendsSnapshot(seed, client, now);

    expect(snapshot).toMatchObject({
      date: "2026-04-30",
      generatedAt: "2026-04-30T10:15:00.000Z",
    });
    expect(snapshot.items.map((item) => `${item.owner}/${item.repo}`)).toEqual([
      "openai/openai-agents",
      "anthropics/claude-code",
    ]);
    expect(snapshot.items[1]?.description).toBe("CLI coding agent");
  });

  it("returns empty items when all sources return empty payloads", async () => {
    const seed: TrendsSeed = {
      topics: ["ai", "mcp"],
      watchlist: [],
    };

    const client: GitHubTrendsClient = {
      searchByTopic: async () => [],
      getRepository: async () => null,
    };

    const snapshot = await fetchTrendsSnapshot(seed, client, new Date("2026-04-30T00:00:00.000Z"));

    expect(snapshot.items).toEqual([]);
    expect(snapshot.date).toBe("2026-04-30");
    expect(snapshot.generatedAt).toBe("2026-04-30T00:00:00.000Z");
  });

  it("keeps successful results when one source fails", async () => {
    const seed: TrendsSeed = {
      topics: ["ai", "rust"],
      watchlist: [],
    };

    const client: GitHubTrendsClient = {
      searchByTopic: async (topic) => {
        if (topic === "rust") {
          throw new Error("rate limit");
        }

        return [
          {
            owner: "openai",
            repo: "openai-agents",
            starsTotal: 3200,
            starsDeltaWeek: 400,
          },
        ];
      },
      getRepository: async () => null,
    };

    const snapshot = await fetchTrendsSnapshot(seed, client, new Date("2026-04-30T00:00:00.000Z"));

    expect(snapshot.items.map((item) => `${item.owner}/${item.repo}`)).toEqual([
      "openai/openai-agents",
    ]);
  });

  it("deduplicates topic and watchlist entries and applies watchlist overrides", async () => {
    const seed: TrendsSeed = {
      topics: ["ai"],
      watchlist: [
        {
          owner: "Anthropics",
          repo: "Claude-Code",
          description: "Watchlist override",
          language: "Rust",
        },
      ],
    };

    const client: GitHubTrendsClient = {
      searchByTopic: async () => [
        {
          owner: "anthropics",
          repo: "claude-code",
          description: "From topic list",
          language: "TypeScript",
          starsTotal: 1000,
          starsDeltaWeek: 140,
        },
      ],
      getRepository: async () => ({
        owner: "anthropics",
        repo: "claude-code",
        description: "From watchlist fetch",
        language: "TypeScript",
        starsTotal: 1000,
        starsDeltaWeek: 140,
      }),
    };

    const snapshot = await fetchTrendsSnapshot(seed, client, new Date("2026-04-30T00:00:00.000Z"));

    expect(snapshot.items).toHaveLength(1);
    expect(snapshot.items[0]).toMatchObject({
      owner: "Anthropics",
      repo: "Claude-Code",
      description: "Watchlist override",
      language: "Rust",
      starsTotal: 1000,
      starsDeltaWeek: 140,
    });
  });

  it("throws when every upstream request fails", async () => {
    const seed: TrendsSeed = {
      topics: ["ai", "mcp"],
      watchlist: [{ owner: "openai", repo: "openai-agents" }],
    };

    const client: GitHubTrendsClient = {
      searchByTopic: async () => {
        throw new Error("github unavailable");
      },
      getRepository: async () => {
        throw new Error("github unavailable");
      },
    };

    await expect(
      fetchTrendsSnapshot(seed, client, new Date("2026-04-30T00:00:00.000Z")),
    ).rejects.toThrow("Failed to fetch trends data");
  });
});
