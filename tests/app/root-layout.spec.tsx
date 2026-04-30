import { AppShell } from "@/components/layout/AppShell";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("AppShell", () => {
  it("renders a shared shell around page content", () => {
    render(
      <AppShell>
        <div>page payload</div>
      </AppShell>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "Layout status" })).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText("page payload")).toBeInTheDocument();
  });
});
