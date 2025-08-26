import { IconButton } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreIconButton: ComponentImplementation<IconButton> = {
  component: "iconButton",
  implementation: "core",
  template: () =>
    function iconButtonTemplate({ variant, icon, accessibleLabel }) {
      return html`<dso-icon-button
        variant=${variant}
        icon=${icon}
        accessible-label=${accessibleLabel}
      ></dso-icon-button>`;
    },
};
