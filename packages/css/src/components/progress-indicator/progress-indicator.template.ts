import { ProgressIndicator } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

export function progressIndicatorTemplate({ status, size, block }: ProgressIndicator) {
  status ??= 'Een moment geduld alstublieft.';

  return html`
    <div
      class="dso-progress-indicator ${classMap({
        [`dso-${size}`]: !!size,
        'dso-block': !!block,
      })}"
      role="progressbar"
      aria-valuetext=${status}
    >
      <div class="dso-progress-indicator-spinner"></div><span class="dso-progress-indicator-label">${status}</span>
    </div>
  `;
}
