import { Banner } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

import { ComponentImplementation } from "../../templates";

export const cssBanner: ComponentImplementation<Banner<TemplateResult>> = {
  component: "banner",
  implementation: "html-css",
  template: () =>
    function bannerTemplate({ status, compact, icon, content }) {
      return html`
        <section
          class="dso-banner ${classMap({
            [`alert-${status}`]: status,
            ["dso-compact"]: !!compact,
            ["dso-icon"]: icon || !compact,
          })}"
          role="alert"
        >
          <div class="dso-banner-inner">${content}</div>
        </section>
      `;
    },
};
