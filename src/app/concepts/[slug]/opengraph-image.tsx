import { OG_IMAGE_SIZE, renderCollectionOgTemplate } from "@/lib/seo/og";
import { ImageResponse } from "next/og";
import { concepts } from "#site/content";

type ConceptOgImageProps = {
  params: Promise<{ slug: string }>;
};

const publishedConcepts = concepts.filter((concept) => concept.draft !== true);

function toFullSlug(routeSlug: string): string {
  return `concepts/${routeSlug}`;
}

function getConceptByRouteSlug(routeSlug: string) {
  return publishedConcepts.find((concept) => concept.slug === toFullSlug(routeSlug));
}

export const contentType = "image/png";
export const size = OG_IMAGE_SIZE;

export default async function Image({ params }: ConceptOgImageProps) {
  const { slug } = await params;
  const concept = getConceptByRouteSlug(slug);
  const title = concept?.title ?? "Concept";

  return new ImageResponse(
    renderCollectionOgTemplate({
      title,
      collectionLabel: "concepts",
    }),
    { ...OG_IMAGE_SIZE },
  );
}
