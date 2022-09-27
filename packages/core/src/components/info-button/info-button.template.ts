import { InfoButton } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function infoButtonTemplate({ label, active, secondary, dsoToggle }: InfoButton) {
  return html`
    <dso-info-button
      label=${label}
      ?active=${active}
      ?secondary=${secondary}
      @dsoToggle=${(e: CustomEvent) => dsoToggle(e.detail)}
    ></dso-info-button>
  `;
}
