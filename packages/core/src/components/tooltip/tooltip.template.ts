import { Tooltip } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function tooltipTemplate({ active, descriptive, position, label, id }: Tooltip) {
  return html`<dso-tooltip ?descriptive=${ifDefined(descriptive)} position=${position} for=${ifDefined(id)} ?active=${active}>
    ${label}
  </dso-tooltip>`;
}
