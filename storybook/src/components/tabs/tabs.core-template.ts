import { Tabs } from "dso-toolkit";

import { TemplateResult, html } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const coreTabs: ComponentImplementation<Tabs<TemplateResult>> = {
  component: "tabs",
  implementation: "core",
  template: () =>
    function tabsTemplate() {
      return html` <dso-tabs></dso-tabs> `;
    },
};
