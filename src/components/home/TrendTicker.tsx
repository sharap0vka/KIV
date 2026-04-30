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
      className="ticker relative z-[1] overflow-hidden border-y border-[var(--fg-10)] bg-black/20"
    >
      <div className="ticker-track flex min-w-max gap-12 whitespace-nowrap py-3 text-xs tracking-[0.08em] text-[var(--fg-70)]">
        {mirrored.map(({ key, name, delta, direction }) => (
          <span key={key} className="inline-flex items-center gap-3">
            <span className="text-[var(--fg-30)]">★</span>
            <span>{name}</span>
            <span className={direction === "up" ? "text-[#9be7a8]" : "text-[#f4a4a4]"}>
              {delta}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
