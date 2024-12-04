import { h, FunctionalComponent, VNode } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";
import { DocumentComponentMode } from "./document-component.models";

interface DocumentComponentHeadingProps {
  heading: "h2" | "h3" | "h4" | "h5" | "h6";
  mode: DocumentComponentMode;
  href?: string;
}

export const Heading: FunctionalComponent<
  DocumentComponentHeadingProps & JSXBase.HTMLAttributes<HTMLHeadingElement>
> = ({ heading, mode, href, onClick, ...props }, children) => {
  let headingElement: VNode;
  switch (heading) {
    default:
    case "h2":
      headingElement = (
        <h2 {...props} onClick={mode === "document" ? onClick : undefined}>
          {children}
        </h2>
      );
      break;
    case "h3":
      headingElement = (
        <h3 {...props} onClick={mode === "document" ? onClick : undefined}>
          {children}
        </h3>
      );
      break;
    case "h4":
      headingElement = (
        <h4 {...props} onClick={mode === "document" ? onClick : undefined}>
          {children}
        </h4>
      );
      break;
    case "h5":
      headingElement = (
        <h5 {...props} onClick={mode === "document" ? onClick : undefined}>
          {children}
        </h5>
      );
      break;
    case "h6":
      headingElement = (
        <h6 {...props} onClick={mode === "document" ? onClick : undefined}>
          {children}
        </h6>
      );
  }

  if (mode === "table-of-contents" && href) {
    return (
      <a href={href} onClick={onClick} class="heading-anchor">
        {headingElement}
      </a>
    );
  }

  return headingElement;
};
