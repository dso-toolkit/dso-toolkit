import { FunctionalComponent, h } from "@stencil/core";

import { AccordionHeading } from "../accordion-section.interfaces";

export const Handle: FunctionalComponent<{
  heading: AccordionHeading;
  ref: (element: HTMLHeadingElement | undefined) => void;
}> = ({ heading, ref }, children) => {
  switch (heading) {
    default:
    case "h2":
      return (
        <h2 ref={ref} class="dso-section-handle">
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 ref={ref} class="dso-section-handle">
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 ref={ref} class="dso-section-handle">
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 ref={ref} class="dso-section-handle">
          {children}
        </h5>
      );
  }
};
