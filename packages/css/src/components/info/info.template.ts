import { Info } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { buttonTemplate } from '../button/button.template';

export function infoTemplate({ fixed, richContent, dsoClose, id }: Info<TemplateResult>) {
  return html`
    <div class="dso-info" id=${ifDefined(id)}>
      ${typeof richContent === 'string'
        ? html`${unsafeHTML(richContent)}`
        : richContent
      }
      ${!fixed
        ? buttonTemplate({ label: 'Sluiten', variant: null, onClick: dsoClose, iconMode: 'only' })
        : nothing
      }
    </div>
  `;
}
