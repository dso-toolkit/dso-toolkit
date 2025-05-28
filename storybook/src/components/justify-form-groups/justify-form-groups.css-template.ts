import { JustifyFormGroups } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssJustifyFormGroups: ComponentImplementation<JustifyFormGroups<TemplateResult>> = {
  component: "justifyFormGroups",
  implementation: "html-css",
  template: ({ buttonTemplate, formGroupTemplate }) =>
    function justifyFormGroupsTemplate({ formGroups, buttons }) {
      return html`
        <div class="dso-justify-form-groups form-groups-${formGroups.length}">
          ${formGroups.map((formGroup) => formGroupTemplate(formGroup))}
          <div class="dso-form-buttons">${buttons.map((button) => buttonTemplate(button))}</div>
        </div>
      `;
    },
};
