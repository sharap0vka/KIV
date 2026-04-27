import { defineCollection, defineConfig, s } from "velite";

const articles = defineCollection({
  name: "Article",
  pattern: "articles/**/*.mdx",
  schema: s.object({
    title: s.string().max(160),
    description: s.string().max(300).optional(),
    slug: s.slug("articles"),
    draft: s.boolean().default(false),
    body: s.mdx(),
    metadata: s.metadata(),
  }),
});

export default defineConfig({
  root: "content",
  collections: { articles },
  output: {
    data: ".velite",
    clean: true,
  },
});
