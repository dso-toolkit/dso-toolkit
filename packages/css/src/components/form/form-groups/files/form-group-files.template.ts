import { FormGroupFiles } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { infoButtonTemplate } from '../../../info-button/info-button.template';
import { infoTemplate } from '../../../info/info.template';
import { iconTemplate } from '../../../icon/icon.template';

export function formGroupFilesTemplate(formGroup: FormGroupFiles<TemplateResult>): TemplateResult {
  const errorTextId = `${formGroup.id}-error-text`;
  const infoTextId = `${formGroup.id}-info-text`;

  const ariaDescribedBy = [
    formGroup.errorText ? errorTextId : undefined,
    formGroup.info?.fixed ? infoTextId : undefined
  ]
    .filter(s => !!s)
    .join(' ') || undefined;

  return html`
    <div class="form-group dso-files ${classMap({ 'dso-required': !!formGroup.required, [`dso-${formGroup.state}`]: !!formGroup.state })}">
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
        <ul class="dso-filelist">
          ${formGroup.files.map(file =>
            html `<li>file hier</li>`
          )}
        </ul>

        ${formGroup.errorText
          ? html`
            <p class="dso-message" id=${errorTextId}>${formGroup.errorText}</p>
          `
          : nothing
        }
      </div>
    </div>
  `;
}
