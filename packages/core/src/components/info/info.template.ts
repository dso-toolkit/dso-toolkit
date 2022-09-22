import { Info } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function infoTemplate({ fixed, active, richContent, onClose }: Info<TemplateResult>) {
  return html`
    <dso-info
      ?fixed=${fixed}
      ?active=${active}
      @dsoClose=${onClose}
    >
      ${richContent}
    </dso-info>
  `;
}
