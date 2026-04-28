import { s } from "velite";
import { baseFrontmatterSchema, createMdxCollectionSchema, slugField } from "./base";

export const conceptFrontmatterSchema = baseFrontmatterSchema
  .extend({
    slug: slugField("concepts"),
    aliases: s.array(s.string()).optional(),
    seeAlso: s.array(s.string()).optional(),
  })
  .strict();

export const conceptSchema = createMdxCollectionSchema("concepts")
  .extend({
    aliases: s.array(s.string()).optional(),
    seeAlso: s.array(s.string()).optional(),
  })
  .strict();
