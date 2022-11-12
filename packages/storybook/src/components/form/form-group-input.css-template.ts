import { FormGroupInput, FormGroupInputDate } from "@dso-toolkit/sources";
import { html, nothing, TemplateResult } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssFormGroupInput: ComponentImplementation<
  FormGroupInput<TemplateResult> | FormGroupInputDate<TemplateResult>
> = {
  component: "formGroupInput",
  implementation: "css",
  template: ({ infoButtonTemplate, infoTemplate, datePickerTemplate, iconTemplate }) =>
    function formGroupInputTemplate(formGroup) {
      const errorTextId = `${formGroup.id}-error-text`;
      const helpTextId = `${formGroup.id}-help-text`;
      const infoTextId = `${formGroup.id}-info-text`;

      const ariaDescribedBy =
        [formGroup.helpText ? helpTextId : undefined, formGroup.info?.fixed ? infoTextId : undefined]
          .filter((s) => !!s)
          .join(" ") || undefined;

      const ariaErrorMessage = formGroup.errorText ? errorTextId : undefined;

      return html`
        <div
          class="form-group dso-input ${classMap({
            [`dso-input-${formGroup.type}`]: true,
            "has-feedback": !!formGroup.feedback,
            "dso-required": !!formGroup.required,
            [`dso-${formGroup.state}`]: !!formGroup.state,
          })}"
        >
          <div class="dso-label-container">
            <label for=${formGroup.id} class="control-label"> ${formGroup.label} </label>
            ${formGroup.info?.fixed === false && formGroup.infoButton
              ? infoButtonTemplate(formGroup.infoButton)
              : nothing}
            ${formGroup.info?.active ? infoTemplate({ ...formGroup.info, id: infoTextId }) : nothing}
          </div>
          <div class="dso-field-container">
            ${formGroup.type === "date"
              ? html`
                  ${datePickerTemplate({
                    id: formGroup.id,
                    disabled: !!formGroup.disabled,
                    min: formGroup.min,
                    max: formGroup.max,
                    value: formGroup.value,
                  })}
                `
              : html`
                  <input
                    type=${formGroup.type}
                    id=${formGroup.id}
                    class="form-control"
                    placeholder=${ifDefined(formGroup.placeholder)}
                    size=${ifDefined(formGroup.size)}
                    value=${ifDefined(formGroup.value)}
                    autocomplete=${ifDefined(formGroup.autocomplete)}
                    aria-describedby=${ifDefined(ariaDescribedBy)}
                    aria-errormessage=${ifDefined(ariaErrorMessage)}
                    aria-invalid=${ifDefined(formGroup.state)}
                    ?disabled=${formGroup.disabled}
                    ?readonly=${formGroup.readonly}
                    ?required=${formGroup.required}
                  />
                `}
            ${formGroup.feedback
              ? html`
                  <span class="form-control-feedback" aria-hidden="true">${iconTemplate(formGroup.feedback)}</span>
                `
              : nothing}
            ${formGroup.errorText && formGroup.state === "invalid"
              ? html`<p class="dso-message" id=${errorTextId}>${formGroup.errorText}</p>`
              : nothing}
            ${formGroup.helpText ? html`<p class="dso-help-block" id=${helpTextId}>${formGroup.helpText}</p>` : nothing}
          </div>
        </div>
      `;
    },
};
