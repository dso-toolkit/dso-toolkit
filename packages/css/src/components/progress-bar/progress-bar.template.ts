import { ProgressBar } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function progressBarTemplate({ progress, label, min, max }: ProgressBar) {
  return html`
    <div class="progress">
      <div
        class="progress-bar"
        role="progressbar"
        aria-labelledby="progress-bar-label"
        aria-valuenow="${Math.round(progress)}"
        aria-valuemin="${min || 0}"
        aria-valuemax="${max || 100}"
        style="width: ${Math.round(progress / (max || 100) * 100)}%"
      >
        <span id="progress-bar-label">
          ${label}
        </span>
      </div>
    </div>
  `;
}
