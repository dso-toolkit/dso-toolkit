import { Banner } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const coreBanner: ComponentImplementation<Banner<TemplateResult>> = {
  component: "banner",
  implementation: "core",
  template: ({ buttonTemplate }) =>
    function bannerTemplate({ status, content, onClick }) {
      return html`
        <dso-banner status=${status}>
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                ${content}
                ${buttonTemplate({
                  label: "Sluiten",
                  type: "button",
                  variant: "tertiary",
                  onClick: onClick,
                  icon: { icon: "times" },
                  iconMode: "only",
                })}
              </div>
            </div>
          </div>
        </dso-banner>
      `;
    },
};
