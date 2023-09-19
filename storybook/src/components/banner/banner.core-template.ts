import { Banner } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const coreBanner: ComponentImplementation<Banner<TemplateResult>> = {
  component: "banner",
  implementation: "core",
  template: () =>
    function bannerTemplate({ status, compact, noIcon, content }) {
      return html`
        <dso-banner status=${status} ?compact=${compact} ?no-icon=${noIcon}>
          <div class="container">
            <div class="row">
              <div class="col-sm-12">${content}</div>
            </div>
          </div>
        </dso-banner>
      `;
    },
};
