import { Panel } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const corePanel: ComponentImplementation<Panel> = {
  component: "panel",
  implementation: "core",
  template: () =>
    function panelTemplate({}) {
      return html`<dso-panel></dso-panel>`;
    },
};
