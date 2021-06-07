import { Tooltip } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function tooltipTemplate({ position }: Tooltip) {
  return html`
    <div class="tooltip fade in ${position}" role="tooltip">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">${`Ik sta: "${position}"`}</div>
    </div>
  `;
}
