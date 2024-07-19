import { html, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { Panel } from "dso-toolkit";

export const corePanel: ComponentImplementation<Panel<TemplateResult>> = {
  component: "panel",
  implementation: "core",
  template: () =>
    function panelTemplate({ children, heading, dsoCloseClick }) {
      return html`<dso-panel @dsoCloseClick=${dsoCloseClick}>${heading} ${children}</dso-panel>`;
    },
};
