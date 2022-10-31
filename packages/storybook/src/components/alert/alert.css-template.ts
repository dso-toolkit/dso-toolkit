import { Alert } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { ComponentImplementation } from '../../templates';

// Todo: Move to @dso-toolkit/sources ?
const statusMap = new Map<string, string>([
  ['success', 'Gelukt'],
  ['info', 'Opmerking'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Fout']
]);

export const cssAlert: ComponentImplementation<Alert<TemplateResult>> = {
  component: 'alert',
  implementation: 'css',
  template: ({ buttonTemplate }) => function alertTemplate({ status, message, onClick, withRoleAlert }) {
    return html`
      <div class="alert alert-${status}" role="${ifDefined(withRoleAlert ? 'alert' : undefined)}">
        <span class="sr-only">${statusMap.get(status)}:</span>
        <div class="dso-rich-content">
          ${typeof message === 'string'
            ? unsafeHTML(message)
            : message
          }
          ${onClick
            ? buttonTemplate({ label: 'Button', onClick, variant: null, modifier: 'btn' })
            : nothing
          }
        </div>
      </div>
    `;
  }
};
