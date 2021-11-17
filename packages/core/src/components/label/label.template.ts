import { Label } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

export function labelTemplate({ status, label, button, compact, symbol }: Label) {
  return html`
    <dso-label
      status=${ifDefined(status)}
      @removeClick=${ifDefined(button?.onClick)}
      ?compact=${compact}
      ?removable=${button}
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
