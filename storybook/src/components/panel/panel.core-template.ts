import { html, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { Panel } from "dso-toolkit";
import { DsoPanelCustomEvent } from "@dso-toolkit/core";
import { PanelCloseEvent } from "@dso-toolkit/core/src";

export const corePanel: ComponentImplementation<Panel<TemplateResult>> = {
  component: "panel",
  implementation: "core",
  template: () =>
    function panelTemplate({ children, heading, dsoCloseClick, emphasized }) {
      return html`<dso-panel
        ?emphasized=${emphasized}
        @dsoCloseClick=${(e: DsoPanelCustomEvent<PanelCloseEvent>) => dsoCloseClick?.(e)}
        >${heading} ${children}</dso-panel
      >`;
    },
};
