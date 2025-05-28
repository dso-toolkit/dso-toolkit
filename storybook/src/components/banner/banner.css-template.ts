import clsx from "clsx";
import { Banner } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssBanner: ComponentImplementation<Banner<TemplateResult>> = {
  component: "banner",
  implementation: "html-css",
  template: () =>
    function bannerTemplate({ status, compact, icon, content }) {
      return html`
        <section
          class=${clsx("dso-banner", {
            [`alert-${status}`]: status,
            ["dso-compact"]: compact,
            ["dso-icon"]: icon || !compact,
          })}
          role="alert"
        >
          <div class="dso-banner-inner">${content}</div>
        </section>
      `;
    },
};
