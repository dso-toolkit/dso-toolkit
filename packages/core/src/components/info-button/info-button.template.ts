import { InfoButton } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function infoButtonTemplate({ label, active, secondary, onToggle }: InfoButton) {
  return html`
    <dso-info-button
      label=${label}
      ?active=${active}
      ?secondary=${secondary}
      @dsoToggle=${(e: CustomEvent) => onToggle(e.detail)}
    ></dso-info-button>
  `;
}
