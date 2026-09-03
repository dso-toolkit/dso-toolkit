import { TemplateResult, html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { infoTemplate } from "../info/info.template.js";
import { infoButtonTemplate } from "../info-button/info-button.template.js";
import { selectableTemplate } from "../selectable/selectable.template.js";

import { FormGroupCheckboxes } from "./form-group-checkboxes.models.js";

export function formGroupCheckboxesTemplate(formGroup: FormGroupCheckboxes<TemplateResult>) {
  const errorTextId = `${formGroup.id}-error-text`;
  const helpTextId = `${formGroup.id}-help-text`;
  const infoTextId = `${formGroup.id}-info-text`;

  const ariaDescribedBy =
    [formGroup.helpText ? helpTextId : undefined, formGroup.info?.fixed ? infoTextId : undefined]
      .filter((s) => !!s)
      .join(" ") || undefined;

  const ariaErrorMessage = formGroup.errorText ? errorTextId : undefined;

  return html`
    <fieldset
      class="form-group dso-checkboxes ${classMap({
        "dso-required": !!formGroup.required,
        [`dso-${formGroup.state}`]: !!formGroup.state,
      })}"
      aria-describedby=${ifDefined(ariaDescribedBy)}
      aria-errormessage=${ifDefined(ariaErrorMessage)}
    >
      <legend class="sr-only">${formGroup.label}</legend>
      <div class="dso-label-container">
        <span class="control-label" aria-hidden="true">${formGroup.label}</span>
        ${formGroup.info?.fixed === false && formGroup.infoButton ? infoButtonTemplate(formGroup.infoButton) : nothing}
        ${formGroup.info?.active ? infoTemplate({ ...formGroup.info, id: infoTextId }) : nothing}
      </div>
      <div class="dso-field-container">
        ${formGroup.selectables.map((selectable) =>
          selectableTemplate({ ...selectable, disabled: formGroup.disabled }),
        )}
        ${
          formGroup.errorText && formGroup.state === "invalid"
            ? html`<p class="dso-message" role="alert" id=${errorTextId}>${formGroup.errorText}</p>`
            : nothing
        }
        ${formGroup.helpText ? html`<p class="dso-help-block" id=${helpTextId}>${formGroup.helpText}</p>` : nothing}
      </div>
    </fieldset>
  `;
}
