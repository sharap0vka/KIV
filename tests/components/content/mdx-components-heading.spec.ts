import { mdxComponents } from "@/components/content/mdx-components";
import { render } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";

describe("mdx heading components", () => {
  it("adds deterministic anchors for h2, h3 and h4", () => {
    const H2 = mdxComponents.h2;
    const H3 = mdxComponents.h3;
    const H4 = mdxComponents.h4;

    const { container } = render(
      createElement(
        "article",
        null,
        createElement(H2, null, "Пайплайн MDX рендеринга"),
        createElement(H3, null, "External Links & Code"),
        createElement(H4, null, "Тесты и снэпшоты"),
      ),
    );

    expect(container).toMatchSnapshot();
  });
});
