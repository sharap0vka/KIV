"use client";

import { useEffect, useState } from "react";

const phrases = [
  "node scripts/build-feed.mjs",
  "pnpm test --filter trends-fetcher",
  "git commit -m 'trends snapshot'",
];

export function TerminalPreview() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex] ?? "";
    const delay = isDeleting ? 30 : 55;

    const timer = window.setTimeout(() => {
      if (!isDeleting && charIndex >= currentPhrase.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((value) => (value + 1) % phrases.length);
        return;
      }

      setCharIndex((value) => (isDeleting ? value - 1 : value + 1));
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <aside
      aria-hidden="true"
      className="border border-[var(--fg-15)] bg-black/20 text-xs leading-[1.55]"
    >
      <div className="flex items-center justify-between border-b border-[var(--fg-10)] px-3 py-2 text-[11px] uppercase tracking-[0.08em] text-[var(--fg-50)]">
        <span>~/site2026 - shell - 80x24</span>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 border border-[var(--fg-30)]" />
          <span className="h-2 w-2 border border-[var(--fg-30)]" />
          <span className="h-2 w-2 border border-[var(--fg-30)]" />
        </div>
      </div>
      <div className="min-h-[220px] space-y-1 p-3.5 text-[var(--fg-70)]">
        <div>
          <span className="text-[var(--fg-30)]">$</span> <span className="text-fg">pnpm build</span>
        </div>
        <div>▸ velite: 5 collections</div>
        <div>
          · articles <span className="text-fg">12 ok</span>
        </div>
        <div>
          · concepts <span className="text-fg">38 ok</span>
        </div>
        <div>
          · trends <span className="text-fg">214 snapshots</span>
        </div>
        <div>
          ▸ next build … <span className="text-[#9be7a8]">done in 8.4s</span>
        </div>
        <div>
          <span className="text-[var(--fg-30)]">$</span>{" "}
          <span className="text-fg">cron daily-trends</span>
        </div>
        <div>▸ fetched 41 repos · ranked Δ★/wk</div>
        <div>
          <span className="text-[var(--fg-30)]">$</span>{" "}
          <span className="text-fg">{(phrases[phraseIndex] ?? "").slice(0, charIndex)}</span>{" "}
          <span className="kiv-blink">▌</span>
        </div>
      </div>
    </aside>
  );
}
