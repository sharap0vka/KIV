import { UtcClock } from "@/components/home/UtcClock";

export function StatusBar() {
  return (
    <output
      className="relative z-[1] border-b border-[var(--fg-10)] bg-black/15"
      aria-label="Layout status"
    >
      <div className="kiv-shell flex min-h-8 items-center justify-between gap-4 text-[11px] tracking-[0.06em] text-[var(--fg-50)]">
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
          <span>
            <span className="text-[var(--fg-30)]">node</span>{" "}
            <span className="text-[var(--fg-70)]">~/kiv</span>
          </span>
          <span>
            <span className="text-[var(--fg-30)]">branch</span>{" "}
            <span className="text-[var(--fg-70)]">main</span>
          </span>
          <span>
            <span className="text-[var(--fg-30)]">commit</span>{" "}
            <span className="text-[var(--fg-70)]">d784423</span>
          </span>
          <span className="hidden md:inline">
            <span className="text-[var(--fg-30)]">last-push</span>{" "}
            <span className="text-[var(--fg-70)]">2026-04-29 18:42 utc</span>
          </span>
        </div>
        <div className="flex items-center gap-4 whitespace-nowrap">
          <span className="hidden sm:inline">
            <span className="text-[var(--fg-30)]">readers</span>{" "}
            <span className="text-[var(--fg-70)]">17 online</span>
          </span>
          <span>
            <span className="text-[var(--fg-30)]">utc</span> <UtcClock />{" "}
            <span className="kiv-blink">▌</span>
          </span>
        </div>
      </div>
    </output>
  );
}
