import { s } from "velite";
import { baseFrontmatterSchema, createMdxCollectionSchema, slugField } from "./base";

export const skillFrontmatterSchema = baseFrontmatterSchema
  .extend({
    slug: slugField("skills"),
    trigger: s.string().min(1),
    inputs: s.array(s.string()).optional(),
  })
  .strict();

export const skillSchema = createMdxCollectionSchema("skills")
  .extend({
    trigger: s.string().min(1),
    inputs: s.array(s.string()).optional(),
  })
  .strict();
