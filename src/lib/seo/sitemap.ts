import { shouldIncludeDocument } from "@/content/draft-gating";

type SitemapDoc = {
  slug: string;
  date: string;
  draft?: boolean;
};

type SitemapMeta = {
  siteUrl: string;
};

type SitemapEntry = {
  url: string;
  lastModified: string;
};

export function buildSitemapEntries(docs: SitemapDoc[], meta: SitemapMeta): SitemapEntry[] {
  const normalizedSiteUrl = meta.siteUrl.replace(/\/+$/, "");

  return docs
    .filter((doc) => shouldIncludeDocument(doc, "production"))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((doc) => ({
      url: `${normalizedSiteUrl}/${doc.slug}`,
      lastModified: doc.date,
    }));
}
