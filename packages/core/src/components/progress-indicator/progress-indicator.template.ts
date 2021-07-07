import { ProgressIndicator } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export function progressIndicatorTemplate({ status, block, color, size }: ProgressIndicator) {
  return html`
    <dso-progress-indicator
      status=${status}
      size=${size}
      block=${ifDefined(block)}
      color=${ifDefined(color)}
    >${status}</dso-progress-indicator>
  `;
}
