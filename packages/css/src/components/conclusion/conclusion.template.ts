import { Conclusion } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { alertTemplate } from '../alert/alert.template';
import { infoTemplate } from '../info/info.template';
import { infoButtonTemplate } from '../info-button/info-button.template';

export function conclusionTemplate({ items, alert, info }: Conclusion<TemplateResult>) {
  return html`
    <ul class="dso-conclusion">
      ${items.map(item => html`
        <li class="dso-${item.modifier}">
          ${unsafeHTML(item.label)}

          ${item.subitems && html`
            <ul>
              ${item.subitems.map(subitem => html`
                <li>${unsafeHTML(subitem)}</li>
              `)}
            </ul>
          `}

          ${info
            ? html`
              ${!info.fixed ? infoButtonTemplate({ active: info.active, onClick: info.onClose }) : nothing}
              ${info.active || info.fixed
                ? infoTemplate(info)
                : nothing
              }
            `
            : nothing
          }
        </li>
      `)}
    </ul>
    ${alert
      ? alertTemplate(alert)
      : nothing
    }
  `;
}
