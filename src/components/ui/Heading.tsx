import type { ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingVariant = "display" | "section" | "bodyTitle";

type HeadingProps = {
  children: ReactNode;
  as?: HeadingLevel;
  variant?: HeadingVariant;
  className?: string;
  id?: string;
};

const variantClasses: Record<HeadingVariant, string> = {
  display:
    "font-mono text-[clamp(56px,11vw,168px)] font-extralight leading-[0.92] tracking-[-0.04em] text-fg",
  section: "font-mono text-[28px] font-light leading-[1.12] tracking-[-0.02em] text-fg",
  bodyTitle: "font-mono text-2xl font-light leading-[1.2] tracking-[-0.01em] text-fg",
};

export function Heading({ children, as = "h2", variant = "section", className, id }: HeadingProps) {
  const Component = as;
  const classes = [variantClasses[variant], className].filter(Boolean).join(" ");

  return (
    <Component className={classes} id={id}>
      {children}
    </Component>
  );
}
