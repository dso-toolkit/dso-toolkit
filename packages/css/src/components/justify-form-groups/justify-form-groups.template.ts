import { JustifyFormGroups } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

import { buttonTemplate } from '../button/button.template';
import { formGroupTemplate } from '../form/form-group.template';

export function justifyFormGroupsTemplate({ formGroups, buttons }: JustifyFormGroups<TemplateResult>) {
  return html`
    <div class="dso-justify-form-groups">
      ${formGroups.map(formGroup => formGroupTemplate(formGroup))}
      <div class="dso-form-buttons">
        ${buttons.map(button => buttonTemplate(button))}
      </div>
    </div>
  `;
}
