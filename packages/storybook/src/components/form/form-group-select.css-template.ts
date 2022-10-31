import { FormGroupSelect, SelectOption } from "@dso-toolkit/sources";
import { html, nothing, TemplateResult } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

function selectOptionTemplate(option: SelectOption) {
  return html`<option value=${option.value} ?selected=${option.selected}>${option.label}</option>`;
}

export const cssFormGroupSelect: ComponentImplementation<FormGroupSelect<TemplateResult>> = {
  component: "formGroupSelect",
  implementation: "css",
  template: ({ infoButtonTemplate, infoTemplate, iconTemplate }) =>
    function formGroupSelectTemplate(formGroup) {
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
          class="form-group dso-select ${classMap({
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
            <select
              id=${formGroup.id}
              class="form-control"
              aria-describedby=${ifDefined(ariaDescribedBy)}
              aria-errormessage=${ifDefined(ariaErrorMessage)}
              aria-invalid=${ifDefined(formGroup.state)}
              ?disabled=${formGroup.disabled}
              ?multiple=${formGroup.multiple}
              ?required=${formGroup.required}
            >
              ${formGroup.items.map((item) =>
                "value" in item
                  ? selectOptionTemplate(item)
                  : html`
                      <optgroup label=${item.label} ?disabled=${item.disabled}>
                        ${item.options.map((o) => selectOptionTemplate(o))}
                      </optgroup>
                    `
              )}
            </select>
            ${formGroup.feedback
              ? html`
                  <span class="form-control-feedback" aria-hidden="true">${iconTemplate(formGroup.feedback)}</span>
                `
              : nothing}
            ${formGroup.errorText && formGroup.state === "invalid"
              ? html` <p class="dso-message" id=${errorTextId}>${formGroup.errorText}</p> `
              : nothing}
            ${formGroup.helpText
              ? html` <p class="dso-help-block" id=${helpTextId}>${formGroup.helpText}</p> `
              : nothing}
          </div>
        </div>
      `;
    },
};
