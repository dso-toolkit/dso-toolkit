import { FormGroupInputNumber } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
// import { classMap } from 'lit-html/directives/class-map.js';
// import { ifDefined } from 'lit-html/directives/if-defined.js';

import { inputNumberTemplate } from '../../../input-number/input-number.template';

export function formGroupInputNumberTemplate(formGroup: FormGroupInputNumber<TemplateResult>): TemplateResult {
  return html`
    <div class="form-group dso-input-number">
      <div class="dso-label-container">
        <label for=${formGroup.id} class="control-label">
          ${formGroup.label}
        </label>
      </div>
      <div class="dso-field-container">
        ${inputNumberTemplate({
          id: formGroup.id,
          min: formGroup.min,
          max: formGroup.max,
          count: formGroup.count,
          minusButtonInactive: formGroup.minusButtonInactive,
          plusButtonInactive: formGroup.plusButtonInactive
        })}
      </div>
    </div>
  `;
}
