import { Button, FormButtons } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { buttonTemplate } from '../button/button.template';

export function formButtonsTemplate({ buttons, asideButtons }: FormButtons) {
  return html`
    <div class="dso-form-buttons">
      ${asideButtons && asideButtons.length > 0 && html`
        <div class="dso-aside">
          ${asideButtons.map((button: Button) => buttonTemplate(button))}
        </div>
      `}

      ${buttons.map((button: Button) => buttonTemplate(button))}
    </div>
  `;
}
