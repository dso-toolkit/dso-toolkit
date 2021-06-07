import { Tooltip } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export function tooltipTemplate({ position, label, id }: Tooltip) {
  return html`
    <dso-tooltip position=${position} for=${ifDefined(id)}>
      ${label}
    </dso-tooltip>
  `;
}
