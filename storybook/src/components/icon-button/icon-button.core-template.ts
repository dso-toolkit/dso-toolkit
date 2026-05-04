import { IconButton } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreIconButton: ComponentImplementation<IconButton> = {
  component: "iconButton",
  implementation: "core",
  template: () =>
    function iconButtonTemplate({ label, dsoClick, disabled, icon, tooltipPlacement, variant, isToggled }) {
      return html`
        <dso-icon-button
          variant=${variant}
          icon=${icon}
          label=${label}
          tooltip-placement=${ifDefined(tooltipPlacement)}
          is-toggled=${isToggled}
          ?disabled=${disabled}
          @dsoClick=${ifDefined(dsoClick)}
        ></dso-icon-button>
      `;
    },
};
