import { Card } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { buttonTemplate } from '../button/button.template';
import { iconTemplate } from '../icon/icon.template';

export function cardTemplate({ label, content, interactions }: Card) {
  return html`
    <div class="dso-card">
      <div class="dso-card-heading">
        <a href="#">
          <h2>
            <span>${label}</span>
            ${iconTemplate({ icon: 'chevron-right' })}
          </h2>
        </a>
        ${interactions && interactions.length > 0 && html`
          <div class="dso-card-interactions">
            ${interactions.map(interaction => html`
              <div class="dso-card-interaction">
                ${buttonTemplate(interaction)}
              </div>
            `)}
          </div>
        `}
      </div>
      <div class="dso-card-content">
        <div class="dso-rich-content">
          <p>${content}</p>
        </div>
      </div>
    </div>
  `;
}
