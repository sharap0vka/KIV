import { existsSync } from "node:fs";
import { join } from "node:path";

const requiredDirs = ["src", "content", "scripts"];
const rootDir = process.cwd();

const missing = requiredDirs.filter((dir) => !existsSync(join(rootDir, dir)));

if (missing.length > 0) {
  console.error(`Missing required directories: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("Structure check passed.");
