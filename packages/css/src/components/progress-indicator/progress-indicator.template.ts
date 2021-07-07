import { ProgressIndicator } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

export function progressIndicatorTemplate({ status, size, block, color }: ProgressIndicator) {
  return html`
    <div
      class="progress-indicator ${classMap({
        'dso-${`size`}': !!size,
        'dso-block': !!block,
        'dso-${`color`}': (!!block && !!color)
      })}"
      role="progressbar"
      aria-valuetext="${status}"
    >
      <div class="dso-progress-indicator-spinner"></div>
      <span class="dso-progress-indicator-label">
        ${status}
      </span>
    </div>
  `;
}
