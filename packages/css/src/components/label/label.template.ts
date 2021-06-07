import { Label } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

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
          <button slot="action" type="button" title=${button.title} @click=${button.onClick}>
            <svg class="di di-${button.icon}">
              <use href="dso-icons.svg#${button.icon}" />
            </svg>
          </button>
        `
        : nothing
      }
    </span>
  `;
}
