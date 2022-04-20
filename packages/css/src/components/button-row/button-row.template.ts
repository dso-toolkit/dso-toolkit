import { Button, ButtonRow } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { buttonTemplate } from '../button/button.template';

export function buttonRowTemplate({ buttons }: ButtonRow) {
  return html`
    <div class="dso-button-row">
      ${buttons.map((button: Button) => buttonTemplate(button))}
    </div>
  `;
}
