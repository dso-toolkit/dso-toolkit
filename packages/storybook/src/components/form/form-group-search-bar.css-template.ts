import { FormGroupSearchBar } from "@dso-toolkit/sources";

import { html, nothing, TemplateResult } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

import { ComponentImplementation } from "../../templates";

export const cssFormGroupSearchBar: ComponentImplementation<FormGroupSearchBar<TemplateResult>> = {
  component: "formGroupSearchBar",
  implementation: "css",
  template: ({ infoButtonTemplate, infoTemplate, searchBarTemplate }) =>
    function formGroupSearchBarTemplate(formGroup) {
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
          class="form-group dso-form-group-search-bar ${classMap({ [`dso-${formGroup.state}`]: !!formGroup.state })}"
        >
          <div class="dso-label-container">
            <label for=${formGroup.id} class="control-label"> ${formGroup.label} </label>
            ${formGroup.info?.fixed === false && formGroup.infoButton
              ? infoButtonTemplate(formGroup.infoButton)
              : nothing}
            ${formGroup.info?.active ? infoTemplate({ ...formGroup.info, id: infoTextId }) : nothing}
          </div>
          <div class="dso-field-container">
            ${searchBarTemplate({
              ...formGroup.searchBar,
              invalid: formGroup.state === "invalid",
              ariaDescribedBy,
              ariaErrorMessage,
            })}
            ${formGroup.errorText && formGroup.state === "invalid"
              ? html`<p class="dso-message" id=${errorTextId}>${formGroup.errorText}</p>`
              : nothing}
            ${formGroup.helpText ? html`<p class="dso-help-block" id=${helpTextId}>${formGroup.helpText}</p>` : nothing}
          </div>
        </div>
      `;
    },
};
