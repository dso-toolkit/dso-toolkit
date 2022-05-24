import { Badge } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function badgeTemplate({ status, message }: Badge) {
  return html`
    <span class="dso-badge ${status ? `badge-${status}` : ''}">
      ${message}
    </span>`;
}
