import { Card } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';

import { buttonTemplate } from '../button/button.template';
import { iconTemplate } from '../icon/icon.template';
import { selectableTemplate } from '../selectable/selectable.template';

export function cardTemplate({ label, selectable, content, interactions }: Card<TemplateResult>) {
  return html`
    <div class="dso-card ${classMap({ 'dso-is-selectable': !!selectable })}">
      ${selectable
        ? html`
          <div class="dso-card-selectable">
            ${selectableTemplate(selectable)}
          </div>`
        : nothing
      }
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
