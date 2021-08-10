import { ApplicationHeader } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function applicationHeaderTemplate({ count }: ApplicationHeader) {
  return html`
    <div class="dso-app-heading">
      ${count} <span class="sr-only">bijlage${count !== 1 ? 'n' : ''}</span>
    </div>
  `;
}
