import { FormGroupInputNumber } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

import { ComponentImplementation } from '../../templates';

export const cssFormGroupInputNumber: ComponentImplementation<FormGroupInputNumber<TemplateResult>> = {
  component: 'formGroupInputNumber',
  implementation: 'css',
  template: ({ inputNumberTemplate }) => function formGroupInputNumberTemplate(formGroup) {
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
};
