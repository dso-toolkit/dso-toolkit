import { AlertType, FormGroupFiles } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { infoButtonTemplate } from '../../../info-button/info-button.template';
import { infoTemplate } from '../../../info/info.template';
import { iconTemplate } from '../../../icon/icon.template';
import { alertTemplate } from '../../../alert/alert.template';
import { buttonTemplate } from '../../../button/button.template';
import { selectableTemplate } from '../../../selectable/selectable.template';

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
    <fieldset class="form-group dso-files ${classMap({ 'dso-required': !!formGroup.required, [`dso-${formGroup.state}`]: !!formGroup.state })}">
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
            html`
              <li>
                <div class="dso-filename" id="">${file.filename}</div>
                ${selectableTemplate({ id: 'monkey', value:'', type: 'checkbox', label: 'Vertrouwelijk'})}
                ${file.confidential
                  ? iconTemplate({ icon: 'status-warning' })
                  : nothing
                }
                ${buttonTemplate({ label: 'Sluiten', variant: null, modifier: 'btn btn-link dso-remove', icon: { icon: 'times' }, iconMode: 'only' })}
              </li>`
          )}
        </ul>
        ${formGroup.files.some(file => !!file.confidential)
          ? alertTemplate({ status: AlertType.Warning, message: formGroup.warning })
          : nothing
        }
        <div class="dso-file-upload">
          <input
            type="file"
            aria-describedby=${ifDefined(ariaDescribedBy)}
            ?id=${formGroup.id}
            ?disabled=${formGroup.disabled}
          />
          <label
            class="dso-${ formGroup.addFileButtonVariant }"
            for="{ ${formGroup.id} }">
            ${iconTemplate({ icon: 'plus' })}
            <span>Document toevoegen</span>
          </label>
        </div>

        ${formGroup.errorText
          ? html`
            <p class="dso-message" id=${errorTextId}>${formGroup.errorText}</p>
          `
          : nothing
        }
      </div>
    </fieldset>
  `;
}

