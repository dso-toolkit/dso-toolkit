import { Info } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function infoTemplate({ fixed, active, richContent, dsoClose }: Info<TemplateResult>) {
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
