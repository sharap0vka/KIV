// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

vi.mock("node:fs/promises", async () => {
  const actual = await vi.importActual<typeof import("node:fs/promises")>("node:fs/promises");
  return {
    ...actual,
    readFile: vi.fn(async () => {
      throw new Error("ENOENT");
    }),
  };
});

import { getLatestTrendsSnapshotView } from "@/lib/trends/snapshots";

describe("getLatestTrendsSnapshotView", () => {
  it("returns safe fallback when latest snapshot is unavailable", async () => {
    const result = await getLatestTrendsSnapshotView();

    expect(result.snapshot.items).toEqual([]);
    expect(result.snapshot.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(result.freshnessLabel).toContain("fallback");
  });
});
