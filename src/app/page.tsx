import { TerminalPreview } from "@/components/home/TerminalPreview";
import { TrendTicker } from "@/components/home/TrendTicker";
import { getLatestTrendsSnapshotView } from "@/lib/trends/snapshots";
import Link from "next/link";
import { articles, concepts } from "#site/content";

type FeedItem = {
  collection: "article" | "concept";
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const latestFeed: FeedItem[] = [
  ...articles
    .filter((article) => article.draft !== true)
    .map((article) => ({
      collection: "article" as const,
      slug: article.slug,
      title: article.title,
      description: article.description,
      date: article.date,
      tags: article.tags,
    })),
  ...concepts
    .filter((concept) => concept.draft !== true)
    .map((concept) => ({
      collection: "concept" as const,
      slug: concept.slug,
      title: concept.title,
      description: concept.description,
      date: concept.date,
      tags: concept.tags,
    })),
]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6);

const conceptsPreview = concepts
  .filter((concept) => concept.draft !== true)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6);

export default async function HomePage() {
  const trends = await getLatestTrendsSnapshotView();
  const tickerItems = trends.snapshot.items.slice(0, 10).map((item) => {
    const delta = `${item.starsDeltaWeek >= 0 ? "+" : ""}${new Intl.NumberFormat("ru-RU").format(item.starsDeltaWeek)}`;
    return [`${item.owner}/${item.repo}`, delta, item.starsDeltaWeek >= 0 ? "up" : "down"] as const;
  });

  return (
    <section className="relative z-[1]">
      <section className="kiv-hero">
        <div className="kiv-shell grid items-end gap-12 md:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-7 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--fg-50)]">
              <span className="border border-[var(--fg-15)] px-2 py-1">v0.1.0 · MVP</span>
              <span>персональный digital-garden</span>
              <span className="text-[var(--fg-30)]">·</span>
              <span>RU</span>
            </div>

            <h1 className="m-0 font-mono text-[clamp(56px,11vw,168px)] font-extralight leading-[0.92] tracking-[-0.04em]">
              kiv<span className="font-extralight text-[var(--fg-30)]">/</span>
              <span className="text-[var(--fg-50)]">site</span>
              <br />
              <span className="text-fg">2026</span>
              <span className="text-[var(--fg-30)]">.</span>
              <span className="text-[var(--fg-50)]">md</span>
            </h1>

            <p className="mt-7 max-w-[720px] font-sans text-lg leading-[1.55] text-[var(--fg-70)]">
              Каталог собственных знаний про vibe-coding и agentic engineering: статьи, концепции,
              Cursor-skills, MCP-серверы и ежедневный снимок GitHub-трендов в нише.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="kiv-btn kiv-btn-primary" href="/articles">
                читать ленту →
              </Link>
              <Link className="kiv-btn" href="/trends">
                тренды дня
              </Link>
              <Link className="kiv-btn" href="/colophon">
                colophon
              </Link>
            </div>
          </div>
          <TerminalPreview />
        </div>
      </section>

      <TrendTicker items={tickerItems} />

      <section className="kiv-section" id="articles">
        <div className="kiv-shell">
          <div className="mb-10 grid items-baseline gap-3 md:grid-cols-[200px_1fr_auto] md:gap-8">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-30)]">{"// 01"}</div>
            <h2 className="m-0 text-[28px] font-light tracking-[-0.02em]">
              latest <span className="text-[var(--fg-30)]">/</span> articles &amp; concepts
            </h2>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--fg-50)]">
              {articles.length} articles · {concepts.length} concepts
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {latestFeed.map((item, index) => {
              const href =
                item.collection === "article"
                  ? `/articles/${item.slug.replace(/^articles\//, "")}`
                  : `/concepts/${item.slug.replace(/^concepts\//, "")}`;

              return (
                <article
                  key={`${item.collection}-${item.slug}`}
                  className={`${index === 0 ? "col-span-12" : "col-span-12 md:col-span-6"} relative flex flex-col gap-4 border border-[var(--fg-10)] p-6 transition-colors hover:border-[var(--fg-30)] hover:bg-[var(--fg-03)]`}
                >
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.1em] text-[var(--fg-50)]">
                    <span className="border border-[var(--fg-15)] px-2 py-1">
                      {item.collection}
                    </span>
                    <span>{dateFormatter.format(new Date(item.date))}</span>
                  </div>
                  <h3
                    className={`m-0 ${index === 0 ? "max-w-[880px] text-[40px] leading-[1.05]" : "text-2xl leading-[1.18]"} font-light tracking-[-0.01em]`}
                  >
                    <Link href={href}>{item.title}</Link>
                  </h3>
                  {item.description ? (
                    <p className="m-0 font-sans text-[15px] leading-[1.55] text-[var(--fg-70)]">
                      {item.description}
                    </p>
                  ) : null}
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {item.tags.slice(0, 4).map((tag) => (
                      <span
                        key={`${item.slug}-${tag}`}
                        className="border border-[var(--fg-10)] px-2 py-1 text-[11px] tracking-[0.06em] text-[var(--fg-50)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="absolute right-4 top-4 text-sm text-[var(--fg-30)]">↗</span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="kiv-section" id="trends">
        <div className="kiv-shell">
          <div className="mb-10 grid items-baseline gap-3 md:grid-cols-[200px_1fr_auto] md:gap-8">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-30)]">{"// 02"}</div>
            <h2 className="m-0 text-[28px] font-light tracking-[-0.02em]">
              github trends <span className="text-[var(--fg-30)]">/</span> agentic + mcp
            </h2>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--fg-50)]">
              snapshot · {trends.snapshot.date}
            </div>
          </div>

          <div className="border border-[var(--fg-10)]">
            <div className="grid grid-cols-[48px_1fr_90px_24px] items-center gap-4 border-b border-[var(--fg-10)] bg-black/20 px-5 py-4 text-[11px] uppercase tracking-[0.12em] text-[var(--fg-50)] md:grid-cols-[48px_1fr_130px_130px_90px_24px]">
              <div>#</div>
              <div>repository</div>
              <div className="hidden md:block">lang</div>
              <div className="hidden md:block">★ total</div>
              <div>Δ ★ / wk</div>
              <div />
            </div>

            {trends.snapshot.items.slice(0, 6).map((item, index) => (
              <a
                key={`${item.owner}-${item.repo}`}
                className="grid grid-cols-[48px_1fr_90px_24px] items-center gap-4 border-b border-[var(--fg-10)] px-5 py-4 text-[13px] transition-colors last:border-b-0 hover:bg-[var(--fg-03)] md:grid-cols-[48px_1fr_130px_130px_90px_24px]"
                href={`https://github.com/${item.owner}/${item.repo}`}
                rel="noreferrer"
                target="_blank"
              >
                <div className="text-[var(--fg-30)]">{String(index + 1).padStart(2, "0")}</div>
                <div className="min-w-0">
                  <div className="truncate text-sm">
                    <span className="text-[var(--fg-50)]">{item.owner}/</span>
                    {item.repo}
                  </div>
                  <div className="truncate font-sans text-[13px] text-[var(--fg-50)]">
                    {item.description ?? "Описание отсутствует."}
                  </div>
                </div>
                <div className="hidden text-[var(--fg-70)] md:block">{item.language ?? "—"}</div>
                <div className="hidden text-fg md:block">
                  {new Intl.NumberFormat("ru-RU").format(item.starsTotal)}
                </div>
                <div className={item.starsDeltaWeek >= 0 ? "text-[#9be7a8]" : "text-[#f4a4a4]"}>
                  {item.starsDeltaWeek >= 0 ? "+" : ""}
                  {new Intl.NumberFormat("ru-RU").format(item.starsDeltaWeek)}
                </div>
                <div className="text-[var(--fg-30)]">↗</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="kiv-section" id="concepts">
        <div className="kiv-shell">
          <div className="mb-10 grid items-baseline gap-3 md:grid-cols-[200px_1fr_auto] md:gap-8">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-30)]">{"// 03"}</div>
            <h2 className="m-0 text-[28px] font-light tracking-[-0.02em]">
              concepts <span className="text-[var(--fg-30)]">/</span> рабочий глоссарий
            </h2>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--fg-50)]">
              {concepts.length} entries
            </div>
          </div>

          <div className="grid grid-cols-1 border-l border-t border-[var(--fg-10)] sm:grid-cols-2 lg:grid-cols-3">
            {conceptsPreview.map((concept, index) => (
              <Link
                key={concept.slug}
                className="relative flex min-h-52 flex-col gap-3 border-b border-r border-[var(--fg-10)] p-6 transition-colors hover:bg-[var(--fg-03)]"
                href={`/concepts/${concept.slug.replace(/^concepts\//, "")}`}
              >
                <span className="absolute right-4 top-3 text-[11px] text-[var(--fg-30)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="m-0 text-lg font-normal tracking-[-0.01em]">
                  {concept.title}
                  <span className="text-[var(--fg-30)]">.</span>
                </h3>
                {concept.description ? (
                  <p className="m-0 font-sans text-sm leading-[1.5] text-[var(--fg-70)]">
                    {concept.description}
                  </p>
                ) : null}
                <div className="mt-auto pt-2 text-[11px] tracking-[0.06em] text-[var(--fg-50)]">
                  aliases · {concept.tags.slice(0, 2).join(" · ") || "glossary"}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
