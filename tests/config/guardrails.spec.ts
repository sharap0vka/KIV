import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const rootDir = process.cwd();

function readPackageJson() {
  const packageJsonPath = join(rootDir, "package.json");
  const content = readFileSync(packageJsonPath, "utf8");
  return JSON.parse(content) as Record<string, unknown>;
}

describe("contributor guardrails", () => {
  it("defines lint-staged configuration", () => {
    const packageJson = readPackageJson();
    const lintStaged = packageJson["lint-staged"];

    expect(lintStaged).toBeDefined();
    expect(typeof lintStaged).toBe("object");
  });

  it("defines a single quality gate command", () => {
    const packageJson = readPackageJson();
    const scripts = packageJson.scripts as Record<string, string> | undefined;

    expect(scripts).toBeDefined();
    expect(scripts?.["quality:check"]).toBeDefined();
    expect(scripts?.["quality:check"]).toContain("pnpm lint");
    expect(scripts?.["quality:check"]).toContain("pnpm format:check");
    expect(scripts?.["quality:check"]).toContain("pnpm typecheck");
    expect(scripts?.["quality:check"]).toContain("pnpm test");
  });

  it("documents code and content licenses explicitly", () => {
    const codeLicensePath = join(rootDir, "LICENSE");
    const contentLicensePath = join(rootDir, "LICENSE-CONTENT");

    expect(existsSync(codeLicensePath)).toBe(true);
    expect(existsSync(contentLicensePath)).toBe(true);

    const codeLicense = readFileSync(codeLicensePath, "utf8");
    const contentLicense = readFileSync(contentLicensePath, "utf8");

    expect(codeLicense).toContain("MIT License");
    expect(contentLicense).toContain("Creative Commons Attribution 4.0 International");
  });

  it("documents local quality workflow for contributors", () => {
    const contributingPath = join(rootDir, "CONTRIBUTING.md");
    expect(existsSync(contributingPath)).toBe(true);

    const contributing = readFileSync(contributingPath, "utf8");
    expect(contributing).toContain("pre-commit");
    expect(contributing).toContain("pnpm quality:check");
    expect(contributing).toContain("MIT");
    expect(contributing).toContain("CC BY 4.0");
  });
});
