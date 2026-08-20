import { LabelGroup } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssLabelGroup: ComponentImplementation<LabelGroup> = {
  component: "labelGroup",
  implementation: "html-css",
  template: ({ labelTemplate }) =>
    function labelGroupTemplate({ labels, slotName }) {
      return html`<div class="dso-label-group" slot=${ifDefined(slotName)}>
        <ul>
          ${labels.map((label) => html`<li>${labelTemplate(label)}</li>`)}
        </ul>
      </div>`;
    },
};
