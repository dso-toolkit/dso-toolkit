import { LabelGroup } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssLabelGroup: ComponentImplementation<LabelGroup> = {
  component: "labelGroup",
  implementation: "html-css",
  template: ({ labelTemplate }) =>
    function labelGroupTemplate({ labels }) {
      return html`<div class="dso-label-group">
        <ul>
          ${labels.map((label) => html`<li>${labelTemplate(label)}</li>`)}
        </ul>
      </div>`;
    },
};
