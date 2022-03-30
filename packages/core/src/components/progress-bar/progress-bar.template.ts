import { ProgressBar } from '@dso-toolkit/sources';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function progressBarTemplate({ progress, label, min, max }: ProgressBar) {
  return html`
    <dso-progress-bar
      progress=${progress}
      min=${ifDefined(min)}
      max=${ifDefined(max)}
    >${label ?? nothing}</dso-progress-bar>
  `;
}
