import { Badge } from '@dso-toolkit/sources';
import { html } from 'lit-html';

// Todo: Move to @dso-toolkit/sources
const statusMap = new Map<string, string>([
  ['primary', 'Primair'],
  ['success', 'Gelukt'],
  ['info', 'Opmerking'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Fout'],
  ['outline', 'Rand']
]);

export function badgeTemplate({ status, message }: Badge) {
  return html`
    <span class="dso-badge ${status ? `badge-${status}` : ''}">
      <span class="sr-only">${status ? statusMap.get(status) : 'Badge'}: </span>
      ${message}
    </span>`;
}
