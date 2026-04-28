import { s } from "velite";
import { baseFrontmatterSchema, createMdxCollectionSchema, slugField } from "./base";

export const articleFrontmatterSchema = baseFrontmatterSchema
  .extend({
    slug: slugField("articles"),
    cover: s.string().optional(),
    series: s.string().optional(),
  })
  .strict();

export const articleSchema = createMdxCollectionSchema("articles")
  .extend({
    cover: s.string().optional(),
    series: s.string().optional(),
  })
  .strict();
