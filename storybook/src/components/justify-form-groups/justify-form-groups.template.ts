import { TemplateResult, html } from "lit-html";

import { buttonTemplate } from "../button/button.template.js";
import { formGroupTemplate } from "../form-group/form-group.template.js";

import { JustifyFormGroups } from "./justify-form-groups.models.js";

export function justifyFormGroupsTemplate({ formGroups, buttons }: JustifyFormGroups<TemplateResult>) {
  return html`
    <div class="dso-justify-form-groups form-groups-${formGroups.length}">
      ${formGroups.map((formGroup) => formGroupTemplate(formGroup))}
      <div class="dso-form-buttons">${buttons.map((button) => buttonTemplate(button))}</div>
    </div>
  `;
}
