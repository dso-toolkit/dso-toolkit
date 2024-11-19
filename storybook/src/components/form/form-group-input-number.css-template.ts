import { FormGroupInputNumber } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssFormGroupInputNumber: ComponentImplementation<FormGroupInputNumber<TemplateResult>> = {
  component: "formGroupInputNumber",
  implementation: "html-css",
  template: ({ buttonTemplate }) =>
    function formGroupInputNumberTemplate(formGroup) {
      return html`
        <div class="form-group dso-input-number">
          <div class="dso-label-container">
            <label for=${formGroup.id} class="control-label"> ${formGroup.label} </label>
          </div>
          <div class="dso-field-container">
            <div class="dso-input-number">
              ${buttonTemplate({
                type: "button",
                label: "Aantal verlagen",
                variant: "tertiary",
                disabled: formGroup.minusButtonInactive,
                icon: { icon: "minus-square" },
                iconMode: "only",
              })}
              <input
                type="number"
                id=${formGroup.id}
                readonly
                tabindex="-1"
                min=${formGroup.min}
                max=${formGroup.max}
                class="dso-input-step-counter"
                aria-label="Aantal"
                value=${formGroup.count}
              />
              ${buttonTemplate({
                type: "button",
                label: "Aantal verhogen",
                variant: "tertiary",
                disabled: formGroup.plusButtonInactive,
                icon: { icon: "plus-square" },
                iconMode: "only",
              })}
            </div>
          </div>
        </div>
      `;
    },
};
