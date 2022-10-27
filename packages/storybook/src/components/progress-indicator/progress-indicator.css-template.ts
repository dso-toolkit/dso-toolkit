import { ProgressIndicator } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { ComponentImplementation } from '../../templates';

export const cssProgressIndicator: ComponentImplementation<ProgressIndicator> = {
  component: 'progressIndicator',
  implementation: 'css',
  template: () => function progressIndicatorTemplate({ label, size, block }) {
    label ??= 'Resultaten laden: een moment geduld alstublieft.';

    return html`
      <div
        class="dso-progress-indicator ${classMap({
          [`dso-${size}`]: !!size,
          'dso-block': !!block,
        })}"
      >
        <span class="dso-progress-indicator-spinner" role="progressbar" aria-labelledby="progress-indicator-label"></span>
        <span id="progress-indicator-label" class="dso-progress-indicator-label">${label}</span>
      </div>
    `;
  }
}
