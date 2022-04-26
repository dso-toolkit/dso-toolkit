import { ProgressIndicator } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function progressIndicatorTemplate({ label, block, size }: ProgressIndicator) {
  return html`
    <dso-progress-indicator
      label=${ifDefined(label)}
      size=${ifDefined(size)}
      ?block=${block}
    ></dso-progress-indicator>
  `;
}
