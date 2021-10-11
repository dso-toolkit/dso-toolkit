import { Card, Interaction } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

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
        ${interactions && html`
        <div class="dso-card-interactions">
          ${interactions.map((interaction: Interaction) => html`
            <div class="dso-card-interaction">
              ${interaction.toggle && html`
                <label>
                  <input type="checkbox" name=${interaction.toggle.id} />
                  <span class="sr-only">${label}</span>
                </label>
              `}
              ${interaction.button && html`
                ${buttonTemplate(interaction.button)}
              `}
            </div>
          `)}
        </div>
        `}
      </div>
      <div class="dso-card-content">
        <div class="dso-rich-content">
          <p>${unsafeHTML(content)}</p>
        </div>
      </div>
    </div>
  `;
}
