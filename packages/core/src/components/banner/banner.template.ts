import { Banner } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function bannerTemplate({ status, richContent, onClick }: Banner<TemplateResult>) {
  return html`
    <dso-banner status=${status}>
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            ${richContent}
            <button type="button" class="btn btn-link" @click=${onClick}>
              <span class="sr-only">Sluiten</span>
              <dso-icon icon="times"></dso-icon>
            </button>
          </div>
        </div>
      </div>
    </dso-banner>
  `;
}
