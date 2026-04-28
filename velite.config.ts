import { defineCollection, defineConfig, s } from "velite";
import { shouldIncludeDocument } from "./src/content/draft-gating";
import {
  articleSchema,
  conceptSchema,
  mcpSchema,
  skillSchema,
  trendMetaSchema,
} from "./src/content/schemas";

const articles = defineCollection({
  name: "Article",
  pattern: "articles/**/*.{md,mdx}",
  schema: articleSchema,
  filter: (doc: { draft?: boolean }) => shouldIncludeDocument(doc),
});

const concepts = defineCollection({
  name: "Concept",
  pattern: "concepts/**/*.{md,mdx}",
  schema: conceptSchema,
  filter: (doc: { draft?: boolean }) => shouldIncludeDocument(doc),
});

const skills = defineCollection({
  name: "Skill",
  pattern: "skills/**/*.{md,mdx}",
  schema: skillSchema,
  filter: (doc: { draft?: boolean }) => shouldIncludeDocument(doc),
});

const mcp = defineCollection({
  name: "Mcp",
  pattern: "mcp/**/*.{md,mdx}",
  schema: mcpSchema,
  filter: (doc: { draft?: boolean }) => shouldIncludeDocument(doc),
});

const trends = defineCollection({
  name: "TrendMeta",
  pattern: "trends/**/*.json",
  schema: trendMetaSchema,
});

export default defineConfig({
  root: "content",
  collections: { articles, concepts, skills, mcp, trends },
  output: {
    data: ".velite",
    clean: true,
  },
});
