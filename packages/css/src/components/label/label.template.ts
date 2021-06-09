import { Label } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

import { iconTemplate } from '../icon/icon.template';

// Todo: Move to @dso-toolkit/sources
const statusMap = new Map<string, string>([
  ['primary', 'Primair'],
  ['info', 'Info'],
  ['success', 'Succes'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Gevaar']
]);

export function labelTemplate({ status, label, button, compact }: Label) {
  return html`
    <span class="dso-label ${classMap({ [`dso-label-${status}`]: !!status, [`dso-label-compact`]: !!compact })}">
      ${status && html`
        <span class="sr-only">${statusMap.get(status)}: </span>
      `}
      ${label}
      ${button
        ? html `
          <button type="button" title=${button.title} @click=${button.onClick}>
            ${iconTemplate({ icon: button.icon })}
          </button>
        `
        : nothing
      }
    </span>
  `;
}
