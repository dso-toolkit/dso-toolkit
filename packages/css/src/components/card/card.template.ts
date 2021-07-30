import { Card } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { buttonTemplate } from '../button/button.template';

export function cardTemplate({ label, content, interactions }: Card<TemplateResult>) {
  return html`
    <div class="dso-card">
      <a href="#">
        <div class="dso-rich-content">
          <h2>${label}</h2>
          <p>${unsafeHTML(content)}</p>
        </div>
      </a>
      ${interactions && html`
        <div class="dso-card-interactions">
          ${interactions.map(interaction => html`
            <div class="dso-card-interaction">
              ${interaction.toggle && html`
                <label>
                  <input type="checkbox" name="${interaction.toggle.id}" />
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
  `;
}
