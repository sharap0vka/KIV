import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-[1] px-0 pb-8 pt-14 text-xs text-[var(--fg-50)]">
      <div className="kiv-shell">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h3 className="m-0 text-[22px] font-light tracking-[-0.01em]">
            <span className="text-[var(--fg-30)]">~/</span>kiv
            <span className="text-[var(--fg-30)]">/</span>
          </h3>
          <span className="text-[11px] uppercase tracking-[0.08em] text-[var(--fg-50)]">
            структура репозитория
          </span>
        </div>

        <pre className="my-6 whitespace-pre text-xs leading-[1.55] text-[var(--fg-70)]">
          {`.
├── content/         # mdx + json
├── src/             # next.js app
├── scripts/         # утилиты и smoke
├── .agents/skills/  # локальные skills
├── DESIGN.md        # ui source of truth
└── PRD.md           # product spec`}
        </pre>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--fg-10)] pt-6">
          <span>© 2026 · sharap0vka · MIT (code) · CC BY 4.0 (content)</span>
          <div className="flex items-center gap-6">
            <Link href="/feed.xml">rss</Link>
            <Link href="/sitemap.xml">sitemap</Link>
            <a href="https://github.com/sharap0vka/KIV" rel="noreferrer" target="_blank">
              github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
