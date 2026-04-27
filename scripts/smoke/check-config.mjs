import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.cwd();

const tsconfigPath = join(rootDir, "tsconfig.json");
if (!existsSync(tsconfigPath)) {
  console.error("Missing tsconfig.json");
  process.exit(1);
}

const tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf8"));
if (tsconfig?.compilerOptions?.strict !== true) {
  console.error("TypeScript strict mode must be enabled.");
  process.exit(1);
}

const nextConfigCandidates = [
  join(rootDir, "next.config.ts"),
  join(rootDir, "next.config.mjs"),
  join(rootDir, "next.config.js"),
];

const existingConfigPath = nextConfigCandidates.find((filePath) => existsSync(filePath));

if (!existingConfigPath) {
  console.error("Missing next config file.");
  process.exit(1);
}

const nextConfigContent = readFileSync(existingConfigPath, "utf8");
if (!/output\s*:\s*['"]standalone['"]/.test(nextConfigContent)) {
  console.error("Next.js config must set output: 'standalone'.");
  process.exit(1);
}

console.log("Config check passed.");
