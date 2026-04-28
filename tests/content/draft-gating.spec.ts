// @vitest-environment node
import { shouldIncludeDocument } from "@/content/draft-gating";
import { describe, expect, it } from "vitest";

describe("draft gating", () => {
  it("includes drafts in development", () => {
    expect(shouldIncludeDocument({ draft: true }, "development")).toBe(true);
  });

  it("excludes drafts in production", () => {
    expect(shouldIncludeDocument({ draft: true }, "production")).toBe(false);
  });

  it("treats undefined draft as false in production", () => {
    expect(shouldIncludeDocument({}, "production")).toBe(true);
  });
});
