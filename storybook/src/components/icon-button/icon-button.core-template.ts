import { IconButton } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreIconButton: ComponentImplementation<IconButton> = {
  component: "iconButton",
  implementation: "core",
  template: () =>
    function iconButtonTemplate({ label, dsoIconButtonClick, disabled, icon, tooltipPlacement, variant }) {
      return html`
        <dso-icon-button
          variant=${variant}
          icon=${icon}
          label=${label}
          tooltip-placement=${ifDefined(tooltipPlacement)}
          ?disabled=${disabled}
          @dsoIconButtonClick=${ifDefined(dsoIconButtonClick)}
        ></dso-icon-button>
      `;
    },
};
