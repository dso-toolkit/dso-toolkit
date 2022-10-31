import { Icon } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ComponentImplementation } from '../../templates';

export const coreIcon: ComponentImplementation<Icon> = {
  component: 'icon',
  implementation: 'core',
  template: () => function iconTemplate({ icon, slot }) {
    return html`
      <dso-icon
        icon=${icon}
        slot=${ifDefined(slot)}
      ></dso-icon>
    `;
  }
};
