import { Alert } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

export function alertTemplate({ status, message, onClick, withRoleAlert }: Alert<TemplateResult>) {
  return html`
    <dso-alert status=${status} ?role-alert=${withRoleAlert}>
      <div class="dso-rich-content">
        ${typeof message === 'string'
          ? html`
            <p>${unsafeHTML(message)}</p>
          `
          : message
        }
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
