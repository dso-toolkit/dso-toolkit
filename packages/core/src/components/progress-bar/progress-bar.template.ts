import { ProgressBar } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export function progressBarTemplate({ progress, label, min, max }: ProgressBar) {
  return html`
    <dso-progress-bar
      progress=${progress}
      min=${ifDefined(min)}
      max=${ifDefined(max)}
    >${label ?? ''}</dso-progress-bar>
  `;
}
