import type { ReactNode } from "react";

type TagVariant = "default" | "mono";

type TagProps = {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
};

const variantClasses: Record<TagVariant, string> = {
  default: "font-sans text-sm text-[var(--fg-70)]",
  mono: "font-mono text-[11px] uppercase tracking-[0.08em]",
};

export function Tag({ children, variant = "default", className }: TagProps) {
  const classes = [
    "inline-flex items-center rounded-sharp border border-[var(--fg-15)] px-2 py-1 text-fg",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
}
