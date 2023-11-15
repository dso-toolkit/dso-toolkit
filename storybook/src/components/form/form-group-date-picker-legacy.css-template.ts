import { FormGroupDatePickerLegacy } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssFormGroupDatePickerLegacy: ComponentImplementation<FormGroupDatePickerLegacy<TemplateResult>> = {
  component: "formGroupDatePickerLegacy",
  implementation: "html-css",
  template: ({ datePickerLegacyTemplate }) =>
    function formGroupDatePickerLegacyTemplate({ id, state, required, helpText, errorText, datePickerLegacy }) {
      const errorTextId = `${id}-error-text`;
      const helpTextId = `${id}-help-text`;

      const ariaDescribedBy = helpText ? helpTextId : undefined;

      const ariaErrorMessage = errorText ? errorTextId : undefined;

      return html`
        <fieldset
          class="form-group dso-input dso-input-date ${classMap({
            "dso-required": !!required,
            [`dso-${state}`]: !!state,
          })}"
          aria-describedby=${ifDefined(ariaDescribedBy)}
          aria-errormessage=${ifDefined(ariaErrorMessage)}
        >
          <div class="dso-field-container">
            ${datePickerLegacyTemplate(datePickerLegacy)}
            ${errorText && state === "invalid"
              ? html`<p class="dso-message" id=${errorTextId}>${errorText}</p>`
              : nothing}
            ${helpText ? html`<p class="dso-help-block" id=${helpTextId}>${helpText}</p>` : nothing}
          </div>
        </fieldset>
      `;
    },
};
