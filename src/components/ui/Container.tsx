import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer" | "main";
  className?: string;
};

export function Container({ children, as = "div", className }: ContainerProps) {
  const Component = as;
  const classes = ["mx-auto w-full max-w-[var(--container-max)] px-6 md:px-12", className]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes}>{children}</Component>;
}
