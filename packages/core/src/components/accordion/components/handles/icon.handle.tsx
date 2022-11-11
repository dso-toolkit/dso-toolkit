import { FunctionalComponent, h } from "@stencil/core";

import { AccordionSectionState } from "../accordion-section.interfaces";
import { HandleStateIcon } from "./state-icon.handle";

export const HandleIcon: FunctionalComponent<{
  state?: AccordionSectionState;
  icon?: string;
  attachmentCount?: number;
}> = ({ state, icon, attachmentCount }) => {
  if (state) {
    return <HandleStateIcon state={state} />;
  }

  if (attachmentCount) {
    return <dso-attachments-counter count={attachmentCount}></dso-attachments-counter>;
  }

  if (icon) {
    return <dso-icon icon={icon}></dso-icon>;
  }
};
