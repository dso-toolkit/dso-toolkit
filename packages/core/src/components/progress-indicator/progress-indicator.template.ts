import { ProgressIndicator } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export function progressIndicatorTemplate({ status, block, size }: ProgressIndicator) {
  return html`
    <dso-progress-indicator
      status=${ifDefined(status)}
      size=${ifDefined(size)}
      ?block=${block}
    ></dso-progress-indicator>
  `;
}
