import { FormGroupCheckboxes } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { ComponentImplementation } from '../../templates';

export const cssFormGroupCheckboxes: ComponentImplementation<FormGroupCheckboxes<TemplateResult>> = {
  component: 'formGroupCheckboxes',
  implementation: 'css',
  template: ({ infoButtonTemplate, infoTemplate, selectableTemplate }) => function formGroupCheckboxesTemplate(formGroup) {
    const errorTextId = `${formGroup.id}-error-text`;
    const helpTextId = `${formGroup.id}-help-text`;
    const infoTextId = `${formGroup.id}-info-text`;

    const ariaDescribedBy = [
      formGroup.helpText ? helpTextId : undefined,
      formGroup.info?.fixed ? infoTextId : undefined
    ]
      .filter(s => !!s)
      .join(' ') || undefined;

    const ariaErrorMessage = formGroup.errorText ? errorTextId : undefined;

    return html`
      <fieldset
        class="form-group dso-checkboxes ${classMap({ 'dso-required': !!formGroup.required, [`dso-${formGroup.state}`]: !!formGroup.state })}"
        aria-describedby=${ifDefined(ariaDescribedBy)}
        aria-errormessage=${ifDefined(ariaErrorMessage)}
      >
        <div class="dso-label-container">
          <label for=${formGroup.id} class="control-label">
            ${formGroup.label}
          </label>
          ${formGroup.info?.fixed === false && formGroup.infoButton
            ? infoButtonTemplate(formGroup.infoButton)
            : nothing
          }
          ${formGroup.info?.active
            ? infoTemplate({ ...formGroup.info, id: infoTextId })
            : nothing
          }
        </div>
        <div class="dso-field-container">
          ${formGroup.selectables.map(selectable =>
            selectableTemplate({ ...selectable, disabled: formGroup.disabled })
          )}
          ${formGroup.errorText && formGroup.state === 'invalid'
            ? html`
              <p class="dso-message" id=${errorTextId}>${formGroup.errorText}</p>
            `
            : nothing
          }
          ${formGroup.helpText
            ? html`
              <p class="dso-help-block" id=${helpTextId}>${formGroup.helpText}</p>
            `
            : nothing
          }
        </div>
      </fieldset>
    `;
  }
};