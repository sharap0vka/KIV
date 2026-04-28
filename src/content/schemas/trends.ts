import { s } from "velite";

const trendItemSchema = s
  .object({
    owner: s.string().min(1),
    repo: s.string().min(1),
    description: s.string().optional(),
    language: s.string().optional(),
    starsTotal: s.number().int().nonnegative(),
    starsDeltaWeek: s.number().int(),
  })
  .strict();

export const trendMetaSchema = s
  .object({
    date: s.isodate(),
    generatedAt: s.string().datetime(),
    items: s.array(trendItemSchema).default([]),
  })
  .strict();
