import { Container } from "@/components/ui/Container";

const statusItems = [
  "Mode: brutalist shell",
  "Theme: dark mono-first",
  "Viewport: mobile + desktop",
];

export function StatusBar() {
  return (
    <output className="block border-b border-border bg-surface/40" aria-label="Layout status">
      <Container
        as="div"
        className="flex min-h-10 flex-wrap items-center gap-x-4 gap-y-1 py-2 text-xs"
      >
        {statusItems.map((item) => (
          <span key={item} className="font-mono uppercase tracking-[1px] text-text-muted">
            {item}
          </span>
        ))}
      </Container>
    </output>
  );
}
