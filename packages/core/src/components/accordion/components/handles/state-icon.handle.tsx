import { FunctionalComponent, h } from "@stencil/core";

import { AccordionSectionState } from "../accordion-section.interfaces";

export const HandleStateIcon: FunctionalComponent<{ state: AccordionSectionState }> = ({ state }) => {
  if (state === "error") {
    return <dso-icon icon="status-error"></dso-icon>;
  }

  if (state === "success") {
    return <dso-icon icon="status-success"></dso-icon>;
  }

  if (state === "info") {
    return <dso-icon icon="status-info"></dso-icon>;
  }

  if (state === "warning") {
    return <dso-icon icon="status-warning"></dso-icon>;
  }
};
