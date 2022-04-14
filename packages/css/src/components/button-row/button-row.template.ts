import { ButtonRow } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

import { buttonTemplate } from '../button/button.template';

export function buttonRowTemplate({ buttons }: ButtonRow<TemplateResult>) {
  return html`
    <div class="dso-button-row">
      ${buttons.map(button => buttonTemplate(button))}
    </div>
  `;
}
