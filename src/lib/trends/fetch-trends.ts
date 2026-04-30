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

export type WatchlistItem = {
  owner: string;
  repo: string;
  description?: string;
  language?: string;
  starsTotal?: number;
  starsDeltaWeek?: number;
};

export type TrendsSeed = {
  topics: string[];
  watchlist?: WatchlistItem[];
};

export type GitHubTrendsClient = {
  searchByTopic(topic: string): Promise<TrendItem[]>;
  getRepository(owner: string, repo: string): Promise<TrendItem | null>;
};

export async function fetchTrendsSnapshot(
  seed: TrendsSeed,
  client: GitHubTrendsClient,
  now: Date = new Date(),
): Promise<TrendsSnapshot> {
  const topicTasks = seed.topics.map((topic) => client.searchByTopic(topic));
  const watchlist = seed.watchlist ?? [];
  const watchlistTasks = watchlist.map((item) => client.getRepository(item.owner, item.repo));

  const topicResults = await Promise.allSettled(topicTasks);
  const watchlistResults = await Promise.allSettled(watchlistTasks);
  const allResults = [...topicResults, ...watchlistResults];

  const hasAtLeastOneSuccess = allResults.some((result) => result.status === "fulfilled");
  const hasAtLeastOneFailure = allResults.some((result) => result.status === "rejected");

  if (!hasAtLeastOneSuccess && hasAtLeastOneFailure) {
    throw new AggregateError(
      allResults
        .filter((result): result is PromiseRejectedResult => result.status === "rejected")
        .map((result) => result.reason),
      "Failed to fetch trends data",
    );
  }

  const itemsByRepo = new Map<RepoKey, TrendItem>();

  for (const result of topicResults) {
    if (result.status !== "fulfilled") {
      continue;
    }

    for (const rawItem of result.value) {
      const item = normalizeTrendItem(rawItem);
      itemsByRepo.set(toRepoKey(item.owner, item.repo), item);
    }
  }

  for (let index = 0; index < watchlist.length; index += 1) {
    const seedItem = watchlist[index];
    const result = watchlistResults[index];
    const existing = itemsByRepo.get(toRepoKey(seedItem.owner, seedItem.repo));

    if (!result || result.status !== "fulfilled" || !result.value) {
      continue;
    }

    const fetched = normalizeTrendItem(result.value);
    const merged = normalizeTrendItem({
      ...existing,
      ...fetched,
      ...seedItem,
      owner: seedItem.owner,
      repo: seedItem.repo,
    });
    itemsByRepo.set(toRepoKey(merged.owner, merged.repo), merged);
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
