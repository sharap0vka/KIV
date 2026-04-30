import { shouldIncludeDocument } from "@/content/draft-gating";

type FeedDoc = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  draft?: boolean;
};

type FeedMeta = {
  siteUrl: string;
  title: string;
  description: string;
};

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildFeedXml(docs: FeedDoc[], meta: FeedMeta): string {
  const normalizedSiteUrl = meta.siteUrl.replace(/\/+$/, "");
  const items = docs
    .filter((doc) => shouldIncludeDocument(doc, "production"))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((doc) => {
      const url = `${normalizedSiteUrl}/${doc.slug}`;
      const description = doc.description
        ? `<description>${xmlEscape(doc.description)}</description>`
        : "";

      return [
        "<item>",
        `<title>${xmlEscape(doc.title)}</title>`,
        `<link>${xmlEscape(url)}</link>`,
        `<guid>${xmlEscape(url)}</guid>`,
        `<pubDate>${new Date(doc.date).toUTCString()}</pubDate>`,
        description,
        "</item>",
      ]
        .filter(Boolean)
        .join("");
    })
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    `<title>${xmlEscape(meta.title)}</title>`,
    `<link>${xmlEscape(`${normalizedSiteUrl}/`)}</link>`,
    `<description>${xmlEscape(meta.description)}</description>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");
}
