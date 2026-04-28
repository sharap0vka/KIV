import { Container } from "@/components/ui/Container";

export default function DesignPreviewPage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <main className="py-12 md:py-16">
        <Container as="section" className="space-y-6">
          <header className="space-y-3 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-[1px] text-text-muted">
              Primitive 01
            </p>
            <h1 className="text-3xl leading-tight md:text-5xl">Container</h1>
            <p className="max-w-3xl text-base text-text-secondary">
              Базовый контейнер для всех страниц: центрирование, ограничение максимальной ширины и
              адаптивные внутренние отступы.
            </p>
          </header>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[1px] text-text-muted">
                max-width
              </p>
              <p className="mt-2 text-sm text-fg">`1200px` через `--container-max`.</p>
            </div>
            <div className="border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[1px] text-text-muted">
                padding x
              </p>
              <p className="mt-2 text-sm text-fg">`px-6` на mobile, `md:px-12` на desktop.</p>
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}
