import { s } from "velite";

export const baseFrontmatterSchema = s
  .object({
    title: s.string().max(160),
    description: s.string().max(300).optional(),
    date: s.isodate(),
    tags: s.array(s.string()).default([]),
    draft: s.boolean().default(false),
  })
  .strict();

export function slugField(prefix: string) {
  return s
    .string()
    .regex(
      new RegExp(`^${prefix}/[a-z0-9-]+(?:/[a-z0-9-]+)*$`),
      `slug must start with "${prefix}/" and use kebab-case`,
    );
}

export function createMdxCollectionSchema(prefix: string) {
  return baseFrontmatterSchema
    .extend({
      slug: slugField(prefix),
      body: s.mdx(),
      metadata: s.metadata(),
    })
    .strict();
}
