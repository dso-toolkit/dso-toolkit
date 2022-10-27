import { Info } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ComponentImplementation } from '../../templates';

export const coreInfo: ComponentImplementation<Info<TemplateResult>> = {
  component: 'info',
  implementation: 'core',
  template: () => function infoTemplate({ fixed, active, richContent, dsoClose }) {
    return html`
      <dso-info
        ?fixed=${fixed}
        ?active=${active}
        @dsoClose=${dsoClose}
      >
        ${richContent}
      </dso-info>
    `;
  }
}
