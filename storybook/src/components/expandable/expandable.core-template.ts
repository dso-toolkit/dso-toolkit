import { Expandable } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreExpandable: ComponentImplementation<Expandable<TemplateResult>> = {
  component: "expandable",
  implementation: "core",
  template: () =>
    function expandableTemplate({ open, enableAnimation, minimumHeight, content }: Expandable<TemplateResult>) {
      return html`
        <dso-expandable
          ?enable-animation=${enableAnimation}
          minimum-height=${ifDefined(minimumHeight)}
          ?open=${ifDefined(open)}
        >
          ${content}
        </dso-expandable>
      `;
    },
};
