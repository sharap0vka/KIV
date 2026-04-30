type RepoKey = `${string}/${string}`;

export type TrendItem = {
  owner: string;
  repo: string;
  description?: string;
  language?: string;
  starsTotal: number;
  starsDeltaWeek: number;
};

export type TrendsSnapshot = {
  date: string;
  generatedAt: string;
  items: TrendItem[];
};

export type GitHubTrendsClient = {
  getWeeklyTrending(): Promise<TrendItem[]>;
};

export async function fetchTrendsSnapshot(
  client: GitHubTrendsClient,
  now: Date = new Date(),
): Promise<TrendsSnapshot> {
  const result = await Promise.allSettled([client.getWeeklyTrending()]);
  const hasAtLeastOneSuccess = result.some((entry) => entry.status === "fulfilled");
  const hasAtLeastOneFailure = result.some((entry) => entry.status === "rejected");

  if (!hasAtLeastOneSuccess || hasAtLeastOneFailure) {
    throw new AggregateError(
      result
        .filter((entry): entry is PromiseRejectedResult => entry.status === "rejected")
        .map((entry) => entry.reason),
      "Failed to fetch trends data",
    );
  }

  const itemsByRepo = new Map<RepoKey, TrendItem>();
  const [weeklyTrendingResult] = result;

  if (weeklyTrendingResult && weeklyTrendingResult.status === "fulfilled") {
    for (const rawItem of weeklyTrendingResult.value) {
      const item = normalizeTrendItem(rawItem);
      itemsByRepo.set(toRepoKey(item.owner, item.repo), item);
    }
  }

  const items = [...itemsByRepo.values()].sort(compareTrendItems);

  return {
    date: toIsoDate(now),
    generatedAt: now.toISOString(),
    items,
  };
}

function normalizeTrendItem(item: Partial<TrendItem>): TrendItem {
  return {
    owner: (item.owner ?? "").trim(),
    repo: (item.repo ?? "").trim(),
    description: cleanOptional(item.description),
    language: cleanOptional(item.language),
    starsTotal: normalizeInt(item.starsTotal, 0, true),
    starsDeltaWeek: normalizeInt(item.starsDeltaWeek, 0, false),
  };
}

function cleanOptional(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeInt(value: number | undefined, fallback: number, nonnegative: boolean): number {
  if (value === undefined || !Number.isFinite(value)) {
    return fallback;
  }

  const normalized = Math.trunc(value);

  if (nonnegative && normalized < 0) {
    return 0;
  }

  return normalized;
}

function toRepoKey(owner: string, repo: string): RepoKey {
  return `${owner.toLowerCase()}/${repo.toLowerCase()}`;
}

function growthRatio(item: TrendItem): number {
  const base = Math.max(item.starsTotal - item.starsDeltaWeek, 1);
  return item.starsDeltaWeek / base;
}

function compareTrendItems(left: TrendItem, right: TrendItem): number {
  if (right.starsDeltaWeek !== left.starsDeltaWeek) {
    return right.starsDeltaWeek - left.starsDeltaWeek;
  }

  const ratioDiff = growthRatio(right) - growthRatio(left);
  if (ratioDiff !== 0) {
    return ratioDiff;
  }

  if (right.starsTotal !== left.starsTotal) {
    return right.starsTotal - left.starsTotal;
  }

  return toRepoKey(left.owner, left.repo).localeCompare(toRepoKey(right.owner, right.repo));
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
