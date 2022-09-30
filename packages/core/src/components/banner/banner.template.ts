import { Banner } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

import { iconTemplate } from '../icon/icon.template';

export function bannerTemplate({ status, richContent, onClick }: Banner<TemplateResult>) {
  return html`
    <dso-banner status=${status}>
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            ${richContent}
            <button type="button" class="dso-tertiary" @click=${onClick}>
              <span class="sr-only">Sluiten</span>
              ${iconTemplate({ icon: 'times' })}
            </button>
          </div>
        </div>
      </div>
    </dso-banner>
  `;
}
