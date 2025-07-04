import { Toggletip } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreToggletip: ComponentImplementation<Toggletip<TemplateResult>> = {
  component: "toggletip",
  implementation: "core",
  template: () =>
    function toggletipTemplate({ children, mode, label, position, small, badgeStatus, icon, iconActive }) {
      return html`<dso-toggletip
        mode=${ifDefined(mode)}
        label=${ifDefined(label)}
        position=${ifDefined(position)}
        ?small=${small}
        badge-status=${ifDefined(badgeStatus)}
        icon=${ifDefined(icon)}
        icon-active=${ifDefined(iconActive)}
        >${children}
      </dso-toggletip>`;
    },
};
