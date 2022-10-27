import { Banner } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { ComponentImplementation } from '../../templates';

export const cssBanner: ComponentImplementation<Banner> = {
  component: 'banner',
  implementation: "css",
  template: ({ buttonTemplate }) => function bannerTemplate({ status, richContent, onClick }) {
    return html`
      <section class="dso-banner ${status ? `alert-${status}` : ''}" role="alert">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              ${unsafeHTML(richContent)}
              ${buttonTemplate({ label: 'Sluiten', variant: 'tertiary', onClick, icon: { icon: 'times' }, iconMode: 'only' })}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
