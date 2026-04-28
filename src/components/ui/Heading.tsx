import type { ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingVariant = "display" | "section" | "bodyTitle";

type HeadingProps = {
  children: ReactNode;
  as?: HeadingLevel;
  variant?: HeadingVariant;
  className?: string;
};

const variantClasses: Record<HeadingVariant, string> = {
  display:
    "font-mono text-[clamp(3rem,10vw,12rem)] font-light leading-[1.1] tracking-normal text-fg",
  section: "font-sans text-[1.88rem] font-normal leading-[1.2] text-fg",
  bodyTitle: "font-sans text-xl font-normal leading-[1.35] text-fg",
};

export function Heading({ children, as = "h2", variant = "section", className }: HeadingProps) {
  const Component = as;
  const classes = [variantClasses[variant], className].filter(Boolean).join(" ");

  return <Component className={classes}>{children}</Component>;
}
