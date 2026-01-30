import { CursorTooltip } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreCursorTooltip: ComponentImplementation<CursorTooltip> = {
  component: "cursorTooltip",
  implementation: "core",
  template: () =>
    function cursorTooltipTemplate({ message }) {
      return html`<dso-cursor-tooltip>${message}</dso-cursor-tooltip>`;
    },
};
