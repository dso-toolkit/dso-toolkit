import { html } from "lit-html";

import { CursorTooltip } from "./cursor-tooltip.models.js";

export function cursorTooltipTemplate({ message }: CursorTooltip) {
  return html`<dso-cursor-tooltip>${message}</dso-cursor-tooltip>`;
}
