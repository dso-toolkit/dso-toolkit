import { FunctionalComponent, h } from "@stencil/core";

import { AccordionHeading } from "../accordion-section.interfaces";

export const Handle: FunctionalComponent<{ heading: AccordionHeading }> = ({ heading }, children) => {
  switch (heading) {
    default:
    case "h2":
      return <h2 class="dso-section-handle">{children}</h2>;
    case "h3":
      return <h3 class="dso-section-handle">{children}</h3>;
    case "h4":
      return <h4 class="dso-section-handle">{children}</h4>;
    case "h5":
      return <h5 class="dso-section-handle">{children}</h5>;
  }
};
