import { Modal } from '@dso-toolkit/sources';

import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { ComponentImplementation } from '../../templates';

export const cssModal: ComponentImplementation<Modal<TemplateResult>> = {
  component: 'modal',
  implementation: 'css',
  template: ({ buttonTemplate }) => function modalTemplate({ body, buttons, confirm, role, heading, id }) {
    return html`
      <div
        tabindex="-1"
        class="dso-modal ${classMap({
          'dso-confirm': !!confirm
        })}"
        role=${role}
        aria-labelledby=${ifDefined(heading && id)}
      >
        <div class="dso-dialog" role="document">
          ${heading && id
            ? html`
              <div class="dso-header">
                <h2 id=${id}>${heading}</h2>
                <button type="button" class="dso-close">
                  <span class="sr-only">Sluiten</span>
                </button>
              </div>
            `
            : nothing
          }
          <div class="dso-body">
            ${typeof body === 'string'
              ? unsafeHTML(body)
              : body
            }
          </div>
          ${buttons?.length
            ? html`
              <div class="dso-footer">
                ${buttons.map(b => buttonTemplate(b))}
              </div>
            `
            : nothing
          }
        </div>
      </div>
    `;
  }
}
