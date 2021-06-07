import { Alert } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

export function alertTemplate({ status, message, onClick, withRoleAlert }: Alert) {
  return html`
    <dso-alert status=${status} ?role-alert=${withRoleAlert}>
      <div class="dso-rich-content">
        <p>${unsafeHTML(message)}</p>
        ${onClick
          ? html`
            <button type="button" class="btn" @click=${onClick}>Button</button>
          `
          : nothing
        }
      </div>
    </dso-alert>
  `;
}
