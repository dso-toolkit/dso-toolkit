import { FunctionalComponent, VNode, h } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

import { DocumentComponentMode } from "./document-component.interfaces";

interface DocumentComponentHeadingProps {
  headingLevel: number;
  mode: DocumentComponentMode;
  href?: string;
}

export const Heading: FunctionalComponent<DocumentComponentHeadingProps & JSXBase.HTMLAttributes<HTMLElement>> = (
  { headingLevel, mode, href, onClick, ...props },
  children,
) => {
  // In the table of contents the nested lists carry the structure, so a heading level would add nothing but noise to
  // the heading list of assistive technology. The `headingLevel` prop is ignored here.
  if (mode === "table-of-contents") {
    const label = <div {...props}>{children}</div>;

    if (!href) {
      return label;
    }

    return (
      <a href={href} onClick={onClick} class="heading-anchor">
        {label}
      </a>
    );
  }

  let headingElement: VNode;

  // The native heading elements only go up to `h6`. Deeper levels are expressed with the `heading` role and an
  // explicit `aria-level` so assistive technology still exposes the correct structure.
  if (headingLevel > 6) {
    headingElement = (
      <div role="heading" aria-level={headingLevel} {...props} onClick={onClick}>
        {children}
      </div>
    );
  } else {
    // In this branch the level is 6 or lower, so it maps onto a native `h2`–`h6` element.
    const HeadingTag: "h2" | "h3" | "h4" | "h5" | "h6" =
      headingLevel === 3
        ? "h3"
        : headingLevel === 4
          ? "h4"
          : headingLevel === 5
            ? "h5"
            : headingLevel === 6
              ? "h6"
              : "h2";

    headingElement = (
      <HeadingTag {...props} onClick={onClick}>
        {children}
      </HeadingTag>
    );
  }

  return headingElement;
};
