import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreTijdreisBanner: ComponentImplementation<TemplateResult> = {
  component: "tijdreisBanner",
  implementation: "core",
  template: () =>
    function tijdreisBannerTemplate() {
      return html` <dso-tijdreis-banner>
        <span>
          <strong>Tijdreis:</strong> U bekijkt nu de informatie die op <strong>01-05-2025</strong> zichtbaar was.
        </span>
      </dso-tijdreis-banner>`;
    },
};
