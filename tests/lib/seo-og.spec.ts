import { buildCollectionOgMetadata, renderCollectionOgTemplate } from "@/lib/seo/og";
// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

function firstImage(metadata: ReturnType<typeof buildCollectionOgMetadata>) {
  const images = metadata.openGraph?.images;

  if (!images) {
    return undefined;
  }

  return Array.isArray(images) ? images[0] : images;
}

describe("buildCollectionOgMetadata", () => {
  it("builds Open Graph metadata for article route", () => {
    const metadata = buildCollectionOgMetadata({
      title: "Как тестировать AI-агентов",
      description: "Практический гайд",
      collectionLabel: "articles",
      path: "/articles/test-ai-agents",
    });

    expect(metadata).toMatchObject({
      title: "Как тестировать AI-агентов — site2026",
      description: "Практический гайд",
      openGraph: {
        title: "Как тестировать AI-агентов — site2026",
        description: "Практический гайд",
        type: "article",
      },
    });
    expect(firstImage(metadata)).toMatchObject({
      url: "https://site2026.dev/articles/test-ai-agents/opengraph-image",
      alt: "articles: Как тестировать AI-агентов",
      width: 1200,
      height: 630,
    });
  });

  it("builds Open Graph metadata for concept route", () => {
    const metadata = buildCollectionOgMetadata({
      title: "Observer Pattern",
      description: "Паттерн проектирования",
      collectionLabel: "concepts",
      path: "/concepts/observer-pattern",
    });

    expect(firstImage(metadata)).toMatchObject({
      url: "https://site2026.dev/concepts/observer-pattern/opengraph-image",
      alt: "concepts: Observer Pattern",
    });
  });
});

describe("renderCollectionOgTemplate", () => {
  it("renders shared branded template with title and collection label", () => {
    const html = renderToStaticMarkup(
      renderCollectionOgTemplate({
        title: "System Design",
        collectionLabel: "concepts",
      }),
    );

    expect(html).toContain("site2026");
    expect(html).toContain("concepts");
    expect(html).toContain("System Design");
  });
});
