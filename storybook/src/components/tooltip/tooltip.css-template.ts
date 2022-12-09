import { Tooltip } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const cssTooltip: ComponentImplementation<Tooltip> = {
  component: "tooltip",
  implementation: "html-css",
  template: () =>
    function tooltipTemplate({ position, descriptive }) {
      return html`
        <div aria-hidden=${ifDefined(!descriptive || undefined)} class="tooltip fade in ${position}">
          <div class="tooltip-arrow"></div>
          <div class="tooltip-inner">${`Ik sta: "${position}"`}</div>
        </div>
      `;
    },
};
