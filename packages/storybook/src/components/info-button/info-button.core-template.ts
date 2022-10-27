import { InfoButton } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ComponentImplementation } from '../../templates';

export const coreInfoButton: ComponentImplementation<InfoButton> = {
  component: 'infoButton',
  implementation: 'core',
  template: () => function infoButtonTemplate({ label, active, secondary, dsoToggle }) {
    return html`
      <dso-info-button
        label=${label}
        ?active=${active}
        ?secondary=${secondary}
        @dsoToggle=${(e: CustomEvent) => dsoToggle(e.detail)}
      ></dso-info-button>
    `;
  }
}
