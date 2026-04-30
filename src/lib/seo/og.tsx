import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import type { ReactElement } from "react";

type CollectionLabel = "articles" | "concepts";

type CollectionOgMetadataInput = {
  title: string;
  description: string;
  collectionLabel: CollectionLabel;
  path: string;
};

type CollectionOgTemplateInput = {
  title: string;
  collectionLabel: CollectionLabel;
};

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

function normalizePath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildCollectionOgMetadata(input: CollectionOgMetadataInput): Metadata {
  const normalizedPath = normalizePath(input.path);
  const pageTitle = `${input.title} — ${SITE_NAME}`;
  const imageUrl = `${SITE_URL}${normalizedPath}/opengraph-image`;

  return {
    title: pageTitle,
    description: input.description,
    openGraph: {
      title: pageTitle,
      description: input.description,
      type: "article",
      url: `${SITE_URL}${normalizedPath}`,
      images: [
        {
          url: imageUrl,
          width: OG_IMAGE_SIZE.width,
          height: OG_IMAGE_SIZE.height,
          alt: `${input.collectionLabel}: ${input.title}`,
        },
      ],
    },
  };
}

export function renderCollectionOgTemplate(input: CollectionOgTemplateInput): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#0d0d0d",
        color: "#f5f5f5",
        border: "2px solid #2b2b2b",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          width: "fit-content",
          padding: "10px 16px",
          border: "1px solid #3a3a3a",
          textTransform: "uppercase",
          fontSize: 28,
          letterSpacing: "0.08em",
          color: "#d0d0d0",
        }}
      >
        {input.collectionLabel}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            letterSpacing: "0.04em",
            color: "#a9a9a9",
            textTransform: "uppercase",
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", fontSize: 66, fontWeight: 700, lineHeight: 1.1 }}>
          {input.title}
        </div>
      </div>
    </div>
  );
}
