import { FormGroupConfirm } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssFormGroupConfirm: ComponentImplementation<FormGroupConfirm<TemplateResult>> = {
  component: "formGroupConfirm",
  implementation: "html-css",
  template: ({ selectableTemplate }) =>
    function formGroupConfirmTemplate(formGroup) {
      const errorTextId = `${formGroup.id}-error-text`;
      const helpTextId = `${formGroup.id}-help-text`;

      const ariaDescribedBy = formGroup.helpText ? helpTextId : undefined;

      const ariaErrorMessage = formGroup.errorText ? errorTextId : undefined;

      return html`
        <div
          class="form-group dso-confirm ${classMap({
            "dso-required": !!formGroup.required,
            [`dso-${formGroup.state}`]: !!formGroup.state,
          })}"
          aria-describedby=${ifDefined(ariaDescribedBy)}
          aria-errormessage=${ifDefined(ariaErrorMessage)}
        >
          <div class="dso-field-container">
            ${selectableTemplate({ ...formGroup.selectable, disabled: formGroup.disabled })}
            ${formGroup.errorText && formGroup.state === "invalid"
              ? html`<p class="dso-message" role="alert" id=${errorTextId}>${formGroup.errorText}</p>`
              : nothing}
            ${formGroup.helpText ? html`<p class="dso-help-block" id=${helpTextId}>${formGroup.helpText}</p>` : nothing}
          </div>
        </div>
      `;
    },
};
