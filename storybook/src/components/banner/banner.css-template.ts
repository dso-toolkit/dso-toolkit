import { Banner } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import clsx from "clsx";

import { ComponentImplementation } from "../../templates";

export const cssBanner: ComponentImplementation<Banner<TemplateResult>> = {
  component: "banner",
  implementation: "html-css",
  template: () =>
    function bannerTemplate({ status, compact, noIcon, content }) {
      return html`
        <section
          class=${clsx("dso-banner", {
            [`alert-${status}`]: status,
            ["dso-compact"]: compact,
            ["dso-no-icon"]: compact && noIcon,
          })}
          role="alert"
        >
          <div class="container">
            <div class="row">
              <div class="col-sm-12">${content}</div>
            </div>
          </div>
        </section>
      `;
    },
};
