import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import type { TrendItem, TrendsSnapshot } from "@/lib/trends/fetch-trends";

const TRENDS_DIR = path.join(process.cwd(), "content", "trends");
const LATEST_FILENAME = "latest.json";

type TrendsSnapshotView = {
  snapshot: TrendsSnapshot;
  freshnessLabel: string;
};

export async function getLatestTrendsSnapshotView(): Promise<TrendsSnapshotView> {
  let snapshot: TrendsSnapshot;

  try {
    snapshot = await readTrendsSnapshotFile(LATEST_FILENAME);
  } catch {
    const now = new Date();
    snapshot = {
      date: now.toISOString().slice(0, 10),
      generatedAt: now.toISOString(),
      items: [],
    };
  }

  return {
    snapshot,
    freshnessLabel:
      snapshot.items.length === 0
        ? "Свежесть: fallback-режим, данные временно недоступны."
        : buildFreshnessLabel(snapshot.generatedAt),
  };
}

export async function getTrendSnapshotDates(): Promise<string[]> {
  const fileNames = await readdir(TRENDS_DIR);

  return fileNames
    .filter((fileName) => /^\d{4}-\d{2}-\d{2}\.json$/.test(fileName))
    .map((fileName) => fileName.slice(0, 10))
    .sort((left, right) => right.localeCompare(left));
}

async function readTrendsSnapshotFile(fileName: string): Promise<TrendsSnapshot> {
  const absolutePath = path.join(TRENDS_DIR, fileName);
  const rawText = await readFile(absolutePath, "utf8");
  const parsed = JSON.parse(rawText) as TrendsSnapshot;

  return {
    date: parsed.date,
    generatedAt: parsed.generatedAt,
    items: Array.isArray(parsed.items) ? parsed.items.map((item) => normalizeItem(item)) : [],
  };
}

function normalizeItem(item: TrendItem): TrendItem {
  return {
    owner: String(item.owner ?? "").trim(),
    repo: String(item.repo ?? "").trim(),
    description: normalizeOptional(item.description),
    language: normalizeOptional(item.language),
    starsTotal: normalizeInt(item.starsTotal),
    starsDeltaWeek: normalizeInt(item.starsDeltaWeek),
  };
}

function normalizeOptional(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeInt(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.trunc(value);
}

function buildFreshnessLabel(generatedAt: string): string {
  const generatedDate = new Date(generatedAt);

  if (Number.isNaN(generatedDate.getTime())) {
    return "Свежесть: время генерации неизвестно.";
  }

  const formatter = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `Свежесть: снимок собран ${formatter.format(generatedDate)}.`;
}
