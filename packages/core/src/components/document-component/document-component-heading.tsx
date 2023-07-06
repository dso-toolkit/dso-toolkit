import { h, FunctionalComponent } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

interface DocumentComponentHeadingProps {
  heading: "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading: FunctionalComponent<
  DocumentComponentHeadingProps & JSXBase.HTMLAttributes<HTMLHeadingElement>
> = ({ heading, ...props }, children) => {
  switch (heading) {
    default:
    case "h2":
      return <h2 {...props}>{children}</h2>;
    case "h3":
      return <h3 {...props}>{children}</h3>;
    case "h4":
      return <h4 {...props}>{children}</h4>;
    case "h5":
      return <h5 {...props}>{children}</h5>;
    case "h6":
      return <h6 {...props}>{children}</h6>;
  }
};
