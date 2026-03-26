import { Tooltip } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreTooltip: ComponentImplementation<Tooltip> = {
  component: "tooltip",
  implementation: "core",
  template: () =>
    function tooltipTemplate({ active, descriptive, position, label, id }) {
      return html`<!-- START DEPRECATED use <dso-icon-button>, <dso-info-button><div slot="toggletip">...</div></dso-info-button> or <dso-badge><div slot="toggletip">...</div></dso-badge>-->
        <dso-tooltip ?descriptive=${ifDefined(descriptive)} position=${position} id=${ifDefined(id)} ?active=${active}>
          ${label}
        </dso-tooltip>
        <!-- END DEPRECATED -->`;
    },
};
