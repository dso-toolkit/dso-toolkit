import { Banner } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

import { iconTemplate } from '../icon/icon.template';

export function bannerTemplate({ status, richContent, onClick }: Banner<TemplateResult>) {
  return html`
    <section class="dso-banner ${status ? `alert-${status}` : ''}" role="alert">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            ${richContent}
            <button type="button" class="btn btn-link" @click=${onClick}>
              <span class="sr-only">Sluiten</span>
              ${iconTemplate({ icon: 'times' })}
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}
