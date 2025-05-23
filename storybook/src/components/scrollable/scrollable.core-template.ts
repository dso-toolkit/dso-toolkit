import { Scrollable } from "dso-toolkit";
import { html,TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreScrollable: ComponentImplementation<Scrollable<TemplateResult>> = {
  component: "scrollable",
  implementation: "core",
  template: () =>
    function scrollableTemplate({ children, dsoScrollEnd }) {
      return html`<dso-scrollable @dsoScrollEnd=${dsoScrollEnd}>${children}</dso-scrollable>`;
    },
};
