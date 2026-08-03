import { DsoPanelCustomEvent } from "@dso-toolkit/core";
import { TemplateResult, html } from "lit-html";

import { Panel, PanelCloseEvent } from "./panel.models.js";

export function panelTemplate({ children, heading, dsoCloseClick, emphasized }: Panel<TemplateResult>) {
  return html`<dso-panel
    ?emphasized=${emphasized}
    @dsoCloseClick=${(e: DsoPanelCustomEvent<PanelCloseEvent>) => dsoCloseClick?.(e)}
    >${heading} ${children}</dso-panel
  >`;
}
