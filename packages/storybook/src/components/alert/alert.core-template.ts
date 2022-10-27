import { Alert } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { ComponentImplementation } from '../../templates';

export const coreAlert: ComponentImplementation<Alert<TemplateResult>> = {
  component: 'alert',
  implementation: 'core',
  template: ({ buttonTemplate }) => function alertTemplate({ status, message, onClick, withRoleAlert }) {
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
            ? buttonTemplate({ label: 'Button', onClick, variant: null, modifier: 'btn' })
            : nothing
          }
        </div>
      </dso-alert>
    `;
  }
};
