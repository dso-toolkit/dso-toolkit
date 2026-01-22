import { CursorTooltip } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreCursorTooltip: ComponentImplementation<CursorTooltip> = {
  component: "cursorTooltip",
  implementation: "core",
  template: () =>
    function cursorTooltipTemplate() {
      return html`<dso-cursor-tooltip>test</dso-cursor-tooltip>`;
    },
};
