import type { HTMLAttributes, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer" | "main" | "nav";
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function Container({ children, as = "div", className, ...props }: ContainerProps) {
  const Component = as;
  const classes = ["kiv-shell", className].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
