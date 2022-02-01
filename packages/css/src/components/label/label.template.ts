import { Label } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { iconTemplate } from '../icon/icon.template';

// Todo: Move to @dso-toolkit/sources
const statusMap = new Map<string, string>([
  ['primary', 'Primair'],
  ['info', 'Info'],
  ['success', 'Succes'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Gevaar']
]);

export function labelTemplate({ status, label, button, compact, symbol }: Label) {
  return html`
    <span class="dso-label ${classMap({ [`dso-label-${status}`]: !!status, [`dso-compact`]: !!compact })}">
      ${symbol
        ? html`
          <span class="dso-label-symbol">${unsafeHTML(symbol)}</span>
        `
        : nothing
      }${status
        ? html`
          <span class="sr-only">${statusMap.get(status)}: </span>
        `
        : nothing
      }${
        label
      }${button
        ? html `
          <button type="button" @click=${button.onClick}>
            <span class="sr-only">${button.title}</span>
            ${iconTemplate({ icon: button.icon })}
          </button>
        `
        : nothing
      }
    </span>
  `;
}
