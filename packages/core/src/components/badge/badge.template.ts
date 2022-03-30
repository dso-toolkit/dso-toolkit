import { Badge } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function badgeTemplate({ status, message }: Badge) {
  return html`
    <dso-badge status=${ifDefined(status)}>${message}</dso-badge>
  `;
}
