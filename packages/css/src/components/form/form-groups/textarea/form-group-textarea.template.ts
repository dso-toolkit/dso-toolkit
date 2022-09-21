import { FormGroupTextarea } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { infoButtonTemplate } from '../../../info-button/info-button.template';
import { infoTemplate } from '../../../info/info.template';
import { iconTemplate } from '../../../icon/icon.template';

export function formGroupTextareaTemplate(formGroup: FormGroupTextarea<TemplateResult>): TemplateResult {
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
    <div class="form-group dso-textarea ${classMap({ 'has-feedback': !!formGroup.feedback, 'dso-required': !!formGroup.required, [`dso-${formGroup.state}`]: !!formGroup.state })}">
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
        <textarea
          id=${formGroup.id}
          class="form-control"
          placeholder=${ifDefined(formGroup.placeholder)}
          rows=${ifDefined(formGroup.rows)}
          aria-describedby=${ifDefined(ariaDescribedBy)}
          aria-errormessage=${ifDefined(ariaErrorMessage)}
          aria-invalid=${ifDefined(formGroup.state)}
          ?disabled=${formGroup.disabled}
          ?readonly=${formGroup.readonly}
          ?required=${formGroup.required}
          .value=${formGroup.value}
        ></textarea>
        ${formGroup.feedback
          ? html`
            <span class="form-control-feedback" aria-hidden="true">${iconTemplate(formGroup.feedback)}</span>
          `
          : nothing
        }
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
    </div>
  `;
}
