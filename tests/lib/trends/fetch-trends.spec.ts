// @vitest-environment node
import { type GitHubTrendsClient, fetchTrendsSnapshot } from "@/lib/trends/fetch-trends";
import { describe, expect, it } from "vitest";

describe("fetchTrendsSnapshot", () => {
  it("builds deterministic snapshot from weekly trending feed", async () => {
    const client: GitHubTrendsClient = {
      getWeeklyTrending: async () => [
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
    };

    const now = new Date("2026-04-30T10:15:00.000Z");
    const snapshot = await fetchTrendsSnapshot(client, now);

    expect(snapshot).toMatchObject({
      date: "2026-04-30",
      generatedAt: "2026-04-30T10:15:00.000Z",
    });
    expect(snapshot.items.map((item) => `${item.owner}/${item.repo}`)).toEqual([
      "openai/openai-agents",
      "anthropics/claude-code",
    ]);
    expect(snapshot.items[1]?.description).toBe("Code agent");
  });

  it("returns empty items when weekly feed is empty", async () => {
    const client: GitHubTrendsClient = {
      getWeeklyTrending: async () => [],
    };

    const snapshot = await fetchTrendsSnapshot(client, new Date("2026-04-30T00:00:00.000Z"));

    expect(snapshot.items).toEqual([]);
    expect(snapshot.date).toBe("2026-04-30");
    expect(snapshot.generatedAt).toBe("2026-04-30T00:00:00.000Z");
  });

  it("deduplicates repeated repositories from weekly feed", async () => {
    const client: GitHubTrendsClient = {
      getWeeklyTrending: async () => [
        {
          owner: "OpenAI",
          repo: "openai-agents",
          starsTotal: 3200,
          starsDeltaWeek: 400,
        },
        {
          owner: "openai",
          repo: "openai-agents",
          starsTotal: 3300,
          starsDeltaWeek: 450,
          description: "Latest duplicate wins",
        },
      ],
    };

    const snapshot = await fetchTrendsSnapshot(client, new Date("2026-04-30T00:00:00.000Z"));

    expect(snapshot.items).toHaveLength(1);
    expect(snapshot.items[0]).toMatchObject({
      owner: "openai",
      repo: "openai-agents",
      starsTotal: 3300,
      starsDeltaWeek: 450,
      description: "Latest duplicate wins",
    });
  });

  it("throws when weekly upstream request fails", async () => {
    const client: GitHubTrendsClient = {
      getWeeklyTrending: async () => {
        throw new Error("github unavailable");
      },
    };

    await expect(fetchTrendsSnapshot(client, new Date("2026-04-30T00:00:00.000Z"))).rejects.toThrow(
      "Failed to fetch trends data",
    );
  });
});
