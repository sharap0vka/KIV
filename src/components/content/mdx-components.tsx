import { Heading } from "@/components/ui/Heading";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type MdxComponentMap = Record<string, (props: ComponentPropsWithoutRef<"h1">) => ReactNode>;
type HeadingLevel = "h1" | "h2" | "h3" | "h4";

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => getTextContent(child)).join(" ");
  }

  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return getTextContent(props?.children ?? "");
  }

  return "";
}

export function slugifyHeadingText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^a-z0-9а-яё]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function getHeadingVariant(level: HeadingLevel): "display" | "section" | "bodyTitle" {
  if (level === "h1") {
    return "section";
  }

  return "bodyTitle";
}

type MdxHeadingProps = ComponentPropsWithoutRef<"h1"> & {
  as: HeadingLevel;
};

function MdxHeading({ as, children, id, ...props }: MdxHeadingProps) {
  const resolvedId = id ?? slugifyHeadingText(getTextContent(children));
  const href = `#${resolvedId}`;

  return (
    <Heading as={as} className="group scroll-mt-24" id={resolvedId} variant={getHeadingVariant(as)}>
      <a
        aria-label={`Ссылка на раздел: ${getTextContent(children)}`}
        className="mr-2 font-mono text-text-muted opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        href={href}
      >
        #
      </a>
      {children}
    </Heading>
  );
}

export const mdxComponents: MdxComponentMap = {
  h1: (props) => <MdxHeading as="h1" {...props} />,
  h2: (props) => <MdxHeading as="h2" {...props} />,
  h3: (props) => <MdxHeading as="h3" {...props} />,
  h4: (props) => <MdxHeading as="h4" {...props} />,
};
