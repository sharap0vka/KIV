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
    <aside className="border border-border bg-black/20 text-xs text-text-secondary">
      <div className="flex items-center justify-between border-b border-border px-3 py-2 text-[11px] uppercase tracking-[1px]">
        <span>~/site2026 - shell - 80x24</span>
        <span aria-hidden="true">[] [] []</span>
      </div>
      <div className="space-y-1 p-3">
        <div>
          <span className="text-text-muted">$</span> <span className="text-fg">pnpm build</span>
        </div>
        <div>velite: articles, concepts, trends</div>
        <div>next build ... ok</div>
        <div>
          <span className="text-text-muted">$</span>{" "}
          <span className="text-fg">{(phrases[phraseIndex] ?? "").slice(0, charIndex)}</span>
          <span className="animate-pulse">▌</span>
        </div>
      </div>
    </aside>
  );
}
