import { Icon } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function iconTemplate({ icon }: Icon) {
  return html`<svg class="di di-${icon}">
    <use href="dso-icons.svg#${icon}" />
  </svg>`;
}
