import { writeFile } from "node:fs/promises";
import path from "node:path";

const TRENDING_URL = "https://github.com/trending?since=weekly";
const OUTPUT_DIR = path.join(process.cwd(), "content", "trends");

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function toInt(value) {
  const normalized = value.replace(/,/g, "").trim();
  const parsed = Number.parseInt(normalized, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractField(block, pattern) {
  const match = block.match(pattern);
  if (!match?.[1]) {
    return undefined;
  }

  return normalizeWhitespace(match[1]);
}

function stripHtml(value) {
  return normalizeWhitespace(value.replace(/<[^>]+>/g, " "));
}

function parseTrendingHtml(html) {
  const repoBlocks = [...html.matchAll(/<article class="Box-row"[\s\S]*?<\/article>/g)].map(
    (match) => match[0],
  );

  const items = [];
  for (const block of repoBlocks) {
    const repoMatch = block.match(
      /<h2 class="h3 lh-condensed">[\s\S]*?href="\/([^/]+)\/([^"/?#]+)"/,
    );
    if (!repoMatch?.[1] || !repoMatch[2]) {
      continue;
    }

    const owner = repoMatch[1].trim();
    const repo = repoMatch[2].trim();
    const descriptionHtml = extractField(
      block,
      /<p class="col-9 color-fg-muted my-1[^"]*">([\s\S]*?)<\/p>/,
    );
    const description = descriptionHtml ? stripHtml(descriptionHtml) : undefined;
    const language = extractField(block, /<span itemprop="programmingLanguage">([\s\S]*?)<\/span>/);
    const starsTotalHtml = extractField(
      block,
      /href="\/[^"]+\/stargazers"[\s\S]*?>([\s\S]*?)<\/a>/,
    );
    const starsTotalRaw = stripHtml(starsTotalHtml ?? "").replace(/[^\d,]/g, "");
    const starsDeltaWeekRaw = extractField(block, /([\d,]+)\s+stars this week/);

    items.push({
      owner,
      repo,
      description,
      language,
      starsTotal: toInt(starsTotalRaw ?? "0"),
      starsDeltaWeek: toInt(starsDeltaWeekRaw ?? "0"),
    });
  }

  return items;
}

async function main() {
  const response = await fetch(TRENDING_URL, {
    headers: {
      "User-Agent": "site2026-trends-fetcher",
      Accept: "text/html",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch weekly trending: ${response.status}`);
  }

  const html = await response.text();
  const items = parseTrendingHtml(html);
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const snapshot = {
    date,
    generatedAt: now.toISOString(),
    items,
  };

  const json = `${JSON.stringify(snapshot, null, 2)}\n`;
  await writeFile(path.join(OUTPUT_DIR, "latest.json"), json, "utf8");
  await writeFile(path.join(OUTPUT_DIR, `${date}.json`), json, "utf8");

  console.log(`Saved ${items.length} weekly repositories to content/trends/latest.json`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
