import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "text";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-fg text-bg hover:bg-white/90 border border-transparent font-mono uppercase tracking-[1.4px]",
  ghost:
    "bg-transparent text-fg border border-border-strong hover:bg-surface font-mono uppercase tracking-[1.4px]",
  text: "bg-transparent text-fg border border-transparent hover:text-text-muted font-sans",
};

export function Button({ children, variant = "primary", className, type, ...props }: ButtonProps) {
  const classes = [
    "inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm leading-[1.43] transition-colors",
    "rounded-sharp focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:cursor-not-allowed disabled:opacity-30",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type={type ?? "button"} {...props}>
      {children}
    </button>
  );
}
