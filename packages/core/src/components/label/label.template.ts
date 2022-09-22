import { Label } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

export function labelTemplate({ status, label, removable, onRemoveClick, compact, truncate, symbol }: Label) {
  return html`
    <dso-label
      status=${ifDefined(status)}
      @dsoRemoveClick=${ifDefined(onRemoveClick)}
      ?truncate=${truncate}
      ?compact=${compact}
      ?removable=${removable}
    >
      ${symbol
        ? html`
          <span slot="symbol">
            ${unsafeHTML(symbol)}
          </span>
        `
        : nothing
      }
      ${label}
    </dso-label>
  `;
}
