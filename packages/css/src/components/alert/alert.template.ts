import { Alert } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

// Todo: Move to @dso-toolkit/sources ?
const statusMap = new Map<string, string>([
  ['success', 'Gelukt'],
  ['info', 'Opmerking'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Fout']
]);

export function alertTemplate({ status, message, onClick, withRoleAlert }: Alert) {
  return html`
    <div class="alert alert-${status}" role="${ifDefined(withRoleAlert ? 'alert' : undefined)}">
      <span class="sr-only">${statusMap.get(status)}:</span>
      <div class="dso-rich-content">
        <p>${unsafeHTML(message)}</p>
        ${onClick
          ? html`
              <button type="button" class="btn" @click=${onClick}>Button</button>
            `
          : nothing
        }
      </div>
    </div>
  `;
}
