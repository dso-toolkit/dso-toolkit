import { Icon } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function iconTemplate({ icon }: Icon, slot?: string) {
  return html`
    <dso-icon
      icon=${icon}
      slot=${ifDefined(slot)}
    ></dso-icon>
  `;
}
