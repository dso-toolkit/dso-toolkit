import { FormGroupInput, FormGroupInputDate } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { infoButtonTemplate } from '../../../info-button/info-button.template';
import { infoTemplate } from '../../../info/info.template';
import { iconTemplate } from '../../../icon/icon.template';

export function formGroupInputTemplate(formGroup: FormGroupInput<TemplateResult> | FormGroupInputDate<TemplateResult>): TemplateResult {
  const errorTextId = `${formGroup.id}-error-text`;
  const helpTextId = `${formGroup.id}-help-text`;
  const infoTextId = `${formGroup.id}-info-text`;

  const ariaDescribedBy = [
    formGroup.errorText ? errorTextId : undefined,
    formGroup.helpText ? helpTextId : undefined,
    formGroup.info?.fixed ? infoTextId : undefined
  ]
    .filter(s => !!s)
    .join(' ') || undefined;

  return html`
    <div class="form-group dso-input ${classMap({ [`dso-input-${formGroup.type}`]: true, 'has-feedback': !!formGroup.feedback, 'dso-required': !!formGroup.required, [`dso-${formGroup.state}`]: !!formGroup.state })}">
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
        ${formGroup.type === 'date'
          ? html`
            <code>Zie markup, hier zijn geen Web Components actief</code><dso-date-picker
              identifier=${formGroup.id}
              min=${ifDefined(formGroup.min)}
              max=${ifDefined(formGroup.max)}
              value=${ifDefined(formGroup.value)}
              ?disabled=${formGroup.disabled}
            ></dso-date-picker>
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
              aria-invalid=${ifDefined(formGroup.state)}
              ?disabled=${formGroup.disabled}
              ?readonly=${formGroup.readonly}
              ?required=${formGroup.required}
            >
          `
        }
        ${formGroup.feedback
          ? html`
            <span class="form-control-feedback" aria-hidden="true">${iconTemplate(formGroup.feedback)}</span>
          `
          : nothing
        }
        ${formGroup.errorText
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
    </div>
  `;
}