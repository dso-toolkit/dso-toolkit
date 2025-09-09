import { IconButton } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreIconButton: ComponentImplementation<IconButton> = {
  component: "iconButton",
  implementation: "core",
  template: () =>
    function iconButtonTemplate({ accessibleLabel, dsoIconButtonClick, icon, tooltipPlacement, variant }) {
      return html`<dso-icon-button
        variant=${variant}
        icon=${icon}
        accessible-label=${accessibleLabel}
        tooltip-placement=${tooltipPlacement}
        @dsoIconButtonClick=${(e: CustomEvent) => dsoIconButtonClick(e.detail)}
      ></dso-icon-button>`;
    },
};
