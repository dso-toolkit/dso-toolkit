import { Label } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export function labelTemplate({ status, label, button, compact }: Label) {
  return html`
    <dso-label
      status=${ifDefined(status)}
      @removeClick=${ifDefined(button?.onClick)}
      ?compact=${compact}
      ?removable=${button}
    >
      ${label}
    </dso-label>
  `;
}
