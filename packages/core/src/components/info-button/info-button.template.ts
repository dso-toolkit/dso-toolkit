import { InfoButton } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function infoButtonTemplate({ label, active, onClick }: InfoButton) {
  return html`
    <dso-info-button
      label=${label}
      ?active=${active}
      @toggle=${(e: CustomEvent) => onClick(e.detail)}
    ></dso-info-button>
  `;
}
