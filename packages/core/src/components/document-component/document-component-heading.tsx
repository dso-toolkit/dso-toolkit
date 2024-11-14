import { h, FunctionalComponent } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";
import { DocumentComponentMode } from "./document-component.models";

interface DocumentComponentHeadingProps {
  heading: "h2" | "h3" | "h4" | "h5" | "h6";
  mode: DocumentComponentMode;
  href?: string;
}

export const Heading: FunctionalComponent<
  DocumentComponentHeadingProps & JSXBase.HTMLAttributes<HTMLHeadingElement>
> = ({ heading, ...props }, children) => {
  let headingElement: HTMLHeadingElement;
  switch (heading) {
    default:
    case "h2":
      headingElement = <h2 {...props}>{children}</h2>;
      break;
    case "h3":
      headingElement = <h3 {...props}>{children}</h3>;
      break;
    case "h4":
      headingElement = <h4 {...props}>{children}</h4>;
      break;
    case "h5":
      headingElement = <h5 {...props}>{children}</h5>;
      break;
    case "h6":
      headingElement = <h6 {...props}>{children}</h6>;
  }

  if (props.mode === "document") {
    return headingElement;
  }

  if (props.mode === "table-of-contents" && props.href) {
    return (
      <a href={props.href} class="heading-anchor">
        {headingElement}
      </a>
    );
  }
};
