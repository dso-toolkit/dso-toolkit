import { IconButton } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { ifDefined } from "lit-html/directives/if-defined.js";

export const coreIconButton: ComponentImplementation<IconButton> = {
  component: "iconButton",
  implementation: "core",
  template: () =>
    function iconButtonTemplate({ accessibleLabel, dsoIconButtonClick, disabled, icon, tooltipPlacement, variant }) {
      return html`
        <dso-icon-button
          variant=${variant}
          icon=${icon}
          accessible-label=${accessibleLabel}
          tooltip-placement=${tooltipPlacement}
          disabled=${ifDefined(disabled)}
          @dsoIconButtonClick=${(e: CustomEvent) => dsoIconButtonClick(e.detail)}
        ></dso-icon-button>
      `;
    },
};
