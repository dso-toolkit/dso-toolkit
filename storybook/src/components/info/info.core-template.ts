import { Info } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreInfo: ComponentImplementation<Info<TemplateResult>> = {
  component: "info",
  implementation: "core",
  template: () =>
    function infoTemplate({ fixed, active, content, dsoClose, id }) {
      return html`<dso-info ?fixed=${fixed} ?active=${active} @dsoClose=${dsoClose} id=${ifDefined(id)}
        >${content}</dso-info
      >`;
    },
};
