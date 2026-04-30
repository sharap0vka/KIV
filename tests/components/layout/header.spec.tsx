import { Header } from "@/components/layout/Header";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Header mobile navigation", () => {
  it("opens and closes the explicit mobile menu panel", () => {
    render(<Header />);

    const menuToggle = screen.getByRole("button", { name: "Open navigation menu" });
    const menuPanel = document.getElementById("mobile-primary-nav");
    expect(menuPanel).toHaveClass("hidden");
    expect(menuToggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuToggle);
    const mobileNav = screen.getByRole("navigation", { name: "Primary mobile" });
    expect(mobileNav).toBeInTheDocument();
    expect(menuToggle).toHaveAttribute("aria-expanded", "true");
    expect(menuPanel).not.toHaveClass("hidden");
    expect(within(mobileNav).getByRole("link", { name: "Articles" })).toBeInTheDocument();

    fireEvent.click(within(mobileNav).getByRole("link", { name: "Home" }));
    expect(menuPanel).toHaveClass("hidden");
  });
});
