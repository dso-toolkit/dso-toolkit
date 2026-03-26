import { Toggletip } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreToggletip: ComponentImplementation<Toggletip<TemplateResult>> = {
  component: "toggletip",
  implementation: "core",
  template: () =>
    function toggletipTemplate({ children, label, position, small }) {
      return html`<!-- START DEPRECATED: use <dso-info-button><div slot="toggletip">...</div></dso-info-button> --><dso-toggletip
          label=${ifDefined(label)}
          position=${ifDefined(position)}
          ?small=${small}
          >${children}</dso-toggletip
        ><!-- END DEPRECATED -->`;
    },
};
