import { s } from "velite";
import { baseFrontmatterSchema, createMdxCollectionSchema, slugField } from "./base";

export const mcpFrontmatterSchema = baseFrontmatterSchema
  .extend({
    slug: slugField("mcp"),
    tools: s.array(s.string()).min(1),
    repo: s.string().url(),
    language: s.string().min(1),
  })
  .strict();

export const mcpSchema = createMdxCollectionSchema("mcp")
  .extend({
    tools: s.array(s.string()).min(1),
    repo: s.string().url(),
    language: s.string().min(1),
  })
  .strict();
