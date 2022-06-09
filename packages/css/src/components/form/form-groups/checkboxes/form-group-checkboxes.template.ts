import { FormGroupCheckboxes } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';

import { selectableTemplate } from '../../../selectable/selectable.template';
import { infoButtonTemplate } from '../../../info-button/info-button.template';
import { infoTemplate } from '../../../info/info.template';

export function formGroupCheckboxesTemplate(formGroup: FormGroupCheckboxes<TemplateResult>): TemplateResult {
  const errorTextId = `${formGroup.id}-error-text`;
  const helpTextId = `${formGroup.id}-help-text`;
  const infoTextId = `${formGroup.id}-info-text`;

  return html`
    <fieldset class="form-group dso-checkboxes ${classMap({ 'dso-required': !!formGroup.required, [`dso-${formGroup.state}`]: !!formGroup.state })}">
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
