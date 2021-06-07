import { Icon } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function iconTemplate({ icon }: Icon) {
  return html`
    <dso-icon icon=${icon}></dso-icon>
  `;
}
