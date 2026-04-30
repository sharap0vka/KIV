import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { getLatestTrendsSnapshotView } from "@/lib/trends/snapshots";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trends — site2026",
  description: "Актуальный снимок GitHub-трендов по vibe-coding и agentic engineering.",
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatNumber(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export default async function TrendsPage() {
  const { snapshot, freshnessLabel } = await getLatestTrendsSnapshotView();

  return (
    <section className="kiv-section">
      <Container as="div">
        <div className="mb-10 grid items-baseline gap-3 md:grid-cols-[200px_1fr_auto] md:gap-8">
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-30)]">{"// 14"}</div>
          <Heading as="h1" variant="section">
            github trends <span className="text-[var(--fg-30)]">/</span> weekly
          </Heading>
          <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--fg-50)]">
            snapshot {snapshot.date}
          </div>
        </div>

        <section className="border border-[var(--fg-10)]">
          <div className="grid grid-cols-[48px_1fr_90px_24px] items-center gap-4 border-b border-[var(--fg-10)] bg-black/20 px-5 py-4 text-[11px] uppercase tracking-[0.12em] text-[var(--fg-50)] md:grid-cols-[48px_1fr_130px_130px_90px_24px]">
            <div>#</div>
            <div>repository</div>
            <div className="hidden md:block">lang</div>
            <div className="hidden md:block">★ total</div>
            <div>Δ ★ / wk</div>
            <div />
          </div>
          {snapshot.items.map((item, index) => {
            const repoPath = `${item.owner}/${item.repo}`;
            const githubUrl = `https://github.com/${repoPath}`;

            return (
              <a
                className="grid grid-cols-[48px_1fr_90px_24px] items-center gap-4 border-b border-[var(--fg-10)] px-5 py-4 text-[13px] transition-colors last:border-b-0 hover:bg-[var(--fg-03)] md:grid-cols-[48px_1fr_130px_130px_90px_24px]"
                href={githubUrl}
                key={repoPath}
                rel="noopener noreferrer"
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
                <div className="hidden text-fg md:block">{formatNumber(item.starsTotal)}</div>
                <div className={item.starsDeltaWeek >= 0 ? "text-[#9be7a8]" : "text-[#f4a4a4]"}>
                  {item.starsDeltaWeek >= 0 ? "+" : ""}
                  {formatNumber(item.starsDeltaWeek)}
                </div>
                <div className="text-[var(--fg-30)]">↗</div>
              </a>
            );
          })}
        </section>

        <section className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.08em] text-[var(--fg-50)]">
          <span>Дата снимка: {dateFormatter.format(new Date(snapshot.date))}</span>
          <span>{freshnessLabel}</span>
          <span>Сгенерировано: {dateTimeFormatter.format(new Date(snapshot.generatedAt))}</span>
        </section>
      </Container>
    </section>
  );
}
