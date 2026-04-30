import { OG_IMAGE_SIZE, renderCollectionOgTemplate } from "@/lib/seo/og";
import { ImageResponse } from "next/og";
import { articles } from "#site/content";

type ArticleOgImageProps = {
  params: Promise<{ slug: string }>;
};

const publishedArticles = articles.filter((article) => article.draft !== true);

function toFullSlug(routeSlug: string): string {
  return `articles/${routeSlug}`;
}

function getArticleByRouteSlug(routeSlug: string) {
  return publishedArticles.find((article) => article.slug === toFullSlug(routeSlug));
}

export const contentType = "image/png";
export const size = OG_IMAGE_SIZE;

export default async function Image({ params }: ArticleOgImageProps) {
  const { slug } = await params;
  const article = getArticleByRouteSlug(slug);
  const title = article?.title ?? "Article";

  return new ImageResponse(
    renderCollectionOgTemplate({
      title,
      collectionLabel: "articles",
    }),
    { ...OG_IMAGE_SIZE },
  );
}
