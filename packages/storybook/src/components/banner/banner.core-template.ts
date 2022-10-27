import { Banner } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { ComponentImplementation } from '../../templates';

export const coreBanner: ComponentImplementation<Banner> = {
  component: 'banner',
  implementation: 'core',
  template: ({ iconTemplate }) => function bannerTemplate({ status, richContent, onClick }) {
    return html`
      <dso-banner status=${status}>
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              ${unsafeHTML(richContent)}
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
