import { Tooltip } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreTooltip: ComponentImplementation<Tooltip<TemplateResult>> = {
  component: "tooltip",
  implementation: "core",
  template: () =>
    function tooltipTemplate({ active, descriptive, position, label, id, variant, dsoClose, content, heading }) {
      return html`<dso-tooltip
        ?descriptive=${ifDefined(descriptive)}
        position=${position}
        id=${ifDefined(id)}
        ?active=${active}
        variant=${ifDefined(variant)}
        @dsoClose=${dsoClose}
      >
        ${heading} ${label || content}
      </dso-tooltip>`;
    },
};
