import { Banner } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ComponentImplementation } from '../../templates';

export const coreBanner: ComponentImplementation<Banner<TemplateResult>> = {
  component: 'banner',
  implementation: 'core',
  template: ({ iconTemplate }) => function bannerTemplate({ status, richContent, onClick }: Banner<TemplateResult>) {
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
}
