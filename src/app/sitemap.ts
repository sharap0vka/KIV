import { buildSitemapEntries } from "@/lib/seo/sitemap";
import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";
import { articles, concepts } from "#site/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const contentEntries = buildSitemapEntries([...articles, ...concepts], { siteUrl: SITE_URL }).map(
    (entry) => ({
      url: entry.url,
      lastModified: entry.lastModified,
    }),
  );

  return [
    { url: `${SITE_URL}/`, lastModified: new Date().toISOString() },
    { url: `${SITE_URL}/articles`, lastModified: new Date().toISOString() },
    { url: `${SITE_URL}/concepts`, lastModified: new Date().toISOString() },
    { url: `${SITE_URL}/about`, lastModified: new Date().toISOString() },
    { url: `${SITE_URL}/colophon`, lastModified: new Date().toISOString() },
    ...contentEntries,
  ];
}
