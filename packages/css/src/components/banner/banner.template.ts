import { Banner } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

import { buttonTemplate } from '../button/button.template';

export function bannerTemplate({ status, richContent, onClick }: Banner<TemplateResult>) {
  return html`
    <section class="dso-banner ${status ? `alert-${status}` : ''}" role="alert">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            ${richContent}
            ${buttonTemplate({ label: 'Sluiten', variant: null, modifier: 'btn btn-link', onClick, icon: { icon: 'times' }, iconMode: 'only' })}
          </div>
        </div>
      </div>
    </section>
  `;
}
