type DraftableDoc = {
  draft?: boolean;
};

export function shouldIncludeDocument(
  doc: DraftableDoc,
  nodeEnv: string | undefined = process.env.NODE_ENV,
): boolean {
  if (nodeEnv === "production") {
    return doc.draft !== true;
  }

  return true;
}
