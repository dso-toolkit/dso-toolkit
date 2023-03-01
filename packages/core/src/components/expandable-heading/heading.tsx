import { FunctionalComponent, h } from "@stencil/core";

import { HeadingTags } from "./expandable-heading.interfaces";

export const Heading: FunctionalComponent<{
  heading: HeadingTags;
  className?:
    | string
    | {
        [className: string]: boolean;
      };
  ref?: (element: HTMLHeadingElement | undefined) => void;
}> = ({ heading, ref, className }, children) => {
  switch (heading) {
    default:
    case "h2":
      return (
        <h2 ref={ref} class={className}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 ref={ref} class={className}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 ref={ref} class={className}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 ref={ref} class={className}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 ref={ref} class={className}>
          {children}
        </h6>
      );
  }
};
