import { ButtonAnonymous, Info } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';

import { buttonTemplate } from '../button/button.template';

export function infoTemplate({ fixed, richContent, onClose }: Info<TemplateResult>) {
  return html`
    <div class="dso-info">
      ${!fixed
        ? buttonTemplate({ label: 'Sluiten', modifier: ButtonAnonymous, onClick: onClose, iconMode: 'only' })
        : nothing
      }
      ${richContent}
    </div>
  `;
}
