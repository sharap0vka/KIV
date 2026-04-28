import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardVariant = "flat" | "surface" | "bordered";

type CardProps = {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
} & ComponentPropsWithoutRef<"div">;

const variantClasses: Record<CardVariant, string> = {
  flat: "bg-transparent border-border",
  surface: "bg-surface border-border",
  bordered: "bg-transparent border-border-strong",
};

export function Card({ children, variant = "surface", className, ...props }: CardProps) {
  const classes = [
    "rounded-sharp border p-6 transition-colors hover:border-border-strong",
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
