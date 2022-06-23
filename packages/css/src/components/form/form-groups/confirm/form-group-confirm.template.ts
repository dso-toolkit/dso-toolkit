import { FormGroupConfirm } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { selectableTemplate } from '../../../selectable/selectable.template';

export function formGroupConfirmTemplate(formGroup: FormGroupConfirm<TemplateResult>): TemplateResult {
  const errorTextId = `${formGroup.id}-error-text`;
  const helpTextId = `${formGroup.id}-help-text`;

  const ariaDescribedBy = [
    formGroup.errorText ? errorTextId : undefined,
    formGroup.helpText ? helpTextId : undefined
  ]
    .filter(s => !!s)
    .join(' ') || undefined;

  return html`
    <fieldset
      class="form-group dso-confirm ${classMap({ 'dso-required': !!formGroup.required, [`dso-${formGroup.state}`]: !!formGroup.state })}"
      aria-describedby=${ifDefined(ariaDescribedBy)}
    >
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
