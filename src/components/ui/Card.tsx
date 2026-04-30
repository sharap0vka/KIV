import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardVariant = "flat" | "surface" | "bordered";

type CardProps = {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
} & ComponentPropsWithoutRef<"div">;

const variantClasses: Record<CardVariant, string> = {
  flat: "bg-transparent border-[var(--fg-10)]",
  surface: "bg-[var(--fg-03)] border-[var(--fg-10)]",
  bordered: "bg-transparent border-[var(--fg-30)]",
};

export function Card({ children, variant = "surface", className, ...props }: CardProps) {
  const classes = [
    "rounded-sharp border p-6 transition-colors hover:border-[var(--fg-30)] hover:bg-[var(--fg-03)]",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
