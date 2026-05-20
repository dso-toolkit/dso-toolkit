import { Banner } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreBanner: ComponentImplementation<Banner<TemplateResult>> = {
  component: "banner",
  implementation: "core",
  template: () =>
    function bannerTemplate({ status, compact, icon, content }) {
      return html`
        <dso-banner status=${status} ?compact=${compact} ?icon=${icon || !compact}> ${content} </dso-banner>
      `;
    },
};
