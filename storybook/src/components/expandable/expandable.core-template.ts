import { Expandable } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreExpandable: ComponentImplementation<Expandable<TemplateResult>> = {
  component: "expandable",
  implementation: "core",
  template: () =>
    function expandableTemplate({
      open,
      enableAnimation,
      animationOffset,
      content,
      dsoToggle,
    }: Expandable<TemplateResult>) {
      return html`
        <dso-expandable
          enable-animation=${ifDefined(enableAnimation)}
          animation-offset=${ifDefined(animationOffset)}
          ?open=${ifDefined(open)}
          @dsoToggle=${dsoToggle}
        >
          ${content}
        </dso-expandable>
      `;
    },
};
