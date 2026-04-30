import { buildFeedXml } from "@/lib/seo/feed";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { articles, concepts } from "#site/content";

export const dynamic = "force-static";

export function GET() {
  const xml = buildFeedXml([...articles, ...concepts], {
    siteUrl: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  });

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
    },
  });
}
