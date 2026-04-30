import { TerminalPreview } from "@/components/home/TerminalPreview";
import { TrendTicker } from "@/components/home/TrendTicker";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("home live widgets", () => {
  it("renders ticker with mirrored content for endless scroll effect", () => {
    render(<TrendTicker items={[["repo/demo", "+10", "up"]]} />);
    const ticker = screen.getByLabelText("Live trends ticker");

    expect(ticker.textContent).toContain("repo/demo");
    expect(ticker.textContent?.split("repo/demo").length).toBeGreaterThan(2);
  });

  it("renders terminal preview with current command line", () => {
    render(<TerminalPreview />);
    expect(screen.getByText("pnpm build")).toBeInTheDocument();
    expect(screen.getByText("~/site2026 - shell - 80x24")).toBeInTheDocument();
  });
});
