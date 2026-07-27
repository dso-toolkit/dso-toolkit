import { FunctionalComponent, VNode, h } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

import { DocumentComponentMode } from "./document-component.interfaces";

interface DocumentComponentHeadingProps {
  heading: "h2" | "h3" | "h4" | "h5" | "h6";
  mode: DocumentComponentMode;
  href?: string;
}

export const Heading: FunctionalComponent<DocumentComponentHeadingProps & JSXBase.HTMLAttributes<HTMLElement>> = (
  { heading, mode, href, onClick, ...props },
  children,
) => {
  // In the table of contents the nested lists carry the structure, so a heading level would add nothing but noise to
  // the heading list of assistive technology. The `heading` prop is ignored here.
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

  switch (heading) {
    default:
    case "h2":
      headingElement = (
        <h2 {...props} onClick={onClick}>
          {children}
        </h2>
      );
      break;
    case "h3":
      headingElement = (
        <h3 {...props} onClick={onClick}>
          {children}
        </h3>
      );
      break;
    case "h4":
      headingElement = (
        <h4 {...props} onClick={onClick}>
          {children}
        </h4>
      );
      break;
    case "h5":
      headingElement = (
        <h5 {...props} onClick={onClick}>
          {children}
        </h5>
      );
      break;
    case "h6":
      headingElement = (
        <h6 {...props} onClick={onClick}>
          {children}
        </h6>
      );
  }

  return headingElement;
};
