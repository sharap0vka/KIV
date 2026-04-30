"use client";

type TickerDirection = "up" | "down";

type TrendTickerProps = {
  items: ReadonlyArray<readonly [name: string, delta: string, direction: TickerDirection]>;
};

const defaultItems: TrendTickerProps["items"] = [
  ["claude-code", "+2,841", "up"],
  ["mcp/servers", "+1,673", "up"],
  ["block/goose", "+1,204", "up"],
  ["cline", "+988", "up"],
];

export function TrendTicker({ items }: TrendTickerProps) {
  const safeItems = items.length > 0 ? items : defaultItems;
  const mirrored = safeItems.flatMap(([name, delta, direction]) => [
    { key: `${name}-${delta}-${direction}-a`, name, delta, direction },
    { key: `${name}-${delta}-${direction}-b`, name, delta, direction },
  ]);

  return (
    <div
      aria-label="Live trends ticker"
      className="overflow-hidden border-y border-border bg-surface/40 py-2"
    >
      <div className="ticker-track flex min-w-max gap-10 px-6 text-xs uppercase tracking-[1px] text-text-secondary">
        {mirrored.map(({ key, name, delta, direction }) => (
          <span key={key} className="inline-flex items-center gap-2">
            <span className="text-text-muted">★</span>
            <span>{name}</span>
            <span className={direction === "up" ? "text-emerald-300" : "text-rose-300"}>
              {delta}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
