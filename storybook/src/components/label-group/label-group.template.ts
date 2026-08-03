import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { labelTemplate } from "../label/label.template.js";

import { LabelGroup } from "./label-group.models.js";

export function labelGroupTemplate({ labels, slotName }: LabelGroup) {
  return html`<div class="dso-label-group" slot=${ifDefined(slotName)}>
    <ul>
      ${labels.map((label) => html`<li>${labelTemplate(label)}</li>`)}
    </ul>
  </div>`;
}
