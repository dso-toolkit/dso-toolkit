import { Banner } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ComponentImplementation } from '../../templates';

export const cssBanner: ComponentImplementation<Banner<TemplateResult>> = {
  component: 'banner',
  implementation: "css",
  template: ({ buttonTemplate }) => function bannerTemplate({ status, content, onClick }) {
    return html`
      <section class="dso-banner ${status ? `alert-${status}` : ''}" role="alert">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              ${content}
              ${buttonTemplate({ label: 'Sluiten', variant: 'tertiary', onClick, icon: { icon: 'times' }, iconMode: 'only' })}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
